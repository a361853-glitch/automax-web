const fs = require('fs');
const path = require('path');
const MIME_TYPES = require('../config/mimeTypes');

const PUBLIC_DIR = path.resolve(__dirname, '../../public');

function sendNotFound(res) {
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>404 - Página no encontrada | Automax</title>
      <link rel="stylesheet" href="/css/styles.css">
    </head>
    <body>
      <main class="container" style="text-align:center; padding: 5rem 1rem;">
        <h1>404 - Recurso no encontrado</h1>
        <p>La página o archivo que buscas no existe en Automax.</p>
        <a href="/" class="btn btn-primary" style="margin-top:1.5rem;">Volver al inicio</a>
      </main>
    </body>
    </html>
  `);
}

function serveFile(res, relativeFilePath) {
  const safePath = path.normalize(relativeFilePath).replace(/^(\.\.[/\\])+/, '');
  const fullPath = path.join(PUBLIC_DIR, safePath);

  if (!fullPath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Acceso denegado');
    return;
  }

  fs.readFile(fullPath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT' || err.code === 'EISDIR') {
        sendNotFound(res);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Error interno del servidor');
      }
      return;
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

module.exports = { serveFile, sendNotFound };