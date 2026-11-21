import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { parseWikiEntries } from '../wiki-parser';
import fs from 'node:fs';
import path from 'node:path';

const TEMP_DIR = path.resolve('src/__tests__/temp');
const TEMP_FILE = path.join(TEMP_DIR, 'test-wiki.md');
const ACTUAL_WIKI = path.resolve('llm-wiki.md');

beforeAll(() => {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }
});

afterAll(() => {
  // Clean up temporary files
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
});

describe('wiki-parser integration tests (real file I/O)', () => {
  it('should parse a minimal valid file with one entry', () => {
    const content = '**Test: Single entry (2025-01-01)**\n- **Verification**: Commit `abc`.\n- **Impact**: Impact.';
    fs.writeFileSync(TEMP_FILE, content, 'utf-8');
    const entries = parseWikiEntries(TEMP_FILE);
    expect(entries).toHaveLength(1);
    expect(entries[0].type).toBe('Test');
    expect(entries[0].title).toBe('Single entry');
    expect(entries[0].date).toBe('2025-01-01');
    expect(entries[0].verification).toBe('Commit `abc`.');
    expect(entries[0].impact).toBe('Impact.');
  });

  it('should parse multiple entries in order', () => {
    const content = [
      '**Test: First (2025-01-01)**',
      '- **Verification**: V1.',
      '- **Impact**: I1.',
      '',
      '**Test: Second (2025-01-02)**',
      '- **Verification**: V2.',
      '- **Impact**: I2.',
    ].join('\n');
    fs.writeFileSync(TEMP_FILE, content, 'utf-8');
    const entries = parseWikiEntries(TEMP_FILE);
    expect(entries).toHaveLength(2);
    expect(entries[0].title).toBe('First');
    expect(entries[1].title).toBe('Second');
  });

  it('should handle an empty file', () => {
    fs.writeFileSync(TEMP_FILE, '', 'utf-8');
    const entries = parseWikiEntries(TEMP_FILE);
    expect(entries).toEqual([]);
  });

  it('should handle a file with only blank lines', () => {
    fs.writeFileSync(TEMP_FILE, '\n\n  \n\n', 'utf-8');
    const entries = parseWikiEntries(TEMP_FILE);
    expect(entries).toEqual([]);
  });

  it('should handle a file with only headers but no bullet points', () => {
    const content = '**Test: No bullets (2025-01-01)**\n**Bug Fix: Another (2025-01-02)**';
    fs.writeFileSync(TEMP_FILE, content, 'utf-8');
    const entries = parseWikiEntries(TEMP_FILE);
    expect(entries).toHaveLength(2);
    entries.forEach(entry => {
      expect(entry.verification).toBeUndefined();
      expect(entry.impact).toBeUndefined();
    });
  });

  it('should parse a file with Windows line endings (CRLF)', () => {
    const content = '**Test: CRLF (2025-01-01)**\r\n- **Verification**: V.\r\n- **Impact**: I.';
    fs.writeFileSync(TEMP_FILE, content, 'utf-8');
    const entries = parseWikiEntries(TEMP_FILE);
    expect(entries).toHaveLength(1);
    expect(entries[0].verification).toBe('V.');
  });

  it('should handle a very large file (200+ entries) without errors', () => {
    const lines = [];
    for (let i = 0; i < 200; i++) {
      lines.push(`**Test: Entry ${i} (2025-01-${String(i % 31 + 1).padStart(2, '0')})**`);
      lines.push('- **Verification**: Verified.');
      lines.push('- **Impact**: Impact.');
      if (i < 199) lines.push('');
    }
    const content = lines.join('\n');
    fs.writeFileSync(TEMP_FILE, content, 'utf-8');
    const entries = parseWikiEntries(TEMP_FILE);
    expect(entries).toHaveLength(200);
    expect(entries[0].title).toBe('Entry 0');
    expect(entries[199].title).toBe('Entry 199');
  });

  it('should throw an error if file does not exist', () => {
    const nonExistent = path.join(TEMP_DIR, 'nonexistent.md');
    expect(() => parseWikiEntries(nonExistent)).toThrow();
  });

  it('should parse a file with Unicode characters', () => {
    const content = '**Test: Unicode (2025-01-01)**\n- **Verification**: ✅ Commit `abc` works.\n- **Impact**: 你好世界.';
    fs.writeFileSync(TEMP_FILE, content, 'utf-8');
    const entries = parseWikiEntries(TEMP_FILE);
    expect(entries[0].verification).toContain('✅');
    expect(entries[0].impact).toBe('你好世界.');
  });

  // Optional: run against actual project wiki if present
  (fs.existsSync(ACTUAL_WIKI) ? describe : describe.skip)('against actual llm-wiki.md', () => {
    it('should parse the actual project wiki without errors', () => {
      // This test is a sanity check; it may fail if wiki format changes.
      const entries = parseWikiEntries(ACTUAL_WIKI);
      expect(entries.length).toBeGreaterThan(0);
      entries.forEach(entry => {
        expect(entry.type).toMatch(/^(Test|Bug Fix|Feature)$/);
        expect(entry.title).toBeDefined();
        expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });
  });
});
