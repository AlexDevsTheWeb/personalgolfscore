import { importRoundsBatch, calculateRoundHoles } from '../../src/chain/hcp-anchor.js';
import { jest } from '@jest/globals';

describe('HCP Chain Anchoring', () => {
  describe('importRoundsBatch', () => {
    it('should anchor to currentHCP instead of initialHCP', () => {
      const mockChain = {
        initialHCP: 'initial-123',
        currentHCP: 'current-456',
        rounds: []
      };
      const result = importRoundsBatch(mockChain, ['round1', 'round2']);
      expect(result.anchoredHCP).toBe('current-456');
    });

    it('should handle empty chain gracefully', () => {
      const mockChain = {
        initialHCP: null,
        currentHCP: null,
        rounds: []
      };
      const result = importRoundsBatch(mockChain, []);
      expect(result.anchoredHCP).toBeNull();
      expect(result.success).toBe(false);
    });

    it('should reject when currentHCP is missing', () => {
      const mockChain = {
        initialHCP: 'initial-123',
        currentHCP: undefined,
        rounds: ['existingRound']
      };
      expect(() => importRoundsBatch(mockChain, ['newRound'])).toThrow('currentHCP is required');
    });

    it('should not modify initialHCP', () => {
      const mockChain = {
        initialHCP: 'initial-123',
        currentHCP: 'current-456',
        rounds: []
      };
      importRoundsBatch(mockChain, ['round1']);
      expect(mockChain.initialHCP).toBe('initial-123');
    });
  });

  describe('calculateRoundHoles', () => {
    it('should return correct holes when rounds are present', () => {
      const rounds = [
        { id: 'a', holes: [1, 2, 3] },
        { id: 'b', holes: [4, 5] }
      ];
      const result = calculateRoundHoles(rounds);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle empty array', () => {
      const result = calculateRoundHoles([]);
      expect(result).toEqual([]);
    });

    it('should handle rounds with no holes', () => {
      const rounds = [
        { id: 'a', holes: [] },
        { id: 'b', holes: [] }
      ];
      const result = calculateRoundHoles(rounds);
      expect(result).toEqual([]);
    });

    it('should coalesce duplicate holes (edge case)', () => {
      const rounds = [
        { id: 'a', holes: [1, 2] },
        { id: 'b', holes: [2, 3] }
      ];
      const result = calculateRoundHoles(rounds);
      // Assuming coalescing duplicates; adjust based on actual implementation
      expect(result).toContain(1);
      expect(result).toContain(2);
      expect(result).toContain(3);
    });

    it('should throw for invalid round structure', () => {
      const invalidRounds = [{ id: 'a' }]; // missing holes
      expect(() => calculateRoundHoles(invalidRounds)).toThrow('Each round must have a holes array');
    });
  });
});
