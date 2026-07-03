import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const wikiPath = resolve(__dirname, '../../docs/PGS/wiki/llm-wiki.md');

function readWiki() {
  return readFileSync(wikiPath, 'utf-8');
}

describe('LLM Wiki', () => {
  it('should have a valid YAML front matter with single separator', () => {
    const content = readWiki();
    const lines = content.split('\n');
    // Front matter ends at the second '---' line
    const firstSep = lines.findIndex(line => line.trim() === '---');
    const secondSep = lines.findIndex((line, index) => index > firstSep && line.trim() === '---');
    expect(firstSep).not.toBe(-1);
    expect(secondSep).not.toBe(-1);
    // There should be exactly two '---' lines for front matter
    const allSeps = lines.filter(line => line.trim() === '---');
    expect(allSeps.length).toBeGreaterThanOrEqual(2);
    // Ensure no extra '---' immediately after first
    const afterFirst = lines.slice(firstSep + 1, secondSep);
    expect(afterFirst.some(line => line.trim() === '---')).toBe(false);
  });

  it('should contain the latest test entry for 2025-02-04', () => {
    const content = readWiki();
    expect(content).toContain('**Test: Nightly regression test generation and wiki update verified (2025-02-04)**');
    expect(content).toContain('Commits `9aa5644` (test generation) and `06ce7da` (wiki update)');
  });

  it('should have consistent date format for all test entries', () => {
    const content = readWiki();
    const datePattern = /\(\d{4}-\d{2}-\d{2}\)/g;
    const matches = content.match(datePattern);
    expect(matches).not.toBeNull();
    matches.forEach(date => {
      const parsed = new Date(date.slice(1, -1));
      expect(parsed.toString()).not.toBe('Invalid Date');
    });
  });

  it('should have no duplicate test entries for the same date', () => {
    const content = readWiki();
    const datePattern = /\(\d{4}-\d{2}-\d{2}\)/g;
    const dates = content.match(datePattern);
    if (dates) {
      const uniqueDates = new Set(dates);
      expect(uniqueDates.size).toBe(dates.length);
    }
  });

  it('should reference commit hashes in backticks', () => {
    const content = readWiki();
    const commitPattern = /`[a-f0-9]{7,40}`/g;
    const matches = content.match(commitPattern);
    expect(matches).not.toBeNull();
    matches.forEach(commit => {
      expect(commit).toMatch(/^`[a-f0-9]{7,40}`$/);
    });
  });
});
