#  🎥 🎸  LA SIMULACIÓN

Sistema web completo para la gestión de un proyecto cultural y social. Incluye funcionalidades de creación y gestión de eventos y talleres culturales, gestión de salas y manejo de reservas, gestión de usuarios, notificaciones por email y más.

---

## 🛠️ Instalaciones necesarias

Antes de empezar, asegúrate de tener estas herramientas instaladas:

- [Visual Studio Code (VSCode)](https://code.visualstudio.com/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- [Node.js](https://nodejs.org/)

---

## 🚀 Configuración inicial

Clona este repositorio y entra a la carpeta del proyecto:

```bash
git clone https://github.com/reposocratech/MVP-La-Simulacion.git
cd MVP-La-Simulacion

```

## 📦 Estructura del proyecto

El proyecto tiene dos partes, en las cuales hay que comenzar con:

### ⚙️ Backend (Server)
```bash
cd server
npm install
```

### 🎨 Frontend (Client)
```bash
cd client
npm install
```

## 🗃️ Configuración de base de datos

### 1. Crear la base de datos en MySQL Workbench

- Abre **MySQL Workbench**.
- Carga y ejecuta el script `la_simulacion.sql`.
- Esto creará automáticamente las tablas necesarias para el funcionamiento del sistema.

### 2. Configurar el archivo `.env`

Asegúrate de que las variables de entorno coincidan con tu configuración local de MySQL. En el archivo `.env` del backend (`/server`), agrega lo siguiente:

```env
DB_HOST=localhost
DB_USER=root           # Usuario de tu MySQL (generalmente "root")
DB_PASSWORD=root    # Contraseña de tu MySQL (ajústala según tu configuración)
DB_NAME=la_simulacion
```

## 📧 Configuración del servicio de envío de emails (Nodemailer)

El proyecto envía correos electrónicos para diversas funciones, como:

- Confirmación de registro de usuarios.
- Emails para el admin con las consultas de los usuarios.
- Emails para el admin con las solicitudes de reserva de salas.

Para que esto funcione, es necesario configurar un servicio **SMTP**.

### 🔐 Usando Gmail (recomendado para desarrollo)

1. Accede a tu cuenta de Google y activa la **verificación en dos pasos**.
2. Luego, en [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords), genera una **contraseña de aplicación**.
3. En el archivo `.env` del backend (`/server`), agrega lo siguiente con tus datos reales:

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER=tuemail@gmail.com       # Reemplázalo con tu correo real
EMAIL_PASS=tucontraseñaapp         # Reemplázalo con la contraseña de aplicación generada
```

## 🖥️ Ejecutar el proyecto en local

Una vez instaladas las dependencias y configurado el entorno, puedes iniciar el proyecto en modo desarrollo.

### ⚙️ Backend (Servidor Node.js)

URL: [http://localhost:4000](http://localhost:4000)

```bash
cd server
npm run dev       # Usa nodemon para recarga automática
```
El backend usa Express y escucha por defecto en el puerto 4000.

### 🎨 Frontend (React + Vite)

URL: [http://localhost:5173](http://localhost:5173)

```bash
cd client
npm run dev
```
El frontend está construido con React y Vite, lo que permite recarga rápida y actualizaciones en vivo durante el desarrollo.


## ✅ Verificar que todo funcione

### ⚙️ Backend

- Abre [http://localhost:4000](http://localhost:4000) en tu navegador o Postman.
- Si aparece algún mensaje de error, revisa los **logs del servidor** para obtener más información.

### 🎨 Frontend

- Abre [http://localhost:5173](http://localhost:5173) en tu navegador.
- Si hay errores de conexión con el backend, asegúrate de que:
  - El servidor (backend) esté en ejecución.
  - Las URLs estén bien configuradas.
  - No haya bloqueos por CORS.

---

## 🧰 Solución de problemas

### ❌ Error de conexión a MySQL

- Verifica que **MySQL esté ejecutándose** correctamente.
- Asegúrate de que las credenciales en el archivo `.env` sean correctas (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
- Comprueba que la base de datos `la_simulacion` exista.

### ❌ El frontend no se conecta al backend

- Asegúrate de que tanto el **frontend como el backend estén en ejecución**.
- Revisa si hay errores de **CORS**:
  - El backend ya tiene `cors` configurado, pero si persisten los errores, revisa o edita `server/app.js`.

### ❌ Los emails no se envían

- Verifica que las credenciales SMTP en el archivo `.env` sean correctas (`EMAIL_USER`, `EMAIL_PASS`, etc.).
- Comprueba la **carpeta de spam** en tu email.
- Asegúrate de que estás usando una **contraseña de aplicación válida**, especialmente si usas Gmail.

