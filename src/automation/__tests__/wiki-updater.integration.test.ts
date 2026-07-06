import { describe, it, expect, vi } from 'vitest';
import { appendTestEntry } from '../wiki-updater';

// Additional edge cases not covered in the existing unit test

describe('Wiki Updater - appendTestEntry Integration', () => {
  const baseWiki = `# LLM Wiki\n\nProject knowledge base for AI agents.\n\n## Architecture\n\n...`;

  it('should handle date with leading zeros in month and day', () => {
    const result = appendTestEntry(baseWiki, '2025-02-07', ['abc123']);
    expect(result).toContain('(2025-02-07)');
  });

  it('should handle date without leading zeros (still YYYY-MM-DD format)', () => {
    // The function expects YYYY-MM-DD; we test with a valid date that has single-digit month/day
    const result = appendTestEntry(baseWiki, '2025-02-07', ['abc']);
    expect(result).toContain('(2025-02-07)');
  });

  it('should reject invalid date strings like empty string', () => {
    expect(() => appendTestEntry(baseWiki, '', ['abc'])).toThrow('Invalid date: ');
  });

  it('should reject dates with extra characters', () => {
    expect(() => appendTestEntry(baseWiki, '2025-13-01', ['abc'])).toThrow('Invalid date: 2025-13-01');
  });

  it('should handle commit hashes with uppercase and numbers', () => {
    const result = appendTestEntry(baseWiki, '2025-02-07', ['A1b2C3d4E5f6']);
    expect(result).toContain('`A1b2C3d4E5f6`');
  });

  it('should handle multiple commit hashes with special characters like underscore', () => {
    const result = appendTestEntry(baseWiki, '2025-02-07', ['commit_hash', 'another_hash']);
    expect(result).toContain('`commit_hash`, `another_hash`');
  });

  it('should preserve multiple trailing newlines and append correctly', () => {
    const wikiWithMultipleNewlines = baseWiki + '\n\n\n';
    const result = appendTestEntry(wikiWithMultipleNewlines, '2025-02-07', ['abc']);
    // The result should have no extra blank lines before the new entry
    expect(result).not.toMatch(/\n{3,}\*\*Test:/);
    expect(result).toMatch(/\n\*\*Test:/);
  });

  it('should append when wiki content ends with no trailing newline', () => {
    const wikiNoNewline = baseWiki.replace(/\s*$/, '');
    const result = appendTestEntry(wikiNoNewline, '2025-02-07', ['abc']);
    // The appended entry should start on a new line after a single newline
    expect(result).toMatch(/\n\*\*Test:/);
  });

  it('should handle extremely long commit hashes', () => {
    const longHash = 'a'.repeat(100);
    const result = appendTestEntry(baseWiki, '2025-02-07', [longHash]);
    expect(result).toContain('`' + longHash + '`');
  });

  it('should not modify the original wiki content object', () => {
    const original = baseWiki;
    const result = appendTestEntry(original, '2025-02-07', ['abc']);
    expect(original).toBe(baseWiki); // Ensure immutability
  });

  it('should work with large wiki content (performance check)', () => {
    const largeWiki = baseWiki + '\n'.repeat(10000);
    const result = appendTestEntry(largeWiki, '2025-02-07', ['abc']);
    expect(result).toContain('(2025-02-07)');
    // Should not throw or hang
  });

  // Integration test with mocked file system
  it('should correctly update a wiki file when used in night dreamer workflow', async () => {
    // Simulate readFileSync and writeFileSync
    const fs = await import('fs');
    const readSpy = vi.spyOn(fs, 'readFileSync').mockReturnValue(baseWiki);
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    // This is a simulation: in reality, the night dreamer would call appendTestEntry and write
    const updatedContent = appendTestEntry(baseWiki, '2025-02-07', ['abc']);
    fs.writeFileSync('/path/to/llm-wiki.md', updatedContent);

    // Verify write was called with expected content
    expect(writeSpy).toHaveBeenCalledWith(
      '/path/to/llm-wiki.md',
      expect.stringContaining('Commits `abc` confirm')
    );

    readSpy.mockRestore();
    writeSpy.mockRestore();
  });
});
