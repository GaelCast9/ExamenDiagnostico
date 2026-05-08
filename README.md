# CRUD de Libros - Examen Diagnóstico

Aplicación web Full-Stack tipo CRUD para la gestión de libros, desarrollada como parte de un examen diagnóstico.

## Descripción

El proyecto consiste en una plataforma moderna que permite administrar un catálogo de libros. Cuenta con un backend robusto construido con Node.js y Express que se comunica con una base de datos MySQL. El frontend, desarrollado con React y Vite, ofrece una interfaz de usuario atractiva, dinámica y responsiva aplicando principios modernos de diseño (Glassmorphism, animaciones suaves, tipografía cuidada).

## Tecnologías Utilizadas

### Frontend
- **React (Vite)**: Librería principal para la construcción de interfaces de usuario.
- **React Router DOM**: Para el enrutamiento de la SPA (Single Page Application).
- **Axios**: Para la comunicación HTTP con la API REST.
- **Lucide React**: Biblioteca de iconos modernos.
- **CSS Vanilla (Premium Design)**: Estilos personalizados con variables, flexbox, grid, animaciones y glassmorphism.

### Backend
- **Node.js con Express**: Entorno de ejecución y framework para la API REST.
- **MySQL2**: Driver para la conexión asíncrona con la base de datos MySQL.
- **Dotenv**: Gestión de variables de entorno.
- **CORS**: Middleware para permitir peticiones entre diferentes orígenes.

## Funcionalidades

- **Registrar nuevos libros**: Formulario con validaciones para agregar título, autor, género, año de publicación y (opcionalmente) URL de la portada.
- **Consultar lista de libros**: Visualización en formato de cuadrícula atractiva con tarjetas de vidrio esmerilado.
- **Editar libros existentes**: Recuperación de los datos actuales y formulario de edición.
- **Eliminar libros**: Opción para remover un libro del catálogo con confirmación previa.
- Datos con mínimo 4 campos (id, title, author, genre, publication_year, cover_url).

## Instrucciones para Ejecutar el Proyecto

### Requisitos Previos
- Node.js (v16+)
- MySQL Server en ejecución local

### 1. Clonar el repositorio
```bash
git clone https://github.com/GaelCast9/ExamenDiagnostico.git
cd ExamenDiagnostico
```

### 2. Configurar la Base de Datos y Variables de Entorno

Asegúrate de que MySQL esté corriendo.
**Importante:** Debes crear la base de datos manualmente en MySQL antes de iniciar el servidor. Por ejemplo:
```sql
CREATE DATABASE books_db;
```
*(Nota: Sequelize se encargará de crear la tabla `libros` automáticamente cuando inicies el servidor por primera vez).*

Luego, configura las variables de entorno para el backend y frontend:

**Backend:**
Navega a la carpeta `backend`, copia el archivo `.env.example` y renómbralo a `.env`:
```bash
cd backend
npm install
cp .env.example .env
```
Edita el archivo `.env` con tus credenciales de MySQL:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=books_db
PORT=5000
```

**Frontend:**
Abre una nueva terminal, ve a la carpeta `frontend`, instala dependencias y crea su archivo `.env` basado en el `.env.example`:
```bash
cd frontend
npm install
cp .env.example .env
```
Asegúrate de que el archivo `frontend/.env` tenga la URL correcta de tu API:
```env
VITE_API_URL=http://localhost:5000/api/books
```

### 3. Iniciar el Servidor Backend
Vuelve a la terminal del backend y ejecuta:
```bash
npm start 
```
El servidor se ejecutará en `http://localhost:5000` y sincronizará las tablas con la base de datos.

### 4. Iniciar el Servidor Frontend
Abre una nueva terminal, ve a la carpeta del frontend y ejecuta:
```bash
cd frontend
npm install
npm run dev
```
La aplicación web estará disponible en la URL proporcionada por Vite (generalmente `http://localhost:5173`).

## Uso de Inteligencia Artificial
**¿Se usó IA?**: Sí.
**¿Para qué?**: Se utilizó un asistente de inteligencia artificial (Agente de Programación) para:
- Estructurar rápidamente los archivos base del proyecto (setup de Express y React).
- Generar el diseño CSS premium y moderno de manera eficiente, ahorrando tiempo en el maquetado.
- Implementar la conexión a la base de datos MySQL y la escritura de las consultas SQL y lógica del controlador de manera segura y estandarizada.
- Redactar este archivo `README.md` siguiendo las mejores prácticas de documentación.

