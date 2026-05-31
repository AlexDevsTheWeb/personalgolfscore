import React, { useState, useEffect, useCallback } from 'react';
import {
	DataGrid,
	GridColDef,
	GridToolbar,
	GridRenderCellParams,
	GridRowModel,
	GridRowId,
} from '@mui/x-data-grid';
import { IconButton, Button, Tooltip, Box, Typography, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICourse } from '@/types/course.types';
import {
	getAllCourses,
	updateCourse,
	deleteCourse,
} from '@/utils/firestore/course.firestore';
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
		</Box>
	);
};

export default CoursesTable;
