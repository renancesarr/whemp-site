require('dotenv').config({ path: '.env.local' });
const { exec } = require('child_process');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getCommitMessage() {
  try {
    const changes = await getGitChanges();
    const prompt = `You are a specialized assistant in Git and a project manager. Generate commit messages based on the following changes. For small changes, provide brief commit messages. For larger changes, provide more detailed commit messages. Ensure the messages are actionable and relevant to the code changes, without any introductions or explanations:\n\n${changes}`;
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-2024-05-13',
      messages: [{ role: 'system', content: 'You are a specialized assistant in Git and a project manager.' }, { role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    const message = response.choices[0].message.content.trim().replace(/`/g, '');
    return message;
  } catch (error) {
    console.error('Error generating commit message:', error);
    return null;
  }
}

function getGitChanges() {
  return new Promise((resolve, reject) => {
    exec('git status -s', (error, stdout, stderr) => {
      if (error) {
        reject(`Error getting git changes: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
}

function runGitCommands(message) {

  exec(`git add . && git commit -m '${message}' && git push`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing git commands: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
}

async function main() {
  const commitMessage = await getCommitMessage();
  if (commitMessage) {
    runGitCommands(commitMessage);
  } else {
    console.log("Failed to generate a commit message.");
  }
}

main();
