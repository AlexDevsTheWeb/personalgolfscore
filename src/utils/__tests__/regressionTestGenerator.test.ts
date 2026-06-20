import { generateRegressionTests } from '../regressionTestGenerator';
import fs from 'fs';
import path from 'path';

jest.mock('fs');

const mockWriteFileSync = fs.writeFileSync as jest.Mock;
const mockMkdirSync = fs.mkdirSync as jest.Mock;

describe('generateRegressionTests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultDiffContent = `diff --git a/src/example.ts b/src/example.ts
index abc..def 100644
--- a/src/example.ts
+++ b/src/example.ts
@@ -1,3 +1,4 @@
-const a = 1;
+const a = 2;
+const b = 3;
`;

  it('should generate a test file when diff contains changed files', () => {
    const result = generateRegressionTests(defaultDiffContent, 'abc123');
    expect(result.length).toBeGreaterThan(0);
    expect(mockWriteFileSync).toHaveBeenCalled();
    expect(mockMkdirSync).toHaveBeenCalledWith(expect.stringContaining('regression'), { recursive: true });
  });

  it('should return empty array and not create files if diff is empty', () => {
    const result = generateRegressionTests('', 'empty');
    expect(result).toEqual([]);
    expect(mockWriteFileSync).not.toHaveBeenCalled();
  });

  it('should return empty array and not create files if diff contains only whitespace', () => {
    const result = generateRegressionTests('   \n  \n', 'whitespace');
    expect(result).toEqual([]);
    expect(mockWriteFileSync).not.toHaveBeenCalled();
  });

  it('should handle diff with multiple file changes', () => {
    const multiFileDiff = `diff --git a/modA.ts b/modA.ts
index 1..2 100644
--- a/modA.ts
+++ b/modA.ts
@@ -1 +1,2 @@
 old
+new

diff --git a/modB.ts b/modB.ts
index 3..4 100644
--- a/modB.ts
+++ b/modB.ts
@@ -1,3 +1,2 @@
 line1
-line2
 line3`;
    const result = generateRegressionTests(multiFileDiff, 'multi');
    expect(result.length).toBe(2);
    expect(mockWriteFileSync).toHaveBeenCalledTimes(2);
  });

  it('should produce valid test code (syntax check)', () => {
    const result = generateRegressionTests(defaultDiffContent, 'syntax');
    // Each generated test file should start with import statements and contain a describe block
    result.forEach(testFile => {
      expect(testFile.trim()).toMatch(/^(import|\/\*)/);
      expect(testFile).toContain('describe(');
      expect(testFile).toContain('it(');
    });
  });

  it('should handle diff that introduces new files (no previous content)', () => {
    const newFileDiff = `diff --git a/newfile.ts b/newfile.ts
new file mode 100644
index 000..abc
--- /dev/null
+++ b/newfile.ts
@@ -0,0 +1,2 @@
+const x = 10;
+export default x;
`;
    const result = generateRegressionTests(newFileDiff, 'new');
    expect(result.length).toBe(1);
    expect(result[0]).toContain('x');
  });

  it('should throw error for invalid diff format', () => {
    expect(() => generateRegressionTests('invalid format', 'bad')).toThrow();
  });

  it('should not modify files outside the designated test directory', () => {
    generateRegressionTests(defaultDiffContent, 'safe');
    const calls = mockWriteFileSync.mock.calls;
    calls.forEach(([filePath]) => {
      expect(filePath).toContain('__tests__');
    });
  });
});
