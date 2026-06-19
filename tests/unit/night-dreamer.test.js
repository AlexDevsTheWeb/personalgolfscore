import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateWiki } from '../src/night-dreamer/index.js';
import fs from 'fs/promises';
import path from 'path';

// Mock the file system to avoid actual writes
vi.mock('fs/promises');

const EXPECTED_WIKI_PATH = path.resolve(process.cwd(), 'docs', 'PGS', 'wiki', 'llm-wiki.md');
const STALE_WIKI_PATH = path.resolve(process.cwd(), 'old', 'wiki', 'llm-wiki.md');

describe('Night Dreamer - Wiki Path Handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should write to the correct canonical wiki path', async () => {
    const content = '# LLM Wiki\n Test content';
    await updateWiki(content);

    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    expect(fs.writeFile).toHaveBeenCalledWith(EXPECTED_WIKI_PATH, content, 'utf8');
  });

  it('should not write to any stale or alternative path', async () => {
    const content = 'Some update';
    await updateWiki(content);

    expect(fs.writeFile).not.toHaveBeenCalledWith(STALE_WIKI_PATH, expect.any(String), 'utf8');
  });

  it('should throw an error when the parent directory does not exist', async () => {
    fs.writeFile.mockRejectedValueOnce(new Error('ENOENT: no such file or directory'));
    await expect(updateWiki('content')).rejects.toThrow('ENOENT');
  });

  it('should throw an error when write permission is denied', async () => {
    fs.writeFile.mockRejectedValueOnce(new Error('EACCES: permission denied'));
    await expect(updateWiki('content')).rejects.toThrow('EACCES');
  });

  it('should handle empty content gracefully', async () => {
    fs.writeFile.mockResolvedValueOnce();
    await expect(updateWiki('')).resolves.not.toThrow();
    expect(fs.writeFile).toHaveBeenCalledWith(EXPECTED_WIKI_PATH, '', 'utf8');
  });

  it('should use the exact path configured in the wiki (no hardcoded outdated references)', async () => {
    // Simulate that the wiki was updated to reference the correct path
    const wikiContent = `
Bug Fix: Night dreamer wiki path (2025-01-27)
- Issue: ...
- Resolution: Updated the path to match the new LLM wiki file location (commit \`623878c\`).
`;
    await updateWiki(wikiContent);
    expect(fs.writeFile).toHaveBeenCalledWith(EXPECTED_WIKI_PATH, expect.stringContaining('Bug Fix: Night dreamer wiki path'), 'utf8');
  });

  it('should not attempt to write to a directory instead of a file', async () => {
    // If the path points to a directory, filesystem should reject
    fs.writeFile.mockRejectedValueOnce(new Error('EISDIR: illegal operation on a directory'));
    await expect(updateWiki('content')).rejects.toThrow('EISDIR');
  });
});
