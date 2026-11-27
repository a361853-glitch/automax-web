const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

function mostrarMensaje(texto, esExito) {
  feedback.textContent = texto;
  feedback.className = `alert show ${esExito ? 'alert-success' : 'alert-error'}`;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    nombre: form.nombre.value.trim(),
    correo: form.correo.value.trim(),
    telefono: form.telefono.value.trim(),
    mensaje: form.mensaje.value.trim()
  };

  try {
    const response = await fetch('/api/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok && result.ok) {
      mostrarMensaje(result.mensaje, true);
      form.reset();
    } else {
      mostrarMensaje(result.error || 'No se pudo procesar tu solicitud.', false);
    }
  } catch {
    mostrarMensaje('Error de conexión con el servidor. Intenta nuevamente.', false);
  }
});