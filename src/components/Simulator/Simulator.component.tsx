import { useState, useEffect, useMemo } from 'react';
import {
	Card,
	CardContent,
	Typography,
	TextField,
	MenuItem,
	Autocomplete,
	Grid,
	Box,
	Divider,
	Alert,
	CircularProgress,
	Tooltip,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { getAllCourses } from '@/utils/firestore/course.firestore';
import { useAppStore } from '@/store/zustand';
import { ICourse, ITeebox } from '@/types/course.types';
import { calculateScoreDifferential, calculatePlayingHandicap } from '@/utils/whs/whs.utils';
import { calculateHandicapIndex, calculateProjectedHandicapIndex } from '@/utils/whs/hi.utils';

/**
 * Get the number of lowest Score Differentials to display/average
 * based on available rounds count (WHS Rule 5.2a scaling).
 */
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

const Simulator = () => {
	// --- Transient state (per D-08: no Zustand persist) ---
	const [courses, setCourses] = useState<ICourse[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
	const [selectedTeebox, setSelectedTeebox] = useState<ITeebox | null>(null);
	const [stablefordPoints, setStablefordPoints] = useState<number>(36);
	const [manualPlayingHCP, setManualPlayingHCP] = useState<string>('');
	const [loading, setLoading] = useState(true);
	const [courseError, setCourseError] = useState<string | null>(null);
	const [stablefordError, setStablefordError] = useState<string | null>(null);

	// --- Computed values from Zustand store ---
	const roundsList = useAppStore((state) => state.roundsList);
	const isLoadingRounds = useAppStore((state) => state.isLoadingRounds);

	// Load courses on mount
	useEffect(() => {
		getAllCourses()
			.then((all) => {
				setCourses(all.filter((c) => c.status === 'Active'));
				setLoading(false);
			})
			.catch((err) => {
				console.error('Simulator: Failed to load courses:', err);
				setCourseError('Unable to load courses. Please try again later.');
				setLoading(false);
			});
	}, []);

	// --- Derived values ---

	// Current Handicap Index from existing rounds (D-04)
	const currentHI = useMemo(() => {
		if (isLoadingRounds) return null;
		const sds = roundsList
			.filter((r) => r.scoreDifferential != null)
			.map((r) => r.scoreDifferential as number);
		return calculateHandicapIndex(sds);
	}, [roundsList, isLoadingRounds]);

	// Auto-calculated Playing Handicap (D-09)
	const autoPlayingHCP = useMemo(() => {
		if (!selectedTeebox || currentHI == null) return null;
		return calculatePlayingHandicap(
			currentHI,
			selectedTeebox.courseRating,
			selectedTeebox.slopeRating,
			selectedTeebox.par
		);
	}, [selectedTeebox, currentHI]);

	// Effective Playing Handicap — auto-calc with manual override (D-10)
	const effectivePlayingHCP = useMemo(() => {
		const manual = manualPlayingHCP.trim();
		if (manual !== '') {
			const parsed = Number(manual);
			if (!isNaN(parsed) && parsed >= 0) {
				return parsed;
			}
		}
		return autoPlayingHCP;
	}, [autoPlayingHCP, manualPlayingHCP]);

	// Validate Stableford input
	const isStablefordValid = useMemo(() => {
		if (stablefordPoints < 0) {
			if (!stablefordError) setStablefordError('Stableford points must be a positive number');
			return false;
		}
		if (stablefordError) setStablefordError(null);
		return true;
	}, [stablefordPoints, stablefordError]);

	// Validate selectedTeebox exists in selectedCourse.teeboxes (T-02-05)
	const isTeeboxValid = useMemo(() => {
		if (!selectedCourse || !selectedTeebox) return false;
		return selectedCourse.teeboxes.some(
			(t) => t.name === selectedTeebox.name
		);
	}, [selectedCourse, selectedTeebox]);

	// Simulated Score Differential
	const simulatedResult = useMemo(() => {
		if (
			!selectedTeebox ||
			!isStablefordValid ||
			!isTeeboxValid
		) {
			return null;
		}
		return calculateScoreDifferential({
			par: selectedTeebox.par,
			courseRating: selectedTeebox.courseRating,
			slopeRating: selectedTeebox.slopeRating,
			stablefordPoints,
			playingHCP: effectivePlayingHCP ?? 0,
		});
	}, [
		selectedTeebox,
		effectivePlayingHCP,
		stablefordPoints,
		isStablefordValid,
		isTeeboxValid,
	]);

	// Projected Handicap Index (SIM-03: virtual array, no DB writes)
	const projectedHI = useMemo(() => {
		if (!simulatedResult) return null;
		const sds = roundsList
			.filter((r) => r.scoreDifferential != null)
			.map((r) => r.scoreDifferential as number);
		// Virtual array: simulated SD + last 19 real SDs
		return calculateProjectedHandicapIndex(sds, simulatedResult.scoreDifferential);
	}, [simulatedResult, roundsList]);

	// Delta: projected - current
	const delta = useMemo(() => {
		if (projectedHI == null || currentHI == null) return null;
		return projectedHI - currentHI;
	}, [projectedHI, currentHI]);

	// Best score differentials — current (lowest N)
	const best8CurrentSDs = useMemo(() => {
		const sds = roundsList
			.filter((r) => r.scoreDifferential != null)
			.map((r) => r.scoreDifferential as number);
		if (sds.length === 0) return [];
		const count = Math.min(sds.length, 20);
		const toUse = getScalingCount(count);
		const sorted = [...sds.slice(0, count)].sort((a, b) => a - b);
		return sorted.slice(0, toUse);
	}, [roundsList]);

	// Best score differentials — projected (lowest N including simulated)
	const best8ProjectedSDs = useMemo(() => {
		if (!simulatedResult) return [];
		const sds = roundsList
			.filter((r) => r.scoreDifferential != null)
			.map((r) => r.scoreDifferential as number);
		const virtual = [simulatedResult.scoreDifferential, ...sds.slice(0, 19)];
		const count = Math.min(virtual.length, 20);
		if (count === 0) return [];
		const toUse = getScalingCount(count);
		const sorted = [...virtual.slice(0, count)].sort((a, b) => a - b);
		return sorted.slice(0, toUse);
	}, [simulatedResult, roundsList]);

	// --- Handlers ---

	const handleCourseChange = (courseId: string) => {
		const course = courses.find((c) => c.id === courseId) || null;
		setSelectedCourse(course);
		setSelectedTeebox(null);
	};

	const handleTeeboxChange = (teeboxName: string) => {
		if (!selectedCourse) return;
		const teebox =
			selectedCourse.teeboxes.find((t) => t.name === teeboxName) || null;
		setSelectedTeebox(teebox);
	};

	const handleStablefordChange = (value: string) => {
		const num = value === '' ? 0 : Number(value);
		if (isNaN(num)) return;
		setStablefordPoints(num);
	};

	const handlePlayingHCPChange = (value: string) => {
		// Allow empty string for auto-calc (D-10)
		if (value === '') {
			setManualPlayingHCP('');
			return;
		}
		const num = Number(value);
		if (isNaN(num)) return;
		if (num < 0) return;
		setManualPlayingHCP(value);
	};

	// --- Edge case checks ---

	const hasNoRounds = !isLoadingRounds && roundsList.length === 0;
	const hasNoCourses = !loading && courses.length === 0 && !courseError;

	// --- Rendering ---

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (courseError) {
		return (
			<Box sx={{ p: 2 }}>
				<Alert severity="error">{courseError}</Alert>
			</Box>
		);
	}

	if (hasNoCourses) {
		return (
			<Box sx={{ p: 2 }}>
				<Alert severity="warning">
					No courses available. Contact an administrator.
				</Alert>
			</Box>
		);
	}

	return (
		<Box>
			{/* Header */}
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
				<AutoGraphIcon sx={{ fontSize: 32 }} />
				<Typography variant="headline2">Handicap Simulator</Typography>
			</Box>

			{/* No rounds state */}
			{hasNoRounds && (
				<Alert severity="info" sx={{ mb: 2 }}>
					No rounds recorded yet. Play some rounds first!
				</Alert>
			)}

			<Grid container spacing={3}>
				{/* Left column: Course Selection + Score Input */}
				<Grid size={{ xs: 12, md: 7 }}>
					{/* Course Selection Card */}
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography variant="title6" gutterBottom>
								Course Selection
							</Typography>

							{/* Course autocomplete */}
							<Autocomplete
								fullWidth
								options={courses}
								getOptionLabel={(course) =>
									course.city
										? `${course.name} (${course.city})`
										: course.name
								}
								isOptionEqualToValue={(option, value) =>
									option.id === value.id
								}
								value={selectedCourse}
								onChange={(_, newValue) => {
									handleCourseChange(newValue?.id ?? '');
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Course"
										sx={{ mb: 2 }}
									/>
								)}
								sx={{ mb: 2 }}
							/>

							{/* Teebox dropdown */}
							{selectedCourse && selectedCourse.teeboxes.length === 0 && (
								<Alert severity="warning" sx={{ mb: 2 }}>
									No teeboxes defined for this course.
								</Alert>
							)}

							<TextField
								fullWidth
								select
								label="Teebox"
								value={selectedTeebox?.name ?? ''}
								onChange={(e) => handleTeeboxChange(e.target.value)}
								disabled={
									!selectedCourse ||
									selectedCourse.teeboxes.length === 0
								}
							>
								{selectedCourse?.teeboxes.map((teebox) => (
									<MenuItem key={teebox.name} value={teebox.name}>
										{teebox.name} — Par {teebox.par}, CR{' '}
										{teebox.courseRating}, SR {teebox.slopeRating}
									</MenuItem>
								))}
							</TextField>
						</CardContent>
					</Card>

					{/* Score Input Card */}
					<Card>
						<CardContent>
							<Typography variant="title6" gutterBottom>
								Score Input
							</Typography>

							{/* Stableford points */}
							<TextField
								fullWidth
								type="number"
								label="Total Stableford Points"
								value={stablefordPoints}
								onChange={(e) => handleStablefordChange(e.target.value)}
								error={!!stablefordError}
								helperText={
									stablefordError || 'Enter total Stableford points'
								}
								inputProps={{
									min: 0,
									step: 1,
								}}
								sx={{ mb: 2 }}
							/>

							{/* Playing Handicap */}
							<TextField
								fullWidth
								type="number"
								label="Playing Handicap"
								value={manualPlayingHCP}
								onChange={(e) => handlePlayingHCPChange(e.target.value)}
								helperText={
									autoPlayingHCP != null
										? `Auto-calculated from HI: ${autoPlayingHCP}`
										: 'Leave empty to use 0'
								}
								inputProps={{
									min: 0,
								}}
								sx={{ mb: 1 }}
							/>

							<Typography variant="caption" color="text.secondary">
								Playing Handicap formula:{' '}
								<code>HI × (SR / 113) + (CR - PAR)</code>. Leave empty to
								auto-calculate.
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				{/* Right column: Results */}
				<Grid size={{ xs: 12, md: 5 }}>
					{/* Results Card — only visible when simulatedResult is computed */}
					{simulatedResult && (
						<Card>
							<CardContent>
								<Typography variant="title6" gutterBottom>
									Simulation Results
								</Typography>

								{/* Current Handicap Index */}
								<Box sx={{ mb: 1.5 }}>
									<Typography variant="body" color="text.secondary">
										Current Handicap Index
									</Typography>
									<Typography variant="title4">
										{currentHI != null
											? currentHI.toFixed(1)
											: '\u2014'}
									</Typography>
								</Box>

								<Divider sx={{ my: 1.5 }} />

								{/* Simulated Score Differential */}
								<Box sx={{ mb: 1.5 }}>
									<Typography variant="body" color="text.secondary">
										Simulated Score Differential
									</Typography>
									<Tooltip
										title={`AGS: ${simulatedResult.adjustedGrossScore}`}
									>
										<Typography variant="title4">
											{simulatedResult.scoreDifferential.toFixed(1)}
										</Typography>
									</Tooltip>
									<Typography variant="caption" color="text.secondary">
										AGS: {simulatedResult.adjustedGrossScore}
									</Typography>
								</Box>

								<Divider sx={{ my: 1.5 }} />

								{/* Projected Handicap Index */}
								<Box sx={{ mb: 1.5 }}>
									<Typography variant="body" color="text.secondary">
										Projected Handicap Index
									</Typography>
									<Typography variant="title4">
										{projectedHI != null
											? projectedHI.toFixed(1)
											: '\u2014'}
									</Typography>
								</Box>

								<Divider sx={{ my: 1.5 }} />

								{/* Delta */}
								<Box sx={{ mb: 1.5 }}>
									<Typography variant="body" color="text.secondary">
										Delta
									</Typography>
									<Typography
										variant="title4"
										sx={{
											color:
												delta == null
													? 'text.primary'
													: delta <= 0
														? 'success.main'
														: 'error.main',
										}}
									>
										{delta != null
											? `${delta > 0 ? '+' : ''}${delta.toFixed(1)}`
											: '\u2014'}
									</Typography>
									{delta != null && (
										<Typography variant="caption" color="text.secondary">
											{delta <= 0
												? 'Improvement (HI decreases)'
												: 'Worsening (HI increases)'}
										</Typography>
									)}
								</Box>

								{/* Best score differentials breakdown */}
								{best8CurrentSDs.length > 0 && (
									<>
										<Divider sx={{ my: 1.5 }} />
										<Box sx={{ mt: 2 }}>
											<Typography variant="title6" gutterBottom>
												Best Score Differentials
											</Typography>
											<TableContainer>
												<Table size="small">
													<TableHead>
														<TableRow>
															<TableCell>#</TableCell>
															<TableCell align="right">
																Current SDs
															</TableCell>
															<TableCell align="right">
																Projected SDs
															</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{Array.from({
															length: Math.max(
																best8CurrentSDs.length,
																best8ProjectedSDs.length
															),
														}).map((_, index) => {
															const currentVal =
																best8CurrentSDs[index];
															const projectedVal =
																best8ProjectedSDs[index];
															const isSimulated =
																projectedVal != null &&
																projectedVal ===
																	simulatedResult
																		.scoreDifferential;

															return (
																<TableRow
																	key={index}
																	sx={{
																		...(isSimulated && {
																			backgroundColor:
																				'action.selected',
																		}),
																	}}
																>
																	<TableCell>
																		{index + 1}
																	</TableCell>
																	<TableCell align="right">
																		{currentVal != null
																			? currentVal.toFixed(1)
																			: '\u2014'}
																	</TableCell>
																	<TableCell
																		align="right"
																		sx={{
																			...(isSimulated && {
																				fontWeight:
																					'bold',
																			}),
																		}}
																	>
																		{projectedVal != null
																			? `${projectedVal.toFixed(1)}${isSimulated ? ' *' : ''}`
																			: '\u2014'}
																	</TableCell>
																</TableRow>
															);
														})}
													</TableBody>
												</Table>
											</TableContainer>
											<Typography
												variant="caption"
												color="text.secondary"
												sx={{ mt: 1, display: 'block' }}
											>
												* Simulated round included in projected
												SDs
											</Typography>
										</Box>
									</>
								)}
							</CardContent>
						</Card>
					)}

					{/* Placeholder when no results yet */}
					{!simulatedResult && !hasNoRounds && (
						<Card>
							<CardContent>
								<Typography
									variant="body"
									color="text.secondary"
									sx={{ textAlign: 'center', py: 4 }}
								>
									Select a course, teebox, and enter Stableford points to see
									simulation results.
								</Typography>
							</CardContent>
						</Card>
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default Simulator;
