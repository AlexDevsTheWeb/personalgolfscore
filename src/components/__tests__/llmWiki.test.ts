import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// Helper to simulate the nightly agent's wiki update logic
function updateWikiContent(content: string): string {
  // Remove leading dashes if present
  let lines = content.split('\n');
  if (lines[0] === '---' && lines[1] === '---') {
    lines = lines.slice(2);
  }
  // Ensure the first line is '# LLM Wiki'
  if (lines[0] !== '# LLM Wiki') {
    lines.unshift('# LLM Wiki');
  }
  // Add or update the 'Nightly regression test generation retested' bullet
  const bulletIndex = lines.findIndex(l => l.includes('- **Automatic nightly regression test generation**'));
  if (bulletIndex !== -1) {
    // Check if the next line already has the retested bullet
    if (lines[bulletIndex + 1] && !lines[bulletIndex + 1].includes('- **Nightly regression test generation retested**')) {
      lines.splice(bulletIndex + 1, 0, '- **Nightly regression test generation retested**: Successfully verified in commit `fa5f2e2`.');
    }
  }
  // Add or update the 'Iterative stability verification' bullet
  const patternIndex = lines.findIndex(l => l.includes('- **Test generation**'));
  if (patternIndex !== -1) {
    if (lines[patternIndex + 1] && !lines[patternIndex + 1].includes('- **Iterative stability verification**')) {
      lines.splice(patternIndex + 1, 0, '- **Iterative stability verification**: Each nightly run is treated as a verification step; regression test generation is repeatedly tested to ensure robustness (commit `fa5f2e2`).');
    }
  }
  // Ensure the milestones section has the 'Test automation fully stable' unchecked
  const milestoneIndex = lines.findIndex(l => l.includes('- [ ] Test automation fully stable'));
  if (milestoneIndex === -1) {
    const lastMilestoneIndex = lines.findIndex(l => l.includes('- [x] Automatic nightly regression test generation'));
    if (lastMilestoneIndex !== -1) {
      lines.splice(lastMilestoneIndex + 1, 0, '- [ ] Test automation fully stable');
    }
  }
  return lines.join('\n');
}

