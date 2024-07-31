require('dotenv').config({ path: '.env.local' });
const { exec } = require('child_process');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getBranchName(description, typeBranch) {
  try {
    const prompt = `Generate a concise branch name for the following task description (example: ${typeBranch}/new-${typeBranch}):\n"${description}"`;
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-2024-05-13',
      messages: [{ role: 'system', content: 'You are a specialized assistant in Git, static web developer and a project manager.' }, { role: 'user', content: prompt }],
      max_tokens: 10,
      temperature: 0.5,
    });

    const branchName = response.choices[0].message.content.trim().replace(/`/g, '');
    return branchName;
  } catch (error) {
    console.error('Error generating branch name:', error);
    return null;
  }
}

function createBranch(branchName) {
    exec(`git checkout -b ${branchName} && git push --set-upstream origin ${branchName}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error creating branch: ${stderr}`);
        return;
      }
      console.log(stdout);
    });
  }



  async function main() {
    const description = process.argv.slice(2).join(' ');
    if (!description) {
      console.error('Please provide a description for the task.');
      process.exit(1);
    }

    let typeBranch = process.argv.slice(2).join(' ');
    if (!typeBranch) {
      typeBranch = "feature";
    }
  
    const branchName = await getBranchName(description);
    if (branchName) {
      createBranch(branchName);
    } else {
      console.log("Failed to generate a branch name.");
    }
  }
  
  main();
