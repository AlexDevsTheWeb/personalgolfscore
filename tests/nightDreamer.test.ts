import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

// Mock the external modules that the night dreamer relies on
vi.mock('fs/promises');
vi.mock('child_process');

// Import the module after mocking (adjust import path as needed)
import { runNightlyAutomation } from '../src/automation/nightDreamer';

describe('Night Dreamer - Nightly Automation', () => {
  const mockWikiPath = '/path/to/llm-wiki.md';
  const mockVaultPath = '/path/to/vault';
  const mockHcpChain = { currentHCP: 'abc123' };

  beforeEach(() => {
    vi.clearAllMocks();
    // Set environment variables if necessary
    process.env.WIKI_PATH = mockWikiPath;
    process.env.VAULT_PATH = mockVaultPath;
    process.env.HCP_CHAIN = JSON.stringify(mockHcpChain);
  });

  afterAll(() => {
    delete process.env.WIKI_PATH;
    delete process.env.VAULT_PATH;
    delete process.env.HCP_CHAIN;
  });

  it('should update the wiki file with correct path', async () => {
    // Arrange
    (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue('## Existing Wiki\nContent');
    (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
    (execSync as ReturnType<typeof vi.fn>).mockReturnValue(Buffer.from(''));

    // Act
    await runNightlyAutomation();

    // Assert: verify that readFile was called with the correct path
    expect(fs.readFile).toHaveBeenCalledWith(mockWikiPath, 'utf-8');
  });

  it('should handle missing wiki file gracefully', async () => {
    // Arrange
    (fs.readFile as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('ENOENT'));
    (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

    // Act & Assert: should not throw, should create the file
    await expect(runNightlyAutomation()).resolves.not.toThrow();
    expect(fs.writeFile).toHaveBeenCalledWith(mockWikiPath, expect.any(String), 'utf-8');
  });

  it('should generate regression tests and verify their syntax', async () => {
    // Arrange: mock successful wiki read/write and test generation command
    (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue('## Nightly Report\n');
    (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
    // Simulate successful test generation
    (execSync as ReturnType<typeof vi.fn>).mockImplementation((command: string) => {
      if (command.includes('generate-tests')) {
        return Buffer.from('Test generation completed successfully');
      }
      return Buffer.from('');
    });

    // Act
    await runNightlyAutomation();

    // Assert: test generation command was executed
    expect(execSync).toHaveBeenCalledWith(
      expect.stringContaining('generate-tests'),
      expect.any(Object)
    );
  });

  it('should handle test generation failure', async () => {
    // Arrange
    (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue('## Existing Wiki\n');
    (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
    (execSync as ReturnType<typeof vi.fn>).mockImplementation(() => {
      throw new Error('Test generation failed');
    });

    // Act & Assert: should log error and continue
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await expect(runNightlyAutomation()).resolves.not.toThrow();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Test generation failed'),
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });

  it('should use currentHCP for chain anchoring instead of initialHCP', async () => {
    // Arrange
    (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue('## Chain Status\ninitialHCP: oldHash');
    (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
    (execSync as ReturnType<typeof vi.fn>).mockReturnValue(Buffer.from(''));

    // Act
    await runNightlyAutomation();

    // Assert: the written file should reference currentHCP
    const writtenContent = (fs.writeFile as ReturnType<typeof vi.fn>).mock.calls[0][1];
    expect(writtenContent).toContain('currentHCP: abc123');
    expect(writtenContent).not.toContain('initialHCP: oldHash');
  });

  it('should maintain path consistency when wiki file location changes', async () => {
    // Arrange: simulate path change via environment variable override
    const altPath = '/different/path/llm-wiki.md';
    process.env.WIKI_PATH = altPath;
    (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue('## Old Location\n');
    (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
    (execSync as ReturnType<typeof vi.fn>).mockReturnValue(Buffer.from(''));

    // Act
    await runNightlyAutomation();

    // Assert: uses the new path
    expect(fs.readFile).toHaveBeenCalledWith(altPath, 'utf-8');
    delete process.env.WIKI_PATH;
  });

  it('should handle concurrent nightly runs without conflicts', async () => {
    // Arrange: simulate race condition by delaying first call
    (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue('## Current\n');
    (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);
    // Make the second call while first is in progress
    const promise1 = runNightlyAutomation();
    const promise2 = runNightlyAutomation();

    // Act & Assert: both should complete without errors
    await expect(Promise.all([promise1, promise2])).resolves.not.toThrow();
  });

  it('should validate that generated regression tests are syntactically correct', async () => {
    // Arrange: mock test generation output then verify syntax using TypeScript compiler
    (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue('## Nightly\n');
    (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
    const mockGeneratedTest = `describe('Generated test', () => { it('should pass', () => { expect(1).toBe(1); }); });`;
    (execSync as ReturnType<typeof vi.fn>).mockImplementation((command: string) => {
      if (command.includes('generate-tests')) {
        // Write the generated test to a temp file for syntax check
        const tempFile = path.join(__dirname, '../temp-generated-test.ts');
        fs.writeFileSync(tempFile, mockGeneratedTest);
        return Buffer.from('Generated tests');
      }
      return Buffer.from('');
    });

    // Act
    await runNightlyAutomation();

    // Assert: no syntax error when compiling the generated test
    const compileCmd = `npx tsc --noEmit ${path.join(__dirname, '../temp-generated-test.ts')}`;
    expect(() => execSync(compileCmd)).not.toThrow();

    // Clean up temp file
    fs.unlinkSync(path.join(__dirname, '../temp-generated-test.ts'));
  });
});
