const pool = require('../config/db');

exports.getAllBooks = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM books ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros', error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el libro', error: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, publication_year, cover_url } = req.body;
    
    // Validate required fields (at least 4 fields required by the user)
    if (!title || !author || !genre || !publication_year) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios (excepto portada).' });
    }

    const query = 'INSERT INTO books (title, author, genre, publication_year, cover_url) VALUES (?, ?, ?, ?, ?)';
    const [result] = await pool.query(query, [title, author, genre, publication_year, cover_url || null]);
    
    res.status(201).json({ id: result.insertId, title, author, genre, publication_year, cover_url });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el libro', error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, publication_year, cover_url } = req.body;
    
    const query = 'UPDATE books SET title = ?, author = ?, genre = ?, publication_year = ?, cover_url = ? WHERE id = ?';
    const [result] = await pool.query(query, [title, author, genre, publication_year, cover_url || null, id]);
    
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json({ message: 'Libro actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el libro', error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM books WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json({ message: 'Libro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro', error: error.message });
  }
};
