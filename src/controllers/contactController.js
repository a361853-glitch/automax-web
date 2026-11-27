const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '../../data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contactos.txt');
const MAX_BODY_SIZE = 1e6; // 1 MB límite de seguridad

function parseBody(rawBody, contentType = '') {
  if (contentType.includes('application/json')) {
    return JSON.parse(rawBody);
  }
  const params = new URLSearchParams(rawBody);
  return {
    nombre: params.get('nombre') || '',
    correo: params.get('correo') || '',
    telefono: params.get('telefono') || '',
    mensaje: params.get('mensaje') || ''
  };
}

function handleContactPost(req, res) {
  let rawBody = '';

  req.on('data', (chunk) => {
    rawBody += chunk.toString();
    if (rawBody.length > MAX_BODY_SIZE) {
      res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: 'Solicitud demasiado grande.' }));
      req.destroy();
    }
  });

  req.on('end', () => {
    let data;
    try {
      data = parseBody(rawBody, req.headers['content-type']);
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: 'Formato de datos inválido.' }));
      return;
    }

    const nombre = (data.nombre || '').trim();
    const correo = (data.correo || '').trim();
    const telefono = (data.telefono || '').trim();
    const mensaje = (data.mensaje || '').trim();

    if (!nombre || !correo || !telefono || !mensaje) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        ok: false,
        error: 'Todos los campos (nombre, correo, teléfono y mensaje) son obligatorios.'
      }));
      return;
    }

    const fecha = new Date().toLocaleString('es-MX', { timeZone: 'America/Chihuahua' });
    const registro = [
      '========================================',
      `Fecha:    ${fecha}`,
      `Nombre:   ${nombre}`,
      `Correo:   ${correo}`,
      `Teléfono: ${telefono}`,
      `Mensaje:  ${mensaje}`,
      '========================================\n'
    ].join('\n');

    fs.mkdir(DATA_DIR, { recursive: true }, (dirErr) => {
      if (dirErr) {
        console.error('Error creando carpeta data:', dirErr);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: false, error: 'Error interno al preparar almacenamiento.' }));
        return;
      }

      fs.appendFile(CONTACTS_FILE, registro, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error guardando contacto:', writeErr);
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ ok: false, error: 'No se pudo guardar el mensaje.' }));
          return;
        }

        console.log(`[Contacto registrado] ${nombre} <${correo}>`);

        const acceptsJson = (req.headers.accept || '').includes('application/json') ||
                            (req.headers['content-type'] || '').includes('application/json');

        if (acceptsJson) {
          res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            ok: true,
            mensaje: '¡Gracias por contactarnos! Tu solicitud fue registrada correctamente.'
          }));
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
              <meta charset="UTF-8">
              <title>Mensaje enviado | Automax</title>
              <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
              <main class="container" style="text-align:center; padding: 5rem 1rem;">
                <h1>¡Solicitud recibida!</h1>
                <p>Gracias, ${nombre}. Hemos guardado tus datos y pronto nos pondremos en contacto contigo.</p>
                <a href="/contacto" class="btn btn-primary" style="margin-top:1.5rem;">Volver a Contacto</a>
              </main>
            </body>
            </html>
          `);
        }
      });
    });
  });
}

module.exports = { handleContactPost };