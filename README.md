# tp2_trabajointegrador
Biblioteca Online - Trabajo Práctico (Backend)

Grupo 8
Beloso Pedro
Christian Benito
Marcos Castrogiovani
Genaro Rotstein
Sebastian Zavala


## Objetivo del Trabajo Práctico
El objetivo principal de este trabajo práctico es explorar las posibilidades de Node.js, Express y Sequelize, y desarrollar habilidades para crear soluciones más robustas y complejas en términos de arquitectura de software y calidad de código. Esto implica aplicar buenas prácticas de desarrollo como la modularidad, la escalabilidad y la seguridad, así como tener en cuenta aspectos como el rendimiento, la usabilidad y la mantenibilidad del código.

## Especificaciones del Proyecto
Este backend implementa una API RESTful para una biblioteca online, permitiendo a los usuarios subir, gestionar, calificar y comentar libros, mientras que otros usuarios registrados pueden leerlos o descargarlos bajo un modelo de membresía de pago a desarrollar en un futuro.

El proyecto cumple con las siguientes especificaciones técnicas e implementar las siguientes funcionalidades:

- **Base de Datos Relacional:** Cuenta con al menos dos tablas relacionadas entre sí (User, Book, Review).
- **API RESTful con CRUD:** Las rutas del API permiten realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para cada modelo.
- **Patrón de Diseño MVC:** El código está organizado siguiendo el patrón Modelo-Vista-Controlador.
- **Manejo de Errores:** Se implementa un manejo de errores adecuado para garantizar la robustez del servidor.
- **Entrega y Documentación:** El trabajo se entrega en un repositorio Git con un archivo README completo.

## Tecnologías Utilizadas
Este backend ha sido construido con un stack moderno, ideal para aprender y aplicar conceptos de desarrollo web:

- **Node.js:** Entorno de ejecución de JavaScript.
- **Express:** Framework web minimalista y flexible para Node.js.
- **Sequelize:** ORM para Node.js que facilita la interacción con bases de datos relacionales.
- **MySQL:** Sistema de gestión de bases de datos relacional.
- **Bcrypt.js:** Librería para el hashing seguro de contraseñas.
- **JSON Web Tokens (JWT):** Estándar para la autenticación y autorización segura.
- **Multer:** Middleware para el manejo de subidas de archivos (libros y portadas).
- **Dotenv:** Módulo para cargar variables de entorno.
- **cookie-parser:** Middleware para el manejo de cookies HTTP.
- **nodemon:** Herramienta para recarga automática del servidor en desarrollo.
- **express-validator:** Middleware para validaciones de datos en las rutas (instalar con `npm install express-validator`).

## Arquitectura y Refactorización

> **¡Importante!**
> El proyecto fue refactorizado para utilizar **inyección de dependencias (DI)** y factories en controladores y rutas.

La arquitectura desacoplada permite mayor mantenibilidad, testabilidad y escalabilidad. Las dependencias se gestionan desde un contenedor central y se inyectan en los factories de controladores y rutas.

## Estructura del Proyecto
El proyecto sigue una arquitectura modular y limpia, diseñada para reflejar el patrón MVC y facilitar el mantenimiento y la escalabilidad:

```
biblioteca-online-backend/
├── config/         # Configuración de base de datos y entorno
├── controllers/    # Controladores (solo *.factory.js)
├── models/         # Modelos Sequelize
├── middleware/     # Middlewares de autenticación, roles, errores
├── migrations/     # Migraciones de Sequelize
├── seeders/        # Seeders de Sequelize (opcional)
├── routes/         # Rutas (solo *.factory.js)
├── storage/        # Archivos subidos
├── app.js          # Punto de entrada único: inicializa y arranca el servidor
├── package.json    # Dependencias y scripts
├── .env.example    # Ejemplo de variables de entorno
└── .gitignore      # Ignorados por Git
```

---

## Herramientas de Desarrollo y Middlewares

### Utilización de nodemon

Durante el desarrollo, se recomienda utilizar **nodemon** para facilitar el trabajo.  
Nodemon reinicia automáticamente el servidor cada vez que detecta cambios en los archivos del proyecto, evitando tener que detener y volver a iniciar el servidor manualmente.

**Instalación (si no está instalado):**
npm install --save-dev nodemon

Uso: Para iniciar el servidor en modo desarrollo con recarga automática:
npm run dev
Esto ejecuta el script "dev": "nodemon app.js" definido en el package.json.

**cross-env** se utiliza para asegurar que las variables de entorno funcionen correctamente en todos los sistemas operativos:
npm install --save-dev cross-env


### Utilización de cookie-parser
El proyecto incluye la dependencia cookie-parser, que permite analizar y gestionar cookies en las peticiones HTTP.

Instalación (ya incluida en dependencias):
npm install cookie-parser

Uso en el proyecto:
import cookieParser from 'cookie-parser';
app.use(cookieParser());

### Instalación de dependencias adicionales
Asegúrate de instalar express-validator para las validaciones:
npm install express-validator


## Configuración y Ejecución

1. **Requisitos Previos**
   - Node.js (versión 14 o superior recomendada)
   - MySQL Server
   - npm (incluido con Node.js)

2. **Clonar el Repositorio**
   git clone https://github.com/szavala-dev/tp2_trabajointegrador
   cd biblioteca-online-backend


