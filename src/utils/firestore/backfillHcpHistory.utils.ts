/**
 * One-time backfill of per-round HCP history fields.
 *
 * Walks a player's rounds chronologically, computing `previousHCP`,
 * `handicapIndex`, and `hcpDelta` using the same formula as
 * `importRoundsBatch`. The first round's `previousHCP` is anchored to
 * the player's `initialHCP` (or null if absent). Subsequent rounds
 * anchor to the previous round's `handicapIndex`.
 *
 * Rounds with `scoreDifferential == null` are skipped from output with
 * a warning; they don't break the running chain so subsequent rounds
 * still anchor correctly.
 *
 * Pure helper `computeRoundHcpHistory` is unit-tested; the Firestore
 * wrapper `backfillHcpHistory` is integration-tested manually.
 */

import {
	collection,
	getDocs,
	orderBy,
	query,
	writeBatch,
	doc,
	Timestamp,
	getDoc,
} from 'firebase/firestore';
import { db } from '@/utils/firebase/firebase.utils';
import { calculateHandicapIndex } from '@/utils/whs/hi.utils';

export interface IRoundHcpInput {
	id: string;
	roundDate: number;
	scoreDifferential: number | null;
}

export interface IRoundHcpComputed {
	id: string;
	previousHCP: number | null;
	handicapIndex: number | null;
	hcpDelta: number | null;
}

/**
 * Pure calculation: given a chronologically-sorted list of rounds and
 * the player's initialHCP, return the per-round HCP fields to write.
 *
 * Rounds with a null `scoreDifferential` are omitted from the result
 * (logged as a warning); the running chain continues uninterrupted so
 * the next round with an SD still anchors to the most recent valid HI
 * (or initialHCP if no prior valid HI exists).
 */
export const computeRoundHcpHistory = (
	rounds: IRoundHcpInput[],
	initialHCP: number | null
): IRoundHcpComputed[] => {
	const result: IRoundHcpComputed[] = [];
	let runningSDs: number[] = [];
	let runningHCP: number | null = initialHCP;

	for (const round of rounds) {
		if (round.scoreDifferential == null) {
			console.warn(
				`computeRoundHcpHistory: skipping round ${round.id} \u2014 null scoreDifferential`
			);
			continue;
		}

		const previousHCP: number | null = runningHCP;
		const virtualSDs = [round.scoreDifferential, ...runningSDs].slice(0, 20);
		const newHI = calculateHandicapIndex(virtualSDs);

		let handicapIndex: number | null = null;
		let hcpDelta: number | null = null;

		if (newHI != null) {
			handicapIndex = newHI;
			if (previousHCP != null) {
				hcpDelta = +(newHI - previousHCP).toFixed(1);
			}
			runningSDs = [round.scoreDifferential, ...runningSDs].slice(0, 19);
			runningHCP = newHI;
		}

		result.push({ id: round.id, previousHCP, handicapIndex, hcpDelta });
	}

	return result;
};

export interface IBackfillResult {
	success: boolean;
	processed: number;
	updated: number;
	skipped: number;
	error?: string;
}

/**
 * Fetch all rounds, compute the HCP history, and write a single batch.
 * Idempotent: re-runs produce the same values.
 *
 * `processed` counts rounds for which we computed values (excludes
 * rounds with null scoreDifferential). `updated` counts batch writes
 * actually issued. `skipped` counts rounds whose existing values
 * already matched.
 */
export const backfillHcpHistory = async (
	userId: string
): Promise<IBackfillResult> => {
	if (!userId) {
		return {
			success: false,
			processed: 0,
			updated: 0,
			skipped: 0,
			error: 'User ID required',
		};
	}

	try {
		const playerDocRef = doc(db, 'players', userId);
		const playerSnap = await getDoc(playerDocRef);
		const initialHCP: number | null = playerSnap.exists()
			? (playerSnap.data().initialHCP ?? null)
			: null;

		const roundsColRef = collection(db, 'players', userId, 'rounds');
		const roundsQuery = query(roundsColRef, orderBy('roundDate', 'asc'));
		const roundsSnap = await getDocs(roundsQuery);

		if (roundsSnap.empty) {
			return { success: true, processed: 0, updated: 0, skipped: 0 };
		}

		const inputs: IRoundHcpInput[] = roundsSnap.docs.map((d) => {
			const data = d.data();
			const roundDate =
				data.roundDate instanceof Timestamp
					? data.roundDate.toMillis()
					: Number(data.roundDate);
			const sd = data.scoreDifferential ?? null;
			return { id: d.id, roundDate, scoreDifferential: sd };
		});

		const computed = computeRoundHcpHistory(inputs, initialHCP);

		const docsById = new Map(roundsSnap.docs.map((d) => [d.id, d]));

		const batch = writeBatch(db);
		let updated = 0;
		let skipped = 0;
		const processed = computed.length;

		for (const next of computed) {
			const origDoc = docsById.get(next.id);
			if (!origDoc) continue;
			const origData = origDoc.data();
			const samePrev = origData.previousHCP === next.previousHCP;
			const sameHI = origData.handicapIndex === next.handicapIndex;
			const sameDelta = origData.hcpDelta === next.hcpDelta;
			if (samePrev && sameHI && sameDelta) {
				skipped += 1;
				continue;
			}
			const roundRef = doc(db, 'players', userId, 'rounds', next.id);
			batch.update(roundRef, {
				previousHCP: next.previousHCP,
				handicapIndex: next.handicapIndex,
				hcpDelta: next.hcpDelta,
			});
			updated += 1;
		}

		if (updated > 0) {
			await batch.commit();
		}

		return { success: true, processed, updated, skipped };
	} catch (err: any) {
		console.error('backfillHcpHistory failed:', err);
		return {
			success: false,
			processed: 0,
			updated: 0,
			skipped: 0,
			error: err?.message ?? 'Unknown error',
		};
	}
};
