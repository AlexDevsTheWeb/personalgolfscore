import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const wikiPath = path.resolve(__dirname, '../docs/PGS/wiki/llm-wiki.md');

function readWiki(): string {
  return fs.readFileSync(wikiPath, 'utf-8');
}

describe('LLM Wiki file integrity', () => {
  it('should exist', () => {
    expect(fs.existsSync(wikiPath)).toBe(true);
  });

  it('should start with YAML front matter (---)', () => {
    const content = readWiki();
    expect(content.startsWith('---')).toBe(true);
  });

  it('should contain the project title', () => {
    const content = readWiki();
    expect(content).toContain('# LLM Wiki');
  });

  it('should contain the nightly regression test generation and wiki update verified entry', () => {
    const content = readWiki();
    expect(content).toContain('**Test: Nightly regression test generation and wiki update verified (2025-01-30)**');
  });

  it('should contain the commits e8837e2 and 555e8d9', () => {
    const content = readWiki();
    expect(content).toContain('e8837e2');
    expect(content).toContain('555e8d9');
  });

  it('should end with the new entry (no trailing whitespace issues)', () => {
    const content = readWiki();
    const lines = content.split('\n');
    const lastLine = lines[lines.length - 1];
    // The last line should be the impact line of the new entry
    expect(lastLine).toBe('- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.');
  });

  it('should not have duplicate entries for the same date', () => {
    const content = readWiki();
    const matches = content.match(/\(2025-01-30\)/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(1);
  });

  it('should have consistent formatting for all test entries', () => {
    const content = readWiki();
    const testEntries = content.match(/\*\*Test:.*\*\*/g);
    expect(testEntries).not.toBeNull();
    testEntries!.forEach(entry => {
      expect(entry).toMatch(/^\*\*Test:.*\*\*$/);
    });
  });

  it('should have the correct number of milestones (only one unchecked)', () => {
    const content = readWiki();
    const checked = (content.match(/- \[x\]/g) || []).length;
    const unchecked = (content.match(/- \[ \]/g) || []).length;
    expect(checked).toBe(5);
    expect(unchecked).toBe(1);
  });
});