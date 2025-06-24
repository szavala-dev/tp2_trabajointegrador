# tp2_trabajointegrador
Biblioteca Online - Trabajo Práctico (Backend)

## Objetivo del Trabajo Práctico
El objetivo principal de este trabajo práctico es explorar las posibilidades de Node.js, Express y Sequelize, y desarrollar habilidades para crear soluciones más robustas y complejas en términos de arquitectura de software y calidad de código. Esto implica aplicar buenas prácticas de desarrollo como la modularidad, la escalabilidad y la seguridad, así como tener en cuenta aspectos como el rendimiento, la usabilidad y la mantenibilidad del código.

## Especificaciones del Proyecto
Este backend implementa una API RESTful para una biblioteca online, permitiendo a los usuarios subir, gestionar, calificar y comentar libros, mientras que otros usuarios registrados pueden leerlos o descargarlos bajo un modelo de membresía de pago con un período de prueba gratuito de 30 días.

El proyecto cumple con las siguientes especificaciones técnicas y se anima a investigar e implementar funcionalidades adicionales:

- **Base de Datos Relacional:** Cuenta con al menos dos tablas relacionadas entre sí (User, Book, Review).
- **API RESTful con CRUD:** Las rutas del API permiten realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para cada modelo.
- **Patrón de Diseño MVC:** El código está organizado siguiendo el patrón Modelo-Vista-Controlador.
- **Manejo de Errores:** Se implementa un manejo de errores adecuado para garantizar la robustez del servidor.
- **Entrega y Documentación:** El trabajo se entrega en un repositorio Git con un archivo README completo.
- **Presentación Oral:** Se requiere una presentación donde se explique la implementación y se respondan preguntas.

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
- **cookie-parser:** Middleware para el manejo de cookies HTTP (ver sección especial más abajo).
- **nodemon:** Herramienta para recarga automática del servidor en desarrollo (ver sección especial más abajo).
- **express-validator:** Middleware para validaciones de datos en las rutas (instalar con `npm install express-validator`).

## Estructura del Proyecto
El proyecto sigue una arquitectura modular y limpia, diseñada para reflejar el patrón MVC y facilitar el mantenimiento y la escalabilidad:


biblioteca-online-backend
/
biblioteca-online-backend / 
├── config/ # Archivos de configuración (DB para Sequelize, JWT) 
├── controllers/ # Capa del Controlador: Contiene la lógica de negocio y procesa las peticiones. 
├── models/ # Capa del Modelo: Define la estructura de datos (Sequelize Models) y las interacciones con la DB. 
├── middleware/ # Funciones middleware para autenticación, autorización y subida de archivos. 
├── migrations/ # Migraciones de Sequelize para la gestión del esquema de la base de datos. 
├── seeders/ # Seeders de Sequelize para poblar la base de datos con datos iniciales (opcional). 
├── routes/ # Capa de Rutas: Define los endpoints de la API y los asocia a los controladores. 
├── storage/ # Carpeta para almacenar físicamente los archivos de libros y portadas subidos. 
├── app.js # Archivo principal de la aplicación Express y configuración global. 
├── package.json # Definición de dependencias y scripts del proyecto. 
├── .env.example # Archivo de ejemplo para las variables de entorno. 
└── .gitignore # Archivos y carpetas a ignorar por Git.

---

## Herramientas de Desarrollo y Middlewares

### Utilización de nodemon

Durante el desarrollo, se recomienda utilizar **nodemon** para facilitar el trabajo.  
Nodemon reinicia automáticamente el servidor cada vez que detecta cambios en los archivos del proyecto, evitando tener que detener y volver a iniciar el servidor manualmente.

