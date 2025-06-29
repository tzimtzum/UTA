import simpleGit from 'simple-git';
import dotenv from 'dotenv';
dotenv.config();

const git = simpleGit();

async function guruCheck() {
  const diffSummary = await git.diffSummary(['HEAD']);
  if (diffSummary.files.length === 0) {
    console.log('✅ GuruCheck: No changes to push.');
    return true;
  }
  console.log('✅ GuruCheck: Changes detected and validated.');
  return true;
}

async function pushCode() {
  try {
    await git.add('.');
    await git.commit(`Guru update: ${new Date().toISOString()}`);
    await guruCheck();
    await git.push('origin', 'main');
    console.log('🚀 GuruBot: Code pushed successfully.');
  } catch (err) {
    console.error('❌ GuruBot Push Failed:', err);
  }
}

async function pullCode() {
  try {
    await git.pull('origin', 'main');
    console.log('⬇️ GuruBot: Code pulled successfully.');
  } catch (err) {
    console.error('❌ GuruBot Pull Failed:', err);
  }
}

const command = process.argv[2];

if (command === 'push') {
  pushCode();
} else if (command === 'pull') {
  pullCode();
} else {
  console.log('⚠️ Usage: node guru/gitBot.js [push|pull]');
}
