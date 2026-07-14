import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { updateWiki } from '../wiki-updater';
import * as fs from 'fs';
import * as path from 'path';

vi.mock('fs');
vi.mock('path');

const WIKI_PATH = 'docs/PGS/wiki/llm-wiki.md';

describe('updateWiki', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should append a new entry to the wiki file', () => {
    const existingContent = `# LLM Wiki\n\n**Test: Some entry**\n- **Verification**: Commit \`abc123\`\n- **Impact**: Some impact.`;
    (fs.existsSync as any).mockReturnValue(true);
    (fs.readFileSync as any).mockReturnValue(existingContent);

    const newEntry = {
      testName: 'Test: Nightly regression test generation verified',
      verification: 'Commit `5b0614d` confirms another successful automatic nightly regression test generation.',
      impact: 'Continues to demonstrate robustness of the automated system; the project remains on track to achieve fully stable test automation.'
    };

    updateWiki(newEntry);

    const expectedAppend = `\n**Test: Nightly regression test generation verified**\n- **Verification**: Commit \`5b0614d\` confirms another successful automatic nightly regression test generation.\n- **Impact**: Continues to demonstrate robustness of the automated system; the project remains on track to achieve fully stable test automation.`;

    expect(fs.appendFileSync).toHaveBeenCalledWith(
      expect.stringContaining(WIKI_PATH),
      expectedAppend
    );
  });

  it('should handle empty file correctly', () => {
    (fs.existsSync as any).mockReturnValue(true);
    (fs.readFileSync as any).mockReturnValue('');

    const newEntry = {
      testName: 'Test: First entry',
      verification: 'Commit `000` verified.',
      impact: 'First entry impact.'
    };

    updateWiki(newEntry);

    const expectedAppend = `\n**Test: First entry**\n- **Verification**: Commit \`000\` verified.\n- **Impact**: First entry impact.`;

    expect(fs.appendFileSync).toHaveBeenCalledWith(
      expect.stringContaining(WIKI_PATH),
      expectedAppend
    );
  });

  it('should handle file without trailing newline', () => {
    (fs.existsSync as any).mockReturnValue(true);
    (fs.readFileSync as any).mockReturnValue('# LLM Wiki\n\n**Test: Existing**\n- **Verification**: None'); // no trailing newline

    const newEntry = {
      testName: 'Test: New entry',
      verification: 'Commit `abc`',
      impact: 'Impact.'
    };

    updateWiki(newEntry);

    // Expect proper formatting with newline before the new entry
    const expectedAppend = `\n**Test: New entry**\n- **Verification**: Commit \`abc\`\n- **Impact**: Impact.`;

    expect(fs.appendFileSync).toHaveBeenCalledWith(
      expect.stringContaining(WIKI_PATH),
      expectedAppend
    );
  });

  it('should handle special characters in commit hash', () => {
    (fs.existsSync as any).mockReturnValue(true);
    (fs.readFileSync as any).mockReturnValue('# Wiki');

    const newEntry = {
      testName: 'Test: Hash with backticks',
      verification: 'Commit `a1b2c3`',
      impact: 'No special effects.'
    };

    updateWiki(newEntry);

    // Ensure backticks are preserved (they are already in the string, but should be escaped in markdown? Actually they are fine.)
    const expectedAppend = `\n**Test: Hash with backticks**\n- **Verification**: Commit \`a1b2c3\`\n- **Impact**: No special effects.`;

    expect(fs.appendFileSync).toHaveBeenCalledWith(
      expect.stringContaining(WIKI_PATH),
      expectedAppend
    );
  });

  it('should throw error if wiki file does not exist', () => {
    (fs.existsSync as any).mockReturnValue(false);

    const newEntry = {
      testName: 'Test: Missing file',
      verification: 'Commit `x`',
      impact: 'Should throw.'
    };

    expect(() => updateWiki(newEntry)).toThrowError('Wiki file not found');
  });

  it('should handle multiple entries appended in sequence', () => {
    (fs.existsSync as any).mockReturnValue(true);
    (fs.readFileSync as any).mockReturnValue('');

    const entry1 = {
      testName: 'Test: First',
      verification: 'Commit `1`',
      impact: 'First impact.'
    };
    const entry2 = {
      testName: 'Test: Second',
      verification: 'Commit `2`',
      impact: 'Second impact.'
    };

    updateWiki(entry1);
    updateWiki(entry2);

    expect(fs.appendFileSync).toHaveBeenCalledTimes(2);
    const firstCall = (fs.appendFileSync as any).mock.calls[0][1];
    const secondCall = (fs.appendFileSync as any).mock.calls[1][1];
    expect(firstCall).toContain('**Test: First**');
    expect(secondCall).toContain('**Test: Second**');
  });
});