**Instalación (si no está instalado):**
```bash
npm install --save-dev nodemon
Uso: Para iniciar el servidor en modo desarrollo con recarga automática:
npm run dev
Esto ejecuta el script "dev": "nodemon [app.js](http://_vscodecontentref_/2)" definido en el package.json.

npm install --save-dev cross-env
Uso: Se utiliza `cross-env` para asegurar que las variables de entorno funcionen correctamente en todos los sistemas operativos.


Utilización de cookie-parser
El proyecto incluye la dependencia cookie-parser, que permite analizar y gestionar cookies en las peticiones HTTP.
Esto es útil para manejar sesiones, autenticación basada en cookies o almacenar información temporal del usuario.

Instalación (ya incluida en dependencias):
npm install cookie-parser

Uso en el proyecto:

El middleware se agrega en el archivo principal (app.js):
import cookieParser from 'cookie-parser';
app.use(cookieParser());

Más adelante, se utilizará para leer y escribir cookies, por ejemplo, para almacenar tokens de autenticación o preferencias del usuario.

### Instalación de dependencias adicionales

Asegúrate de instalar express-validator para las validaciones:

```bash
npm install express-validator
```

## Ejecución de tests automáticos

### 1. Instalar dependencias de testing

Ejecuta en la raíz del proyecto:

```bash
npm install --save-dev jest supertest
```

### 2. Configuración de Jest para base de datos de prueba

Crea un archivo `.env.test` en la raíz del proyecto con la configuración de la base de datos de pruebas, por ejemplo:

```
PORT=3001
DB_HOST=localhost
DB_USER=usuario_test
DB_PASSWORD=clave_test
DB_NAME=biblioteca_online_test
JWT_SECRET=clave_test_jwt
JWT_EXPIRES_IN=1h
```

Asegúrate de crear la base de datos `biblioteca_online_test` en tu MySQL antes de correr los tests.

Jest usará automáticamente las variables de entorno de `.env.test` si ejecutas:

```bash
cross-env NODE_ENV=test npm test
```

### 3. Script de test en package.json

Agrega o verifica el siguiente script en tu `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

### 4. Ejecutar los tests

Para correr todos los tests:

```bash
npm test
```

O para asegurarte de que se use el entorno de test:

```bash
cross-env NODE_ENV=test npm test
```

Esto ejecutará todos los archivos en la carpeta `tests/` y usará la base de datos de pruebas definida en `.env.test`.

Pasos para Configuración y Ejecución
Sigue estos pasos para levantar el proyecto en tu entorno local, aplicando las fases de desarrollo aprendidas:

1-Requisitos Previos
Asegúrate de tener instalados los siguientes componentes:

Node.js (versión 14 o superior recomendada)
MySQL Server
npm (incluido con Node.js)

