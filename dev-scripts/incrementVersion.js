const fs = require('fs');
const path = require('path');

// Caminho para o arquivo de versão
const versionFilePath = path.resolve(__dirname, 'version.txt');

// Lê a versão atual
const currentVersion = fs.readFileSync(versionFilePath, 'utf-8').trim();

// Incrementa a versão
const versionParts = currentVersion.split('.').map(Number);
let [major, minor, patch] = versionParts;

// Processa argumentos para incremento
const args = process.argv.slice(2);
if (args.includes('--major')) {
  major += 1;
  minor = 0;
  patch = 0;
} else if (args.includes('--minor')) {
  minor += 1;
  patch = 0;
} else {
  patch += 1;
}

// Nova versão
const newVersion = `${major}.${minor}.${patch}`;

// Salva a nova versão no arquivo
fs.writeFileSync(versionFilePath, newVersion, 'utf-8');

console.log(`Versão incrementada para ${newVersion}`);

// Configura a variável de ambiente para o novo diretório de build
process.env.BUILD_DIR = `releases/v${newVersion}`;

// Adiciona a variável de ambiente ao processo de build
fs.writeFileSync(path.resolve(__dirname, '.env'), `BUILD_DIR=releases/v${newVersion}\n`, 'utf-8');
