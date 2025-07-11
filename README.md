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
Este backend implementa una API RESTful para una biblioteca online, permitiendo a los usuarios subir, gestionar, calificar y comentar libros, mientras que otros usuarios registrados pueden leerlos o descargarlos (bajo un modelo de membresía de pago a desarrollar en un futuro).

El proyecto cumple con las siguientes especificaciones técnicas e implementar las siguientes funcionalidades:

- **Base de Datos Relacional:** Cuenta con al menos dos tablas relacionadas entre sí (User, Book, Review).
- **API RESTful con CRUD:** Las rutas del API permiten realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para cada modelo.
- **Patrón de Diseño MVC:** El código está organizado siguiendo el patrón Modelo-Vista-Controlador.
- **Manejo de Errores:** Se implementa un manejo de errores adecuado para garantizar la robustez del servidor.
- **Entrega y Documentación:** El trabajo se entrega en un repositorio Git con un archivo README completo.

## Tecnologías Utilizadas
Este backend ha sido construido con un stack moderno, ideal para aprender y aplicar conceptos de desarrollo web:

- **Node.js:** Entorno de ejecución de JavaScript.
- **Express:** Framework web minimalista y flexible para Node.js.(Instalar con npm install express)
- **Sequelize:** ORM para Node.js que facilita la interacción con bases de datos relacionales. (Instalar con npm install sequelize)
- **MySQL:** Sistema de gestión de bases de datos relacional. (Instalar con npm install mysql2)
- **Bcrypt.js:** Librería para el hashing seguro de contraseñas.(Instalar con npm install bcryptjs)
- **JSON Web Tokens (JWT):** Estándar para la autenticación y autorización segura. (Instalar con npm install jsonwebtoken)
- **Multer:** Middleware para el manejo de subidas de archivos (libros y portadas).(Instalar con npm install multer)
- **Dotenv:** Módulo para cargar variables de entorno.(Instalar con npm install dotenv)
- **cookie-parser:** Middleware para el manejo de cookies HTTP. (Instalar con npm install cookie-parser)
- **nodemon:** Herramienta para recarga automática del servidor en desarrollo.(Instalar con npm install --save-dev nodemon)
- **express-validator:** Middleware para validaciones de datos en las rutas (instalar con npm install express-validator).

## Arquitectura y Refactorización

> **¡Importante!**
> El proyecto fue refactorizado para utilizar **inyección de dependencias (DI)** y una **capa de servicios** para la lógica de negocio.

La arquitectura desacoplada permite mayor mantenibilidad, testabilidad y escalabilidad. Las dependencias se gestionan desde un contenedor central y se inyectan en los controladores y rutas. **Toda la lógica de negocio (registro, login, CRUD de usuarios, libros, géneros, reseñas y archivos) está centralizada en la carpeta `services/`**. Los controladores solo gestionan la request/response y delegan la lógica a los servicios.

### Patrón aplicado
- `controllers/`: Reciben la request, llaman al service y devuelven la respuesta.
- `services/`: Contienen la lógica de negocio, validaciones, reglas y operaciones con los modelos.
- `models/`: Definición de entidades Sequelize.
- `routes/`: Definición de endpoints y middlewares.

Esto facilita el mantenimiento, la escalabilidad y el testing del backend.

## Estructura del Proyecto
El proyecto sigue una arquitectura modular y limpia, diseñada para reflejar el patrón MVC y facilitar el mantenimiento y la escalabilidad:

```
biblioteca-online-backend/
├── config/         # Configuración de base de datos y entorno
├── controllers/    # Controladores
├── models/         # Modelos Sequelize
├── middleware/     # Middlewares de autenticación, roles, errores
├── migrations/     # Migraciones de Sequelize
├── seeders/        # Seeders de Sequelize 
├── routes/         # Rutas
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
   JWT_EXPIRES_IN=10h
   ```

4. **Instalar Dependencias**
   npm install

5. **Configurar la Base de Datos**
   Asegúrate de que tu servidor MySQL esté en funcionamiento. Luego, crea una base de datos con el nombre especificado en tu archivo .env (ej. biblioteca_online).

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

### Libros (/api/books) - Algunas rutas requieren autenticación/autorización
- GET /api/books: Recuperar la lista de todos los libros (con soporte para paginación y filtros).
- GET /api/books/:id: Recuperar los detalles de un libro específico.
- POST /api/books: Crear (subir) un nuevo libro (requiere rol uploader o admin).
- DELETE /api/books/:id: Eliminar un libro (requiere ser el uploader o un admin).

### Reseñas (/api/reviews) - Requieren Autenticación JWT
- POST /api/books/:bookId/reviews: Crear una nueva reseña para un libro.
- GET /api/books/:bookId/reviews: Recuperar todas las reseñas de un libro.
- PUT /api/reviews/:reviewId: Actualizar una reseña propia.
- DELETE /api/reviews/:reviewId: Eliminar una reseña propia.

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

## Poblar la Base de Datos con Seeders (Datos de Ejemplo)

Puedes cargar datos de ejemplo (usuarios, géneros y libros) usando los seeders de Sequelize incluidos en la carpeta `seeders/`.

### ¿Qué es un seeder?
Un seeder es un script que inserta datos de prueba en la base de datos. Es útil para desarrollo, testing o para tener datos iniciales en la app.

### Cómo ejecutar los seeders

1. Asegúrate de haber ejecutado las migraciones:
   ```bash
   npx sequelize-cli db:migrate
   ```
2. Ejecuta los seeders (opcional, solo si quieres usar los seeders legacy):
   ```bash
   npx sequelize-cli db:seed:all
   ```

Esto insertará usuarios, géneros y libros de ejemplo.

> **Nota:** El método recomendado para poblar la base de datos es usando el script moderno:
>
> ```bash
> npm run seed
> ```
>
> Esto ejecuta `seeders/seedDemo.mjs` y carga los datos de ejemplo usando `Model.bulkCreate` de Sequelize. Los seeders legacy de Sequelize CLI han sido deshabilitados para evitar confusión.

---

## Buenas Prácticas y Documentación
- Modularidad: Código organizado en módulos lógicos (modelos, controladores, rutas, middlewares).
- Escalabilidad: Diseño que permite añadir nuevas funcionalidades o manejar un mayor volumen de usuarios y datos.
- Seguridad: Implementación de hashing de contraseñas (bcrypt) y autenticación con JWT.
- Manejo de Errores: Captura y respuesta adecuada a errores inesperados y validaciones.
- Legibilidad del Código: Nombres de variables y funciones claros, y comentarios cuando son necesarios.
- Documentación: Este README sirve como documentación principal para la ejecución y uso de la API.

> **Nota:** Si usas variables de entorno (recomendado), asegúrate de tener el archivo `config/config.js` (no `config.json`). Sequelize CLI detecta automáticamente el archivo JS y permite usar variables de entorno para la conexión. Si tienes ambos archivos, el JS tiene prioridad.

---

## Recomendación de documentación interactiva
> Se recomienda integrar Swagger/OpenAPI para documentación interactiva y pruebas desde el navegador. Puedes usar `swagger-jsdoc` y `swagger-ui-express` para generar y servir la documentación automáticamente.

