# static-webdev-toolkit

Static-WebDev-Toolkit: Um kit completo para desenvolvimento de sites estáticos modernos usando Vite, TailwindCSS e Alpine.js.  Ele inclui um sistema de versionamento dinâmico e um servidor para testar builds de produção localmente.

### Estrutura do Projeto

- `src/`: Contém os arquivos fonte do projeto (HTML, CSS, JS).
- `releases/`: Diretório onde as builds de produção são armazenadas, organizadas por versão.
- `scripts/`: Scripts personalizados para gerenciamento de versão e servidor de produção.
- `public/`: Arquivos estáticos públicos.

### Tecnologias utilizadas:

- Tailwind
- Alpine.js
- Vite
## Como Usar Este Template

1. **Crie um novo repositório a partir do template**:

   - Vá para a página [Static-WebDev-Toolkit](https://github.com/renancesarr/static-webdev-toolkit).
   - Clique no botão "Use this template".
   - Siga as instruções para criar um novo repositório baseado neste template.

2. **Clone o novo repositório**:

```bash
git clone https://github.com/seu-usuario/seu-novo-repositorio.git
cd seu-novo-repositorio
npm install
```

### Configuração do TailwindCSS

O projeto já está configurado para usar TailwindCSS. O arquivo tailwind.config.js está configurado para monitorar arquivos em ./src/**/*.{html,js}. O arquivo postcss.config.js inclui tailwindcss e autoprefixer.


### Sistema de Branch

O projeto utiliza o sistema de branch para gerenciar o desenvolvimento de novas funcionalidades, correções de bugs e outras alterações no código. O fluxo de trabalho com branches é o seguinte:

1. Cada nova funcionalidade ou correção de bug é desenvolvida em uma branch separada.
2. As branches são criadas a partir da branch principal (geralmente chamada de "main" ou "master").
3. Após concluir o desenvolvimento e testes na branch, é feito um merge da branch com a branch principal.
4. Caso necessário, é feita uma revisão do código antes de realizar o merge.
5. Após o merge, a branch pode ser excluída.

Esse sistema de branch permite um desenvolvimento mais organizado e seguro, evitando conflitos entre diferentes funcionalidades e facilitando a colaboração entre os membros da equipe.

### Automação do git

Aqui estão alguns exemplos de comandos git para criar e mesclar branches de funcionalidade e correção de bugs:

#### Criar branches

```bash
npm run create-branch "descreva a funcionalidade"
```
##### Tipos de Branches
 1. bugfix
 2. feature
 3. 

#### Fazer commit

```bash
npm run commit
```

#### Mesclar uma Branch

```bash
npm run merge
```





## Scripts NPM

### Desenvolvimento

Para iniciar o servidor de desenvolvimento com hot reload.

```bash
npm run dev
```

### Build de Produção

Para criar uma build de produção:
Incremental minor:

```bash
npm run prebuild:minor && npm run build
```

####  major:
```bash
npm run prebuild:major && npm run build
```

### Servir uma Versão Específica

```bash
npm run serve:prod -- v0.2.1
```

