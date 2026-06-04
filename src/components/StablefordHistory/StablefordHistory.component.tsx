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
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import { useAppStore } from '@/store/zustand';
import {
	getStablefordPoints,
	getGrossScore,
	getNetVsPar,
	getGrossVsPar,
} from '@/utils/stableford/stableford.utils';
import dayjs from 'dayjs';

const formatSigned = (n: number | null): string => {
	if (n == null) return '\u2014';
	const fixed = n.toFixed(1);
	return n > 0 ? `+${fixed}` : fixed;
};

const StablefordHistory = () => {
	const roundsList = useAppStore((state) => state.roundsList);
	const isLoadingRounds = useAppStore((state) => state.isLoadingRounds);

	// Rounds with stableford, sorted by date descending (most recent first)
	const roundsWithStableford = useMemo(() => {
		return roundsList
			.filter((r) => getStablefordPoints(r) != null && r.roundDate)
			.sort((a, b) => b.roundDate - a.roundDate);
	}, [roundsList]);

	// Last 20 for the table (most recent first)
	const last20 = useMemo(() => {
		return roundsWithStableford.slice(0, 20);
	}, [roundsWithStableford]);

	// Chart data (chronological, oldest -> newest on the x axis)
	const chartData = useMemo(() => {
		return [...last20]
			.sort((a, b) => a.roundDate - b.roundDate)
			.map((round) => ({
				date: round.roundDate,
				stableford: getStablefordPoints(round),
				netVsPar: getNetVsPar(round),
				grossVsPar: getGrossVsPar(round),
			}));
	}, [last20]);

	if (isLoadingRounds) {
		return (
			<Box sx={{ p: 2 }}>
				<Typography>Loading...</Typography>
			</Box>
		);
	}

	return (
		<Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
				<ScoreboardIcon sx={{ fontSize: 32 }} />
				<Typography variant="headline2">Stableford History</Typography>
			</Box>

			{roundsWithStableford.length === 0 && (
				<Alert severity="info">
					No rounds with stableford points yet. Play some rounds first!
				</Alert>
			)}

			{roundsWithStableford.length > 0 && (
				<>
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
											<TableCell align="right">Stableford</TableCell>
											<TableCell align="right">Score</TableCell>
											<TableCell align="right">Net vs Par</TableCell>
											<TableCell align="right">Gross vs Par</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{last20.map((round) => {
											const stableford = getStablefordPoints(round);
											const score = getGrossScore(round);
											const netVsPar = getNetVsPar(round);
											const grossVsPar = getGrossVsPar(round);
											return (
												<TableRow key={round.id}>
													<TableCell>
														{dayjs(round.roundDate).format('DD/MM/YYYY')}
													</TableCell>
													<TableCell>
														{round.roundCourse ?? '\u2014'}
													</TableCell>
													<TableCell align="right">
														{stableford ?? '\u2014'}
													</TableCell>
													<TableCell align="right">
														{score ?? '\u2014'}
													</TableCell>
													<TableCell align="right">
														{formatSigned(netVsPar)}
													</TableCell>
													<TableCell align="right">
														{formatSigned(grossVsPar)}
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<Typography variant="title6" gutterBottom>
								Trend
							</Typography>
							<Box sx={{ width: '100%', height: 300 }}>
								<LineChart
									dataset={chartData}
									xAxis={[
										{
											dataKey: 'date',
											scaleType: 'time',
											valueFormatter: (date: Date) =>
												dayjs(date).format('DD/MM/YY'),
										},
									]}
									yAxis={[
										{ id: 'left', label: 'Stableford Pts' },
										{ id: 'right', label: 'vs Par' },
									]}
									series={[
										{
											dataKey: 'stableford',
											label: 'Stableford Pts',
											yAxisId: 'left',
											color: '#2e7d32',
											showMark: true,
											connectNulls: false,
										},
										{
											dataKey: 'netVsPar',
											label: 'Net vs Par',
											yAxisId: 'right',
											color: '#1976d2',
											showMark: true,
											connectNulls: false,
										},
										{
											dataKey: 'grossVsPar',
											label: 'Gross vs Par',
											yAxisId: 'right',
											color: '#ed6c02',
											showMark: true,
											connectNulls: false,
										},
									]}
									height={300}
									margin={{ top: 10, right: 20, bottom: 30, left: 50 }}
								/>
							</Box>
						</CardContent>
					</Card>
				</>
			)}
		</Box>
	);
};

export default StablefordHistory;
