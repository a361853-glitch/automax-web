# Automax — Sitio Web de Renta de Automóviles

Proyecto Integrador del Segundo Parcial de **Desarrollo Basado en Plataformas** (Unidad II: Desarrollo de Aplicaciones Web), Facultad de Ingeniería, Universidad Autónoma de Chihuahua.

---

## 1. Integrante
* **Marcos Iram Casas Mora** — Matrícula: `361853`

---

## 2. Descripción General del Proyecto
**Automax** es una aplicación web diseñada para dar presencia en línea a una empresa de renta de vehículos. Permite a los usuarios consultar la flotilla disponible, revisar fichas detalladas de los modelos principales, conocer la identidad de la empresa y enviar solicitudes de información o renta directamente al servidor.

El desarrollo se realizó con una arquitectura cliente-servidor modular utilizando **Node.js nativo** en el backend (sin frameworks externos), **HTML5 semántico**, **CSS3 propio** (sin librerías de estilos) y **JavaScript** en el frontend, empaquetado para su despliegue mediante **Docker**.

---

## 3. Explicación del Funcionamiento del Sitio

### Arquitectura y Servidor HTTP (`src/`)
El backend está organizado por responsabilidades en módulos separados:
* **Servidor (`src/server.js`):** Inicia el servidor HTTP nativo escuchando en el puerto **`8888`** (`http://localhost:8888`).
* **Enrutador (`src/routes/router.js`):** Centraliza las peticiones `GET` de páginas limpias (`/`, `/acerca`, `/contacto`, `/vehiculo-1`, `/vehiculo-2`, `/vehiculo-3`), delega recursos estáticos y recibe las solicitudes `POST` del formulario.
* **Controlador estático (`src/controllers/staticController.js` y `src/config/mimeTypes.js`):** Sirve los archivos `.html`, `.css`, `.js` e imágenes desde `public/` con su cabecera `Content-Type` correspondiente, bloqueando accesos fuera del directorio público.
* **Procesamiento de formulario (`src/controllers/contactController.js`):** Recibe las peticiones `POST /api/contacto`, valida los cuatro campos obligatorios, registra cada solicitud con fecha y hora en el archivo de texto `data/contactos.txt` dentro del servidor y responde con una confirmación para el usuario.

### Secciones del Sitio Web
1. **Página Principal y Catálogo (`public/index.html` y `public/js/catalogo.js`):** Presenta a Automax y despliega un catálogo interactivo de **25 vehículos** con marca, modelo, año, tarifa por día, buscador en tiempo real y filtro por categoría.
2. **Detalle de Vehículos (`public/vehiculo-1.html`, `public/vehiculo-2.html`, `public/vehiculo-3.html`):** Fichas individuales accesibles desde los primeros tres autos del catálogo, con fotografía local, precio diario, descripción y tabla de especificaciones técnicas.
3. **Acerca de Nosotros (`public/acerca.html`):** Presenta la historia y perfil general de la empresa, su misión, visión y valores institucionales.
4. **Contacto y Formulario (`public/contacto.html` y `public/js/contacto.js`):** Muestra dirección, teléfono, correo electrónico, horarios de atención y referencias de ubicación, junto con el formulario conectado mediante `fetch` al servidor HTTP.

---

## 4. Instrucciones para Ejecutar el Proyecto Localmente

### Requisitos previos
* Tener instalado **Node.js** (versión 18 o superior) y **Git**.

### Pasos de ejecución
1. **Clonar el repositorio público:**
   ```bash
   git clone https://github.com/markliaris/automax-web.git
   cd automax-web
   ```

2. **Iniciar el servidor web:**
   ```bash
   npm start
   ```
   *(Equivalente a ejecutar `node src/server.js`).*

3. **Acceder al sitio web:**
   Abre tu navegador e ingresa a:
   ```text
   http://localhost:8888
   ```

4. **Verificar el almacenamiento de solicitudes:**
   Al enviar un mensaje desde la sección **Contacto**, el servidor guarda automáticamente el registro en `data/contactos.txt`.

---

## 5. Imagen Pública en Docker Hub
La imagen de la aplicación está publicada y disponible para descarga directa en Docker Hub:

* **URL de Docker Hub:** https://hub.docker.com/r/markliaris/automax

---

## 6. Instrucciones para Ejecutar el Contenedor Docker

### Requisitos previos
* Tener instalado y en ejecución **Docker Engine** o **Docker Desktop**.

### Opción A: Descargar y ejecutar desde Docker Hub (Recomendado)
1. **Descargar la imagen pública:**
   ```bash
   docker pull markliaris/automax:latest
   ```

2. **Ejecutar el contenedor exponiendo el puerto `8888`:**
   ```bash
   docker run -d -p 8888:8888 --name automax-contenedor markliaris/automax:latest
   ```

3. **Abrir la aplicación en el navegador:**
   ```text
   http://localhost:8888
   ```

4. **Verificar los registros guardados dentro del contenedor (opcional):**
   ```bash
   docker exec automax-contenedor cat /app/data/contactos.txt
   ```

### Opción B: Construir la imagen localmente desde el código fuente
Para compilar la imagen directamente a partir del `Dockerfile` del repositorio:
```bash
docker build -t automax-local .
docker run -d -p 8888:8888 --name automax-prueba automax-local
```