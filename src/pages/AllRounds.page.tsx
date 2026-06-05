import { Stack, Typography, TextField, Box, Pagination } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import Rounds from '@/components/Rounds/Rounds.component';
import { useAppStore } from '@/store/zustand';

const PAGE_SIZE = 20;

const AllRounds = () => {
  const roundsList = useAppStore((state) => state.roundsList);

  const [dateFilter, setDateFilter] = useState<Dayjs | null>(null);
  const [courseFilter, setCourseFilter] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const filteredRounds = useMemo(() => {
    const trimmedCourse = courseFilter.trim().toLowerCase();
    return roundsList.filter((round) => {
      if (dateFilter && !dayjs(round.roundDate).isSame(dateFilter, 'day')) {
        return false;
      }
      if (
        trimmedCourse &&
        !String(round.roundCourse ?? '').toLowerCase().includes(trimmedCourse)
      ) {
        return false;
      }
      return true;
    });
  }, [roundsList, dateFilter, courseFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredRounds.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [roundsList.length, dateFilter, courseFilter]);

  const pagedRounds = useMemo(
    () => filteredRounds.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredRounds, page]
  );

  const hasActiveFilter = dateFilter !== null || courseFilter.trim() !== '';

  return (
    <Stack gap={2} sx={{ width: '100%' }}>
      <Typography variant='headline2'>All rounds</Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
        <DatePicker
          label="Date"
          value={dateFilter}
          onChange={(v) => setDateFilter(v ?? null)}
          format="DD/MM/YYYY"
          slotProps={{ textField: { size: 'small', sx: { minWidth: 180 } } }}
        />
        <TextField
          label="Course"
          size="small"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          sx={{ flex: 1, minWidth: 180 }}
        />
      </Stack>

      {hasActiveFilter && filteredRounds.length === 0 ? (
        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No rounds match your search.
        </Typography>
      ) : (
        <Rounds rounds={pagedRounds} />
      )}

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Stack>
  );
};

export default AllRounds;
