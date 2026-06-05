/**
 * One-time migration: backfill `totals.score.vsPar`, `totals.score.avg`,
 * and `totals.points.avg` for Federgolf-imported rounds where those fields
 * are still 0 (the import path historically left them at 0 because it
 * skipped TotalsCalculator).
 *
 * The import path itself is now fixed in `RoundBuilder.utils.ts`, so this
 * only affects rounds that were imported before that fix landed.
 *
 * Run:
 *   npm run migrate:imported-totals            # dry-run (prints plan, no writes)
 *   npm run migrate:imported-totals -- --apply # apply the migration
 *
 * Idempotent: re-runs find zero work because existing values already match.
 */

import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '../utils/firebase/firebase.utils';

export interface IRoundTotalsInput {
	id: string;
	userId: string;
	roundStrokes: number | null | undefined;
	roundPar: number | null | undefined;
	stablefordPoints: number | null | undefined;
	existingVsPar: number | null | undefined;
}

export interface IRoundTotalsComputed {
	id: string;
	userId: string;
	updates: {
		'totals.score.vsPar': number;
		'totals.score.avg': number;
		'totals.points.avg': number;
	};
}

export const computeRoundTotalsUpdates = (
	rounds: IRoundTotalsInput[]
): IRoundTotalsComputed[] => {
	const result: IRoundTotalsComputed[] = [];

	for (const r of rounds) {
		const strokes = Number(r.roundStrokes);
		const par = Number(r.roundPar);
		const stableford = Number(r.stablefordPoints);

		if (!Number.isFinite(strokes) || strokes <= 0) {
			console.warn(`[skip] round ${r.id}: invalid roundStrokes=${r.roundStrokes}`);
			continue;
		}
		if (!Number.isFinite(par) || par <= 0) {
			console.warn(`[skip] round ${r.id}: invalid roundPar=${r.roundPar}`);
			continue;
		}

		const updates = {
			'totals.score.vsPar': strokes - par,
			'totals.score.avg': strokes / 18,
			'totals.points.avg': Number.isFinite(stableford) ? stableford / 18 : 0,
		};

		const sameVsPar = r.existingVsPar === updates['totals.score.vsPar'];
		if (sameVsPar) {
			continue;
		}

		result.push({ id: r.id, userId: r.userId, updates });
	}

	return result;
};

const collectImportedRounds = async (): Promise<IRoundTotalsInput[]> => {
	const playersSnap = await getDocs(collection(db, 'players'));
	const inputs: IRoundTotalsInput[] = [];

	for (const player of playersSnap.docs) {
		const roundsSnap = await getDocs(collection(db, 'players', player.id, 'rounds'));
		for (const round of roundsSnap.docs) {
			const data = round.data();
			if (data.importSource !== 'federgolf-sheet') continue;

			const totals = data.totals as { score?: { vsPar?: number } } | undefined;
			const existingVsPar = totals?.score?.vsPar;

			inputs.push({
				id: round.id,
				userId: player.id,
				roundStrokes: data.roundStrokes,
				roundPar: typeof data.roundPar === 'number' ? data.roundPar : Number(data.roundPar),
				stablefordPoints:
					(totals as { points?: { totals?: number } } | undefined)?.points?.totals ??
					(data.stablefordPoints as number | undefined),
				existingVsPar,
			});
		}
	}

	return inputs;
};

const applyUpdates = async (updates: IRoundTotalsComputed[]): Promise<number> => {
	if (updates.length === 0) return 0;

	const batch = writeBatch(db);
	for (const u of updates) {
		const ref = doc(db, 'players', u.userId, 'rounds', u.id);
		batch.update(ref, u.updates);
	}
	await batch.commit();
	return updates.length;
};

const main = async () => {
	const apply = process.argv.includes('--apply');

	console.log(`\n[imported-totals] mode=${apply ? 'APPLY' : 'DRY-RUN'}`);
	console.log('[imported-totals] scanning players/*/rounds for federgolf imports...');

	const inputs = await collectImportedRounds();
	console.log(`[imported-totals] found ${inputs.length} federgolf-imported round(s)`);

	const updates = computeRoundTotalsUpdates(inputs);
	console.log(`[imported-totals] ${updates.length} round(s) need updating`);

	if (updates.length === 0) {
		console.log('[imported-totals] nothing to do.\n');
		return;
	}

	if (!apply) {
		console.log('\n[imported-totals] DRY-RUN — no writes performed.');
		console.log('Sample update:');
		console.log(JSON.stringify(updates[0], null, 2));
		console.log('\nRe-run with --apply to write changes.\n');
		return;
	}

	console.log('[imported-totals] writing batch...');
	const written = await applyUpdates(updates);
	console.log(`[imported-totals] wrote ${written} round(s).\n`);
};

if (process.argv[1]?.endsWith('migrateImportedTotals.ts')) {
	main().catch((err) => {
		console.error('[imported-totals] failed:', err);
		process.exit(1);
	});
}
