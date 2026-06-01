import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface ImportFormProps {
  onParse: (text: string) => void;
  isLoading: boolean;
  error: string | null;
}

export default function ImportForm({ onParse, isLoading, error }: ImportFormProps) {
  const [text, setText] = useState('');

  return (
    <Box>
      <Typography variant="title3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FileUploadIcon />
        Import Rounds
      </Typography>
      <Typography variant="body" color="text.secondary" sx={{ mb: 2 }}>
        Paste competition results from your Federgolf spreadsheet below.
        One row per round. The parser accepts tab-separated, comma-separated,
        or semicolon-separated data.
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        multiline
        fullWidth
        minRows={8}
        maxRows={20}
        placeholder={`Paste your Federgolf rows here...

Example:
09/05/2026\tMuratory Wine\tBARLASSINA\t1\tSPM\t18\tS\t30,00\t72,00\t71,00\t132,00\t33,00\t105,00\t0,00\t29,1`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ fontFamily: 'monospace', mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={() => onParse(text)}
        disabled={isLoading || !text.trim()}
      >
        {isLoading ? 'Parsing...' : 'Parse & Preview'}
      </Button>
    </Box>
  );
}
