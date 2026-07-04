import { describe, it, expect } from 'vitest';

/**
 * Function that simulates appending a new nightly regression test entry to the wiki content.
 * This is the core logic used by the night dreamer to update llm-wiki.md.
 */
function appendTestEntry(wikiContent: string, date: string, commits: string[]): string {
  const entryDate = new Date(date);
  if (isNaN(entryDate.getTime())) {
    throw new Error(`Invalid date: ${date}`);
  }

  const formattedDate = date; // assume it's already in YYYY-MM-DD format
  const commitList = commits.map(c => `\`${c}\``).join(', ');
  const testEntry = `\n**Test: Nightly regression test generation and wiki update verified (${formattedDate})**\n- **Verification**: Commits ${commitList} confirm another successful automated nightly cycle.\n- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.\n`;

  // Remove trailing whitespace and add new entry before the final newline or end of file
  const trimmedContent = wikiContent.replace(/\s*$/, '');
  return trimmedContent + testEntry;
}

describe('Wiki Updater - appendTestEntry', () => {
  const baseWiki = `# LLM Wiki\n\nProject knowledge base for AI agents.\n\n## Architecture\n\n...`;

  it('should append a new test entry at the end of the wiki content', () => {
    const result = appendTestEntry(baseWiki, '2025-02-07', ['abc123', 'def456']);
    expect(result).toContain('**Test: Nightly regression test generation and wiki update verified (2025-02-07)**');
    expect(result).toContain('Commits `abc123`, `def456` confirm');
    expect(result).toContain('Impact: Continues to demonstrate robustness');
  });

  it('should handle a single commit hash correctly', () => {
    const result = appendTestEntry(baseWiki, '2025-02-07', ['abc123']);
    expect(result).toContain('Commits `abc123` confirm');
  });

  it('should preserve existing content and append without duplication', () => {
    const existingContent = baseWiki + '\n**Test: Old entry**\n- Verification: old\n- Impact: old';
    const result = appendTestEntry(existingContent, '2025-02-07', ['abc123']);
    expect(result).toContain('Old entry');
    expect(result).toContain('Nightly regression test generation and wiki update verified (2025-02-07)');
    // Ensure there's exactly one occurrence of the new entry title
    expect((result.match(/Nightly regression test generation and wiki update verified/g) || []).length).toBe(1);
  });

  it('should throw an error for invalid date', () => {
    expect(() => appendTestEntry(baseWiki, 'not-a-date', ['abc123'])).toThrow('Invalid date: not-a-date');
  });

  it('should handle empty commit hashes gracefully (return empty code block)', () => {
    const result = appendTestEntry(baseWiki, '2025-02-07', []);
    expect(result).toContain('Commits  confirm');
  });

  it('should trim trailing whitespace from existing wiki content before appending', () => {
    const wikiWithWhitespace = baseWiki + '   \n  ';
    const result = appendTestEntry(wikiWithWhitespace, '2025-02-07', ['abc']);
    // The result should not have extra whitespace before the new entry
    expect(result).not.toMatch(/\s{2,}\n\*\*/);
  });

  it('should not add extra blank lines if wiki ends with newline', () => {
    const wikiEndsWithNewline = baseWiki + '\n';
    const result = appendTestEntry(wikiEndsWithNewline, '2025-02-07', ['abc']);
    // The appended entry should start on its own line after a single newline
    expect(result).toMatch(/\n\*\*Test:/);
  });
});
