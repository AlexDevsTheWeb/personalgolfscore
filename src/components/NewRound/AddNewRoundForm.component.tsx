import { Dialog } from '@/styles/dialog/Dialog.styles';
import { INewRound } from '@/types/round.types';
import { ICourse } from '@/types/course.types';
import { getAllCourses } from '@/utils/firestore/course.firestore';
import { calculateHandicapIndex } from '@/utils/whs/hi.utils';
import { calculatePlayingHandicap } from '@/utils/whs/whs.utils';
import {
	Grid,
	TextField,
	Autocomplete,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from './components/Select.component';
import { useAppStore } from '@/store/zustand';

interface FormValues {
	roundCourse: string;
	roundHoles: number;
	roundPar: number;
	roundPlayingHCP: number;
	roundTee: string;
	roundNumber: number;
	roundDate: Dayjs | null;
}

const AddNewRoundForm = () => {
	const navigate = useNavigate();
	const roundData = useAppStore((state) => state.newRoundMain.round);
	const setFirstHole = useAppStore((state) => state.newRoundMain.setFirstHole);
	const setRoundDate = useAppStore((state) => state.setRoundDate);
	const setRoundMainData = useAppStore((state) => state.setRoundMainData);
	const setRoundCourse = useAppStore((state) => state.setRoundCourse);
	const setRoundHoles = useAppStore((state) => state.setRoundHoles);
	const setRoundPar = useAppStore((state) => state.setRoundPar);
	const setRoundPlayingHCP = useAppStore((state) => state.setRoundPlayingHCP);
	const setRoundTee = useAppStore((state) => state.setRoundTee);
	const setRoundNumber = useAppStore((state) => state.setRoundNumber);
	const holesList = useAppStore((state) => state.newRoundHoles.holes);
	const roundsList = useAppStore((state) => state.roundsList);

	const [courses, setCourses] = useState<ICourse[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
	const [courseLoading, setCourseLoading] = useState(false);

	const roundDateString = roundData.roundDate;
	const roundDateValue = roundDateString && dayjs(roundDateString).isValid() ? dayjs(roundDateString) : dayjs(new Date());

	const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
		defaultValues: {
			roundCourse: roundData.roundCourse || '',
			roundHoles: roundData.roundHoles || 18,
			roundPar: roundData.roundPar || 72,
			roundPlayingHCP: roundData.roundPlayingHCP || 0,
			roundTee: roundData.roundTee || 'White',
			roundNumber: roundData.roundNumber || 1,
			roundDate: roundDateValue,
		}
	});

	const watchedTee = watch('roundTee');

	// Current Handicap Index from rounds
	const currentHI = useMemo(() => {
		const sds = roundsList
			.filter((r) => r.scoreDifferential != null)
			.map((r) => r.scoreDifferential as number);
		return calculateHandicapIndex(sds);
	}, [roundsList]);

	// Find selected teebox
	const selectedTeebox = useMemo(() => {
		if (!selectedCourse || !watchedTee) return null;
		return selectedCourse.teeboxes.find((t) => t.name === watchedTee) || null;
	}, [selectedCourse, watchedTee]);

	// Auto-calculated Playing Handicap
	const autoPlayingHCP = useMemo(() => {
		if (!selectedTeebox || currentHI == null) return null;
		return calculatePlayingHandicap(
			currentHI,
			selectedTeebox.courseRating,
			selectedTeebox.slopeRating,
			selectedTeebox.par
		);
	}, [selectedTeebox, currentHI]);

	useEffect(() => {
		if (!roundDateString) {
			setRoundDate(dayjs(new Date()));
		}
	}, [roundDateString, setRoundDate]);

	useEffect(() => {
		setCourseLoading(true);
		getAllCourses()
			.then((all) => {
				setCourses(all.filter((c) => c.status === 'Active'));
				setCourseLoading(false);
			})
			.catch(() => {
				setCourseLoading(false);
			});
	}, []);

	// Auto-fill first available teebox when course changes
	const handleCourseChange = (course: ICourse | null) => {
		setSelectedCourse(course);
		if (course) {
			setValue('roundCourse', course.name);
			setValue('roundHoles', course.holes);
			if (course.teeboxes.length > 0) {
				const firstTee = course.teeboxes[0].name;
				setValue('roundTee', firstTee);
			}
		} else {
			setValue('roundCourse', '');
		}
	};

	// Auto-fill par and playing HCP when tee changes
	useEffect(() => {
		if (selectedTeebox) {
			setValue('roundPar', selectedTeebox.par);
			if (autoPlayingHCP != null) {
				setValue('roundPlayingHCP', autoPlayingHCP);
			}
		}
	}, [selectedTeebox, autoPlayingHCP, setValue]);

	const handleDateChange = (newValue: Dayjs | null) => {
		setRoundDate(newValue);
		setValue('roundDate', newValue);
	};

	const onSubmit = (data: FormValues) => {
		setRoundCourse(data.roundCourse);
		setRoundHoles(data.roundHoles);
		setRoundPar(data.roundPar);
		setRoundPlayingHCP(data.roundPlayingHCP);
		setRoundTee(data.roundTee);
		setRoundNumber(data.roundNumber);

		const roundForTotals: INewRound = {
			...data,
			roundDate: data.roundDate?.toString() || '',
		};
		setRoundMainData({});
	};

	const handleCancel = () => {
		setRoundMainData({});
		navigate('/dashboard');
	};

	const courseSelected = selectedCourse != null;

	return (
		<Dialog
			open={!setFirstHole}
			title='New round: basic info'
			onClose={handleCancel}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Grid container spacing={1} sx={{ mt: 1 }} columns={{ xs: 12, sm: 12, lg: 12 }}>
				<Grid size={{ xs: 12, sm: 6, lg: 6 }}>
					<Autocomplete
						disablePortal
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
						onChange={(_, newValue) => handleCourseChange(newValue)}
						loading={courseLoading}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Round course"
							/>
						)}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, lg: 6 }}>
					<DatePicker
						value={roundDateValue}
						onChange={handleDateChange}
						sx={{ width: '100%' }}
						format="DD/MM/YYYY"
					/>
				</Grid>
				<Grid size={{ xs: 4, sm: 2, lg: 2 }}>
					<TextField
						{...register('roundHoles', {
							required: 'Required',
							min: { value: 1, message: 'Min 1' },
							max: { value: 18, message: 'Max 18' },
							valueAsNumber: true
						})}
						label="Holes"
						variant='outlined'
						type='number'
						fullWidth
						slotProps={{
							input: { readOnly: courseSelected },
						}}
						error={!!errors.roundHoles}
						helperText={errors.roundHoles?.message}
					/>
				</Grid>
				<Grid size={{ xs: 4, sm: 2, lg: 2 }}>
					<TextField
						{...register('roundPar', {
							required: 'Required',
							min: { value: 18, message: 'Min 18' },
							max: { value: 99, message: 'Max 99' },
							valueAsNumber: true
						})}
						label="Par"
						variant="outlined"
						type='number'
						fullWidth
						slotProps={{
							input: { readOnly: courseSelected },
						}}
						error={!!errors.roundPar}
						helperText={errors.roundPar?.message}
					/>
				</Grid>
				<Grid size={{ xs: 4, sm: 2, lg: 2 }}>
					<TextField
						{...register('roundPlayingHCP', {
							valueAsNumber: true,
							min: { value: 0, message: 'Min 0' },
							max: { value: 54, message: 'Max 54' }
						})}
						label="HCP"
						variant="outlined"
						fullWidth
						type='number'
						slotProps={{
							input: { readOnly: autoPlayingHCP != null },
						}}
						error={!!errors.roundPlayingHCP}
						helperText={
							autoPlayingHCP != null
								? `Auto-calculated from HI: ${currentHI?.toFixed(1)}`
								: errors.roundPlayingHCP?.message
						}
					/>
				</Grid>
				<Grid size={{ xs: 6, sm: 3, lg: 3 }}>
					<Select
						name='roundTee'
						value={watch('roundTee') || ''}
						label='Tee'
						list={
							selectedCourse
								? selectedCourse.teeboxes.map((t) => t.name)
								: ['White', 'Blue', 'Yellow', 'Red', 'Green', 'Orange']
						}
						onChange={(e: any) => setValue('roundTee', e.target.value)}
					/>
				</Grid>
				<Grid size={{ xs: 6, sm: 3, lg: 3 }}>
					<TextField
						{...register('roundNumber', {
							valueAsNumber: true,
							min: { value: 1, message: 'Min 1' }
						})}
						label="Round #"
						variant="outlined"
						type='number'
						fullWidth
						error={!!errors.roundNumber}
						helperText={errors.roundNumber?.message}
					/>
				</Grid>
			</Grid>
		</Dialog>
	);
};

export default AddNewRoundForm;
