import type { IBasicRoundData } from '@/types/roundData.types';

export const getStablefordPoints = (round: IBasicRoundData): number | null => {
	return round.totals?.points?.totals ?? null;
};

export const getGrossScore = (round: IBasicRoundData): number | null => {
	return round.totals?.score?.totals ?? null;
};

export const getNetScore = (round: IBasicRoundData): number | null => {
	const gross = getGrossScore(round);
	if (gross == null) return null;
	if (round.roundPlayingHCP == null) return null;
	return gross - Number(round.roundPlayingHCP);
};

export const getGrossVsPar = (round: IBasicRoundData): number | null => {
	const gross = getGrossScore(round);
	if (gross == null) return null;
	if (round.roundPar == null) return null;
	return gross - Number(round.roundPar);
};

export const getNetVsPar = (round: IBasicRoundData): number | null => {
	const gross = getGrossScore(round);
	if (gross == null) return null;
	if (round.roundPar == null || round.roundPlayingHCP == null) return null;
	return gross - Number(round.roundPar) - Number(round.roundPlayingHCP);
};
