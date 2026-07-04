import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nightlyUpdate } from './nightlyAgent';

// Mock dependencies
vi.mock('fs/promises');
import fs from 'fs/promises';

vi.mock('child_process');
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

describe('nightlyUpdate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should update the wiki when path is correct and test generation succeeds', async () => {
    // Mock successful wiki read/write
    (fs.readFile as jest.Mock).mockResolvedValue('Existing content');
    (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

    // Mock successful regression test generation via exec
    (exec as unknown as jest.Mock).mockResolvedValue({ stdout: 'Tests generated', stderr: '' });

    await expect(nightlyUpdate()).resolves.toBeUndefined();

    expect(fs.readFile).toHaveBeenCalledWith(expect.stringContaining('llm-wiki.md'));
    expect(fs.writeFile).toHaveBeenCalled();
    expect(exec).toHaveBeenCalledWith(expect.stringContaining('generate-tests'));
  });

  it('should handle stale wiki path by using corrected path', async () => {
    // Simulate initial read failing due to stale path
    (fs.readFile as jest.Mock).mockRejectedValueOnce(new Error('ENOENT: no such file or directory'));
    // Then succeed with fallback path
    (fs.readFile as jest.Mock).mockResolvedValueOnce('Correct content');
    (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
    (exec as unknown as jest.Mock).mockResolvedValue({ stdout: '', stderr: '' });

    await nightlyUpdate();

    // Expect the fallback path to be used
    expect(fs.readFile).toHaveBeenNthCalledWith(1, expect.stringContaining('old-path'));
    expect(fs.readFile).toHaveBeenNthCalledWith(2, expect.stringContaining('llm-wiki.md'));
    expect(fs.writeFile).toHaveBeenCalledWith(expect.stringContaining('llm-wiki.md'), 'Updated content');
  });

  it('should fail gracefully when test generation fails', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue('content');
    (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
    (exec as unknown as jest.Mock).mockRejectedValue(new Error('Test generation error'));

    await expect(nightlyUpdate()).rejects.toThrow('Test generation error');
  });

  it('should not modify wiki if test generation fails (rollback)', async () => {
    const originalContent = 'original';
    (fs.readFile as jest.Mock).mockResolvedValue(originalContent);
    (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
    (exec as unknown as jest.Mock).mockRejectedValue(new Error('Failed'));

    try {
      await nightlyUpdate();
    } catch {
      // Assert that writeFile was called once to update wiki before test generation, then rolled back?
      // Since we rollback, we expect writeFile to be called twice: first update, then restore original
      expect(fs.writeFile).toHaveBeenCalledTimes(2);
      expect(fs.writeFile).toHaveBeenNthCalledWith(1, expect.any(String), expect.not.stringContaining('original'));
      expect(fs.writeFile).toHaveBeenNthCalledWith(2, expect.any(String), originalContent);
    }
  });
});
