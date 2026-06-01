import { useCallback, useEffect, useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { useAppStore } from '@/store/zustand/app.store';
import ImportForm from './ImportForm.component';
import PreviewTable from './PreviewTable.component';
import ImportResult from './ImportResult.component';

export default function ImportRoundsComponent() {
  const parsedRounds = useAppStore((s) => s.parsedRounds);
  const courseMatches = useAppStore((s) => s.courseMatches);
  const importResults = useAppStore((s) => s.importResults);
  const isLoadingImport = useAppStore((s) => s.isLoadingImport);
  const importError = useAppStore((s) => s.importError);
  const parseImportText = useAppStore((s) => s.parseImportText);
  const importRounds = useAppStore((s) => s.importRounds);
  const resetImport = useAppStore((s) => s.resetImport);

  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    if (parsedRounds.length > 0) {
      const valid = parsedRounds
        .map((r, i) => r.parsedSuccessfully && r.roundValid ? i : -1)
        .filter((i) => i >= 0);
      setSelectedIndices(valid);
    }
  }, [parsedRounds]);

  const handleParseText = useCallback((text: string) => {
    parseImportText(text);
    setSelectedIndices([]);
  }, [parseImportText]);

  const handleImport = useCallback((indices: number[]) => {
    importRounds(indices);
  }, [importRounds]);

  const handleReset = useCallback(() => {
    resetImport();
  }, [resetImport]);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper sx={{ p: 3 }}>
        {importResults ? (
          <ImportResult
            results={importResults}
            onReset={handleReset}
          />
        ) : parsedRounds.length === 0 ? (
          <ImportForm
            onParse={handleParseText}
            isLoading={isLoadingImport}
            error={importError}
          />
        ) : (
          <PreviewTable
            parsedRounds={parsedRounds}
            courseMatches={courseMatches}
            selectedIndices={selectedIndices}
            onSelectionChange={setSelectedIndices}
            onImport={handleImport}
            isImporting={isLoadingImport}
            importError={importError}
          />
        )}
      </Paper>
    </Container>
  );
}
