import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { updateWiki } from '../wikiUpdater';
import { readFile, writeFile } from 'fs/promises';

vi.mock('fs/promises');

describe('updateWiki', () => {
  const mockWriteFile = vi.mocked(writeFile);
  const mockReadFile = vi.mocked(readFile);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('happy path', () => {
    it('should remove leading dashes and append new entry when file starts with dashes', async () => {
      const initialContent = '---\n---\n---\n# LLM Wiki\n\nExisting content.';
      const newEntry = '**Test: New entry**\n- **Verification**: Commit `abc123`';
      mockReadFile.mockResolvedValue(initialContent);
      mockWriteFile.mockResolvedValue(undefined);

      await updateWiki(newEntry);

      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.any(String),
        '# LLM Wiki\n\nExisting content.\n\n**Test: New entry**\n- **Verification**: Commit `abc123`\n',
        'utf-8'
      );
    });

    it('should not modify file if there are no leading dashes', async () => {
      const content = '# LLM Wiki\n\nExisting content.';
      const newEntry = '**Test: Another**';
      mockReadFile.mockResolvedValue(content);
      mockWriteFile.mockResolvedValue(undefined);

      await updateWiki(newEntry);

      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.any(String),
        '# LLM Wiki\n\nExisting content.\n\n**Test: Another**\n',
        'utf-8'
      );
    });

    it('should handle empty file by adding content', async () => {
      mockReadFile.mockResolvedValue('');
      const newEntry = '**Test: First**';
      await updateWiki(newEntry);

      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.any(String),
        '\n**Test: First**\n',
        'utf-8'
      );
    });

    it('should handle file with only dashes', async () => {
      const dashes = '---\n---\n---\n---';
      mockReadFile.mockResolvedValue(dashes);
      const newEntry = '**Test: After dashes**';
      await updateWiki(newEntry);

      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.any(String),
        '\n**Test: After dashes**\n',
        'utf-8'
      );
    });

    it('should handle file with trailing newlines', async () => {
      const content = '# LLM Wiki\n\nContent.\n\n';
      mockReadFile.mockResolvedValue(content);
      const newEntry = '**Test: Trailing**';
      await updateWiki(newEntry);

      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.any(String),
        '# LLM Wiki\n\nContent.\n\n**Test: Trailing**\n',
        'utf-8'
      );
    });

    it('should preserve existing entries and append new one', async () => {
      const existing = '# LLM Wiki\n\n**Test: Old entry**';
      mockReadFile.mockResolvedValue(existing);
      const newEntry = '**Test: New entry**';
      await updateWiki(newEntry);

      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.any(String),
        '# LLM Wiki\n\n**Test: Old entry**\n\n**Test: New entry**\n',
        'utf-8'
      );
    });

    it('should handle file with no trailing newline', async () => {
      const content = '# LLM Wiki\n\nExisting content';
      mockReadFile.mockResolvedValue(content);
      const newEntry = '**Test: No trailing newline**';
      await updateWiki(newEntry);

      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.any(String),
        '# LLM Wiki\n\nExisting content\n\n**Test: No trailing newline**\n',
        'utf-8'
      );
    });

    it('should handle file with only whitespace', async () => {
      const whitespace = '   \n\n  ';
      mockReadFile.mockResolvedValue(whitespace);
      const newEntry = '**Test: Whitespace only**';
      await updateWiki(newEntry);

      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.any(String),
        '   \n\n  \n**Test: Whitespace only**\n',
        'utf-8'
      );
    });

    it('should handle file with leading dashes and spaces', async () => {
      const content = '---\n   ---\n# LLM Wiki\n\nContent';
      mockReadFile.mockResolvedValue(content);
      const newEntry = '**Test: Mixed dashes**';
      await updateWiki(newEntry);

      // Expects to strip all leading lines that contain only dashes and optional spaces
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.any(String),
        '# LLM Wiki\n\nContent\n\n**Test: Mixed dashes**\n',
        'utf-8'
      );
    });
  });

  describe('error handling', () => {
    it('should reject if readFile fails', async () => {
      mockReadFile.mockRejectedValue(new Error('Read error'));
      await expect(updateWiki('test')).rejects.toThrow('Read error');
    });

    it('should reject if writeFile fails', async () => {
      mockReadFile.mockResolvedValue('# LLM Wiki');
      mockWriteFile.mockRejectedValue(new Error('Write error'));
      await expect(updateWiki('test')).rejects.toThrow('Write error');
    });
  });

  describe('input validation', () => {
    it('should throw if newEntry is not a string', async () => {
      await expect(updateWiki(undefined as any)).rejects.toThrow('newEntry must be a string');
    });

    it('should throw if newEntry is empty string', async () => {
      await expect(updateWiki('')).rejects.toThrow('newEntry must not be empty');
    });
  });

  describe('path handling', () => {
    it('should use default wiki path when none provided', async () => {
      mockReadFile.mockResolvedValue('');
      mockWriteFile.mockResolvedValue(undefined);

      await updateWiki('**Test: Default path**');

      // Verify that the path passed to readFile is the default (e.g., 'llm-wiki.md')
      expect(mockReadFile).toHaveBeenCalledWith('llm-wiki.md', 'utf-8');
      expect(mockWriteFile).toHaveBeenCalledWith('llm-wiki.md', expect.any(String), 'utf-8');
    });

    it('should use provided path', async () => {
      const customPath = 'docs/custom-wiki.md';
      mockReadFile.mockResolvedValue('# Custom Wiki');
      mockWriteFile.mockResolvedValue(undefined);

      await updateWiki('**Test: Custom path**', customPath);

      expect(mockReadFile).toHaveBeenCalledWith(customPath, 'utf-8');
      expect(mockWriteFile).toHaveBeenCalledWith(customPath, expect.any(String), 'utf-8');
    });
  });
});
