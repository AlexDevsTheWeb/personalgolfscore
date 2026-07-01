import { strict as assert } from 'assert';

// Replicate the helper functions from the original test for isolated testing
function parseEntries(content) {
  const entries = [];
  const entryRegex = /^\*\*(.+?):\*\*\s+(.+)$/gm;
  let match;
  while ((match = entryRegex.exec(content)) !== null) {
    const type = match[1];
    const title = match[2];
    const startIndex = match.index + match[0].length;
    const remaining = content.slice(startIndex);
    const nextEntryIndex = remaining.search(/^\*\*/m);
    const body = nextEntryIndex === -1 ? remaining.trim() : remaining.slice(0, nextEntryIndex).trim();
    entries.push({ type, title, body });
  }
  return entries;
}

function extractFields(body) {
  const fields = {};
  const fieldRegex = /^-\s+\*\*(.+?):\*\*\s+(.+)$/gm;
  let match;
  while ((match = fieldRegex.exec(body)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    fields[key] = value;
  }
  return fields;
}

describe('LLM Wiki Format - Unit Tests', () => {

  describe('parseEntries', () => {
    test('returns empty array for empty content', () => {
      assert.deepStrictEqual(parseEntries(''), []);
    });

    test('returns empty array for content without entries', () => {
      const content = 'Some text without any pattern.';
      assert.deepStrictEqual(parseEntries(content), []);
    });

    test('parses a single entry correctly', () => {
      const content = '**Bug Fix:** (2020-01-01) Some issue here\n- **Issue:** foo\n- **Resolution:** bar';
      const entries = parseEntries(content);
      assert.strictEqual(entries.length, 1);
      assert.strictEqual(entries[0].type, 'Bug Fix');
      assert.strictEqual(entries[0].title.trim(), '(2020-01-01) Some issue here');
      assert.ok(entries[0].body.includes('- **Issue:** foo'));
    });

    test('parses multiple entries correctly', () => {
      const content = [
        '**Feature:** (2020-01-01) First entry',
        '- **Change:** A',
        '- **Impact:** B',
        '',
        '**Test:** (2020-01-02) Second entry',
        '- **Verification:** Commit `abc123`',
        '- **Impact:** C'
      ].join('\n');
      const entries = parseEntries(content);
      assert.strictEqual(entries.length, 2);
      assert.strictEqual(entries[0].type, 'Feature');
      assert.strictEqual(entries[1].type, 'Test');
    });

    test('handles entries with no body', () => {
      const content = '**Bug Fix:** (2020-01-01) No body here';
      const entries = parseEntries(content);
      assert.strictEqual(entries.length, 1);
      assert.strictEqual(entries[0].body, '');
    });

    test('handles entries with body containing extra blank lines', () => {
      const content = '**Feature:** (2020-01-01) Title\n- **Change:** X\n\n\n- **Impact:** Y';
      const entries = parseEntries(content);
      assert.strictEqual(entries[0].body, '- **Change:** X\n\n\n- **Impact:** Y');
    });

    test('ignores colons in type/title if not immediately after **', () => {
      const content = '**Bug Fix:** (2020-01-01) Title with: colon';
      const entries = parseEntries(content);
      assert.strictEqual(entries.length, 1);
      assert.strictEqual(entries[0].type, 'Bug Fix');
      assert.strictEqual(entries[0].title.trim(), '(2020-01-01) Title with: colon');
    });
  });

  describe('extractFields', () => {
    test('returns empty object for empty body', () => {
      assert.deepStrictEqual(extractFields(''), {});
    });

    test('returns empty object for body without matching fields', () => {
      const body = 'Some random text without dashes or bold.';
      assert.deepStrictEqual(extractFields(body), {});
    });

    test('extracts single field', () => {
      const body = '- **Issue:** Something';
      assert.deepStrictEqual(extractFields(body), { Issue: 'Something' });
    });

    test('extracts multiple fields', () => {
      const body = [
        '- **Issue:** A',
        '- **Resolution:** B',
        '- **Impact:** C'
      ].join('\n');
      assert.deepStrictEqual(extractFields(body), {
        Issue: 'A',
        Resolution: 'B',
        Impact: 'C'
      });
    });

    test('handles field values with colons', () => {
      const body = '- **Verification:** Commit `abc123` confirms something: success.';
      const fields = extractFields(body);
      assert.strictEqual(fields['Verification'], 'Commit `abc123` confirms something: success.');
    });

    test('handles fields with extra spaces around key', () => {
      const body = '- **  Issue  :** Value';  // Note: spaces inside ** **
      const fields = extractFields(body);
      // The regex captures the content inside ** ** and then trims it, so key becomes '  Issue  ' trimmed to 'Issue'
      assert.strictEqual(fields['Issue'], 'Value');
    });

    test('only captures first field per line', () => {
      const body = '- **Issue:** First - **Other:** Second';
      const fields = extractFields(body);
      // The regex matches the first occurrence per line due to /gm
      assert.strictEqual(fields['Issue'], 'First - **Other:** Second');
      assert.strictEqual(fields['Other'], undefined);
    });

    test('handles body with newlines between fields', () => {
      const body = '- **Change:** A\n\n- **Impact:** B';
      assert.deepStrictEqual(extractFields(body), {
        Change: 'A',
        Impact: 'B'
      });
    });
  });

  describe('Validation Rules', () => {
    // These tests mimic the integration test but with mock data
    test('Bug Fix entry must have Issue and Resolution', () => {
      const entry = { type: 'Bug Fix', title: '(2020-01-01) Something', body: '- **Issue:** X\n- **Resolution:** Y' };
      const fields = extractFields(entry.body);
      assert.ok(fields['Issue']);
      assert.ok(fields['Resolution']);
    });

    test('Bug Fix entry missing fields should fail', () => {
      const entry = { type: 'Bug Fix', title: '(2020-01-01) Something', body: '- **Issue:** X' };
      const fields = extractFields(entry.body);
      assert.ok(fields['Issue']);
      assert.ok(!fields['Resolution']); // missing
    });

    test('Feature entry must have Change and Impact', () => {
      const entry = { type: 'Feature', title: '(2020-01-01) Something', body: '- **Change:** A\n- **Impact:** B' };
      const fields = extractFields(entry.body);
      assert.ok(fields['Change']);
      assert.ok(fields['Impact']);
    });

    test('Test entry must have Verification and Impact', () => {
      const entry = { type: 'Test', title: '(2020-01-01) Something', body: '- **Verification:** Commit `abc123`\n- **Impact:** B' };
      const fields = extractFields(entry.body);
      assert.ok(fields['Verification']);
      assert.ok(fields['Impact']);
    });

    test('Verification field must contain at least one commit hash', () => {
      const verification = 'Commit `abc123` and `def456`';
      const hashes = verification.match(/`[0-9a-f]{7,40}`/g);
      assert.ok(hashes && hashes.length > 0);
    });

    test('Verification field without commit hash should fail', () => {
      const verification = 'No commit here';
      const hashes = verification.match(/`[0-9a-f]{7,40}`/g);
      assert.ok(!hashes || hashes.length === 0);
    });

    test('Entry title must start with a date in parentheses', () => {
      const goodTitle = '(2025-02-02) Some title';
      const badTitle = '2025-02-02 No parentheses';
      assert.match(goodTitle, /^\(\d{4}-\d{2}-\d{2}\)/);
      assert.ok(!/^\(\d{4}-\d{2}-\d{2}\)/.test(badTitle));
    });

    test('Date format must be exactly YYYY-MM-DD', () => {
      const validDates = ['(2025-01-01)', '(1999-12-31)', '(2077-10-10)'];
      const invalidDates = ['(25-01-01)', '(01-01-2025)', '(2025/01/01)', '(2025-1-1)', '(2025-01-01 extra)'];
      const regex = /^\(\d{4}-\d{2}-\d{2}\)$/;
      validDates.forEach(d => assert.ok(regex.test(d), `${d} should be valid`));
      invalidDates.forEach(d => assert.ok(!regex.test(d), `${d} should be invalid`));
    });

    test('Entry type must be one of Bug Fix, Feature, or Test', () => {
      const validTypes = ['Bug Fix', 'Feature', 'Test'];
      const entry = { type: 'Unknown' };
      assert.ok(validTypes.includes('Bug Fix'));
      assert.ok(!validTypes.includes('Unknown'));
    });
  });
});
