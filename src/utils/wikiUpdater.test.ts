import { describe, it, expect, vi } from 'vitest';
import { updateWiki, parseWiki, formatEntry } from './wikiUpdater';

// Mock file system operations
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  existsSync: vi.fn(),
}));

import fs from 'fs';

describe('wikiUpdater', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('parseWiki', () => {
    it('should parse a valid wiki content with multiple entries', () => {
      const content = `---
---
---

# LLM Wiki

**Test: Nightly regression test generation verified (2025-02-01)**
- **Verification**: Commit \`abc123\` confirms.
- **Impact**: Continues.

**Test: Another entry (2025-02-02)**
- **Verification**: Commit \`def456\` confirms.
- **Impact**: Continues.`;

      const result = parseWiki(content);
      expect(result).toHaveLength(2);
      expect(result[0].date).toBe('2025-02-01');
      expect(result[1].date).toBe('2025-02-02');
    });

    it('should return empty array for content with no entries', () => {
      const content = `---
---
---

# LLM Wiki

Some text.`;
      const result = parseWiki(content);
      expect(result).toEqual([]);
    });

    it('should handle malformed entries gracefully', () => {
      const content = `---
---
---

**Test: Missing date**
- **Verification**: Commit \`abc\`.
**Test: Incomplete (2025-02-03)**`;
      const result = parseWiki(content);
      // Should only parse the second entry
      expect(result).toHaveLength(1);
      expect(result[0].date).toBe('2025-02-03');
    });

    it('should throw on invalid date format', () => {
      const content = `**Test: Bad date (2025/02/01)**`;
      expect(() => parseWiki(content)).toThrow('Invalid date format');
    });
  });

  describe('formatEntry', () => {
    it('should format a complete entry correctly', () => {
      const entry = {
        type: 'Test',
        title: 'Nightly regression test generation',
        date: '2025-02-09',
        verification: 'Commit \`441564d\` (test generation) and \`f14a164\` (wiki update) confirm another successful automated nightly cycle.',
        impact: 'Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.',
      };

      const expected = `**Test: Nightly regression test generation verified (2025-02-09)**
- **Verification**: Commit \`441564d\` (test generation) and \`f14a164\` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.`;

      expect(formatEntry(entry)).toBe(expected);
    });

    it('should reject entries with empty required fields', () => {
      expect(() => formatEntry({ type: '', title: 'Test', date: '2025-02-09', verification: '', impact: '' })).toThrow('Missing required fields');
    });

    it('should reject entries with future dates', () => {
      const futureDate = '2099-12-31';
      expect(() => formatEntry({ type: 'Test', title: 'Future', date: futureDate, verification: 'Commit', impact: 'Impact' })).toThrow('Date cannot be in the future');
    });
  });

  describe('updateWiki', () => {
    it('should append a new entry to the wiki file', () => {
      const existingContent = `---
---
---

# LLM Wiki

Some existing content.`;
      const newEntry = {
        type: 'Test',
        title: 'Nightly regression test generation',
        date: '2025-02-09',
        verification: 'Commit \`new\`',
        impact: 'New impact.',
      };

      (fs.readFileSync as any).mockReturnValue(existingContent);
      (fs.existsSync as any).mockReturnValue(true);

      updateWiki(newEntry);

      expect(fs.writeFileSync).toHaveBeenCalledWith(expect.any(String), expect.stringContaining('**Test: Nightly regression test generation verified (2025-02-09)**'));
    });

    it('should not add duplicate entries for the same date', () => {
      const existingContent = `**Test: Existing (2025-02-09)**\n- **Verification**: Commit \`old\`.\n- **Impact**: Old.`;
      (fs.readFileSync as any).mockReturnValue(existingContent);

      const newEntry = { type: 'Test', title: 'Existing', date: '2025-02-09', verification: 'Commit \`new\`', impact: 'New' };

      expect(() => updateWiki(newEntry)).toThrow('Entry for date 2025-02-09 already exists');
      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    it('should handle missing wiki file by creating it', () => {
      (fs.existsSync as any).mockReturnValue(false);
      const entry = { type: 'Test', title: 'First', date: '2025-02-09', verification: 'Commit', impact: 'Impact' };

      updateWiki(entry);

      expect(fs.writeFileSync).toHaveBeenCalledWith(expect.any(String), expect.stringContaining('# LLM Wiki'));
    });

    it('should preserve existing entries and append new one at the end', () => {
      const existingContent = `---
---
---

# LLM Wiki

**Test: Old (2025-02-01)**\n- **Verification**: Commit \`old\`.\n- **Impact**: Old.`;
      (fs.readFileSync as any).mockReturnValue(existingContent);
      (fs.existsSync as any).mockReturnValue(true);

      const newEntry = { type: 'Test', title: 'New', date: '2025-02-09', verification: 'Commit \`new\`', impact: 'New' };

      updateWiki(newEntry);

      const writtenContent = (fs.writeFileSync as any).mock.calls[0][1];
      expect(writtenContent).toContain('**Test: Old (2025-02-01)**');
      expect(writtenContent).toContain('**Test: New verified (2025-02-09)**');
      // new entry should be after old
      const oldIndex = writtenContent.indexOf('**Test: Old');
      const newIndex = writtenContent.indexOf('**Test: New');
      expect(newIndex).toBeGreaterThan(oldIndex);
    });

    it('should reject entries with non-ISO date format', () => {
      const entry = { type: 'Test', title: 'Bad', date: '02-09-2025', verification: 'Commit', impact: 'Impact' };
      expect(() => updateWiki(entry)).toThrow('Invalid date format');
    });
  });
});
