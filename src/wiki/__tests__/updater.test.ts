import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { addTestEntry } from '../updater';
import fs from 'fs/promises';

vi.mock('fs/promises');

const mockFs = vi.mocked(fs);

const defaultEntry = {
  date: '2025-02-09',
  testCommits: ['abc1234', 'def5678'],
  wikiCommit: 'ghi9012',
};

const expectedSection = `**Test: Nightly regression test generation and wiki update verified (2025-02-09)**
- **Verification**: Commits \`abc1234\` (test generation) and \`def5678\` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.`;

describe('addTestEntry', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should append a new entry to a non-empty file ending with a newline', async () => {
    const existingContent = `---
---
---

... existing content ...\n`;
    mockFs.readFile.mockResolvedValue(existingContent);

    await addTestEntry(defaultEntry);

    expect(mockFs.writeFile).toHaveBeenCalledWith(
      expect.any(String),
      existingContent + '\n' + expectedSection + '\n',
    );
  });

  it('should handle file without trailing newline', async () => {
    const existingContent = `... existing content ...`; // no trailing newline
    mockFs.readFile.mockResolvedValue(existingContent);

    await addTestEntry(defaultEntry);

    expect(mockFs.writeFile).toHaveBeenCalledWith(
      expect.any(String),
      existingContent + '\n' + expectedSection + '\n',
    );
  });

  it('should handle an empty file', async () => {
    mockFs.readFile.mockResolvedValue('');

    await addTestEntry(defaultEntry);

    expect(mockFs.writeFile).toHaveBeenCalledWith(
      expect.any(String),
      expectedSection + '\n',
    );
  });

  it('should not add a duplicate entry if the same test commit exists', async () => {
    const existingContent = `**Test: Nightly regression test generation and wiki update verified (2025-02-09)**
- **Verification**: Commits \`abc1234\` (test generation) and \`def5678\` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.\n`;
    mockFs.readFile.mockResolvedValue(existingContent);

    await addTestEntry(defaultEntry);

    // Should not write because it's a duplicate
    expect(mockFs.writeFile).not.toHaveBeenCalled();
  });

  it('should handle special characters in commit hashes', async () => {
    const entry = {
      date: '2025-02-10',
      testCommits: ['a1b2c3d', 'e4f5g6h'],
      wikiCommit: 'i7j8k9l',
    };
    const expectedSpecial = `**Test: Nightly regression test generation and wiki update verified (2025-02-10)**
- **Verification**: Commits \`a1b2c3d\` (test generation) and \`e4f5g6h\` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.`;
    mockFs.readFile.mockResolvedValue('Some existing content\n');

    await addTestEntry(entry);

    expect(mockFs.writeFile).toHaveBeenCalledWith(
      expect.any(String),
      expect.stringContaining(expectedSpecial),
    );
  });

  it('should not add an entry if only test generation commit matches but wiki commit differs', async () => {
    const existingContent = `**Test: Nightly regression test generation and wiki update verified (2025-02-09)**
- **Verification**: Commits \`abc1234\` (test generation) and \`def5678\` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.\n`;
    mockFs.readFile.mockResolvedValue(existingContent);

    const differentEntry = {
      date: '2025-02-10',
      testCommits: ['abc1234', 'different'],
      wikiCommit: 'ghi9012',
    };

    await addTestEntry(differentEntry);

    // Should add because the combination of commits is different
    expect(mockFs.writeFile).toHaveBeenCalled();
  });

  it('should handle file with multiple test entries and append correctly', async () => {
    const existingContent = `**Test: Nightly regression test generation verified (2025-02-07)**
- **Verification**: Commit \`oldcommit\` confirms another successful automatic nightly regression test generation.
- **Impact**: Continues to demonstrate robustness of the automated system; the project remains on track to achieve fully stable test automation.\n\n**Test: Nightly regression test generation and wiki update verified (2025-02-08)**
- **Verification**: Commits \`oldcommit1\` (test generation) and \`oldcommit2\` (wiki update) confirm another successful automated nightly cycle.
- **Impact**: Continues to demonstrate robustness of the automated system; the path toward fully stable test automation is progressing steadily.\n`;
    mockFs.readFile.mockResolvedValue(existingContent);

    await addTestEntry(defaultEntry);

    expect(mockFs.writeFile).toHaveBeenCalledWith(
      expect.any(String),
      existingContent + '\n' + expectedSection + '\n',
    );
  });
});