3. **Configurar Variables de Entorno**
   Crea un archivo .env en la raíz del proyecto (puedes usar .env.dev como plantilla) y configura tus variables de entorno esenciales:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=biblioteca_online
   JWT_SECRET=your_super_secret_jwt_key # ¡Cambia esto por una clave fuerte y secreta!
   JWT_EXPIRES_IN=1h
   ```

4. **Instalar Dependencias**
   npm install

5. **Configurar la Base de Datos**
   Asegúrate de que tu servidor MySQL esté en funcionamiento. Luego, crea una base de datos con el nombre especificado en tu archivo .env (ej. mi_libreria).

6. **Ejecutar Migraciones de la Base de Datos**
   Las migraciones de Sequelize se encargarán de crear las tablas y las relaciones necesarias en tu base de datos:
   npx sequelize-cli db:migrate

   (Opcional) Para poblar la base de datos con datos de prueba iniciales, puedes ejecutar los seeders:
   npx sequelize-cli db:seed:all


7. **Iniciar el Servidor**
   node app.js

   Opcional para desarrollo con recarga automática al detectar cambios:

   npm run dev

   El servidor estará escuchando en el puerto configurado en tu archivo .env (por defecto, http://localhost:3000).

## Rutas de la API (Endpoints Principales)
Aquí se detallan las principales rutas de la API, que permiten realizar las operaciones CRUD sobre los modelos. Para una referencia completa, revisa la carpeta `routes/`.

### Autenticación (/api/auth)
- POST /api/auth/register: Crear un nuevo usuario
- POST /api/auth/login: Realizar login para obtener un JWT

### Usuarios (/api/users) - Requieren Autenticación JWT
- GET /api/users/profile: Recuperar el perfil del usuario autenticado.
- PUT /api/users/membership: Simula la actualización del estado de membresía (en un proyecto real, se integraría con una pasarela de pagos).

### Libros (/api/books) - Algunas rutas requieren autenticación/autorización
- GET /api/books: Recuperar la lista de todos los libros (con soporte para paginación y filtros).
- GET /api/books/:id: Recuperar los detalles de un libro específico.
- POST /api/books/upload: Crear (subir) un nuevo libro (requiere rol uploader o admin).
- GET /api/books/:id/download: Recuperar (descargar) un libro (requiere membresía activa/prueba).
- GET /api/books/:id/read: Recuperar (leer) un libro online (requiere membresía activa/prueba).
- DELETE /api/books/:id: Eliminar un libro (requiere ser el uploader o un admin).

### Reseñas (/api/reviews) - Requieren Autenticación JWT
- POST /api/books/:bookId/reviews: Crear una nueva reseña para un libro.
- GET /api/books/:bookId/reviews: Recuperar todas las reseñas de un libro.
- PUT /api/reviews/:id: Actualizar una reseña propia.
- DELETE /api/reviews/:id: Eliminar una reseña propia.

## Subida de Archivos (Multer)

El backend permite subir archivos (por ejemplo, portadas o libros) usando el endpoint:

### POST /api/files/upload

- El archivo debe enviarse en el campo `file` de un formulario `multipart/form-data`.
- Los archivos se guardan en la carpeta `storage/`.

**Ejemplo con curl:**

```bash
curl -F "file=@/ruta/a/tu/archivo.pdf" http://localhost:3000/api/files/upload
```

**Respuesta exitosa:**
```json
{
  "filename": "1624567890123-123456789.pdf",
  "originalname": "archivo.pdf",
  "mimetype": "application/pdf",
  "size": 12345,
  "path": "storage/1624567890123-123456789.pdf"
}
```

Puedes usar este endpoint para subir cualquier archivo necesario para tu aplicación (libros, portadas, etc.).

## Colección Thunder Client

Puedes importar la colección de Thunder Client incluida en el proyecto para probar fácilmente los endpoints principales de la API:

- Archivo: `thunder-collection_tp2_trabajointegrador.json`

Esta colección incluye ejemplos de:
- Registro y login de usuario
- Obtener perfil de usuario (requiere JWT)
- Subida de archivos con Multer
- Obtener todos los libros
- Crear libro (requiere JWT y rol uploader/admin)
- Actualizar membresía de usuario
- Actualizar rol de usuario (admin)
- Obtener todos los usuarios (admin)
- Crear reseña de libro
- Obtener reseñas de un libro
- Actualizar reseña
- Eliminar reseña

Para importar:
1. Abre Thunder Client en VS Code
2. Ve a la sección "Collections"
3. Haz clic en "Import" y selecciona el archivo `thunder-collection_tp2_trabajointegrador.json`

¡Listo para probar tu API!

## Buenas Prácticas y Documentación
- Modularidad: Código organizado en módulos lógicos (modelos, controladores, rutas, middlewares).
- Escalabilidad: Diseño que permite añadir nuevas funcionalidades o manejar un mayor volumen de usuarios y datos.
- Seguridad: Implementación de hashing de contraseñas (bcrypt) y autenticación con JWT.
- Manejo de Errores: Captura y respuesta adecuada a errores inesperados y validaciones.
- Legibilidad del Código: Nombres de variables y funciones claros, y comentarios cuando son necesarios.
- Documentación: Este README sirve como documentación principal para la ejecución y uso de la API.

