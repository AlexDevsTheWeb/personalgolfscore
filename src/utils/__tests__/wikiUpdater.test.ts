import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateWiki } from '../wikiUpdater'; // hypothetical module
import { readFile, writeFile } from 'fs/promises';

vi.mock('fs/promises');

describe('wikiUpdater', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should remove leading dashes and append new entry when file starts with dashes', async () => {
    const initialContent = '---\n---\n---\n# LLM Wiki\n\nExisting content.';
    const newEntry = '**Test: New entry**\n- **Verification**: Commit `abc123`';
    vi.mocked(readFile).mockResolvedValue(initialContent);
    vi.mocked(writeFile).mockResolvedValue(undefined);

    await updateWiki(newEntry);

    const expectedContent = '# LLM Wiki\n\nExisting content.\n\n**Test: New entry**\n- **Verification**: Commit `abc123`\n';
    expect(writeFile).toHaveBeenCalledWith(expect.any(String), expectedContent, 'utf-8');
  });

  it('should not modify file if there are no leading dashes', async () => {
    const content = '# LLM Wiki\n\nExisting content.';
    const newEntry = '**Test: Another**';
    vi.mocked(readFile).mockResolvedValue(content);
    vi.mocked(writeFile).mockResolvedValue(undefined);

    await updateWiki(newEntry);

    const expectedContent = '# LLM Wiki\n\nExisting content.\n\n**Test: Another**\n';
    expect(writeFile).toHaveBeenCalledWith(expect.any(String), expectedContent, 'utf-8');
  });

  it('should handle empty file by adding content', async () => {
    vi.mocked(readFile).mockResolvedValue('');
    const newEntry = '**Test: First**';
    await updateWiki(newEntry);

    const expectedContent = '\n**Test: First**\n';
    expect(writeFile).toHaveBeenCalledWith(expect.any(String), expectedContent, 'utf-8');
  });

  it('should handle file with only dashes', async () => {
    const dashes = '---\n---\n---\n---';
    vi.mocked(readFile).mockResolvedValue(dashes);
    const newEntry = '**Test: After dashes**';
    await updateWiki(newEntry);

    const expectedContent = '\n**Test: After dashes**\n';
    expect(writeFile).toHaveBeenCalledWith(expect.any(String), expectedContent, 'utf-8');
  });

  it('should handle file with trailing newlines', async () => {
    const content = '# LLM Wiki\n\nContent.\n\n';
    vi.mocked(readFile).mockResolvedValue(content);
    const newEntry = '**Test: Trailing**';
    await updateWiki(newEntry);

    const expectedContent = '# LLM Wiki\n\nContent.\n\n**Test: Trailing**\n';
    expect(writeFile).toHaveBeenCalledWith(expect.any(String), expectedContent, 'utf-8');
  });

  it('should preserve existing entries and append new one', async () => {
    const existing = '# LLM Wiki\n\n**Test: Old entry**';
    vi.mocked(readFile).mockResolvedValue(existing);
    const newEntry = '**Test: New entry**';
    await updateWiki(newEntry);

    const expectedContent = '# LLM Wiki\n\n**Test: Old entry**\n\n**Test: New entry**\n';
    expect(writeFile).toHaveBeenCalledWith(expect.any(String), expectedContent, 'utf-8');
  });

  it('should reject if readFile fails', async () => {
    vi.mocked(readFile).mockRejectedValue(new Error('Read error'));
    await expect(updateWiki('test')).rejects.toThrow('Read error');
  });

  it('should reject if writeFile fails', async () => {
    vi.mocked(readFile).mockResolvedValue('# LLM Wiki');
    vi.mocked(writeFile).mockRejectedValue(new Error('Write error'));
    await expect(updateWiki('test')).rejects.toThrow('Write error');
  });
});
