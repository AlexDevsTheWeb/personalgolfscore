import { Box, Typography, Alert, Chip, Button, Divider, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { IImportResult } from '@/types/round.types';

interface ImportResultProps {
  results: IImportResult;
  onReset: () => void;
}

const formatHI = (val: number | null) =>
  val !== null ? val.toFixed(1) : '—';

export default function ImportResult({ results, onReset }: ImportResultProps) {
  const hiMatch = results.expectedHI !== null &&
    results.calculatedHI !== null &&
    Math.abs(results.expectedHI - results.calculatedHI) < 0.1;

  const hiMismatch = results.expectedHI !== null &&
    results.calculatedHI !== null &&
    !hiMatch;

  return (
    <Box>
      <Typography variant="title3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CheckCircleIcon color="success" />
        Import Complete
      </Typography>

      <Alert severity="success" sx={{ mb: 2 }}>
        {results.importedCount} round{results.importedCount !== 1 ? 's' : ''} imported successfully.
      </Alert>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        <Chip label={`${results.matchedCount} matched`} color="success" variant="outlined" />
        <Chip label={`${results.unmatchedCount} unmatched`}
          color={results.unmatchedCount > 0 ? 'warning' : 'default'}
          variant="outlined"
        />
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Handicap Index verification */}
      <Typography variant="title6" gutterBottom>
        Handicap Index Verification
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
        <Paper variant="outlined" sx={{ p: 2, flex: 1 }}>
          <Typography variant="caption" color="text.secondary">Expected (Federgolf)</Typography>
          <Typography variant="title4">{formatHI(results.expectedHI)}</Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, flex: 1 }}>
          <Typography variant="caption" color="text.secondary">Calculated (App Engine)</Typography>
          <Typography variant="title4">{formatHI(results.calculatedHI)}</Typography>
        </Paper>
      </Box>

      {hiMatch && (
        <Alert icon={<CheckCircleIcon />} severity="success" sx={{ mb: 2 }}>
          Handicap Index matches — the calculation engine produces the same result as Federgolf.
        </Alert>
      )}

      {hiMismatch && (
        <Alert icon={<WarningIcon />} severity="warning" sx={{ mb: 2 }}>
          Handicap Index mismatch: Federgolf reports {formatHI(results.expectedHI)},
          the app calculates {formatHI(results.calculatedHI)}.
          {results.calculatedHI !== null && results.expectedHI !== null
            ? ` Difference: ${(results.calculatedHI - results.expectedHI).toFixed(1)}`
            : ''
          }
        </Alert>
      )}

      {results.expectedHI === null && results.calculatedHI !== null && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Imported rounds: HI = {formatHI(results.calculatedHI)}.
          No previous HI from Federgolf for comparison.
        </Alert>
      )}

      {results.warnings.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="title6" color="warning.main">Warnings</Typography>
          {results.warnings.map((w, i) => (
            <Typography key={i} variant="body" color="text.secondary">• {w}</Typography>
          ))}
        </Box>
      )}

      <Button variant="outlined" onClick={onReset}>
        Import More Rounds
      </Button>
    </Box>
  );
}
