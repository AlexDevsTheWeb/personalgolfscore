import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const wikiPath = path.resolve(__dirname, 'llm-wiki.md');

function readWiki(): string {
  return fs.readFileSync(wikiPath, 'utf-8');
}

describe('LLM Wiki', () => {
  it('should start with a valid YAML front matter', () => {
    const content = readWiki();
    expect(content.startsWith('---\n')).toBe(true);
    // Extract front matter
    const endFrontMatter = content.indexOf('\n---\n', 4);
    expect(endFrontMatter).toBeGreaterThan(0);
    const frontMatter = content.slice(4, endFrontMatter);
    // Basic YAML validity: should contain at least one key-value pair
    expect(frontMatter).toMatch(/\w+:\s/);
  });

  it('should contain the entry for 2025-02-07', () => {
    const content = readWiki();
    expect(content).toContain('**Test: Nightly regression test generation verified (2025-02-07)**');
    expect(content).toContain('- **Verification**: Commit `d771cfe`');
    expect(content).toContain('- **Impact**: Continues to demonstrate robustness of the automated system; the project remains on track to achieve fully stable test automation.');
  });

  it('should have consistent formatting for each nightly entry', () => {
    const content = readWiki();
    // Split by lines and find all entries matching pattern
    const lines = content.split('\n');
    let i = 0;
    const entries: string[] = [];
    while (i < lines.length) {
      if (lines[i].startsWith('**Test:') && lines[i].endsWith(')**')) {
        const entryLines = [lines[i]];
        i++;
        // Collect following lines until next entry or end
        while (i < lines.length && !lines[i].startsWith('**Test:')) {
          entryLines.push(lines[i]);
          i++;
        }
        entries.push(entryLines.join('\n'));
      } else {
        i++;
      }
    }
    // Validate each entry structure
    entries.forEach(entry => {
      expect(entry).toMatch(/^\*\*Test:.*\*\*\n- \*\*Verification\*\*:.*\n- \*\*Impact\*\*:.*$/);
    });
  });

  it('should not have duplicate entries for the same date', () => {
    const content = readWiki();
    const datePattern = /\(\d{4}-\d{2}-\d{2}\)/g;
    const dates = content.match(datePattern);
    if (dates) {
      const uniqueDates = new Set(dates);
      expect(uniqueDates.size).toBe(dates.length);
    }
  });

  it('should have a trailing newline at the end of file', () => {
    const content = readWiki();
    expect(content.endsWith('\n')).toBe(true);
  });
});
