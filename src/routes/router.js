const { serveFile } = require('../controllers/staticController');
const { handleContactPost } = require('../controllers/contactController');

const PAGE_ROUTES = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/acerca': 'acerca.html',
  '/acerca.html': 'acerca.html',
  '/contacto': 'contacto.html',
  '/contacto.html': 'contacto.html',
  '/vehiculo-1': 'vehiculo-1.html',
  '/vehiculo-1.html': 'vehiculo-1.html',
  '/vehiculo-2': 'vehiculo-2.html',
  '/vehiculo-2.html': 'vehiculo-2.html',
  '/vehiculo-3': 'vehiculo-3.html',
  '/vehiculo-3.html': 'vehiculo-3.html'
};

function router(req, res) {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const pathname = urlObj.pathname;

  if (req.method === 'POST' && (pathname === '/api/contacto' || pathname === '/contacto')) {
    return handleContactPost(req, res);
  }

  if (req.method === 'GET') {
    if (PAGE_ROUTES[pathname]) {
      return serveFile(res, PAGE_ROUTES[pathname]);
    }
    return serveFile(res, pathname.slice(1));
  }

  res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Método HTTP no permitido');
}

module.exports = router;