import { describe, it, expect, vi } from 'vitest';
import { parseWikiEntries } from '../wiki-parser';

vi.mock('node:fs', () => ({
  readFileSync: vi.fn(),
}));

import { readFileSync } from 'node:fs';

function createMockWiki(content: string) {
  (readFileSync as vi.Mock).mockReturnValue(content);
}

describe('wiki-parser advanced edge cases', () => {
  it('should handle entry with multi-line verification', () => {
    const content = `**Test: Nightly regression test generation verified (2025-02-15)**
- **Verification**: Commit \`abc123\` confirms
  another successful automatic nightly regression test generation.
- **Impact**: Impact text.`;
    createMockWiki(content);
    const entries = parseWikiEntries('llm-wiki.md');
    expect(entries).toHaveLength(1);
    expect(entries[0].verification).toBe('Commit `abc123` confirms another successful automatic nightly regression test generation.');
  });

  it('should parse entry of type Bug Fix with correct fields', () => {
    const content = `**Bug Fix: Night dreamer wiki path (2025-01-27)**
- **Issue**: Something.
- **Resolution**: Updated the path (commit \`623878c\`).`;
    createMockWiki(content);
    const entries = parseWikiEntries('llm-wiki.md');
    expect(entries).toHaveLength(1);
    expect(entries[0].type).toBe('Bug Fix');
    expect(entries[0].title).toBe('Night dreamer wiki path');
    expect(entries[0].date).toBe('2025-01-27');
    // Note: Bug Fix entries have issue and resolution, not verification/impact
    // The parser should still parse them but may leave verification/impact undefined
    expect(entries[0].verification).toBeUndefined();
    expect(entries[0].impact).toBeUndefined();
  });

  it('should parse entry of type Feature', () => {
    const content = `**Feature: Automatic nightly regression test generation (2025-01-28)**
- **Change**: The nightly agent now generates tests.
- **Impact**: Reduces manual maintenance.`;
    createMockWiki(content);
    const entries = parseWikiEntries('llm-wiki.md');
    expect(entries).toHaveLength(1);
    expect(entries[0].type).toBe('Feature');
    expect(entries[0].title).toBe('Automatic nightly regression test generation');
    expect(entries[0].impact).toBe('Reduces manual maintenance.');
  });

  it('should handle entry with no date (invalid format)', () => {
    const content = `**Test: No date entry**
- **Verification**: Something.`;
    createMockWiki(content);
    const entries = parseWikiEntries('llm-wiki.md');
    // Depending on implementation, it might skip the entry or include with undefined date
    // We'll check it is either skipped or date is undefined
    expect(entries.length).toBeLessThanOrEqual(1);
    if (entries.length === 1) {
      expect(entries[0].date).toBeUndefined();
    }
  });

  it('should handle entry with extra fields not defined in WikiEntry', () => {
    const content = `**Test: Extra fields (2025-01-01)**
- **Verification**: Commit \`deadbeef\`.
- **Impact**: Some impact.
- **Extra**: This is an extra field.`;
    createMockWiki(content);
    const entries = parseWikiEntries('llm-wiki.md');
    expect(entries).toHaveLength(1);
    // Extra field should be ignored; verification and impact still present
    expect(entries[0].verification).toBe('Commit `deadbeef`.');
    expect(entries[0].impact).toBe('Some impact.');
  });

  it('should handle entry with no bullet points (just header)', () => {
    const content = `**Test: Missing bullets (2025-01-01)**`;
    createMockWiki(content);
    const entries = parseWikiEntries('llm-wiki.md');
    // Should still parse the header but have undefined for all fields
    expect(entries).toHaveLength(1);
    expect(entries[0].date).toBe('2025-01-01');
    expect(entries[0].type).toBe('Test');
    expect(entries[0].title).toBe('Missing bullets');
    expect(entries[0].verification).toBeUndefined();
    expect(entries[0].impact).toBeUndefined();
  });

  it('should handle entry with empty bullet points', () => {
    const content = `**Test: Empty bullets (2025-01-01)**
- **Verification**:
- **Impact**:`;
    createMockWiki(content);
    const entries = parseWikiEntries('llm-wiki.md');
    expect(entries).toHaveLength(1);
    // Verification and impact should be empty strings
    expect(entries[0].verification).toBe('');
    expect(entries[0].impact).toBe('');
  });

  it('should handle file with Windows line endings (CRLF)', () => {
    const content = '**Test: CRLF entry (2025-01-01)**\r\n- **Verification**: Commit \`abc\`.\r\n- **Impact**: Impact.';
    createMockWiki(content);
    const entries = parseWikiEntries('llm-wiki.md');
    expect(entries).toHaveLength(1);
    expect(entries[0].verification).toBe('Commit `abc`.');
  });

  it('should throw an error if readFileSync throws (file not found)', () => {
    (readFileSync as vi.Mock).mockImplementation(() => {
      throw new Error('ENOENT: no such file or directory');
    });
    expect(() => parseWikiEntries('nonexistent.md')).toThrow('ENOENT');
  });

  it('should handle entry with Unicode and emoji', () => {
    const content = `**Test: Unicode test (2025-01-01)**
- **Verification**: ✅ Commit \`abc123\` works.
- **Impact**: 你好世界.`;
    createMockWiki(content);
    const entries = parseWikiEntries('llm-wiki.md');
    expect(entries).toHaveLength(1);
    expect(entries[0].verification).toContain('✅');
    expect(entries[0].impact).toBe('你好世界.');
  });

  it('should handle file with only whitespace or blank lines', () => {
    createMockWiki('  \n\n  \n');
    const entries = parseWikiEntries('llm-wiki.md');
    expect(entries).toEqual([]);
  });
});
