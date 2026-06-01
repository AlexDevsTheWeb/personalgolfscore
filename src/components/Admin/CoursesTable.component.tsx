import React, { useState, useEffect, useCallback } from 'react';
import {
	DataGrid,
	GridColDef,
	GridToolbar,
	GridRenderCellParams,
	GridRowModel,
} from '@mui/x-data-grid';
import {
	IconButton,
	Button,
	Tooltip,
	Box,
	Typography,
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	LinearProgress,
	List,
	ListItem,
	ListItemText,
	Chip,
	Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { ICourse } from '@/types/course.types';
import {
	getAllCourses,
	updateCourse,
	deleteCourse,
} from '@/utils/firestore/course.firestore';
import { importFromFedergolf, fetchFedergolfPreview } from '@/utils/firestore/federgolf-import.utils';
import { useSnackbar } from './SnackbarProvider.component';
import CourseFormDialog from './CourseFormDialog.component';
import ConfirmDeleteDialog from './ConfirmDeleteDialog.component';

const CoursesTable: React.FC = () => {
	const { showSnackbar } = useSnackbar();
	const [courses, setCourses] = useState<ICourse[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Dialog state
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingCourse, setEditingCourse] = useState<ICourse | undefined>(undefined);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deletingCourse, setDeletingCourse] = useState<ICourse | undefined>(undefined);
	const [isDeleting, setIsDeleting] = useState(false);

	// Import state
	const [importDialogOpen, setImportDialogOpen] = useState(false);
	const [isImporting, setIsImporting] = useState(false);
	const [preview, setPreview] = useState<{
		clubCount: number;
		courseCount: number;
		sampleCourses: string[];
	} | null>(null);
	const [previewLoading, setPreviewLoading] = useState(false);
	const [previewError, setPreviewError] = useState<string | null>(null);

	const loadCourses = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await getAllCourses();
			setCourses(data);
		} catch (err: any) {
			setError('Failed to load courses.');
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadCourses();
	}, [loadCourses]);

	const handleEdit = (course: ICourse) => {
		setEditingCourse(course);
		setDialogOpen(true);
	};

	const handleDelete = (course: ICourse) => {
		setDeletingCourse(course);
		setDeleteDialogOpen(true);
	};

	const handleAdd = () => {
		setEditingCourse(undefined);
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
		setEditingCourse(undefined);
	};

	const handleDialogSaved = () => {
		loadCourses();
	};

	const confirmDelete = async () => {
		if (!deletingCourse) return;
		setIsDeleting(true);
		try {
			await deleteCourse(deletingCourse.id);
			showSnackbar('Course deleted', 'success');
			setDeleteDialogOpen(false);
			setDeletingCourse(undefined);
			loadCourses();
		} catch (err: any) {
			showSnackbar('Failed to delete course. Please try again.', 'error');
		} finally {
			setIsDeleting(false);
		}
	};

	const handleDeleteDialogClose = () => {
		setDeleteDialogOpen(false);
		setDeletingCourse(undefined);
	};

	const processRowUpdate = async (newRow: GridRowModel, _oldRow: GridRowModel) => {
		try {
			await updateCourse(newRow.id as string, newRow as Partial<ICourse>);
			setCourses((prev) =>
				prev.map((c) => (c.id === newRow.id ? ({ ...c, ...newRow } as ICourse) : c))
			);
			showSnackbar('Course saved successfully', 'success');
			return newRow;
		} catch (err: any) {
			showSnackbar('Failed to save. Please try again.', 'error');
			throw err;
		}
	};

	// Import handlers
	const handleOpenImportDialog = async () => {
		setImportDialogOpen(true);
		setPreviewLoading(true);
		setPreviewError(null);
		try {
			const data = await fetchFedergolfPreview();
			setPreview(data);
		} catch (err: any) {
			setPreviewError(err.message || 'Failed to fetch preview.');
		} finally {
			setPreviewLoading(false);
		}
	};

	const handleCloseImportDialog = () => {
		if (isImporting) return;
		setImportDialogOpen(false);
		setPreview(null);
		setPreviewError(null);
	};

	const handleConfirmImport = async () => {
		setIsImporting(true);
		try {
			const result = await importFromFedergolf();
			showSnackbar(
				`Imported ${result.total} courses (${result.created} new, ${result.updated} updated)`,
				'success'
			);
			setImportDialogOpen(false);
			setPreview(null);
			loadCourses();
		} catch (err: any) {
			showSnackbar(err.message || 'Import failed.', 'error');
		} finally {
			setIsImporting(false);
		}
	};

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name',
			width: 200,
			editable: true,
		},
		{
			field: 'city',
			headerName: 'City',
			width: 150,
			editable: true,
		},
		{
			field: 'country',
			headerName: 'Country',
			width: 120,
			editable: true,
		},
		{
			field: 'holes',
			headerName: 'Holes',
			width: 80,
			type: 'number',
			editable: true,
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 100,
			type: 'singleSelect',
			valueOptions: ['Active', 'Inactive'],
			editable: true,
		},
		{
			field: 'actions',
			headerName: 'Actions',
			width: 120,
			sortable: false,
			filterable: false,
			renderCell: (params: GridRenderCellParams<ICourse>) => (
				<Box>
					<Tooltip title="Edit course">
						<IconButton size="small" onClick={() => handleEdit(params.row)}>
							<EditIcon fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete course">
						<IconButton
							size="small"
							onClick={() => handleDelete(params.row)}
							color="error"
						>
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				</Box>
			),
		},
	];

	if (error) {
		return (
			<Box sx={{ mb: 2 }}>
				<Alert
					severity="error"
					action={
						<Button color="inherit" size="small" onClick={loadCourses}>
							Try again
						</Button>
					}
				>
					{error}
				</Alert>
			</Box>
		);
	}

	return (
		<Box>
			<Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
				<Button variant="contained" onClick={handleAdd}>
					Add Course
				</Button>
				<Button
					variant="outlined"
					startIcon={<CloudDownloadIcon />}
					onClick={handleOpenImportDialog}
				>
					Import from Federgolf
				</Button>
			</Box>
			<DataGrid
				rows={courses}
				columns={columns}
				getRowId={(row) => row.id}
				initialState={{
					pagination: { paginationModel: { pageSize: 25 } },
				}}
				pageSizeOptions={[10, 25, 50]}
				loading={isLoading}
				disableRowSelectionOnClick
				slots={{ toolbar: GridToolbar }}
				slotProps={{
					toolbar: {
						showQuickFilter: true,
					},
				}}
				processRowUpdate={processRowUpdate}
				onProcessRowUpdateError={(err) => console.error(err)}
				sx={{
					'& .MuiDataGrid-toolbarContainer': {
						gap: 1,
						p: 1,
					},
				}}
				localeText={{
					noRowsLabel: 'No courses yet. Add your first course.',
				}}
			/>

			<CourseFormDialog
				open={dialogOpen}
				onClose={handleDialogClose}
				course={editingCourse}
				onSaved={handleDialogSaved}
			/>

			<ConfirmDeleteDialog
				open={deleteDialogOpen}
				onClose={handleDeleteDialogClose}
				onConfirm={confirmDelete}
				title="Delete course?"
				message={
					deletingCourse
						? `Are you sure you want to delete "${deletingCourse.name}"? This action cannot be undone.`
						: ''
				}
				isDeleting={isDeleting}
			/>

			<ImportDialog
				open={importDialogOpen}
				onClose={handleCloseImportDialog}
				onImport={handleConfirmImport}
				isImporting={isImporting}
				preview={preview}
				previewLoading={previewLoading}
				previewError={previewError}
			/>
		</Box>
	);
};

