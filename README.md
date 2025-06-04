# tp2_trabajointegrador
Biblioteca Online - Trabajo Práctico (Backend)
🎯 Objetivo del Trabajo Práctico
El objetivo principal de este trabajo práctico es explorar las posibilidades de Node.js, Express y Sequelize, y desarrollar habilidades para crear soluciones más robustas y complejas en términos de arquitectura de software y calidad de código. Esto implica aplicar buenas prácticas de desarrollo como la modularidad, la escalabilidad y la seguridad, así como tener en cuenta aspectos como el rendimiento, la usabilidad y la mantenibilidad del código.

✨ Especificaciones del Proyecto
Este backend implementa una API RESTful para una biblioteca online, permitiendo a los usuarios subir, gestionar, calificar y comentar libros, mientras que otros usuarios registrados pueden leerlos o descargarlos bajo un modelo de membresía de pago con un período de prueba gratuito de 30 días.

El proyecto cumple con las siguientes especificaciones técnicas y se anima a investigar e implementar funcionalidades adicionales:

Base de Datos Relacional: Cuenta con al menos dos tablas relacionadas entre sí (User, Book, Review).
API RESTful con CRUD: Las rutas del API permiten realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para cada modelo.
Patrón de Diseño MVC: El código está organizado siguiendo el patrón Modelo-Vista-Controlador.
Manejo de Errores: Se implementa un manejo de errores adecuado para garantizar la robustez del servidor.
Entrega y Documentación: El trabajo se entrega en un repositorio Git con un archivo README completo.
Presentación Oral: Se requiere una presentación donde se explique la implementación y se respondan preguntas.
🚀 Tecnologías Utilizadas
Este backend ha sido construido con un stack moderno, ideal para aprender y aplicar conceptos de desarrollo web:

Node.js: Entorno de ejecución de JavaScript.
Express: Framework web minimalista y flexible para Node.js.
Sequelize: ORM para Node.js que facilita la interacción con bases de datos relacionales.
MySQL: Sistema de gestión de bases de datos relacional.
Bcrypt.js: Librería para el hashing seguro de contraseñas.
JSON Web Tokens (JWT): Estándar para la autenticación y autorización segura.
Multer: Middleware para el manejo de subidas de archivos (libros y portadas).
Dotenv: Módulo para cargar variables de entorno.
🗄️ Estructura del Proyecto
El proyecto sigue una arquitectura modular y limpia, diseñada para reflejar el patrón MVC y facilitar el mantenimiento y la escalabilidad:

biblioteca-online-backend/
├── config/             # Archivos de configuración (DB para Sequelize, JWT)
├── controllers/        # **Capa del Controlador**: Contiene la lógica de negocio y procesa las peticiones.
├── models/             # **Capa del Modelo**: Define la estructura de datos (Sequelize Models) y las interacciones con la DB.
├── middleware/         # Funciones middleware para autenticación, autorización y subida de archivos.
├── migrations/         # Migraciones de Sequelize para la gestión del esquema de la base de datos.
├── seeders/            # Seeders de Sequelize para poblar la base de datos con datos iniciales (opcional).
├── routes/             # **Capa de Rutas**: Define los endpoints de la API y los asocia a los controladores.
├── storage/            # Carpeta para almacenar físicamente los archivos de libros y portadas subidos.
├── app.js              # Archivo principal de la aplicación Express y configuración global.
├── package.json        # Definición de dependencias y scripts del proyecto.
├── .env.example        # Archivo de ejemplo para las variables de entorno.
└── .gitignore          # Archivos y carpetas a ignorar por Git.
🛠️ Pasos para Configuración y Ejecución
Sigue estos pasos para levantar el proyecto en tu entorno local, aplicando las fases de desarrollo aprendidas:

1. Requisitos Previos
Asegúrate de tener instalados los siguientes componentes:

Node.js (versión 14 o superior recomendada)
MySQL Server
npm (incluido con Node.js)
2. Clonar el Repositorio
Bash

git clone [URL_DEL_REPOSITORIO]
cd biblioteca-online-backend
3. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto (puedes usar .env.example como plantilla) y configura tus variables de entorno esenciales:

Fragmento de código

# .env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=biblioteca_online
JWT_SECRET=your_super_secret_jwt_key # ¡Cambia esto por una clave fuerte y secreta!
JWT_EXPIRES_IN=1h
4. Instalar Dependencias
Bash

npm install
5. Configurar la Base de Datos
Asegúrate de que tu servidor MySQL esté en funcionamiento. Luego, crea una base de datos con el nombre especificado en tu archivo .env (ej. biblioteca_online).

6. Ejecutar Migraciones de la Base de Datos
Las migraciones de Sequelize se encargarán de crear las tablas y las relaciones necesarias en tu base de datos:

Bash

npx sequelize-cli db:migrate
(Opcional) Para poblar la base de datos con datos de prueba iniciales, puedes ejecutar los seeders:

Bash

npx sequelize-cli db:seed:all
7. Iniciar el Servidor
Bash

npm start
# O para desarrollo con recarga automática al detectar cambios:
npm run dev
El servidor estará escuchando en el puerto configurado en tu archivo .env (por defecto, http://localhost:3000).

🗺️ Rutas de la API (Endpoints Principales)
Aquí se detallan las principales rutas de la API, que permiten realizar las operaciones CRUD sobre los modelos. Para una referencia completa, se recomienda revisar la carpeta routes/.

Autenticación (/api/auth)
POST /api/auth/register: Crear un nuevo usuario.
POST /api/auth/login: Realizar login para obtener un JWT.
Usuarios (/api/users) - Requieren Autenticación JWT
GET /api/users/profile: Recuperar el perfil del usuario autenticado.
PUT /api/users/membership: Update: Simula la actualización del estado de membresía (en un proyecto real, se integraría con una pasarela de pagos).
Libros (/api/books) - Algunas rutas requieren autenticación/autorización
GET /api/books: Recuperar la lista de todos los libros (con soporte para paginación y filtros).
GET /api/books/:id: Recuperar los detalles de un libro específico.
POST /api/books/upload: Crear (subir) un nuevo libro (requiere rol uploader o admin).
GET /api/books/:id/download: Recuperar (descargar) un libro (requiere membresía activa/prueba).
GET /api/books/:id/read: Recuperar (leer) un libro online (requiere membresía activa/prueba).
DELETE /api/books/:id: Delete: Eliminar un libro (requiere ser el uploader o un admin).
Reseñas (/api/reviews) - Requieren Autenticación JWT
POST /api/books/:bookId/reviews: Crear una nueva reseña para un libro.
GET /api/books/:bookId/reviews: Recuperar todas las reseñas de un libro.
PUT /api/reviews/:id: Update: Actualizar una reseña propia.
DELETE /api/reviews/:id: Delete: Eliminar una reseña propia.
📝 Documentación y Buenas Prácticas
Durante el desarrollo de este trabajo práctico, se ha puesto especial énfasis en:

Modularidad: Código organizado en módulos lógicos (modelos, controladores, rutas, middlewares).
Escalabilidad: Diseño que permite añadir nuevas funcionalidades o manejar un mayor volumen de usuarios y datos.
Seguridad: Implementación de hashing de contraseñas (bcrypt) y autenticación con JWT.
Manejo de Errores: Captura y respuesta adecuada a errores inesperados y validaciones.
Legibilidad del Código: Nombres de variables y funciones claros, y comentarios cuando son necesarios.
Documentación: Este README sirve como documentación principal para la ejecución y uso de la API.