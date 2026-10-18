import { describe, it, expect, vi } from 'vitest';
import { parseWikiEntries, WikiEntry } from '../wiki-parser';

// Mock the fs module to avoid actual file operations
vi.mock('node:fs', () => ({
  readFileSync: vi.fn(),
}));

import { readFileSync } from 'node:fs';

function createMockWiki(content: string) {
  (readFileSync as vi.Mock).mockReturnValue(content);
}

describe('wiki-parser', () => {
  describe('parseWikiEntries', () => {
    it('should parse a well-formed nightly test entry', () => {
      const content = `**Test: Nightly regression test generation verified (2025-02-15)**
- **Verification**: Commit \`efe453b\` confirms another successful automatic nightly regression test generation.
- **Impact**: Continues to demonstrate robustness of the automated system; the project remains on track to achieve fully stable test automation.`;
      createMockWiki(content);
      const entries = parseWikiEntries('llm-wiki.md');
      expect(entries).toHaveLength(1);
      expect(entries[0]).toEqual({
        date: '2025-02-15',
        type: 'Test',
        title: 'Nightly regression test generation verified',
        verification: 'Commit `efe453b` confirms another successful automatic nightly regression test generation.',
        impact: 'Continues to demonstrate robustness of the automated system; the project remains on track to achieve fully stable test automation.',
      });
    });

    it('should handle missing verification field as edge case', () => {
      const content = `**Test: Nightly wiki update verified (2025-02-14)**
- **Impact**: Continues to demonstrate robustness.`;
      createMockWiki(content);
      const entries = parseWikiEntries('llm-wiki.md');
      expect(entries).toHaveLength(1);
      expect(entries[0].verification).toBeUndefined();
    });

    it('should handle missing impact field as edge case', () => {
      const content = `**Test: Nightly regression test generation verified (2025-02-15)**
- **Verification**: Commit \`abc123\` worked.`;
      createMockWiki(content);
      const entries = parseWikiEntries('llm-wiki.md');
      expect(entries[0].impact).toBeUndefined();
    });

    it('should parse multiple entries with correct ordering', () => {
      const content = `**Test: Nightly wiki update verified (2025-02-14)**
- **Verification**: Commit \`b05b618\` confirms.
- **Impact**: Impact text.

**Test: Nightly regression test generation verified (2025-02-15)**
- **Verification**: Commit \`efe453b\` confirms.
- **Impact**: Impact text.`;
      createMockWiki(content);
      const entries = parseWikiEntries('llm-wiki.md');
      expect(entries).toHaveLength(2);
      expect(entries[0].date).toBe('2025-02-14');
      expect(entries[1].date).toBe('2025-02-15');
    });

    it('should skip lines that are not part of an entry (e.g., separator "---")', () => {
      const content = `---
**Test: Nightly regression test generation verified (2025-02-15)**
- **Verification**: Commit \`efe453b\` confirms.
- **Impact**: Impact text.`;
      createMockWiki(content);
      const entries = parseWikiEntries('llm-wiki.md');
      expect(entries).toHaveLength(1);
    });

    it('should handle malformed commit hash (non-hex) gracefully', () => {
      const content = `**Test: Nightly regression test generation verified (2025-02-15)**
- **Verification**: Commit \`ZZZZZZ\` confirms.
- **Impact**: Impact.`;
      createMockWiki(content);
      const entries = parseWikiEntries('llm-wiki.md');
      expect(entries[0].verification).toContain('ZZZZZZ');
    });

    it('should not crash on empty file', () => {
      createMockWiki('');
      const entries = parseWikiEntries('llm-wiki.md');
      expect(entries).toEqual([]);
    });

    it('should not crash on file with only separators or unrelated text', () => {
      createMockWiki('---\n---\nSome text\n');
      const entries = parseWikiEntries('llm-wiki.md');
      expect(entries).toEqual([]);
    });
  });
});
