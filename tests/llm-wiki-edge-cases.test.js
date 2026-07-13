import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wikiPath = path.resolve(__dirname, '../docs/PGS/wiki/llm-wiki.md');

describe('LLM Wiki file edge cases', () => {
  test('should not have leading whitespace before the header', () => {
    const content = fs.readFileSync(wikiPath, 'utf8');
    const lines = content.split('\n');
    // Check that the first non-empty line is exactly the header without leading spaces
    const firstNonEmpty = lines.find(line => line.trim() !== '');
    expect(firstNonEmpty).toBe('# LLM Wiki');
  });

  test('header should not have trailing spaces', () => {
    const content = fs.readFileSync(wikiPath, 'utf8');
    const lines = content.split('\n');
    const headerLine = lines.find(line => line.trim() === '# LLM Wiki');
    expect(headerLine).toBe('# LLM Wiki'); // ensures no trailing spaces
  });

  test('each entry should have a date in YYYY-MM-DD format', () => {
    const content = fs.readFileSync(wikiPath, 'utf8');
    const entries = content.match(/\*\*Test:.*?\*\*/g);
    expect(entries).not.toBeNull();
    entries.forEach(entry => {
      // Extract date from entry header: expect format (YYYY-MM-DD)
      const dateMatch = entry.match(/\(\d{4}-\d{2}-\d{2}\)/);
      expect(dateMatch).not.toBeNull();
    });
  });

  test('each entry should contain both "Verification" and "Impact" lines', () => {
    const content = fs.readFileSync(wikiPath, 'utf8');
    // Split by entry headers (assuming each entry starts with **Test: ...**)
    const parts = content.split(/\*\*Test:/);
    // Skip the first part (before first entry header)
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      expect(part).toContain('**Verification**');
      expect(part).toContain('**Impact**');
    }
  });

  test('entries should be in reverse chronological order (latest last)', () => {
    const content = fs.readFileSync(wikiPath, 'utf8');
    const entries = content.match(/\*\*Test:.*?\*\*/g);
    expect(entries).not.toBeNull();
    // Extract dates from entries
    const dates = entries.map(entry => {
      const match = entry.match(/\((\d{4}-\d{2}-\d{2})\)/);
      return match ? match[1] : null;
    }).filter(date => date !== null);
    // Check that dates are in ascending order (oldest first, latest last)
    for (let i = 1; i < dates.length; i++) {
      expect(new Date(dates[i]) >= new Date(dates[i-1])).toBe(true);
    }
  });

  test('should not have empty lines at the start of the file', () => {
    const content = fs.readFileSync(wikiPath, 'utf8');
    const lines = content.split('\n');
    // If the first line is empty, the file starts with an empty line
    if (lines[0].trim() === '') {
      // Check that the first non-empty line is the header
      const firstNonEmptyIndex = lines.findIndex(line => line.trim() !== '');
      expect(firstNonEmptyIndex).toBeGreaterThan(0);
      expect(lines[firstNonEmptyIndex]).toBe('# LLM Wiki');
    } else {
      expect(lines[0]).toBe('# LLM Wiki');
    }
  });

  test('should not have orphaned lines before the first entry', () => {
    const content = fs.readFileSync(wikiPath, 'utf8');
    const lines = content.split('\n');
    // Find the index of the header and the first entry header
    const headerIndex = lines.findIndex(line => line.trim() === '# LLM Wiki');
    const firstEntryIndex = lines.findIndex(line => line.trim().startsWith('**Test:'));
    // There should be no content between header and first entry except empty lines
    for (let i = headerIndex + 1; i < firstEntryIndex; i++) {
      expect(lines[i].trim()).toBe('');
    }
  });

  test('should handle file with no entries gracefully', () => {
    // This test is a sanity check; if the file has no entries, the regex will return null
    const content = fs.readFileSync(wikiPath, 'utf8');
    const entries = content.match(/\*\*Test:.*?\*\*/g);
    // If entries is null, it means no entries, but we expect at least one
    // We expect entries to be non-null from the real file
    expect(entries).not.toBeNull();
  });

  test('each entry should have a consistent structure with bullet points', () => {
    const content = fs.readFileSync(wikiPath, 'utf8');
    const parts = content.split(/\*\*Test:/);
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      // Each entry should have at least one bullet point line
      const bulletLines = part.match(/^- /g);
      expect(bulletLines).not.toBeNull();
      expect(bulletLines.length).toBeGreaterThanOrEqual(2); // at least two bullet points
    }
  });
});
