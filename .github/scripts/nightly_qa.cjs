const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WIKI_PATH = path.join(process.cwd(), 'docs', 'llm-wiki', 'wiki', 'llm-wiki.md');
const MODEL_NAME = 'google/gemini-2.0-flash-001'; // Fast/cheap instruct model for test generation

async function run() {
  try {
    console.log("=== Agent 2: Quality Analysis and Test Generation ===");
    
    const gitDiff = execSync('git diff HEAD~1 HEAD -- . ":!.github"').toString();
    const wikiContent = fs.existsSync(WIKI_PATH) ? fs.readFileSync(WIKI_PATH, 'utf-8') : "";

    if (!gitDiff.trim()) {
      console.log("No recent code changes to test.");
      return;
    }

    const systemPrompt = `You are a Senior QA Automation Engineer and Software Tester.
Your task is to analyze recently modified code and the architectural rules described in the project wiki.
You must generate a complete Unit Test or Integration Test file focused on covering edge cases of the newly written code.

Respond EXCLUSIVELY with a valid JSON structure containing two keys:
1. "testFilePath": the recommended path where to save the test file (e.g. "src/components/mymap.test.ts").
2. "testCode": the complete source code of the test file.
Do not add textual explanations outside the JSON.`;

    const userPrompt = `Project Wiki:\n${wikiContent}\n\nRecently modified code (Diff):\n${gitDiff}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
      console.error("OpenRouter API error response:", JSON.stringify(data, null, 2));
      throw new Error(`Invalid API response: ${data.error?.message || data.error || "no choices returned"}`);
    }
    let jsonContent = data.choices[0].message.content.trim();
    
    // Clean markdown code blocks if present
    if (jsonContent.startsWith("```json")) jsonContent = jsonContent.replace(/^```json\n/, "").replace(/\n```$/, "");
    if (jsonContent.startsWith("```")) jsonContent = jsonContent.replace(/^```\n/, "").replace(/\n```$/, "");

    const result = JSON.parse(jsonContent);

    // Create directory if it doesn't exist and write the test file
    const fullTestPath = path.join(process.cwd(), result.testFilePath);
    fs.mkdirSync(path.dirname(fullTestPath), { recursive: true });
    fs.writeFileSync(fullTestPath, result.testCode, 'utf-8');
    console.log(`Test file generated at: ${result.testFilePath}`);

    // Commit the new test
    execSync('git config --global user.name "github-actions[bot]"');
    execSync('git config --global user.email "github-actions[bot]@users.noreply.github.com"');
    execSync(`git add "${result.testFilePath}"`);
    execSync('git commit -m "test: automatic nightly regression test generation"');
    execSync('git push');

    // Create notification issue on GitHub
    console.log("=== Opening Notification Issue ===");
    await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/issues`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "Accept": "application/vnd.github+json"
      },
      body: JSON.stringify({
        title: `🤖 Pipeline Complete: Wiki Updated and New Tests Released`,
        body: `### Agentic Ecosystem Report\n\n1. **Agent 1 (Dreamer):** Digested changes and updated the \`llm-wiki.md\`.\n2. **Agent 2 (QA Guard):** Analyzed new constraints and successfully generated a new regression test file.\n\n* **Test file created:** \`${result.testFilePath}\`\n\n_The repository is now aligned and ready for tomorrow's workday._`,
        labels: ["agent-notification"]
      })
    });

  } catch (error) {
    console.error("Error in workflow 2:", error);
    process.exit(1);
  }
}
run();