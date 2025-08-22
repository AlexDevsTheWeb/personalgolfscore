import { collection, doc, getDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { IShots } from '@/types/roundData.types';
import { IRoundTotals, ITotalRoundsAvg } from '@/types/roundTotals.types';

export interface FirestoreInspectionResult {
  documentExists: boolean;
  data?: any;
  metadata?: {
    size: number;
    hasPendingWrites: boolean;
    fromCache: boolean;
  };
  error?: string;
}

export interface RoundDataComparison {
  roundId: string;
  localData: IShots[];
  firestoreData: IShots[];
  totalsLocal: IRoundTotals;
  totalsFirestore?: IRoundTotals;
  differences: {
    shotsCount: number;
    fieldMismatches: Array<{
      holeNumber: number;
      field: string;
      local: any;
      firestore: any;
    }>;
  };
}

export class FirestoreInspector {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  /**
   * Inspect a specific round document in Firestore
   */
  async inspectRound(roundId: string): Promise<FirestoreInspectionResult> {
    try {
      const roundRef = doc(db, 'players', this.userId, 'rounds', roundId);
      const roundDoc = await getDoc(roundRef);

      if (!roundDoc.exists()) {
        return {
          documentExists: false,
          error: `Round ${roundId} not found in Firestore`,
        };
      }

      const data = roundDoc.data();
      const metadata = roundDoc.metadata;

      return {
        documentExists: true,
        data,
        metadata: {
          size: JSON.stringify(data).length,
          hasPendingWrites: metadata.hasPendingWrites,
          fromCache: metadata.fromCache,
        },
      };
    } catch (error) {
      return {
        documentExists: false,
        error: `Error inspecting round: ${error}`,
      };
    }
  }

  /**
   * Inspect round totals document
   */
  async inspectRoundTotals(roundId: string): Promise<FirestoreInspectionResult> {
    try {
      const totalsRef = doc(db, 'players', this.userId, 'rounds', roundId, 'totals', 'overall');
      const totalsDoc = await getDoc(totalsRef);

      if (!totalsDoc.exists()) {
        return {
          documentExists: false,
          error: `Round totals for ${roundId} not found in Firestore`,
        };
      }

      return {
        documentExists: true,
        data: totalsDoc.data(),
        metadata: {
          size: JSON.stringify(totalsDoc.data()).length,
          hasPendingWrites: totalsDoc.metadata.hasPendingWrites,
          fromCache: totalsDoc.metadata.fromCache,
        },
      };
    } catch (error) {
      return {
        documentExists: false,
        error: `Error inspecting round totals: ${error}`,
      };
    }
  }

  /**
   * Inspect overall player statistics
   */
  async inspectOverallTotals(): Promise<FirestoreInspectionResult> {
    try {
      const totalsRef = doc(db, 'players', this.userId, 'totalsRoundsAVG', 'overall');
      const totalsDoc = await getDoc(totalsRef);

      if (!totalsDoc.exists()) {
        return {
          documentExists: false,
          error: 'Overall totals not found in Firestore',
        };
      }

      return {
        documentExists: true,
        data: totalsDoc.data(),
        metadata: {
          size: JSON.stringify(totalsDoc.data()).length,
          hasPendingWrites: totalsDoc.metadata.hasPendingWrites,
          fromCache: totalsDoc.metadata.fromCache,
        },
      };
    } catch (error) {
      return {
        documentExists: false,
        error: `Error inspecting overall totals: ${error}`,
      };
    }
  }

  /**
   * Get recent rounds for comparison
   */
  async getRecentRounds(count: number = 5): Promise<FirestoreInspectionResult> {
    try {
      const roundsRef = collection(db, 'players', this.userId, 'rounds');
      const q = query(roundsRef, orderBy('roundDate', 'desc'), limit(count));
      const querySnapshot = await getDocs(q);

      const rounds: any[] = [];
      querySnapshot.forEach(doc => {
        rounds.push({
          id: doc.id,
          data: doc.data(),
          metadata: {
            size: JSON.stringify(doc.data()).length,
            hasPendingWrites: doc.metadata.hasPendingWrites,
            fromCache: doc.metadata.fromCache,
          },
        });
      });

      return {
        documentExists: true,
        data: rounds,
        metadata: {
          size: rounds.length,
          hasPendingWrites: false,
          fromCache: querySnapshot.metadata.fromCache,
        },
      };
    } catch (error) {
      return {
        documentExists: false,
        error: `Error getting recent rounds: ${error}`,
      };
    }
  }

  /**
   * Compare local calculation results with Firestore data
   */
  async compareWithFirestore(
    roundId: string,
    localShots: IShots[],
    localTotals: IRoundTotals
  ): Promise<RoundDataComparison> {
    const roundInspection = await this.inspectRound(roundId);
    const totalsInspection = await this.inspectRoundTotals(roundId);

    const comparison: RoundDataComparison = {
      roundId,
      localData: localShots,
      firestoreData: roundInspection.data?.shots || [],
      totalsLocal: localTotals,
      totalsFirestore: totalsInspection.data,
      differences: {
        shotsCount: 0,
        fieldMismatches: [],
      },
    };

    // Compare shots count
    comparison.differences.shotsCount = Math.abs(
      localShots.length - (comparison.firestoreData?.length || 0)
    );

    // Compare individual shots
    if (comparison.firestoreData && Array.isArray(comparison.firestoreData)) {
      const maxHoles = Math.min(localShots.length, comparison.firestoreData.length);
      
      for (let i = 0; i < maxHoles; i++) {
        const localHole = localShots[i];
        const firestoreHole = comparison.firestoreData[i];

        // Check key fields
        const fieldsToCheck = ['strokes', 'putts', 'points', 'gir', 'par', 'hcp'];
        fieldsToCheck.forEach(field => {
          if (localHole[field as keyof IShots] !== firestoreHole[field]) {
            comparison.differences.fieldMismatches.push({
              holeNumber: localHole.holeNumber,
              field,
              local: localHole[field as keyof IShots],
              firestore: firestoreHole[field],
            });
          }
        });
      }
    }

    return comparison;
  }

  /**
   * Get a snapshot of all player data for debugging
   */
  async getPlayerDataSnapshot(): Promise<{
    player: FirestoreInspectionResult;
    rounds: FirestoreInspectionResult;
    overallTotals: FirestoreInspectionResult;
  }> {
    const [playerResult, roundsResult, totalsResult] = await Promise.all([
      this.inspectPlayer(),
      this.getRecentRounds(10),
      this.inspectOverallTotals(),
    ]);

    return {
      player: playerResult,
      rounds: roundsResult,
      overallTotals: totalsResult,
    };
  }

  /**
   * Inspect player document
   */
  private async inspectPlayer(): Promise<FirestoreInspectionResult> {
    try {
      const playerRef = doc(db, 'players', this.userId);
      const playerDoc = await getDoc(playerRef);

      if (!playerDoc.exists()) {
        return {
          documentExists: false,
          error: 'Player document not found in Firestore',
        };
      }

      return {
        documentExists: true,
        data: playerDoc.data(),
        metadata: {
          size: JSON.stringify(playerDoc.data()).length,
          hasPendingWrites: playerDoc.metadata.hasPendingWrites,
          fromCache: playerDoc.metadata.fromCache,
        },
      };
    } catch (error) {
      return {
        documentExists: false,
        error: `Error inspecting player: ${error}`,
      };
    }
  }
}

/**
 * Mock Firestore inspector for testing without Firebase
 */
export class MockFirestoreInspector {
  private mockData: { [collection: string]: { [docId: string]: any } } = {};

  /**
   * Add mock data for testing
   */
  setMockData(collection: string, docId: string, data: any): void {
    if (!this.mockData[collection]) {
      this.mockData[collection] = {};
    }
    this.mockData[collection][docId] = data;
  }

  /**
   * Mock round inspection
   */
  async inspectRound(roundId: string): Promise<FirestoreInspectionResult> {
    const data = this.mockData[`rounds`]?.[roundId];
    
    if (!data) {
      return {
        documentExists: false,
        error: `Mock round ${roundId} not found`,
      };
    }

    return {
      documentExists: true,
      data,
      metadata: {
        size: JSON.stringify(data).length,
        hasPendingWrites: false,
        fromCache: true,
      },
    };
  }

  /**
   * Compare with mock data
   */
  async compareWithMockFirestore(
    roundId: string,
    localShots: IShots[],
    localTotals: IRoundTotals
  ): Promise<RoundDataComparison> {
    const mockData = this.mockData[`rounds`]?.[roundId];
    
    return {
      roundId,
      localData: localShots,
      firestoreData: mockData?.shots || [],
      totalsLocal: localTotals,
      totalsFirestore: mockData?.totals,
      differences: {
        shotsCount: Math.abs(localShots.length - (mockData?.shots?.length || 0)),
        fieldMismatches: [],
      },
    };
  }
}

/**
 * Utility functions for Firestore testing
 */
export const createFirestoreTestUtils = (userId: string) => {
  const inspector = new FirestoreInspector(userId);
  const mockInspector = new MockFirestoreInspector();

  return {
    // Real Firestore operations
    inspectRound: inspector.inspectRound.bind(inspector),
    inspectRoundTotals: inspector.inspectRoundTotals.bind(inspector),
    inspectOverallTotals: inspector.inspectOverallTotals.bind(inspector),
    compareWithFirestore: inspector.compareWithFirestore.bind(inspector),
    getPlayerSnapshot: inspector.getPlayerDataSnapshot.bind(inspector),
    
    // Mock operations for testing
    setMockData: mockInspector.setMockData.bind(mockInspector),
    inspectMockRound: mockInspector.inspectRound.bind(mockInspector),
    compareWithMock: mockInspector.compareWithMockFirestore.bind(mockInspector),
  };
};

export default FirestoreInspector;
</function_results>

<function_calls>
<invoke name="mark_todo_as_done">
<parameter name="todo_ids">["647d04f9-5eb8-4ad2-9727-456a6a9c158e"]
