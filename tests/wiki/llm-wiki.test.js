import fs from 'fs';
import path from 'path';
import { describe, it, expect } from '@jest/globals';

const wikiPath = path.resolve('docs/PGS/wiki/llm-wiki.md');

describe('LLM Wiki', () => {
  it('should exist', () => {
    expect(fs.existsSync(wikiPath)).toBe(true);
  });

  it('should have correct YAML front matter (starting and ending with ---)', () => {
    const content = fs.readFileSync(wikiPath, 'utf-8');
    const lines = content.split('\n');
    expect(lines[0].trim()).toBe('---');
    const closingIndex = lines.slice(1).findIndex(line => line.trim() === '---');
    expect(closingIndex).toBeGreaterThan(-1);
  });

  it('should contain all required sections', () => {
    const content = fs.readFileSync(wikiPath, 'utf-8');
    expect(content).toContain('## Architecture');
    expect(content).toContain('## Key Decisions');
    expect(content).toContain('## Conventions');
    expect(content).toContain('## Patterns');
    expect(content).toContain('## Milestones');
  });

  it('should include the latest nightly verification entry for 2025-02-03', () => {
    const content = fs.readFileSync(wikiPath, 'utf-8');
    expect(content).toContain('**Test: Nightly regression test generation verified (2025-02-03)**');
    expect(content).toContain('Commit `0716053` confirms another successful automatic nightly regression test generation.');
  });

  it('should not have duplicate entries for the same date', () => {
    const content = fs.readFileSync(wikiPath, 'utf-8');
    const regex = /\(\d{4}-\d{2}-\d{2}\)/g;
    const dates = content.match(regex);
    if (dates) {
      const dateCounts = {};
      dates.forEach(date => {
        dateCounts[date] = (dateCounts[date] || 0) + 1;
      });
      for (const [date, count] of Object.entries(dateCounts)) {
        expect(count).toBe(1);
      }
    }
  });

  it('should end with a newline', () => {
    const content = fs.readFileSync(wikiPath, 'utf-8');
    expect(content.endsWith('\n')).toBe(true);
  });
});