2-Clonar el Repositorio
git clone [https://github.com/szavala-dev/tp2_trabajointegrador]
cd biblioteca-online-backend

3-Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto (puedes usar .env.example como plantilla) y configura tus variables de entorno esenciales:
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=biblioteca_online
JWT_SECRET=your_super_secret_jwt_key # ¡Cambia esto por una clave fuerte y secreta!
JWT_EXPIRES_IN=1h

4-Instalar Dependencias
npm install

5-Configurar la Base de Datos
Asegúrate de que tu servidor MySQL esté en funcionamiento. Luego, crea una base de datos con el nombre especificado en tu archivo .env (ej. biblioteca_online).

6-Ejecutar Migraciones de la Base de Datos
Las migraciones de Sequelize se encargarán de crear las tablas y las relaciones necesarias en tu base de datos:
npx sequelize-cli db:migrate

(Opcional) Para poblar la base de datos con datos de prueba iniciales, puedes ejecutar los seeders:
npx sequelize-cli db:seed:all

7- **Iniciar el Servidor**
```bash
npm start
```

Opcional para desarrollo con recarga automática al detectar cambios:
npm run dev

El servidor estará escuchando en el puerto configurado en tu archivo .env (por defecto, http://localhost:3000).


Rutas de la API (Endpoints Principales)
Aquí se detallan las principales rutas de la API, que permiten realizar las operaciones CRUD sobre los modelos. Para una referencia completa, se recomienda revisar la carpeta routes/.

Autenticación (/api/auth)
POST /api/auth/register: Crear un nuevo usuario
POST /api/auth/login: Realizar login para obtener un JWT

Usuarios (/api/users) - Requieren Autenticación JWT
GET /api/users/profile: Recuperar el perfil del usuario autenticado.
PUT /api/users/membership: Simula la actualización del estado de membresía (en un proyecto real, se integraría con una pasarela de pagos).

Libros (/api/books) - Algunas rutas requieren autenticación/autorización
GET /api/books: Recuperar la lista de todos los libros (con soporte para paginación y filtros).
GET /api/books/:id: Recuperar los detalles de un libro específico.
POST /api/books/upload: Crear (subir) un nuevo libro (requiere rol uploader o admin).
GET /api/books/:id/download: Recuperar (descargar) un libro (requiere membresía activa/prueba).
GET /api/books/:id/read: Recuperar (leer) un libro online (requiere membresía activa/prueba).
DELETE /api/books/:id: Eliminar un libro (requiere ser el uploader o un admin).

Reseñas (/api/reviews) - Requieren Autenticación JWT
POST /api/books/:bookId/reviews: Crear una nueva reseña para un libro.
GET /api/books/:bookId/reviews: Recuperar todas las reseñas de un libro.
PUT /api/reviews/:id: Actualizar una reseña propia.
DELETE /api/reviews/:id: Eliminar una reseña propia.

Documentación y Buenas Prácticas
Durante el desarrollo de este trabajo práctico, se ha puesto especial énfasis en:

Modularidad: Código organizado en módulos lógicos (modelos, controladores, rutas, middlewares).
Escalabilidad: Diseño que permite añadir nuevas funcionalidades o manejar un mayor volumen de usuarios y datos.
Seguridad: Implementación de hashing de contraseñas (bcrypt) y autenticación con JWT.
Manejo de Errores: Captura y respuesta adecuada a errores inesperados y validaciones.
Legibilidad del Código: Nombres de variables y funciones claros, y comentarios cuando son necesarios.
Documentación: Este README sirve como documentación principal para la ejecución y uso de la API.

Versionado: Utilizamos Git para el control de versiones y realiza commits frecuentes y descriptivos.
Testing: agregamos tests automáticos para endpoints críticos.
Documentación de la API: Puedes agregar Swagger o Postman Collection para documentar y probar la API.
Despliegue: Si lo deseas, puedes desplegar el backend en servicios como Heroku, Railway, Vercel, etc.
Seguridad: Nunca subas tu archivo .env ni claves sensibles al repositorio.

## Endpoints principales y ejemplos de uso

### Autenticación

#### POST /api/auth/register
Crea un nuevo usuario.

**Request:**
```json
{
  "userName": "juan",
  "mail": "juan@email.com",
  "pass": "123456"
}
```
**Response (201):**
```json
{
  "userName": "juan",
  "mail": "juan@email.com"
}
```

#### POST /api/auth/login
Obtiene un JWT válido.

**Request:**
```json
{
  "mail": "juan@email.com",
  "pass": "123456"
}
```
**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

### Usuarios

#### POST /api/users
Crea un usuario (registro público).

**Request:**
```json
{
  "userName": "maria",
  "mail": "maria@email.com",
  "pass": "abcdef"
}
```
**Response (201):**
```json
{
  "id": 2,
  "userName": "maria",
  "mail": "maria@email.com",
  "pass": "abcdef"
}
```

#### GET /api/users
Requiere autenticación JWT (en header Authorization: Bearer TOKEN)

**Response (200):**
```json
[
  {
    "id": 1,
    "userName": "juan",
    "mail": "juan@email.com",
    "Books": [ { "title": "El Quijote" } ]
  },
  ...
]
```

---

### Libros

#### POST /api/books
Crea un libro (requiere JWT)

**Request:**
```json
{
  "title": "El Quijote",
  "author": "Cervantes",
  "GenreId": 1
}
```
**Response (201):**
```json
{
  "id": 1,
  "title": "El Quijote",
  "author": "Cervantes",
  "GenreId": 1
}
```

#### GET /api/books
Lista todos los libros (público)

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "El Quijote",
    "author": "Cervantes",
    "GenreId": 1,
    "Genre": { "id": 1, "name": "Novela" }
  },
  ...
]
```

---

### Géneros

#### POST /api/genres
Crea un género (requiere JWT)

**Request:**
```json
{
  "name": "Novela"
}
```
**Response (201):**
```json
{
  "id": 1,
  "name": "Novela"
}
```

#### GET /api/genres
Lista todos los géneros (público)

**Response (200):**
```json
[
  { "id": 1, "name": "Novela" },
  ...
]
```

---

### Reseñas (Reviews)

#### POST /api/books/:bookId/reviews
Crea una nueva reseña para un libro (requiere JWT)

**Request:**
```json
{
  "rating": 5,
  "comment": "Excelente libro, muy recomendable!"
}
```
**Response (201):**
```json
{
  "id": 1,
  "rating": 5,
  "comment": "Excelente libro, muy recomendable!",
  "BookId": 1,
  "UserId": 2
}
```

#### GET /api/books/:bookId/reviews
Lista todas las reseñas de un libro (público)

**Response (200):**
```json
[
  {
    "id": 1,
    "rating": 5,
    "comment": "Excelente libro, muy recomendable!",
    "User": { "id": 2, "userName": "maria" }
  },
  ...
]
```

#### PUT /api/reviews/:id
Actualiza una reseña propia (requiere JWT)

**Request:**
```json
{
  "rating": 4,
  "comment": "Muy bueno, pero esperaba más del final."
}
```
**Response (200):**
```json
{
  "id": 1,
  "rating": 4,
  "comment": "Muy bueno, pero esperaba más del final.",
  "BookId": 1,
  "UserId": 2
}
```

#### DELETE /api/reviews/:id
Elimina una reseña propia (requiere JWT)

**Response (200):**
```json
{
  "message": "Reseña eliminada"
}
```

---

### Subida de archivos (libros o portadas)

#### POST /api/books/upload
Sube un archivo de libro o portada (requiere JWT y rol uploader/admin)

**Request (form-data):**
- `file`: archivo PDF o imagen
- `title`: string
- `author`: string
- `GenreId`: int

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/api/books/upload \
  -H "Authorization: Bearer TU_TOKEN_JWT" \
  -F "file=@/ruta/al/archivo.pdf" \
  -F "title=Nuevo Libro" \
  -F "author=Autor" \
  -F "GenreId=1"
```
**Response (201):**
```json
{
  "id": 2,
  "title": "Nuevo Libro",
  "author": "Autor",
  "GenreId": 1,
  "fileUrl": "/storage/archivos/archivo.pdf"
}
```

