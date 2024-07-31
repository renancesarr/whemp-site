const path = require('path');
const httpServer = require('http-server');

const version = process.argv[2];

if (!version) {
  console.error('Please provide a version to serve. Example: node serveVersion.js v0.2.1');
  process.exit(1);
}

const buildDir = path.resolve(__dirname, 'releases', version);

const server = httpServer.createServer({ root: buildDir });
server.listen(8080, () => {
  console.log(`Serving version ${version} at http://localhost:8080`);
});
