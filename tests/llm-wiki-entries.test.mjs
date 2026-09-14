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

describe('LLM Wiki Entry Edge Cases', () => {
  describe('WIKI-ENT-001: Bug Fix Entry Format', () => {
    it('should have all Bug Fix entries with correct bold title pattern', () => {
      const entryPattern = /^\*\*Bug Fix:.*?\*\*$/;
      const entries = wikiLines.filter(line => entryPattern.test(line));
      expect(entries.length).toBeGreaterThan(0);
      entries.forEach(entry => {
        expect(entry).toMatch(/^\*\*Bug Fix: [A-Za-z ]+ \(\d{4}-\d{2}-\d{2}\)\*\*$/);
      });
    });

    it('should have each Bug Fix entry followed by Issue and Resolution lines', () => {
      const entryPattern = /^\*\*Bug Fix:.*?\*\*$/;
      for (let i = 0; i < wikiLines.length; i++) {
        if (entryPattern.test(wikiLines[i])) {
          expect(i + 2).toBeLessThan(wikiLines.length);
          expect(wikiLines[i + 1]).toMatch(/^- \*\*Issue\*\*:/);
          expect(wikiLines[i + 2]).toMatch(/^- \*\*Resolution\*\*:/);
        }
      }
    });

    it('should not have extra blank lines between Bug Fix entry components', () => {
      const entryPattern = /^\*\*Bug Fix:.*?\*\*$/;
      for (let i = 0; i < wikiLines.length; i++) {
        if (entryPattern.test(wikiLines[i])) {
          expect(wikiLines[i + 1].trim()).not.toBe('');
          expect(wikiLines[i + 2].trim()).not.toBe('');
        }
      }
    });
  });

  describe('WIKI-ENT-002: Feature Entry Format', () => {
    it('should have all Feature entries with correct bold title pattern', () => {
      const entryPattern = /^\*\*Feature:.*?\*\*$/;
      const entries = wikiLines.filter(line => entryPattern.test(line));
      expect(entries.length).toBeGreaterThan(0);
      entries.forEach(entry => {
        expect(entry).toMatch(/^\*\*Feature: [A-Za-z ]+ \(\d{4}-\d{2}-\d{2}\)\*\*$/);
      });
    });

    it('should have each Feature entry followed by Change and Impact lines', () => {
      const entryPattern = /^\*\*Feature:.*?\*\*$/;
      for (let i = 0; i < wikiLines.length; i++) {
        if (entryPattern.test(wikiLines[i])) {
          expect(i + 2).toBeLessThan(wikiLines.length);
          expect(wikiLines[i + 1]).toMatch(/^- \*\*Change\*\*:/);
          expect(wikiLines[i + 2]).toMatch(/^- \*\*Impact\*\*:/);
        }
      }
    });

    it('should not have extra blank lines between Feature entry components', () => {
      const entryPattern = /^\*\*Feature:.*?\*\*$/;
      for (let i = 0; i < wikiLines.length; i++) {
        if (entryPattern.test(wikiLines[i])) {
          expect(wikiLines[i + 1].trim()).not.toBe('');
          expect(wikiLines[i + 2].trim()).not.toBe('');
        }
      }
    });
  });

  describe('WIKI-ENT-003: Date Uniqueness Across All Entry Types', () => {
    it('should not have duplicate dates across Bug Fix, Feature, and Test entries', () => {
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

    it('should have dates in chronological order across all entries', () => {
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

    it('should not have future dates in any entry', () => {
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

  describe('WIKI-ENT-004: Entry Ordering', () => {
    it('should have Bug Fix entries before Feature entries, and Feature entries before Test entries', () => {
      const bugFixIndices = [];
      const featureIndices = [];
      const testIndices = [];
      wikiLines.forEach((line, index) => {
        if (/^\*\*Bug Fix:/.test(line)) bugFixIndices.push(index);
        if (/^\*\*Feature:/.test(line)) featureIndices.push(index);
        if (/^\*\*Test:/.test(line)) testIndices.push(index);
      });
      if (bugFixIndices.length > 0 && featureIndices.length > 0) {
        expect(Math.max(...bugFixIndices)).toBeLessThan(Math.min(...featureIndices));
      }
      if (featureIndices.length > 0 && testIndices.length > 0) {
        expect(Math.max(...featureIndices)).toBeLessThan(Math.min(...testIndices));
      }
    });
  });

  describe('WIKI-ENT-005: Milestones Section Checkboxes', () => {
    it('should have at least one unchecked milestone', () => {
      const milestonesSection = wikiContent.match(/## Milestones[\s\S]*?(?=##|$)/);
      if (milestonesSection) {
        const unchecked = milestonesSection[0].match(/- \[ \]/g);
        expect(unchecked).not.toBeNull();
        expect(unchecked.length).toBeGreaterThan(0);
      }
    });
  });
});
