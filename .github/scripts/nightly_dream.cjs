const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WIKI_PATH = path.join(process.cwd(), 'docs', 'llm-wiki', 'wiki', 'llm-wiki.md'); 
const MODEL_NAME = 'deepseek/deepseek-v4-flash'; // Fast/cheap model for wiki updates

async function run() {
  try {
    console.log("=== Git Activity Analysis (Last 24 Hours) ===");
    const gitLog = execSync('git log --since="24 hours ago" --oneline').toString();
    const gitDiff = execSync('git diff @{1.day.ago} HEAD -- . ":!.github"').toString();
    
    if (!gitLog.trim() && !gitDiff.trim()) {
      console.log("No changes detected in the last 24 hours. Terminating without consuming tokens.");
      return;
    }

    let currentWiki = fs.existsSync(WIKI_PATH) ? fs.readFileSync(WIKI_PATH, 'utf-8') : "# LLM Wiki\n\nProject knowledge base for AI agents.\n";

    const systemPrompt = `You are a Senior Software Architect and expert Agentic Knowledge Maintainer.
Your task is to analyze source code changes from the last 24 hours and incrementally update the project's 'llm-wiki.md'.

Strictly follow the Karpathy documentation model:
- Concise, factual, dense with technical information, free of pleasantries or introductions.
- Focused on providing future context to other LLMs (like yourself or OpenCode during work hours).
- Focused on: architectural decisions made, component or state patterns introduced, libraries installed/updated, complex bugs resolved (lessons learned), and current status of technical pillars.

Operational rules:
- Respond EXCLUSIVELY by returning the entire updated Markdown wiki content. Do not add notes or closing fences with \`\`\` tags. Your output must be directly readable as valid markdown.`;

    const userPrompt = `Current LLM-Wiki state:\n---\n${currentWiki}\n---\nToday's Git Log:\n${gitLog}\n\nGit Diff:\n${gitDiff}`;

    console.log(`=== Invoking OpenRouter: ${MODEL_NAME} ===`);
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/openrouter/dreamer"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.1
      })
    });

    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
      console.error("OpenRouter API error response:", JSON.stringify(data, null, 2));
      throw new Error(`Invalid API response: ${data.error?.message || data.error || "no choices returned"}`);
    }

    let updatedWiki = data.choices[0].message.content.trim();
    
    if (updatedWiki.startsWith("```markdown")) {
      updatedWiki = updatedWiki.replace(/^```markdown\n/, "").replace(/\n```$/, "");
    } else if (updatedWiki.startsWith("```")) {
      updatedWiki = updatedWiki.replace(/^```\n/, "").replace(/\n```$/, "");
    }

    fs.writeFileSync(WIKI_PATH, updatedWiki, 'utf-8');
    
    execSync('git config --global user.name "github-actions[bot]"');
    execSync('git config --global user.email "github-actions[bot]@users.noreply.github.com"');
    execSync('git add docs/llm-wiki/wiki/llm-wiki.md');
    
    const status = execSync('git status --porcelain').toString();
    if (status.includes('docs/llm-wiki/wiki/llm-wiki.md')) {
      execSync('git commit -m "docs(wiki): automatic nightly wiki update (dreaming)"');
      execSync('git push');
      console.log("Wiki synced correctly to GitHub.");
    } else {
      console.log("No textual changes needed for the wiki.");
    }
  } catch (error) {
    console.error("Critical error in workflow 1:", error);
    process.exit(1);
  }
}
run();