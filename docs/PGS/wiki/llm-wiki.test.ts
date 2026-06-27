import { readFileSync } from 'fs';
import { resolve } from 'path';

const wikiPath = resolve(__dirname, 'llm-wiki.md');
const wikiContent = readFileSync(wikiPath, 'utf-8');

describe('LLM Wiki - Nightly regression test generation verification', () => {
  it('should contain the latest nightly run commit 5773fb4 in iterative stability verification', () => {
    expect(wikiContent).toContain('5773fb4');
  });

  it('should have a new entry for nightly regression test generation on 2025-01-31', () => {
    // Expect the section header
    expect(wikiContent).toContain('**Test: Nightly regression test generation verified (2025-01-31)**');
  });

  it('should document the impact of the 2025-01-31 test', () => {
    const impactLine = '**Impact**: Further evidence of the automated system\'s reliability; the project remains on track to achieve fully stable test automation.';
    expect(wikiContent).toContain(impactLine);
  });

  it('should not contain stale end-of-file without the new section', () => {
    // The file should end with the new section, not the previous one
    const lines = wikiContent.trim().split('\n');
    const lastLine = lines[lines.length - 1];
    expect(lastLine).toMatch(/stable test automation\.$/);
  });

  it('should maintain the previous entries for earlier nightly runs', () => {
    expect(wikiContent).toContain('**Test: Nightly regression test generation retested (2025-01-29)**');
    expect(wikiContent).toContain('**Test: Nightly regression test generation and wiki update verified (2025-01-30)**');
  });
});
