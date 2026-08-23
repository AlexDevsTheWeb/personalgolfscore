import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const wikiPath = resolve(__dirname, '../docs/PGS/wiki/llm-wiki.md');

describe('LLM Wiki', () => {
  describe('WIKI-001: Wiki Structure and Content', () => {
    it('should start with four dashes', () => {
      const content = readFileSync(wikiPath, 'utf-8');
      const lines = content.split('\n');
      expect(lines[0]).toBe('---');
      expect(lines[1]).toBe('---');
      expect(lines[2]).toBe('---');
      expect(lines[3]).toBe('---');
    });

    it('should contain expected sections', () => {
      const content = readFileSync(wikiPath, 'utf-8');
      expect(content).toContain('# LLM Wiki');
      expect(content).toContain('## Architecture');
      expect(content).toContain('## Key Decisions');
      expect(content).toContain('## Conventions');
      expect(content).toContain('## Patterns');
      expect(content).toContain('## Milestones');
    });
  });

  describe('WIKI-002: Nightly Wiki Update Entry', () => {
    it('should have correct entry for 2025-02-14', () => {
      const content = readFileSync(wikiPath, 'utf-8');
      expect(content).toContain('**Test: Nightly wiki update verified (2025-02-14)**');
      expect(content).toContain('- **Verification**: Commit `b05b618` confirms another successful automatic nightly wiki update.');
      expect(content).toContain('- **Impact**: Continues to demonstrate robustness of the automated system; the project remains on track to achieve fully stable test automation.');
    });
  });

  describe('WIKI-003: No Trailing Whitespace or Incomplete Lines', () => {
    it('should end with a complete line without trailing whitespace', () => {
      const content = readFileSync(wikiPath, 'utf-8');
      const lines = content.split('\n');
      const lastLine = lines[lines.length - 1];
      if (lines[lines.length - 2] && lines[lines.length - 2].trim() !== '') {
        expect(lastLine).toBe('');
        expect(lines[lines.length - 2]).not.toMatch(/\s+$/);
      } else {
        expect(lastLine).not.toMatch(/\s+$/);
      }
    });
  });

  describe('WIKI-004: Consistency of Entries', () => {
    it('should have consistent formatting for all nightly update entries', () => {
      const content = readFileSync(wikiPath, 'utf-8');
      const lines = content.split('\n');
      const entryPattern = /^\*\*Test:.*?\*\*$/;
      const verificationPattern = /^- \*\*Verification\*\*:/;
      const impactPattern = /^- \*\*Impact\*\*:/;
      for (let i = 0; i < lines.length; i++) {
        if (entryPattern.test(lines[i])) {
          if (i + 2 < lines.length) {
            expect(lines[i+1]).toMatch(verificationPattern);
            expect(lines[i+2]).toMatch(impactPattern);
          } else {
            expect.fail(`Entry at line ${i+1} missing verification or impact lines`);
          }
        }
      }
    });
  });

  describe('WIKI-005: No Duplicate Entries', () => {
    it('should not have duplicate dates', () => {
      const content = readFileSync(wikiPath, 'utf-8');
      const dateRegex = /\((\d{4}-\d{2}-\d{2})\)/g;
      const dates = [];
      let match;
      while ((match = dateRegex.exec(content)) !== null) {
        dates.push(match[1]);
      }
      const seen = new Set();
      dates.forEach(date => {
        if (seen.has(date)) {
          expect.fail(`Duplicate date found: ${date}`);
        }
        seen.add(date);
      });
    });
  });
});
