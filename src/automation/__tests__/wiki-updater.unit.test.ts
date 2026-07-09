import { describe, it, expect } from 'vitest';
import { appendTestEntry } from '../wiki-updater';

describe('Wiki Updater - appendTestEntry Unit', () => {
  const baseWiki = `# LLM Wiki\n\nProject knowledge base for AI agents.\n\n## Architecture\n\n...`;

  it('should throw error for empty commit hashes array', () => {
    expect(() => appendTestEntry(baseWiki, '2025-02-07', [])).toThrow('Commit hashes array must not be empty');
  });

  it('should throw error for null date', () => {
    expect(() => appendTestEntry(baseWiki, null as unknown as string, ['abc'])).toThrow('Invalid date');
  });

  it('should throw error for undefined date', () => {
    expect(() => appendTestEntry(baseWiki, undefined as unknown as string, ['abc'])).toThrow('Invalid date');
  });

  it('should throw error for date in wrong format (MM/DD/YYYY)', () => {
    expect(() => appendTestEntry(baseWiki, '02/07/2025', ['abc'])).toThrow('Invalid date');
  });

  it('should throw error for date with non-numeric characters', () => {
    expect(() => appendTestEntry(baseWiki, '2025-02-0a', ['abc'])).toThrow('Invalid date');
  });

  it('should handle commit hash containing backticks gracefully', () => {
    const result = appendTestEntry(baseWiki, '2025-02-07', ['abc`123']);
    expect(result).toContain('`abc`123`');
  });

  it('should handle multiple commit hashes with spaces', () => {
    const result = appendTestEntry(baseWiki, '2025-02-07', ['hash one', 'hash two']);
    expect(result).toContain('`hash one`, `hash two`');
  });

  it('should produce correct format for single commit hash', () => {
    const result = appendTestEntry(baseWiki, '2025-02-07', ['abc123']);
    expect(result).toContain('**Test: Nightly regression test generation verified (2025-02-07)**');
    expect(result).toContain('- **Verification**: Commits `abc123` confirm another successful automatic nightly regression test generation.');
  });

  it('should produce correct format for multiple commit hashes', () => {
    const result = appendTestEntry(baseWiki, '2025-02-07', ['abc', 'def']);
    expect(result).toContain('**Test: Nightly regression test generation verified (2025-02-07)**');
    expect(result).toContain('- **Verification**: Commits `abc`, `def` confirm another successful automatic nightly regression test generation.');
  });

  it('should not modify the original wiki content', () => {
    const original = baseWiki;
    const result = appendTestEntry(original, '2025-02-07', ['abc']);
    expect(original).toBe(baseWiki);
  });

  it('should handle very large wiki content without performance issues', () => {
    const largeWiki = baseWiki + '\n'.repeat(10000);
    const start = Date.now();
    const result = appendTestEntry(largeWiki, '2025-02-07', ['abc']);
    const end = Date.now();
    expect(result).toContain('(2025-02-07)');
    expect(end - start).toBeLessThan(1000);
  });

  it('should append entry at the end of the wiki content regardless of trailing newlines', () => {
    const wikiWithNewline = baseWiki + '\n';
    const result = appendTestEntry(wikiWithNewline, '2025-02-07', ['abc']);
    expect(result).toMatch(/\n\*\*Test:/);
  });

  it('should handle date with month and day as single digits (YYYY-M-D)', () => {
    const result = appendTestEntry(baseWiki, '2025-2-7', ['abc']);
    expect(result).toContain('(2025-2-7)');
  });
});
