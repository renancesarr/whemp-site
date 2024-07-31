const simpleGit = require('simple-git');
const { exec } = require('child_process');

async function mergeTodevelop() {
  const git = simpleGit();

  try {
    // Obter a branch atual
    const status = await git.status();
    const currentBranch = status.current;
    console.log(`Branch atual: ${currentBranch}`);

    // Alternar para a branch develop
    console.log("Alternando para a branch 'develop'...");
    await git.checkout('develop');

    // Fazer o merge da branch atual para a branch develop
    console.log(`Fazendo merge da branch '${currentBranch}' para 'develop'...`);
    const mergeSummary = await git.mergeFromTo(currentBranch, 'develop');

    // Verificar se o merge foi bem-sucedido
    if (mergeSummary.failed || mergeSummary.conflicts.length > 0) {
      throw new Error(`Merge falhou com conflitos nos arquivos: ${mergeSummary.conflicts.map(conflict => conflict.file).join(', ')}`);
    }

    // Exibir mensagem de sucesso
    console.log("Merge concluído com sucesso!");

    // Executar o comando npm run commit
    console.log("Subindo alterações na developer");
    exec('git push', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar 'npm run commit': ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Erro: ${stderr}`);
        return;
      }
      console.log(`Resultado do commit: ${stdout}`);
    });

    console.log("A branch atual agora é: 'develop'!");
  } catch (err) {
    console.error("Ocorreu um erro durante o merge:", err.message);

    // Alternar de volta para a branch original em caso de erro
    console.log(`Voltando para a branch '${currentBranch}'...`);
    await git.checkout(currentBranch);
  }
}

mergeTodevelop();
