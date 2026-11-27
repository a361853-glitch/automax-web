const http = require('http');
const router = require('./routes/router');

const PORT = process.env.PORT || 8888;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  router(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor de Automax ejecutándose en http://localhost:${PORT}`);
});