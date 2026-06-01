import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export interface IParsedRound {
  rowIndex: number;
  roundDate: string;
  roundCourse: string;
  roundFormat: string;
  roundHoles: number;
  roundPar: number;
  roundPlayingHCP: number;
  roundCR: number;
  roundSR: number;
  stablefordPoints: number;
  roundStrokes: number;
  scoreDifferential: number | null;
  roundValid: boolean;
  indexVecchio: number | null;
  indexNuovo: number | null;
  parsedSuccessfully: boolean;
}

function parseItalianDecimal(value: string): number {
  const cleaned = value.trim().replace(',', '.');
  const result = parseFloat(cleaned);
  return isNaN(result) ? 0 : result;
}

function detectDelimiter(firstLine: string): string {
  const tabCount = (firstLine.match(/\t/g) || []).length;
  const commaCount = (firstLine.match(/,/g) || []).length;
  const semicolonCount = (firstLine.match(/;/g) || []).length;

  if (tabCount >= commaCount && tabCount >= semicolonCount) return '\t';
  if (commaCount >= semicolonCount) return ',';
  return ';';
}

function isHeaderRow(cells: string[]): boolean {
  const first = cells[0]?.trim().toLowerCase() || '';
  return first === 'data' || first === '#';
}

export function parseImportText(text: string): IParsedRound[] {
  const lines = text.split('\n').filter((line) => line.trim().length > 0);
  if (lines.length === 0) return [];

  const delimiter = detectDelimiter(lines[0]);
  const results: IParsedRound[] = [];
  let rowIndex = 0;

  for (const line of lines) {
    const cells = line.split(delimiter);

    if (isHeaderRow(cells)) continue;

    rowIndex++;
    const parsed: IParsedRound = {
      rowIndex,
      roundDate: '',
      roundCourse: '',
      roundFormat: '',
      roundHoles: 18,
      roundPar: 0,
      roundPlayingHCP: 0,
      roundCR: 0,
      roundSR: 0,
      stablefordPoints: 0,
      roundStrokes: 0,
      scoreDifferential: null,
      roundValid: true,
      indexVecchio: null,
      indexNuovo: null,
      parsedSuccessfully: false,
    };

    try {
      if (cells.length < 16) {
        results.push(parsed);
        continue;
      }

      const rawDate = cells[1]?.trim() || '';
      const parsedDate = dayjs(rawDate, 'DD/MM/YYYY');
      parsed.roundDate = parsedDate.isValid() ? parsedDate.toISOString() : '';
      parsed.roundCourse = (cells[3]?.trim() || '').toUpperCase();
      parsed.roundFormat = cells[5]?.trim() || '';
      parsed.roundHoles = parseInt(cells[6]?.trim(), 10) || 18;
      parsed.roundValid = cells[7]?.trim().toUpperCase() === 'S';
      parsed.roundPlayingHCP = parseItalianDecimal(cells[8] || '0');
      parsed.roundPar = parseInt(cells[9]?.trim(), 10) || 72;
      parsed.roundCR = parseItalianDecimal(cells[10] || '0');
      parsed.roundSR = parseInt(cells[11]?.trim(), 10) || 0;

      const stblStr = cells[12]?.trim() || '';
      parsed.stablefordPoints = stblStr ? parseInt(stblStr, 10) : 0;

      const agsStr = cells[13]?.trim() || '';
      parsed.roundStrokes = agsStr ? parseInt(agsStr, 10) : 0;

      const sdStr = cells[15]?.trim() || '';
      parsed.scoreDifferential = sdStr ? parseItalianDecimal(sdStr) : null;

      const idxVecchioStr = cells[19]?.trim() || '';
      parsed.indexVecchio = idxVecchioStr ? parseItalianDecimal(idxVecchioStr) : null;

      const idxNuovoStr = cells[20]?.trim() || '';
      parsed.indexNuovo = idxNuovoStr ? parseItalianDecimal(idxNuovoStr) : null;

      parsed.parsedSuccessfully = true;
    } catch {
      // parsedSuccessfully remains false
    }

    results.push(parsed);
  }

  return results;
}

export function getColumnHeaders(text: string): string[] {
  const firstLine = text.split('\n').find((line) => line.trim().length > 0);
  if (!firstLine) return [];
  const delimiter = detectDelimiter(firstLine);
  return firstLine.split(delimiter).map((cell) => cell.trim());
}