---

### Errores comunes

**Validación fallida:**
```json
{
  "errors": [
    { "msg": "El email debe ser válido", "param": "mail", "location": "body" }
  ]
}
```

**Token inválido o ausente:**
```json
{
  "error": "Token requerido"
}
```

## Tests automáticos (Jest + Supertest)

Se incluye una estructura de tests automáticos en la carpeta `tests/` usando Jest y Supertest. Ejemplo de estructura:

```
tests/
  ├── auth.test.js      # Pruebas de autenticación
  ├── books.test.js     # Pruebas de libros
  ├── genres.test.js    # Pruebas de géneros
  ├── reviews.test.js   # Pruebas de reseñas
  └── users.test.js     # Pruebas de usuarios
```

### Ejemplo de test de autenticación (`tests/auth.test.js`):

```js
const request = require('supertest');
const app = require('../app');

describe('Auth Endpoints', () => {
  it('debería registrar un usuario nuevo', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        userName: 'testuser',
        mail: 'testuser@email.com',
        pass: 'testpass123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userName', 'testuser');
  });

  it('debería loguear un usuario y devolver un token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        mail: 'testuser@email.com',
        pass: 'testpass123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
```

### Cómo ejecutar los tests

1. Instala las dependencias necesarias:
   ```bash
   npm install --save-dev jest supertest
   ```
2. Agrega en tu `package.json`:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```
3. Ejecuta los tests:
   ```bash
   npm test
   ```

Los tests cubren los endpoints principales y validan el funcionamiento básico de la API.