import { readFileSync } from 'fs';
import { strict as assert } from 'assert';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const wikiPath = resolve(__dirname, '..', 'docs', 'PGS', 'wiki', 'llm-wiki.md');

// Helper: parse wiki entries (Bug Fix, Feature, Test) with their sub-items
function parseEntries(content) {
  const entries = [];
  // Match lines that start with '**' and have a colon like **Bug Fix:**
  const entryRegex = /^\*\*(.+?):\*\*\s+(.+)$/gm;
  let match;
  while ((match = entryRegex.exec(content)) !== null) {
    const type = match[1]; // e.g., "Bug Fix", "Feature", "Test"
    const title = match[2];
    // Collect following lines until next entry or end
    const startIndex = match.index + match[0].length;
    const remaining = content.slice(startIndex);
    const nextEntryIndex = remaining.search(/^\*\*/m);
    const body = nextEntryIndex === -1 ? remaining.trim() : remaining.slice(0, nextEntryIndex).trim();
    entries.push({ type, title, body });
  }
  return entries;
}

// Helper: extract fields from body (e.g., Issue, Resolution, Verification, Impact)
function extractFields(body) {
  const fields = {};
  // Match lines that start with "- **Field:**"
  const fieldRegex = /^-\s+\*\*(.+?):\*\*\s+(.+)$/gm;
  let match;
  while ((match = fieldRegex.exec(body)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    fields[key] = value;
  }
  return fields;
}

describe('LLM Wiki Format', () => {
  let content;
  let entries;

  beforeAll(() => {
    content = readFileSync(wikiPath, 'utf8');
    entries = parseEntries(content);
  });

  test('wiki file exists and has entries', () => {
    assert.ok(content.length > 0, 'Wiki file should not be empty');
    assert.ok(entries.length > 0, 'Wiki should have at least one entry');
  });

  test('each entry has required fields', () => {
    for (const entry of entries) {
      const fields = extractFields(entry.body);

      // All entries must have a title that starts with a date pattern
      assert.match(entry.title.trim(), /^\(\d{4}-\d{2}-\d{2}\)/, `Entry "${entry.type}" should start with a date in parentheses`);

      // Bug Fix entries must have Issue and Resolution
      if (entry.type === 'Bug Fix') {
        assert.ok(fields['Issue'], 'Bug Fix must have an Issue field');
        assert.ok(fields['Resolution'], 'Bug Fix must have a Resolution field');
      }

      // Feature entries must have Change and Impact
      if (entry.type === 'Feature') {
        assert.ok(fields['Change'], 'Feature must have a Change field');
        assert.ok(fields['Impact'], 'Feature must have an Impact field');
      }

      // Test entries must have Verification and Impact
      if (entry.type === 'Test') {
        assert.ok(fields['Verification'], 'Test must have a Verification field');
        assert.ok(fields['Impact'], 'Test must have an Impact field');
      }
    }
  });

  test('each Verification field contains at least one commit hash', () => {
    for (const entry of entries) {
      const fields = extractFields(entry.body);
      if (fields['Verification']) {
        const commitHashes = fields['Verification'].match(/`[0-9a-f]{7,40}`/g);
        assert.ok(commitHashes && commitHashes.length > 0,
          `Verification in "${entry.type}" (${entry.title}) should contain at least one commit hash`);
      }
    }
  });

  test('the most recent entry (2025-02-02) is correct', () => {
    // Find entry with date 2025-02-02
    const recentEntry = entries.find(e => e.title.trim().startsWith('(2025-02-02)'));
    assert.ok(recentEntry, 'There should be an entry for 2025-02-02');
    assert.equal(recentEntry.type, 'Test', 'The 2025-02-02 entry should be of type Test');
    const fields = extractFields(recentEntry.body);
    assert.equal(fields['Verification'], 'Commit `af0ff1d` confirms another successful automatic nightly regression test generation.',
      'Verification for 2025-02-02 should match the expected commit');
    assert.ok(fields['Impact'] && fields['Impact'].includes('build confidence'),
      'Impact for 2025-02-02 should include "build confidence"');
  });
});
