import { Timestamp, FieldValue, serverTimestamp } from 'firebase/firestore';
import { IRoundTotals } from '@/types/roundTotals.types';
import { initialStateRoundTotals } from '@/utils/constant.utils';
import { IParsedRound } from './ImportRoundParser.utils';
import { ICourseMatchResult } from './CourseMatcher.utils';

export interface IRoundImportDocument {
  roundDate: Timestamp;
  roundCourse: string;
  roundCourseRef: string | null;
  roundHoles: 18;
  roundTee: string;
  roundPar: number;
  roundPlayingHCP: number;
  roundStrokes: number;
  roundFormat: string;
  roundValid: boolean;
  roundNumber: number;
  totals: IRoundTotals;
  scoreDifferential: number | null;
  previousHCP: number | null;
  handicapIndex: number | null;
  hcpDelta: number | null;
  userId: string;
  importSource: 'federgolf-sheet';
  createdAt: FieldValue;
}

export function createEmptyRoundTotals(): IRoundTotals {
  return JSON.parse(JSON.stringify(initialStateRoundTotals));
}

export function buildRoundDocument(params: {
  parsed: IParsedRound;
  match: ICourseMatchResult;
  roundNumber: number;
  userId: string;
  previousHCP?: number | null;
  handicapIndex?: number | null;
  hcpDelta?: number | null;
}): IRoundImportDocument {
  const totals = createEmptyRoundTotals();

  // Score: only fields computable from Federgolf summary (no per-hole data).
  // Per-hole-derived fields (scoreIN/OUT, vsParIN/OUT, par3/4/5, par-by-counts)
  // cannot be computed honestly from the summary and are left at 0.
  totals.score.totals = params.parsed.roundStrokes;
  totals.score.avg = params.parsed.roundStrokes / 18;
  totals.score.vsPar = params.parsed.roundStrokes - params.parsed.roundPar;

  // Points: only fields computable from Federgolf summary.
  // pointsIN/pointsOUT require per-hole data and stay at 0.
  totals.points.totals = params.parsed.stablefordPoints;
  totals.points.avg = params.parsed.stablefordPoints / 18;

  return {
    roundDate: Timestamp.fromDate(new Date(params.parsed.roundDate)),
    roundCourse: params.match.matched ? params.match.courseName : params.parsed.roundCourse,
    roundCourseRef: params.match.courseId,
    roundHoles: 18,
    roundTee: params.match.matched ? params.match.teeboxName : '',
    roundPar: params.parsed.roundPar,
    roundPlayingHCP: params.parsed.roundPlayingHCP,
    roundStrokes: params.parsed.roundStrokes,
    roundFormat: params.parsed.roundFormat,
    roundValid: params.parsed.roundValid,
    roundNumber: params.roundNumber,
    totals,
    scoreDifferential: params.parsed.scoreDifferential,
    previousHCP: params.previousHCP ?? null,
    handicapIndex: params.handicapIndex ?? null,
    hcpDelta: params.hcpDelta ?? null,
    userId: params.userId,
    importSource: 'federgolf-sheet',
    createdAt: serverTimestamp(),
  };
}
