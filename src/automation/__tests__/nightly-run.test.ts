import { runNightlyAutomation } from '../nightly-run';
import fs from 'fs';
import { execSync } from 'child_process';

jest.mock('fs');
jest.mock('child_process');

const mockedFs = jest.mocked(fs);
const mockedExecSync = jest.mocked(execSync);

describe('Nightly automation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update wiki at the correct path', () => {
    const expectedWikiPath = 'docs/PGS/wiki/llm-wiki.md';
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue('content');
    runNightlyAutomation();
    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
      expectedWikiPath,
      expect.any(String)
    );
  });

  it('should generate regression tests after wiki update', () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue('content');
    runNightlyAutomation();
    expect(mockedExecSync).toHaveBeenCalledWith(
      'npm run test:generate-regression',
      expect.any(Object)
    );
  });

  it('should raise error if wiki file does not exist', () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(() => runNightlyAutomation()).toThrow('Wiki file not found');
  });

  it('should not generate tests if wiki update fails', () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockImplementation(() => {
      throw new Error('Read error');
    });
    expect(() => runNightlyAutomation()).toThrow('Read error');
    expect(mockedExecSync).not.toHaveBeenCalled();
  });

  it('should handle combined nightly automation without errors', () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue('old content');
    mockWriteFileSync.mockImplementation(() => {});
    mockExecSync.mockReturnValue(Buffer.from(''));
    expect(() => runNightlyAutomation()).not.toThrow();
    expect(mockedFs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(mockedExecSync).toHaveBeenCalledTimes(1);
  });

  it('should use correct wiki path from configuration', () => {
    // Assuming a config module exists with wiki path
    const mockConfig = require('../config.cjs');
    mockConfig.wikiPath = 'docs/PGS/wiki/llm-wiki.md';
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue('content');
    runNightlyAutomation();
    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
      mockConfig.wikiPath,
      expect.any(String)
    );
  });
});