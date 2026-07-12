import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wikiPath = path.resolve(__dirname, '../docs/PGS/wiki/llm-wiki.md');

describe('LLM Wiki file', () => {
  test('should exist and be non-empty', () => {
    expect(fs.existsSync(wikiPath)).toBe(true);
    const content = fs.readFileSync(wikiPath, 'utf8');
    expect(content.length).toBeGreaterThan(0);
  });

  test('should start with the correct header without leading dashes', () => {
    const content = fs.readFileSync(wikiPath, 'utf8');
    const lines = content.split('\n');
    // The first non-empty line should be the header
    const firstLine = lines.find(line => line.trim() !== '');
    expect(firstLine).toBe('# LLM Wiki');
  });

  test('should contain the latest nightly entry (2025-02-10)', () => {
    const content = fs.readFileSync(wikiPath, 'utf8');
    expect(content).toContain('**Test: Nightly regression test generation and wiki update verified (2025-02-10)**');
    expect(content).toContain('Commits `2ba9544` (test generation) and `acc0bbf` (wiki update)');
    expect(content).toContain('- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.');
  });

  test('should not have multiple leading dashes at the start', () => {
    const content = fs.readFileSync(wikiPath, 'utf8');
    const lines = content.split('\n');
    // Check that the file does not start with a line of dashes
    const firstLine = lines[0].trim();
    expect(firstLine).not.toBe('---');
    // Also ensure that after removing empty lines, the first content is the header
    const nonEmptyLines = lines.filter(line => line.trim() !== '');
    expect(nonEmptyLines[0]).toBe('# LLM Wiki');
  });

  test('should have consistent formatting for each entry', () => {
    const content = fs.readFileSync(wikiPath, 'utf8');
    // Each entry should have a header with ** and - **Verification**: etc.
    const entries = content.match(/\*\*Test:.*?\*\*/g);
    expect(entries).not.toBeNull();
    expect(entries.length).toBeGreaterThanOrEqual(1);
    // Check that the most recent entry is the last one
    const lastEntry = entries[entries.length - 1];
    expect(lastEntry).toContain('2025-02-10');
  });
});
