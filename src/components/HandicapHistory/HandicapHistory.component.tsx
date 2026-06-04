import { useMemo } from 'react';
import {
	Box,
	Card,
	CardContent,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Alert,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { useAppStore } from '@/store/zustand';
import dayjs from 'dayjs';

const getScalingCount = (count: number): number => {
	if (count <= 0) return 0;
	if (count <= 2) return 1;
	if (count <= 5) return 1;
	if (count <= 8) return 2;
	if (count <= 11) return 3;
	if (count <= 14) return 4;
	if (count <= 16) return 5;
	if (count <= 18) return 6;
	if (count === 19) return 7;
	return 8;
};

const HandicapHistory = () => {
	const roundsList = useAppStore((state) => state.roundsList);
	const isLoadingRounds = useAppStore((state) => state.isLoadingRounds);
	const initialHCP = useAppStore((state) => state.player?.initialHCP) ?? null;
	const hasInitialHCP = initialHCP != null;
	const hasRounds = roundsList.length > 0;

	// Rounds with SD, sorted by date descending (most recent first)
	const roundsWithSD = useMemo(() => {
		return roundsList
			.filter((r) => r.scoreDifferential != null && r.roundDate)
			.sort((a, b) => b.roundDate - a.roundDate);
	}, [roundsList]);

	// Last 20 for the table
	const last20 = useMemo(() => {
		return roundsWithSD.slice(0, 20);
	}, [roundsWithSD]);

	// SDs from last 20 (in display order: most recent first)
	const last20SDs = useMemo(() => {
		return last20.map((r) => r.scoreDifferential as number);
	}, [last20]);

	// Which indices in last20 are among the best N SDs
	const highlightedIndices = useMemo(() => {
		if (last20SDs.length === 0) return new Set<number>();
		const count = Math.min(last20SDs.length, 20);
		const toUse = getScalingCount(count);
		const sorted = last20SDs
			.map((sd, i) => ({ sd, i }))
			.sort((a, b) => a.sd - b.sd || a.i - b.i);
		const bestIndices = new Set(sorted.slice(0, toUse).map((item) => item.i));
		return bestIndices;
	}, [last20SDs]);

	// Current Handicap Index — the most recent round's stored handicapIndex.
	// After the backfill runs, this is always set when rounds exist.
	const currentHI = useMemo(() => {
		if (!roundsList.length) return null;
		const mostRecentWithHI = roundsList
			.slice()
			.sort((a, b) => b.roundDate - a.roundDate)
			.find((r) => r.handicapIndex != null);
		return mostRecentWithHI?.handicapIndex ?? null;
	}, [roundsList]);

	// HCP progression — chronological, one point per round with stored HI.
	// The dashed reference line at initialHCP (rendered separately) provides
	// the "started here" context.
	const progressionData = useMemo(() => {
		return [...roundsWithSD]
			.filter((r) => r.handicapIndex != null)
			.sort((a, b) => a.roundDate - b.roundDate)
			.map((r) => ({ date: r.roundDate, hi: r.handicapIndex as number }));
	}, [roundsWithSD]);

	if (isLoadingRounds) {
		return (
			<Box sx={{ p: 2 }}>
				<Typography>Loading...</Typography>
			</Box>
		);
	}

	return (
		<Box>
			{roundsWithSD.length === 0 && !hasInitialHCP && (
				<Alert severity="info">
					No rounds with score differentials yet. Play some rounds first!
				</Alert>
			)}

			{roundsWithSD.length === 0 && hasInitialHCP && (
				<Alert severity="info" sx={{ mb: 2 }}>
					Your initial handicap ({initialHCP?.toFixed(1)}) is saved.
					Add your first round to start tracking progression.
				</Alert>
			)}

			{roundsWithSD.length > 0 && (
				<>
					<Box sx={{ mb: 2 }}>
						<Typography variant="body" color="text.secondary">
							Current Handicap Index
						</Typography>
						<Typography variant="title3">
							{currentHI != null ? currentHI.toFixed(1) : '\u2014'}
						</Typography>
						<Typography variant="caption" color="text.secondary">
							Based on {roundsWithSD.length} round
							{roundsWithSD.length !== 1 ? 's' : ''}
							{last20SDs.length > 0 &&
								` \u2022 Lowest ${getScalingCount(Math.min(last20SDs.length, 20))} of last ${Math.min(last20SDs.length, 20)} SDs used`}
						</Typography>
					</Box>

					{!hasInitialHCP && hasRounds && (
						<Alert severity="info" sx={{ mb: 2 }}>
							Set your Initial Handicap in Settings to anchor the
							progression chart.
						</Alert>
					)}

					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography variant="title6" gutterBottom>
								Last 20 Rounds
							</Typography>
							<TableContainer>
								<Table size="small">
									<TableHead>
										<TableRow>
											<TableCell>Date</TableCell>
											<TableCell>Course</TableCell>
											<TableCell>Tee</TableCell>
											<TableCell align="right">
												Strokes
											</TableCell>
											<TableCell align="right">
												Score Diff.
											</TableCell>
											<TableCell align="right">
												Old HCP
											</TableCell>
											<TableCell align="right">
												New HCP
											</TableCell>
											<TableCell align="right">
												Δ
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{last20.map((round, idx) => {
											const isHighlighted =
												highlightedIndices.has(idx);
											return (
												<TableRow key={round.id}>
													<TableCell>
														{dayjs(
															round.roundDate
														).format('DD/MM/YYYY')}
													</TableCell>
													<TableCell>
														{round.roundCourse ??
															'\u2014'}
													</TableCell>
													<TableCell>
														{round.roundTee ??
															'\u2014'}
													</TableCell>
													<TableCell align="right">
														{round.totals?.score
															?.totals ?? '\u2014'}
													</TableCell>
													<TableCell align="right">
														<Box
															component="span"
															sx={{
																display: 'inline-block',
																padding: '5px',
																border: '2px solid',
																borderColor: isHighlighted
																	? 'black'
																	: 'transparent',
																backgroundColor: isHighlighted
																	? '#fff59d'
																	: 'transparent',
																color: isHighlighted
																	? 'rgba(0,0,0,0.87)'
																	: 'inherit',
															}}
														>
															{round.scoreDifferential !=
															null ? (
																<>
																	{isHighlighted && (
																		<Box
																			component="span"
																			sx={{ mr: '4px' }}
																		>
																			{'\u2605'}
																		</Box>
																	)}
																	{round.scoreDifferential.toFixed(
																		1
																	)}
																</>
															) : (
																'\u2014'
															)}
														</Box>
													</TableCell>
													<TableCell align="right">
														{round.previousHCP != null
															? round.previousHCP.toFixed(1)
															: '\u2014'}
													</TableCell>
													<TableCell align="right">
														{round.handicapIndex != null
															? round.handicapIndex.toFixed(1)
															: '\u2014'}
													</TableCell>
													<TableCell align="right">
														{round.hcpDelta != null
															? `${
																	round.hcpDelta > 0
																		? '+'
																		: ''
																}${round.hcpDelta.toFixed(1)}`
															: '\u2014'}
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
						</CardContent>
					</Card>
				</>
			)}

			{progressionData.length >= 1 && (
				<Card>
					<CardContent>
						<Typography variant="title6" gutterBottom>
							HCP Progression
						</Typography>
						<Box sx={{ width: '100%', height: 300 }}>
							<LineChart
								dataset={progressionData}
								xAxis={[
									{
										dataKey: 'date',
										scaleType: 'time',
										valueFormatter: (date: Date) =>
											dayjs(date).format('DD/MM/YY'),
									},
								]}
								yAxis={[
									{
										label: 'Handicap Index',
									},
								]}
								series={[
									{
										dataKey: 'hi',
										label: 'Handicap Index',
										showMark: true,
										connectNulls: false,
									},
								]}
								height={300}
								margin={{
									top: 10,
									right: 20,
									bottom: 30,
									left: 50,
								}}
							>
								{hasInitialHCP && (
									<ChartsReferenceLine
										y={initialHCP as number}
										label="Initial HCP"
										lineStyle={{
											strokeDasharray: '5 5',
											stroke: '#888',
										}}
									/>
								)}
							</LineChart>
						</Box>
					</CardContent>
				</Card>
			)}
		</Box>
	);
};

export default HandicapHistory;