describe('LLM Wiki Nightly Agent', () => {
  it('should update the wiki content correctly', () => {
    const originalContent = `# LLM Wiki

Project knowledge base for AI agents.

## Architecture

- **Monorepo** with ES modules (\`"type": "module"\` in package.json).
- **CommonJS files** must use \`.cjs\` extension for compatibility (e.g., \`config.cjs\`, \`seed.cjs\`).
- **Nightly AI agent system** runs automatically to maintain wiki + test automation.
- **Workspace vault** used for import rounds HCP chain anchoring.
- **Night dreamer** is the component responsible for automated maintenance; it now uses the correct wiki path after a fix.

## Key Decisions

- **DeepSeek v4 Flash** is the current LLM provider (switched from Gemini 2.0 Flash, retired June 1).
- **Error logging** improved during provider migration.
- **HCP chain anchoring**: \`importRoundsBatch\` anchors to \`currentHCP\` instead of \`initialHCP\` to fix chain consistency.
- **Round holes calculation**: corrected in test data generator; expected values aligned accordingly.
- **Night dreamer wiki path**: corrected to point to the new LLM wiki location (previously pointing to a stale path).
- **Automatic nightly regression test generation**: The nightly agent now generates regression tests automatically (commit \`7fb6f29\`, confirmed by subsequent run \`3180519\`). This is a step toward fully stable test automation.
- **Combined nightly automation**: The nightly agent now both updates the wiki and generates regression tests in a single automated run (commits \`3180519\`, \`e091bbc\`).

## Conventions

- \`.cjs\` for CommonJS modules in ES module project.
- Workspace vault for HCP chain operations.
- Wiki updates documented with resolution sections for bug fixes.

## Patterns

- **Nightly automation**: AI agent updates wiki + runs tests on schedule (first fully automated cycle observed with commits \`3180519\` and \`e091bbc\`).
- **Bug fix documentation**: each fix includes resolution section in wiki and vault update.
- **Path consistency**: Ensure all references to the wiki in automation scripts (e.g., night dreamer) are updated when the file location changes.
- **Test generation**: The nightly agent now automatically generates regression tests, reducing manual test maintenance (commits \`7fb6f29\`, \`3180519\`).

## Milestones

- [x] AI wiki creation
- [x] Nightly AI agent system
- [x] HCP chain anchoring fix
- [x] Round holes calculation fix
- [x] Provider migration to DeepSeek v4 Flash
- [x] Automatic nightly regression test generation
- [ ] Test automation fully stable

---

**Bug Fix: Night dreamer wiki path (2025-01-27)**
- **Issue**: Night dreamer automation script had a hardcoded or stale path to the wiki file, causing it to update the wrong location.
- **Resolution**: Updated the path to match the new LLM wiki file location (commit \`623878c\`). Now the nightly agent correctly modifies the canonical \`llm-wiki.md\`.

**Feature: Automatic nightly regression test generation & wiki update (2025-01-28)**
- **Change**: The nightly agent now automatically generates regression tests (commit \`7fb6f29\`, re-executed \`3180519\`) and updates the wiki (commit \`e091bbc\`) in a single nightly run. This is part of the ongoing effort to stabilize test automation.
- **Impact**: Reduces manual test maintenance and wiki upkeep, moving the project closer to the "Test automation fully stable" milestone.

**Test: Nightly regression test generation retested (2025-01-29)**
- **Verification**: Commit \`fa5f2e2\` confirmed that the automatic regression test generation continues to function correctly in a subsequent nightly cycle.
- **Impact**: Increases confidence that the feature is stable; the project remains on track to achieve fully stable test automation.`;

    const expectedContent = `# LLM Wiki

Project knowledge base for AI agents.

## Architecture

- **Monorepo** with ES modules (\`"type": "module"\` in package.json).
- **CommonJS files** must use \`.cjs\` extension for compatibility (e.g., \`config.cjs\`, \`seed.cjs\`).
- **Nightly AI agent system** runs automatically to maintain wiki + test automation.
- **Workspace vault** used for import rounds HCP chain anchoring.
- **Night dreamer** is the component responsible for automated maintenance; it now uses the correct wiki path after a fix.

## Key Decisions

- **DeepSeek v4 Flash** is the current LLM provider (switched from Gemini 2.0 Flash, retired June 1).
- **Error logging** improved during provider migration.
- **HCP chain anchoring**: \`importRoundsBatch\` anchors to \`currentHCP\` instead of \`initialHCP\` to fix chain consistency.
- **Round holes calculation**: corrected in test data generator; expected values aligned accordingly.
- **Night dreamer wiki path**: corrected to point to the new LLM wiki location (previously pointing to a stale path).
- **Automatic nightly regression test generation**: The nightly agent now generates regression tests automatically (commit \`7fb6f29\`, confirmed by subsequent run \`3180519\`). This is a step toward fully stable test automation.
- **Combined nightly automation**: The nightly agent now both updates the wiki and generates regression tests in a single automated run (commits \`3180519\`, \`e091bbc\`).
- **Nightly regression test generation retested**: Successfully verified in commit \`fa5f2e2\`.

## Conventions

- \`.cjs\` for CommonJS modules in ES module project.
- Workspace vault for HCP chain operations.
- Wiki updates documented with resolution sections for bug fixes.

## Patterns

- **Nightly automation**: AI agent updates wiki + runs tests on schedule (first fully automated cycle observed with commits \`3180519\` and \`e091bbc\`).
- **Bug fix documentation**: each fix includes resolution section in wiki and vault update.
- **Path consistency**: Ensure all references to the wiki in automation scripts (e.g., night dreamer) are updated when the file location changes.
- **Test generation**: The nightly agent now automatically generates regression tests, reducing manual test maintenance (commits \`7fb6f29\`, \`3180519\`).
- **Iterative stability verification**: Each nightly run is treated as a verification step; regression test generation is repeatedly tested to ensure robustness (commit \`fa5f2e2\`).

## Milestones

- [x] AI wiki creation
- [x] Nightly AI agent system
- [x] HCP chain anchoring fix
- [x] Round holes calculation fix
- [x] Provider migration to DeepSeek v4 Flash
- [x] Automatic nightly regression test generation
- [ ] Test automation fully stable

---

**Bug Fix: Night dreamer wiki path (2025-01-27)**
- **Issue**: Night dreamer automation script had a hardcoded or stale path to the wiki file, causing it to update the wrong location.
- **Resolution**: Updated the path to match the new LLM wiki file location (commit \`623878c\`). Now the nightly agent correctly modifies the canonical \`llm-wiki.md\`.

**Feature: Automatic nightly regression test generation & wiki update (2025-01-28)**
- **Change**: The nightly agent now automatically generates regression tests (commit \`7fb6f29\`, re-executed \`3180519\`) and updates the wiki (commit \`e091bbc\`) in a single nightly run. This is part of the ongoing effort to stabilize test automation.
- **Impact**: Reduces manual test maintenance and wiki upkeep, moving the project closer to the "Test automation fully stable" milestone.

**Test: Nightly regression test generation retested (2025-01-29)**
- **Verification**: Commit \`fa5f2e2\` confirmed that the automatic regression test generation continues to function correctly in a subsequent nightly cycle.
- **Impact**: Increases confidence that the feature is stable; the project remains on track to achieve fully stable test automation.`;

    const updated = updateWikiContent(originalContent);
    expect(updated).toBe(expectedContent);
  });

  it('should handle missing initial dashes', () => {
    const content = '# LLM Wiki\n\n...';
    const result = updateWikiContent(content);
    expect(result.startsWith('# LLM Wiki')).toBe(true);
  });

  it('should not duplicate the retested bullet if already present', () => {
    const content = `# LLM Wiki

...
- **Automatic nightly regression test generation**: ...
- **Nightly regression test generation retested**: ...
...`;
    const result = updateWikiContent(content);
    const lines = result.split('\n');
    const retestedCount = lines.filter(l => l.includes('- **Nightly regression test generation retested**')).length;
    expect(retestedCount).toBe(1);
  });

  it('should add the iterative stability verification bullet after test generation', () => {
    const content = `# LLM Wiki

...
- **Test generation**: ...
...`;
    const result = updateWikiContent(content);
    const lines = result.split('\n');
    const idx = lines.findIndex(l => l.includes('- **Test generation**'));
    expect(lines[idx + 1]).toContain('- **Iterative stability verification**');
  });

  it('should ensure the test automation fully stable milestone is unchecked', () => {
    const content = `# LLM Wiki

...
- [x] Automatic nightly regression test generation
...`;
    const result = updateWikiContent(content);
    const lines = result.split('\n');
    const milestoneIndex = lines.findIndex(l => l.includes('- [ ] Test automation fully stable'));
    expect(milestoneIndex).not.toBe(-1);
  });
});
