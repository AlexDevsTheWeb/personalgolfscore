import { describe, it, expect } from 'vitest';
import {
	getStablefordPoints,
	getGrossScore,
	getNetScore,
	getGrossVsPar,
	getNetVsPar,
} from './stableford.utils';
import type { IBasicRoundData } from '@/types/roundData.types';

describe('stableford.utils', () => {
	describe('getStablefordPoints', () => {
		it('returns totals.points.totals when present', () => {
			const round = { totals: { points: { totals: 36 } } } as unknown as IBasicRoundData;
			expect(getStablefordPoints(round)).toBe(36);
		});

		it('returns null when totals.points is missing', () => {
			const round = { totals: {} } as unknown as IBasicRoundData;
			expect(getStablefordPoints(round)).toBe(null);
		});

		it('returns null when totals itself is missing', () => {
			const round = {} as unknown as IBasicRoundData;
			expect(getStablefordPoints(round)).toBe(null);
		});
	});

	describe('getGrossScore', () => {
		it('returns totals.score.totals when present', () => {
			const round = { totals: { score: { totals: 80 } } } as unknown as IBasicRoundData;
			expect(getGrossScore(round)).toBe(80);
		});

		it('returns null when totals.score is missing', () => {
			const round = { totals: {} } as unknown as IBasicRoundData;
			expect(getGrossScore(round)).toBe(null);
		});

		it('returns null when totals itself is missing', () => {
			const round = {} as unknown as IBasicRoundData;
			expect(getGrossScore(round)).toBe(null);
		});
	});

	describe('getNetScore', () => {
		it('returns gross - playingHCP when both present (gross 80, hcp 10 -> 70)', () => {
			const round = {
				totals: { score: { totals: 80 } },
				roundPlayingHCP: '10',
			} as unknown as IBasicRoundData;
			expect(getNetScore(round)).toBe(70);
		});

		it('returns null when roundPlayingHCP is missing', () => {
			const round = { totals: { score: { totals: 80 } } } as unknown as IBasicRoundData;
			expect(getNetScore(round)).toBe(null);
		});

		it('returns null when gross score is missing', () => {
			const round = { roundPlayingHCP: '10' } as unknown as IBasicRoundData;
			expect(getNetScore(round)).toBe(null);
		});
	});

	describe('getGrossVsPar', () => {
		it('returns gross - par when both present (gross 80, par 72 -> +8)', () => {
			const round = {
				totals: { score: { totals: 80 } },
				roundPar: '72',
			} as unknown as IBasicRoundData;
			expect(getGrossVsPar(round)).toBe(8);
		});

		it('handles negative values (under par: gross 70, par 72 -> -2)', () => {
			const round = {
				totals: { score: { totals: 70 } },
				roundPar: '72',
			} as unknown as IBasicRoundData;
			expect(getGrossVsPar(round)).toBe(-2);
		});

		it('returns null when roundPar is missing', () => {
			const round = { totals: { score: { totals: 80 } } } as unknown as IBasicRoundData;
			expect(getGrossVsPar(round)).toBe(null);
		});

		it('returns null when gross score is missing', () => {
			const round = { roundPar: '72' } as unknown as IBasicRoundData;
			expect(getGrossVsPar(round)).toBe(null);
		});
	});

	describe('getNetVsPar', () => {
		it('returns net - par when all three present (gross 80, hcp 10, par 72 -> -2)', () => {
			const round = {
				totals: { score: { totals: 80 } },
				roundPar: '72',
				roundPlayingHCP: '10',
			} as unknown as IBasicRoundData;
			expect(getNetVsPar(round)).toBe(-2);
		});

		it('returns null when roundPar is missing', () => {
			const round = {
				totals: { score: { totals: 80 } },
				roundPlayingHCP: '10',
			} as unknown as IBasicRoundData;
			expect(getNetVsPar(round)).toBe(null);
		});

		it('returns null when roundPlayingHCP is missing', () => {
			const round = {
				totals: { score: { totals: 80 } },
				roundPar: '72',
			} as unknown as IBasicRoundData;
			expect(getNetVsPar(round)).toBe(null);
		});

		it('returns null when gross score is missing', () => {
			const round = {
				roundPar: '72',
				roundPlayingHCP: '10',
			} as unknown as IBasicRoundData;
			expect(getNetVsPar(round)).toBe(null);
		});
	});
});
