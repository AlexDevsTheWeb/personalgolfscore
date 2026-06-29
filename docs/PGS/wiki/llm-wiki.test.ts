import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('LLM Wiki - Nightly regression test generation and wiki update verified (2025-02-01)', () => {
  const wikiPath = resolve(__dirname, 'llm-wiki.md');
  let wikiContent: string;

  beforeAll(() => {
    wikiContent = readFileSync(wikiPath, 'utf-8');
  });

  it('should contain the entry for 2025-02-01', () => {
    expect(wikiContent).toContain('**Test: Nightly regression test generation and wiki update verified (2025-02-01)**');
  });

  it('should contain the verification commits for 2025-02-01', () => {
    expect(wikiContent).toContain('Commits `55de33e` (test generation) and `93304f1` (wiki update)');
  });

  it('should contain the impact statement for 2025-02-01', () => {
    expect(wikiContent).toContain('Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.');
  });

  it('should not contain a trailing newline after the last entry', () => {
    const lines = wikiContent.split('\n');
    const lastLine = lines[lines.length - 1];
    expect(lastLine).not.toBe('');
  });

  it('should have the 2025-02-01 entry after the 2025-01-31 entry', () => {
    const idxJan31 = wikiContent.indexOf('**Test: Nightly regression test generation verified (2025-01-31)**');
    const idxFeb01 = wikiContent.indexOf('**Test: Nightly regression test generation and wiki update verified (2025-02-01)**');
    expect(idxJan31).toBeGreaterThan(-1);
    expect(idxFeb01).toBeGreaterThan(idxJan31);
  });

  it('should have consistent formatting for all entries', () => {
    const entries = wikiContent.match(/\*\*Test:.*\*\*/g);
    expect(entries).not.toBeNull();
    if (entries) {
      entries.forEach(entry => {
        expect(entry).toMatch(/^\*\*Test: Nightly regression test generation( and wiki update)? verified \(\d{4}-\d{2}-\d{2}\)\*\*$/);
      });
    }
  });

  it('should not have duplicate entries for the same date', () => {
    const dateMatches = wikiContent.match(/\(\d{4}-\d{2}-\d{2}\)/g);
    if (dateMatches) {
      const dateCounts = dateMatches.reduce((acc: Record<string, number>, date: string) => {
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
      for (const [date, count] of Object.entries(dateCounts)) {
        expect(count).toBe(1);
      }
    }
  });

  it('should have the correct file ending (no extra blank lines)', () => {
    const trimmed = wikiContent.trimEnd();
    expect(wikiContent).toBe(trimmed);
  });
});
