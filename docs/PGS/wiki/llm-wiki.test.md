# LLM Wiki Test

## Test: Wiki Structure and Content

- **Test ID**: WIKI-001
- **Description**: Verify that the wiki file starts with the correct front matter (four `---` lines) and contains the expected sections.
- **Steps**:
  1. Read the file `docs/PGS/wiki/llm-wiki.md`.
  2. Check that the first four lines are exactly `---`.
  3. Verify that the file contains the section `# LLM Wiki`.
  4. Verify that the file contains the section `## Architecture`.
  5. Verify that the file contains the section `## Key Decisions`.
  6. Verify that the file contains the section `## Conventions`.
  7. Verify that the file contains the section `## Patterns`.
  8. Verify that the file contains the section `## Milestones`.
- **Expected Result**: All checks pass.

## Test: Nightly Wiki Update Entry

- **Test ID**: WIKI-002
- **Description**: Verify that the most recent nightly wiki update entry (dated 2025-02-14) is present and correctly formatted.
- **Steps**:
  1. Search for the string `**Test: Nightly wiki update verified (2025-02-14)**` in the file.
  2. Verify that the following lines contain:
     - `- **Verification**: Commit \`b05b618\` confirms another successful automatic nightly wiki update.`
     - `- **Impact**: Continues to demonstrate robustness of the automated system; the project remains on track to achieve fully stable test automation.`
- **Expected Result**: The entry is found and matches the expected format.

## Test: No Trailing Whitespace or Incomplete Lines

- **Test ID**: WIKI-003
- **Description**: Verify that the file ends with a complete line (no trailing whitespace) and does not contain any incomplete lines.
- **Steps**:
  1. Read the last line of the file.
  2. Check that it is not empty and does not end with whitespace.
  3. Ensure that the file ends with a newline character.
- **Expected Result**: The file ends correctly.

## Test: Consistency of Entries

- **Test ID**: WIKI-004
- **Description**: Verify that all nightly update entries follow the same pattern (bold title, verification, impact).
- **Steps**:
  1. Extract all lines matching the pattern `**Test: ...**`.
  2. For each such line, verify that the next two lines start with `- **Verification**:` and `- **Impact**:` respectively.
- **Expected Result**: All entries are consistent.

## Test: No Duplicate Entries

- **Test ID**: WIKI-005
- **Description**: Verify that there are no duplicate nightly update entries for the same date.
- **Steps**:
  1. Extract all dates from the `**Test: ...**` lines.
  2. Check that each date appears only once.
- **Expected Result**: No duplicates found.
