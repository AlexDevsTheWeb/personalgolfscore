import React, { useState, useEffect } from 'react';
import { Dialog } from '@/styles/dialog/Dialog.styles';
import TextField from '@/styles/textfield/TextField.style';
import {
	Grid,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	IconButton,
	Button,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { ICourse, ITeebox } from '@/types/course.types';
import { createCourse, updateCourse } from '@/utils/firestore/course.firestore';
import { useSnackbar } from './SnackbarProvider.component';

interface CourseFormDialogProps {
	open: boolean;
	onClose: () => void;
	course?: ICourse;
	onSaved: () => void;
}

interface TeeboxFormRow {
	id: string;
	name: string;
	color: string;
	gender: 'M' | 'F' | 'mixed';
	par: number;
	courseRating: number;
	slopeRating: number;
	length: number;
}

const EMPTY_TEEBOX = (): TeeboxFormRow => ({
	id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 9),
	name: '',
	color: '#2e7d32',
	gender: 'mixed',
	par: 72,
	courseRating: 0,
	slopeRating: 0,
	length: 0,
});

const CourseFormDialog: React.FC<CourseFormDialogProps> = ({
	open,
	onClose,
	course,
	onSaved,
}) => {
	const { showSnackbar } = useSnackbar();

	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('IT');
	const [address, setAddress] = useState('');
	const [zip, setZip] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [website, setWebsite] = useState('');
	const [holes, setHoles] = useState<number>(18);
	const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
	const [notes, setNotes] = useState('');
	const [teeboxes, setTeeboxes] = useState<TeeboxFormRow[]>([EMPTY_TEEBOX()]);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (open) {
			if (course) {
				setName(course.name || '');
				setCity(course.city || '');
				setCountry(course.country || 'IT');
				setAddress(course.address || '');
				setZip(course.zip || '');
				setPhone(course.phone || '');
				setEmail(course.email || '');
				setWebsite(course.website || '');
				setHoles(course.holes || 18);
				setStatus(course.status || 'Active');
				setNotes(course.notes || '');
				setTeeboxes(
					course.teeboxes && course.teeboxes.length > 0
						? course.teeboxes.map((t) => ({
								id: crypto.randomUUID
									? crypto.randomUUID()
									: Math.random().toString(36).substr(2, 9),
								name: t.name,
								color: t.color,
								gender: t.gender,
								par: t.par,
								courseRating: t.courseRating,
								slopeRating: t.slopeRating,
								length: t.length,
						  }))
						: [EMPTY_TEEBOX()]
				);
			} else {
				setName('');
				setCity('');
				setCountry('IT');
				setAddress('');
				setZip('');
				setPhone('');
				setEmail('');
				setWebsite('');
				setHoles(18);
				setStatus('Active');
				setNotes('');
				setTeeboxes([EMPTY_TEEBOX()]);
			}
			setSaving(false);
		}
	}, [open, course]);

	const handleTeeboxChange = (index: number, field: keyof TeeboxFormRow, value: string | number) => {
		setTeeboxes((prev) =>
			prev.map((t, i) => (i === index ? { ...t, [field]: value } : t))
		);
	};

	const addTeebox = () => {
		setTeeboxes((prev) => [...prev, EMPTY_TEEBOX()]);
	};

	const removeTeebox = (index: number) => {
		setTeeboxes((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = async () => {
		if (!name.trim() || !city.trim() || !country.trim()) {
			showSnackbar('Name, city, and country are required', 'warning');
			return;
		}

		const validTeeboxes: ITeebox[] = teeboxes
			.filter((t) => t.name.trim() !== '')
			.map((t) => ({
				name: t.name,
				color: t.color,
				gender: t.gender,
				par: Number(t.par),
				courseRating: Number(t.courseRating),
				slopeRating: Number(t.slopeRating),
				length: Number(t.length),
			}));

		const courseData: Omit<ICourse, 'id' | 'createdAt' | 'updatedAt'> = {
			name: name.trim(),
			city: city.trim(),
			country: country.trim(),
			address: address.trim() || undefined,
			zip: zip.trim() || undefined,
			phone: phone.trim() || undefined,
			email: email.trim() || undefined,
			website: website.trim() || undefined,
			holes: holes as 9 | 18,
			status,
			notes: notes.trim() || undefined,
			teeboxes: validTeeboxes,
		};

		setSaving(true);
		try {
			if (course) {
				await updateCourse(course.id, courseData);
			} else {
				await createCourse(courseData);
			}
			showSnackbar('Course saved successfully', 'success');
			onSaved();
			onClose();
		} catch (error: any) {
			showSnackbar('Failed to save. Please try again.', 'error');
		} finally {
			setSaving(false);
		}
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			onSubmit={handleSubmit}
			title={course ? 'Edit Course' : 'Add Course'}
		>
			<Grid container spacing={2}>
				{/* Row 1: Name, City, Country */}
				<Grid size={{ xs: 12 }}>
					<TextField
						name="name"
						label="Name *"
						value={name}
						onChange={(e) => setName(e.target.value)}
						fullWidth
					/>
				</Grid>
				<Grid size={{ xs: 6 }}>
					<TextField
						name="city"
						label="City *"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						fullWidth
					/>
				</Grid>
				<Grid size={{ xs: 6 }}>
					<TextField
						name="country"
						label="Country *"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						fullWidth
					/>
				</Grid>

				{/* Row 2: Address, Zip, Phone, Email */}
				<Grid size={{ xs: 12 }}>
					<TextField
						name="address"
						label="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						fullWidth
					/>
				</Grid>
				<Grid size={{ xs: 4 }}>
					<TextField
						name="zip"
						label="ZIP"
						value={zip}
						onChange={(e) => setZip(e.target.value)}
						fullWidth
					/>
				</Grid>
				<Grid size={{ xs: 4 }}>
					<TextField
						name="phone"
						label="Phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						fullWidth
					/>
				</Grid>
				<Grid size={{ xs: 4 }}>
					<TextField
						name="email"
						label="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						fullWidth
					/>
				</Grid>

				{/* Row 3: Website, Holes, Status */}
				<Grid size={{ xs: 6 }}>
					<TextField
						name="website"
						label="Website"
						value={website}
						onChange={(e) => setWebsite(e.target.value)}
						fullWidth
					/>
				</Grid>
				<Grid size={{ xs: 2 }}>
					<TextField
						name="holes"
						label="Holes"
						type="number"
						value={holes}
						onChange={(e) => setHoles(Number(e.target.value))}
						fullWidth
						inputProps={{ min: 9, max: 18, step: 9 }}
					/>
				</Grid>
				<Grid size={{ xs: 2 }}>
					<FormControl fullWidth variant="filled">
						<InputLabel id="status-label">Status</InputLabel>
						<Select
							labelId="status-label"
							value={status}
							onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
						>
							<MenuItem value="Active">Active</MenuItem>
							<MenuItem value="Inactive">Inactive</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				{/* Row 4: Notes */}
				<Grid size={{ xs: 12 }}>
					<TextField
						name="notes"
						label="Notes"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						multiline
						rows={2}
						fullWidth
					/>
				</Grid>

				{/* Teebox Section */}
				<Grid size={{ xs: 12 }}>
				<Typography variant="title5" sx={{ mt: 2, mb: 1 }}>
					Teeboxes
				</Typography>
				</Grid>

				{teeboxes.map((teebox, index) => (
					<Grid container spacing={1} key={teebox.id} sx={{ ml: 0, mb: 1 }}>
						<Grid size={{ xs: 3 }}>
							<TextField
								name={`teebox-name-${index}`}
								label="Name"
								value={teebox.name}
								onChange={(e) => handleTeeboxChange(index, 'name', e.target.value)}
								fullWidth
							/>
						</Grid>
						<Grid size={{ xs: 2 }}>
							<TextField
								name={`teebox-color-${index}`}
								label="Color"
								value={teebox.color}
								onChange={(e) => handleTeeboxChange(index, 'color', e.target.value)}
								fullWidth
							/>
						</Grid>
						<Grid size={{ xs: 1.5 }}>
							<FormControl fullWidth variant="filled">
								<InputLabel id={`gender-label-${index}`}>Gender</InputLabel>
								<Select
									labelId={`gender-label-${index}`}
									value={teebox.gender}
									onChange={(e) =>
										handleTeeboxChange(index, 'gender', e.target.value as 'M' | 'F' | 'mixed')
									}
								>
									<MenuItem value="M">M</MenuItem>
									<MenuItem value="F">F</MenuItem>
									<MenuItem value="mixed">Mixed</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid size={{ xs: 1 }}>
							<TextField
								name={`teebox-par-${index}`}
								label="Par"
								type="number"
								value={teebox.par}
								onChange={(e) => handleTeeboxChange(index, 'par', Number(e.target.value))}
								fullWidth
							/>
						</Grid>
						<Grid size={{ xs: 1.5 }}>
							<TextField
								name={`teebox-cr-${index}`}
								label="CR"
								type="number"
								value={teebox.courseRating}
								onChange={(e) =>
									handleTeeboxChange(index, 'courseRating', Number(e.target.value))
								}
								fullWidth
							/>
						</Grid>
						<Grid size={{ xs: 1.5 }}>
							<TextField
								name={`teebox-sr-${index}`}
								label="SR"
								type="number"
								value={teebox.slopeRating}
								onChange={(e) =>
									handleTeeboxChange(index, 'slopeRating', Number(e.target.value))
								}
								fullWidth
							/>
						</Grid>
						<Grid size={{ xs: 1 }}>
							<TextField
								name={`teebox-length-${index}`}
								label="Meters"
								type="number"
								value={teebox.length}
								onChange={(e) => handleTeeboxChange(index, 'length', Number(e.target.value))}
								fullWidth
							/>
						</Grid>
						<Grid size={{ xs: 0.5 }} sx={{ display: 'flex', alignItems: 'center' }}>
							<IconButton
								onClick={() => removeTeebox(index)}
								size="small"
								color="error"
								disabled={teeboxes.length <= 1}
							>
								<RemoveCircleOutlineIcon />
							</IconButton>
						</Grid>
					</Grid>
				))}

				<Grid size={{ xs: 12 }}>
					<Button
						variant="text"
						startIcon={<AddCircleOutlineIcon />}
						onClick={addTeebox}
						sx={{ mt: 1 }}
					>
						Add Teebox
					</Button>
				</Grid>
			</Grid>
		</Dialog>
	);
};

export default CourseFormDialog;