interface ImportDialogProps {
	open: boolean;
	onClose: () => void;
	onImport: () => void;
	isImporting: boolean;
	preview: {
		clubCount: number;
		courseCount: number;
		sampleCourses: string[];
	} | null;
	previewLoading: boolean;
	previewError: string | null;
}

const ImportDialog: React.FC<ImportDialogProps> = ({
	open,
	onClose,
	onImport,
	isImporting,
	preview,
	previewLoading,
	previewError,
}) => (
	<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
		<DialogTitle>Import from Federgolf</DialogTitle>
		<DialogContent>
			{previewLoading && (
				<Box sx={{ py: 3 }}>
					<LinearProgress />
					<Typography variant="body" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
						Fetching course data from Federgolf...
					</Typography>
				</Box>
			)}
			{previewError && (
				<Alert severity="error" sx={{ mt: 1 }}>
					{previewError}
				</Alert>
			)}
			{preview && !previewLoading && (
				<>
					<DialogContentText>
						Found the following data from the Italian Golf Federation database:
					</DialogContentText>
					<Box sx={{ mt: 2, mb: 2 }}>
						<Grid container spacing={2}>
							<Grid size={{ xs: 6 }}>
								<Chip
									label={`${preview.clubCount} clubs`}
									color="primary"
									variant="outlined"
								/>
							</Grid>
							<Grid size={{ xs: 6 }}>
								<Chip
									label={`${preview.courseCount} courses`}
									color="primary"
									variant="outlined"
								/>
							</Grid>
						</Grid>
					</Box>
					<Typography variant="title2" sx={{ mt: 2 }}>
						Sample courses:
					</Typography>
					<List dense>
						{preview.sampleCourses.map((name, i) => (
							<ListItem key={i} disablePadding>
								<ListItemText primary={name} />
							</ListItem>
						))}
						{preview.courseCount > 5 && (
							<ListItem disablePadding>
								<ListItemText
									primary={`...and ${preview.courseCount - 5} more`}
									primaryTypographyProps={{ color: 'text.secondary' }}
								/>
							</ListItem>
						)}
					</List>
					{isImporting && (
						<Box sx={{ mt: 2 }}>
							<LinearProgress />
							<Typography
								variant="body"
								color="text.secondary"
								sx={{ mt: 1, textAlign: 'center' }}
							>
								Importing courses to Firestore...
							</Typography>
						</Box>
					)}
				</>
			)}
		</DialogContent>
		<DialogActions>
			<Button onClick={onClose} disabled={isImporting}>
				Cancel
			</Button>
			<Button
				variant="contained"
				onClick={onImport}
				disabled={!preview || previewLoading || isImporting}
			>
				{isImporting ? 'Importing...' : `Import ${preview?.courseCount ?? 0} Courses`}
			</Button>
		</DialogActions>
	</Dialog>
);

export default CoursesTable;
