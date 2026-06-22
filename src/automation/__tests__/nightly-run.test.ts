import { runNightlyAutomation } from '../nightly-run';
import fs from 'fs';
import { execSync } from 'child_process';

jest.mock('fs');
jest.mock('child_process');
jest.mock('../config.cjs', () => ({
  wikiPath: 'docs/PGS/wiki/llm-wiki.md'
}));

const mockedFs = jest.mocked(fs);
const mockedExecSync = jest.mocked(execSync);

describe('Nightly automation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Wiki file existence', () => {
    it('should throw error if wiki file does not exist', () => {
      mockedFs.existsSync.mockReturnValue(false);
      expect(() => runNightlyAutomation()).toThrow('Wiki file not found');
      expect(mockedExecSync).not.toHaveBeenCalled();
    });

    it('should proceed if wiki file exists', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('content');
      mockedFs.writeFileSync.mockImplementation(() => {});
      mockedExecSync.mockReturnValue(Buffer.from(''));
      expect(() => runNightlyAutomation()).not.toThrow();
    });

    it('should use default wiki path when config is missing', () => {
      jest.resetModules();
      jest.mock('../config.cjs', () => ({})); // no wikiPath
      const { runNightlyAutomation: runFallback } = require('../nightly-run');
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('content');
      mockedFs.writeFileSync.mockImplementation(() => {});
      mockedExecSync.mockReturnValue(Buffer.from(''));
      expect(() => runFallback()).not.toThrow();
      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
        'docs/PGS/wiki/llm-wiki.md',
        expect.any(String)
      );
    });
  });

  describe('Wiki update process', () => {
    it('should update wiki at the correct path from config', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('original content');
      mockedFs.writeFileSync.mockImplementation(() => {});
      mockedExecSync.mockReturnValue(Buffer.from(''));
      runNightlyAutomation();
      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
        'docs/PGS/wiki/llm-wiki.md',
        expect.any(String)
      );
    });

    it('should read existing wiki content before update', () => {
      mockedFs.existsSync.mockReturnValue(true);
      const existingContent = 'old content';
      mockedFs.readFileSync.mockReturnValue(existingContent);
      mockedFs.writeFileSync.mockImplementation(() => {});
      mockedExecSync.mockReturnValue(Buffer.from(''));
      runNightlyAutomation();
      expect(mockedFs.readFileSync).toHaveBeenCalledWith('docs/PGS/wiki/llm-wiki.md', 'utf-8');
      // The actual content written could include the old content plus new stuff
      expect(mockedFs.writeFileSync).toHaveBeenCalledTimes(1);
    });

    it('should handle empty wiki content', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('');
      mockedFs.writeFileSync.mockImplementation(() => {});
      mockedExecSync.mockReturnValue(Buffer.from(''));
      expect(() => runNightlyAutomation()).not.toThrow();
    });

    it('should propagate error if write fails', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('content');
      mockedFs.writeFileSync.mockImplementation(() => {
        throw new Error('Write error');
      });
      expect(() => runNightlyAutomation()).toThrow('Write error');
      expect(mockedExecSync).not.toHaveBeenCalled();
    });
  });

  describe('Regression test generation', () => {
    it('should generate regression tests after successful wiki update', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('content');
      mockedFs.writeFileSync.mockImplementation(() => {});
      mockedExecSync.mockReturnValue(Buffer.from('test generation output'));
      runNightlyAutomation();
      expect(mockedExecSync).toHaveBeenCalledWith(
        'npm run test:generate-regression',
        expect.objectContaining({ cwd: expect.any(String) })
      );
    });

    it('should not generate tests if wiki update fails (read error)', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error('Read error');
      });
      expect(() => runNightlyAutomation()).toThrow('Read error');
      expect(mockedExecSync).not.toHaveBeenCalled();
    });

    it('should not generate tests if wiki update fails (write error)', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('content');
      mockedFs.writeFileSync.mockImplementation(() => {
        throw new Error('Write error');
      });
      expect(() => runNightlyAutomation()).toThrow('Write error');
      expect(mockedExecSync).not.toHaveBeenCalled();
    });

    it('should handle execSync failure gracefully', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('content');
      mockedFs.writeFileSync.mockImplementation(() => {});
      mockedExecSync.mockImplementation(() => {
        throw new Error('npm command failed');
      });
      // Decide: should it throw or log? Assume it throws
      expect(() => runNightlyAutomation()).toThrow('npm command failed');
    });
  });

  describe('Configuration variations', () => {
    it('should use custom wiki path from config', () => {
      jest.resetModules();
      jest.mock('../config.cjs', () => ({
        wikiPath: 'custom/path/wiki.md'
      }));
      const { runNightlyAutomation: runCustom } = require('../nightly-run');
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('content');
      mockedFs.writeFileSync.mockImplementation(() => {});
      mockedExecSync.mockReturnValue(Buffer.from(''));
      runCustom();
      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
        'custom/path/wiki.md',
        expect.any(String)
      );
    });

    it('should fallback to default path if config wikiPath is undefined', () => {
      jest.resetModules();
      jest.mock('../config.cjs', () => ({
        // no wikiPath
      }));
      const { runNightlyAutomation: runFallback } = require('../nightly-run');
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('content');
      mockedFs.writeFileSync.mockImplementation(() => {});
      mockedExecSync.mockReturnValue(Buffer.from(''));
      runFallback();
      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
        'docs/PGS/wiki/llm-wiki.md',
        expect.any(String)
      );
    });
  });

  describe('Combined nightly automation flow', () => {
    it('should complete wiki update and test generation without errors', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('content');
      mockedFs.writeFileSync.mockImplementation(() => {});
      mockedExecSync.mockReturnValue(Buffer.from(''));
      expect(() => runNightlyAutomation()).not.toThrow();
      expect(mockedFs.writeFileSync).toHaveBeenCalledTimes(1);
      expect(mockedExecSync).toHaveBeenCalledTimes(1);
    });

    it('should stop on first error (missing wiki file)', () => {
      mockedFs.existsSync.mockReturnValue(false);
      expect(() => runNightlyAutomation()).toThrow('Wiki file not found');
      expect(mockedFs.readFileSync).not.toHaveBeenCalled();
      expect(mockedFs.writeFileSync).not.toHaveBeenCalled();
      expect(mockedExecSync).not.toHaveBeenCalled();
    });
  });
});
