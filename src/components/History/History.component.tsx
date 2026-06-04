import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import HandicapHistory from '@/components/HandicapHistory/HandicapHistory.component';
import StablefordHistory from '@/components/StablefordHistory/StablefordHistory.component';

type HistoryTab = 'handicap' | 'stableford';

const History = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const rawTab = searchParams.get('tab');
	const tab: HistoryTab = rawTab === 'stableford' ? 'stableford' : 'handicap';

	const handleChange = (_: unknown, value: HistoryTab) => {
		navigate(value === 'stableford' ? '/history?tab=stableford' : '/history');
	};

	return (
		<Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
				<TimelineIcon sx={{ fontSize: 32 }} />
				<Typography variant="headline2">History</Typography>
			</Box>
			<Tabs value={tab} onChange={handleChange} sx={{ mb: 2 }}>
				<Tab value="handicap" label="Handicap" />
				<Tab value="stableford" label="Stableford" />
			</Tabs>
			{tab === 'stableford' ? <StablefordHistory /> : <HandicapHistory />}
		</Box>
	);
};

export default History;
