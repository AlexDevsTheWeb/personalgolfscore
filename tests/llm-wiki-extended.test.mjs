import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it, expect, beforeAll } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const wikiPath = resolve(__dirname, '../docs/PGS/wiki/llm-wiki.md');

let wikiContent;
let wikiLines;

beforeAll(() => {
  if (!existsSync(wikiPath)) {
    throw new Error(`Wiki file not found at ${wikiPath}`);
  }
  wikiContent = readFileSync(wikiPath, 'utf-8');
  wikiLines = wikiContent.split('\n');
});

describe('LLM Wiki Extended Edge Cases', () => {
  describe('WIKI-EXT-001: File Existence and Basic Properties', () => {
    it('should exist and be non-empty', () => {
      expect(existsSync(wikiPath)).toBe(true);
      expect(wikiContent.length).toBeGreaterThan(0);
    });

    it('should have a reasonable file size (between 1KB and 100KB)', () => {
      const size = Buffer.byteLength(wikiContent, 'utf-8');
      expect(size).toBeGreaterThan(1000);
      expect(size).toBeLessThan(100000);
    });
  });

  describe('WIKI-EXT-002: Starting Dashes', () => {
    it('should have exactly four dashes on the first four lines', () => {
      for (let i = 0; i < 4; i++) {
        expect(wikiLines[i]).toBe('---');
      }
    });

    it('should not have extra dashes beyond the first four lines', () => {
      // Check that line 5 (index 4) is not also '---'
      if (wikiLines.length > 4) {
        expect(wikiLines[4]).not.toBe('---');
      }
    });
  });

  describe('WIKI-EXT-003: Required Sections', () => {
    const requiredSections = [
      '# LLM Wiki',
      '## Architecture',
      '## Key Decisions',
      '## Conventions',
      '## Patterns',
      '## Milestones'
    ];

    requiredSections.forEach(section => {
      it(`should contain section "${section}"`, () => {
        expect(wikiContent).toContain(section);
      });
    });
  });

  describe('WIKI-EXT-004: Nightly Entry Format Consistency', () => {
    it('should have all nightly entries with correct bold title pattern', () => {
      const entryPattern = /^\*\*Test:.*?\*\*$/;
      const entries = wikiLines.filter(line => entryPattern.test(line));
      expect(entries.length).toBeGreaterThan(0);
      entries.forEach(entry => {
        expect(entry).toMatch(/^\*\*Test: (Nightly wiki update|Nightly regression test generation|Nightly regression test generation and wiki update) verified \(\d{4}-\d{2}-\d{2}\)\*\*$/);
      });
    });

    it('should have each entry followed by verification and impact lines', () => {
      const entryPattern = /^\*\*Test:.*?\*\*$/;
      for (let i = 0; i < wikiLines.length; i++) {
        if (entryPattern.test(wikiLines[i])) {
          // Check next two lines exist
          expect(i + 2).toBeLessThan(wikiLines.length);
          expect(wikiLines[i + 1]).toMatch(/^- \*\*Verification\*\*:/);
          expect(wikiLines[i + 2]).toMatch(/^- \*\*Impact\*\*:/);
        }
      }
    });

    it('should not have extra blank lines between entry components', () => {
      const entryPattern = /^\*\*Test:.*?\*\*$/;
      for (let i = 0; i < wikiLines.length; i++) {
        if (entryPattern.test(wikiLines[i])) {
          // Line after entry should be verification (no blank line)
          expect(wikiLines[i + 1].trim()).not.toBe('');
          // Line after verification should be impact (no blank line)
          expect(wikiLines[i + 2].trim()).not.toBe('');
        }
      }
    });
  });

  describe('WIKI-EXT-005: Date Uniqueness and Order', () => {
    it('should not have duplicate dates', () => {
      const dateRegex = /\((\d{4}-\d{2}-\d{2})\)/g;
      const dates = [];
      let match;
      while ((match = dateRegex.exec(wikiContent)) !== null) {
        dates.push(match[1]);
      }
      const seen = new Set();
      dates.forEach(date => {
        expect(seen.has(date)).toBe(false);
        seen.add(date);
      });
    });

    it('should have dates in chronological order (oldest first)', () => {
      const dateRegex = /\((\d{4}-\d{2}-\d{2})\)/g;
      const dates = [];
      let match;
      while ((match = dateRegex.exec(wikiContent)) !== null) {
        dates.push(match[1]);
      }
      for (let i = 1; i < dates.length; i++) {
        expect(new Date(dates[i]) >= new Date(dates[i - 1])).toBe(true);
      }
    });

    it('should not have future dates', () => {
      const dateRegex = /\((\d{4}-\d{2}-\d{2})\)/g;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let match;
      while ((match = dateRegex.exec(wikiContent)) !== null) {
        const entryDate = new Date(match[1]);
        expect(entryDate <= today).toBe(true);
      }
    });
  });

  describe('WIKI-EXT-006: Trailing Whitespace and Line Endings', () => {
    it('should have no trailing whitespace on any line', () => {
      wikiLines.forEach((line, index) => {
        // Skip empty lines (they are fine)
        if (line.trim() !== '') {
          expect(line).not.toMatch(/\s+$/);
        }
      });
    });

    it('should end with a newline (last line empty)', () => {
      // The last line should be an empty string if file ends with newline
      expect(wikiLines[wikiLines.length - 1]).toBe('');
    });
  });

  describe('WIKI-EXT-007: Milestones Section', () => {
    it('should have checkboxes for milestones', () => {
      const milestonesSection = wikiContent.match(/## Milestones[\s\S]*?(?=##|$)/);
      if (milestonesSection) {
        const checkboxes = milestonesSection[0].match(/- \[x\]|- \[ \]/g);
        expect(checkboxes).not.toBeNull();
        expect(checkboxes.length).toBeGreaterThan(0);
      }
    });
  });

  describe('WIKI-EXT-008: Most Recent Entry', () => {
    it('should have a valid most recent entry matching expected pattern', () => {
      const entryPattern = /^\*\*Test:.*?\*\*$/;
      const entries = wikiLines.filter(line => entryPattern.test(line));
      const lastEntry = entries[entries.length - 1];
      expect(lastEntry).toMatch(/^\*\*Test: (Nightly wiki update|Nightly regression test generation|Nightly regression test generation and wiki update) verified \(\d{4}-\d{2}-\d{2}\)\*\*$/);
    });
  });
});
