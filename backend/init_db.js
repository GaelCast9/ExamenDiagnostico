const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root'
    });

    console.log('Connected to MySQL server.');

    await connection.query('CREATE DATABASE IF NOT EXISTS books_db;');
    console.log('Database books_db created or already exists.');

    await connection.query('USE books_db;');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        genre VARCHAR(100) NOT NULL,
        publication_year INT NOT NULL,
        cover_url TEXT
      );
    `;
    await connection.query(createTableQuery);
    console.log('Table books created or already exists.');

    // Insert dummy data
    const checkData = await connection.query('SELECT COUNT(*) AS count FROM books');
    if (checkData[0][0].count === 0) {
      const insertQuery = `
        INSERT INTO books (title, author, genre, publication_year, cover_url) VALUES 
        ('Cien años de soledad', 'Gabriel García Márquez', 'Realismo mágico', 1967, 'https://images.cdn2.buscalibre.com/fit-in/360x360/61/8d/618d227e8967274cd9589a549adff52d.jpg'),
        ('1984', 'George Orwell', 'Ciencia ficción', 1949, 'https://m.media-amazon.com/images/I/71kXa1lJSMX._AC_UF1000,1000_QL80_.jpg'),
        ('El señor de los anillos', 'J.R.R. Tolkien', 'Fantasía', 1954, 'https://m.media-amazon.com/images/I/71jLbBbc5LL._AC_UF1000,1000_QL80_.jpg')
      `;
      await connection.query(insertQuery);
      console.log('Dummy data inserted.');
    }

    await connection.end();
    console.log('Database initialization complete.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();
