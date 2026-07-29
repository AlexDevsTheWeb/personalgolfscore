import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('LLM Wiki', () => {
  const wikiPath = resolve(__dirname, 'llm-wiki.md');
  let wikiContent: string;

  beforeAll(() => {
    wikiContent = readFileSync(wikiPath, 'utf-8');
  });

  it('should start with valid YAML front matter', () => {
    expect(wikiContent.startsWith('---\n')).toBe(true);
    const secondDelimiter = wikiContent.indexOf('\n---\n', 4);
    expect(secondDelimiter).toBeGreaterThan(4);
  });

  it('should have a title in the front matter', () => {
    const frontMatterMatch = wikiContent.match(/^---\n([\s\S]*?)\n---\n/);
    expect(frontMatterMatch).not.toBeNull();
    const frontMatter = frontMatterMatch![1];
    expect(frontMatter).toContain('# LLM Wiki');
  });

  it('should contain the Architecture section', () => {
    expect(wikiContent).toContain('## Architecture');
  });

  it('should contain the Key Decisions section', () => {
    expect(wikiContent).toContain('## Key Decisions');
  });

  it('should contain the Conventions section', () => {
    expect(wikiContent).toContain('## Conventions');
  });

  it('should contain the Patterns section', () => {
    expect(wikiContent).toContain('## Patterns');
  });

  it('should contain the Milestones section', () => {
    expect(wikiContent).toContain('## Milestones');
  });

  it('should contain the Bug Fix section for night dreamer wiki path', () => {
    expect(wikiContent).toContain('**Bug Fix: Night dreamer wiki path (2025-01-27)**');
  });

  it('should contain the Feature section for automatic nightly regression test generation', () => {
    expect(wikiContent).toContain('**Feature: Automatic nightly regression test generation & wiki update (2025-01-28)**');
  });

  it('should contain the Test section for nightly regression test generation verified (2025-02-12)', () => {
    expect(wikiContent).toContain('**Test: Nightly regression test generation verified (2025-02-12)**');
  });

  it('should contain the commit hash a14f9e8', () => {
    expect(wikiContent).toContain('a14f9e8');
  });

  it('should end with a newline', () => {
    expect(wikiContent.endsWith('\n')).toBe(true);
  });

  it('should not have duplicate front matter delimiters', () => {
    const delimiters = wikiContent.match(/^---\n/gm);
    expect(delimiters).not.toBeNull();
    expect(delimiters!.length).toBe(2);
  });

  it('should have consistent formatting for test entries', () => {
    const testEntries = wikiContent.match(/\*\*Test:.*\*\*/g);
    expect(testEntries).not.toBeNull();
    testEntries!.forEach(entry => {
      expect(entry).toMatch(/^\*\*Test: Nightly regression test generation (verified|and wiki update verified) \(\d{4}-\d{2}-\d{2}\)\*\*$/);
    });
  });

  it('should have impact lines for each test entry', () => {
    const impactLines = wikiContent.match(/- \*\*Impact\*\*: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily\./g);
    expect(impactLines).not.toBeNull();
    expect(impactLines!.length).toBeGreaterThanOrEqual(1);
  });

  it('should not contain any broken markdown links', () => {
    const linkPattern = /\[([^\]]*)\]\(([^)]*)\)/g;
    let match;
    while ((match = linkPattern.exec(wikiContent)) !== null) {
      const url = match[2];
      expect(url).not.toBe('');
    }
  });

  it('should have a consistent date format in test entries', () => {
    const datePattern = /\(\d{4}-\d{2}-\d{2}\)/g;
    const dates = wikiContent.match(datePattern);
    expect(dates).not.toBeNull();
    dates!.forEach(date => {
      expect(date).toMatch(/^\(\d{4}-\d{2}-\d{2}\)$/);
    });
  });

  it('should have the correct number of test entries (at least 20)', () => {
    const testEntries = wikiContent.match(/\*\*Test: Nightly regression test generation/g);
    expect(testEntries).not.toBeNull();
    expect(testEntries!.length).toBeGreaterThanOrEqual(20);
  });

  it('should not have duplicate test entries for the same date', () => {
    const testDates = wikiContent.match(/\(\d{4}-\d{2}-\d{2}\)/g);
    expect(testDates).not.toBeNull();
    const uniqueDates = new Set(testDates);
    expect(uniqueDates.size).toBe(testDates!.length);
  });

  it('should have the correct structure for the latest test entry', () => {
    const latestEntryPattern = /\*\*Test: Nightly regression test generation verified \(2025-02-12\)\*\*\n- \*\*Verification\*\*: Commit `a14f9e8` confirms another successful automatic nightly regression test generation\.\n- \*\*Impact\*\*: Continues to demonstrate robustness of the automated system; the project remains on track to achieve fully stable test automation\./;
    expect(wikiContent).toMatch(latestEntryPattern);
  });
});