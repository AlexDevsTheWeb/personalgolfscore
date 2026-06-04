import { useCallback } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Checkbox, Button, Alert, Paper, Chip, Tooltip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from 'dayjs';
import { IParsedRound } from './ImportRoundParser.utils';
import { ICourseMatchResult } from './CourseMatcher.utils';

interface PreviewTableProps {
  parsedRounds: IParsedRound[];
  courseMatches: ICourseMatchResult[];
  selectedIndices: number[];
  onSelectionChange: (indices: number[]) => void;
  onImport: (indices: number[]) => void;
  isImporting: boolean;
  importError: string | null;
}

export default function PreviewTable({
  parsedRounds,
  courseMatches,
  selectedIndices,
  onSelectionChange,
  onImport,
  isImporting,
  importError,
}: PreviewTableProps) {
  const validRounds = parsedRounds.map((r, i) => ({ round: r, index: i }))
    .filter(({ round }) => round.parsedSuccessfully && round.roundValid);

  const invalidRounds = parsedRounds.filter(
    (r) => !r.parsedSuccessfully || !r.roundValid
  ).length;

  const allSelected = validRounds.length > 0 && selectedIndices.length === validRounds.length;

  const handleSelectAll = useCallback(() => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(validRounds.map(({ index }) => index));
    }
  }, [allSelected, validRounds, onSelectionChange]);

  const handleSelect = useCallback((index: number) => {
    onSelectionChange(
      selectedIndices.includes(index)
        ? selectedIndices.filter((i) => i !== index)
        : [...selectedIndices, index]
    );
  }, [selectedIndices, onSelectionChange]);

  const formatDate = (iso: string) => {
    const d = dayjs(iso);
    return d.isValid() ? d.format('DD/MM/YYYY') : '—';
  };

  return (
    <Box>
      <Typography variant="title3" gutterBottom>
        Preview
        <Typography variant="body" color="text.secondary" component="span" sx={{ ml: 1 }}>
          ({parsedRounds.length} rounds, {validRounds.length} valid
          {invalidRounds > 0 ? `, ${invalidRounds} invalid` : ''})
        </Typography>
      </Typography>

      {importError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {importError}
        </Alert>
      )}

      {validRounds.length === 0 ? (
        <Alert severity="warning" sx={{ mb: 2 }}>
          No valid rounds found. Check that your data has the correct format.
        </Alert>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: 500, mb: 2 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={allSelected}
                      indeterminate={selectedIndices.length > 0 && !allSelected}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>#</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Campo</TableCell>
                  <TableCell>Match</TableCell>
                  <TableCell>Tee</TableCell>
                  <TableCell align="right">Par</TableCell>
                  <TableCell align="right">PHCP</TableCell>
                  <TableCell align="right">Stbl</TableCell>
                  <TableCell align="right">AGS</TableCell>
                  <TableCell align="right">SD</TableCell>
                  <TableCell>Valida</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parsedRounds.map((round, index) => {
                  const isSelectable = round.parsedSuccessfully && round.roundValid;
                  const match = courseMatches[index];

                  return (
                    <TableRow
                      key={index}
                      selected={selectedIndices.includes(index)}
                      sx={{
                        opacity: isSelectable ? 1 : 0.5,
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedIndices.includes(index)}
                          onChange={() => handleSelect(index)}
                          disabled={!isSelectable}
                        />
                      </TableCell>
                      <TableCell>{round.rowIndex}</TableCell>
                      <TableCell>{formatDate(round.roundDate)}</TableCell>
                      <TableCell>{round.roundCourse}</TableCell>
                      <TableCell>
                        {match ? (
                          <Tooltip title={
                            match.matched
                              ? `Matched: ${match.matchMethod}`
                              : 'Course not found in database'
                          }>
                            {match.matched
                              ? <CheckCircleIcon color="success" fontSize="small" />
                              : <CancelIcon color="error" fontSize="small" />
                            }
                          </Tooltip>
                        ) : (
                          <Chip label="—" size="small" variant="outlined" />
                        )}
                      </TableCell>
                      <TableCell>{match?.teeboxName || '—'}</TableCell>
                      <TableCell align="right">{round.roundPar}</TableCell>
                      <TableCell align="right">{round.roundPlayingHCP}</TableCell>
                      <TableCell align="right">{round.stablefordPoints}</TableCell>
                      <TableCell align="right">{round.roundStrokes}</TableCell>
                      <TableCell align="right">
                        {round.scoreDifferential !== null
                          ? round.scoreDifferential.toFixed(1)
                          : '—'
                        }
                      </TableCell>
                      <TableCell>
                        {round.parsedSuccessfully
                          ? round.roundValid
                            ? <CheckCircleIcon color="success" fontSize="small" />
                            : <CancelIcon color="warning" fontSize="small" />
                          : '?'
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            color="primary"
            onClick={() => onImport(selectedIndices)}
            disabled={selectedIndices.length === 0 || isImporting}
          >
            {isImporting
              ? 'Importing...'
              : `Import ${selectedIndices.length} Selected Round${selectedIndices.length !== 1 ? 's' : ''}`
            }
          </Button>
        </>
      )}
    </Box>
  );
}
