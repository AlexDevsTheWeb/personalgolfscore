import { describe, it, expect } from 'vitest';
import { computeRoundHcpHistory } from './backfillHcpHistory.utils';

describe('computeRoundHcpHistory', () => {
	it('returns empty for empty input', () => {
		const out = computeRoundHcpHistory([], 18.0);
		expect(out).toEqual([]);
	});

	it('anchors first round to initialHCP', () => {
		const out = computeRoundHcpHistory(
			[{ id: 'r1', roundDate: 1, scoreDifferential: 12.0 }],
			18.0
		);
		expect(out).toHaveLength(1);
		expect(out[0]).toMatchObject({
			id: 'r1',
			previousHCP: 18.0,
			hcpDelta: +(12.0 - 18.0).toFixed(1),
		});
		expect(out[0].handicapIndex).toBe(12.0);
	});

	it('chains subsequent rounds off previous handicapIndex', () => {
		const out = computeRoundHcpHistory(
			[
				{ id: 'r1', roundDate: 1, scoreDifferential: 12.0 },
				{ id: 'r2', roundDate: 2, scoreDifferential: 14.0 },
			],
			18.0
		);
		expect(out).toHaveLength(2);
		expect(out[1]).toMatchObject({
			id: 'r2',
			previousHCP: 12.0,
		});
		expect(out[1].hcpDelta).toBe(
			+(out[1].handicapIndex! - 12.0).toFixed(1)
		);
	});

	it('skips rounds with null scoreDifferential', () => {
		const out = computeRoundHcpHistory(
			[
				{ id: 'r1', roundDate: 1, scoreDifferential: null },
				{ id: 'r2', roundDate: 2, scoreDifferential: 14.0 },
			],
			18.0
		);
		expect(out).toHaveLength(1);
		expect(out[0].id).toBe('r2');
		expect(out[0].previousHCP).toBe(18.0);
	});

	it('returns null previousHCP/hcpDelta for first round when no initialHCP', () => {
		const out = computeRoundHcpHistory(
			[{ id: 'r1', roundDate: 1, scoreDifferential: 12.0 }],
			null
		);
		expect(out[0].previousHCP).toBeNull();
		expect(out[0].hcpDelta).toBeNull();
		expect(out[0].handicapIndex).toBe(12.0);
	});

	it('produces null hcpDelta when first round has no anchor and we cannot compute delta', () => {
		const out = computeRoundHcpHistory(
			[
				{ id: 'r1', roundDate: 1, scoreDifferential: 12.0 },
				{ id: 'r2', roundDate: 2, scoreDifferential: 14.0 },
			],
			null
		);
		expect(out[0].previousHCP).toBeNull();
		expect(out[0].hcpDelta).toBeNull();
		expect(out[1].previousHCP).toBe(12.0);
		expect(out[1].hcpDelta).toBe(
			+(out[1].handicapIndex! - 12.0).toFixed(1)
		);
	});
});
