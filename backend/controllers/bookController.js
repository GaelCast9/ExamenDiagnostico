const Libro = require('../models/Libro');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Libro.findAll({
      order: [['id', 'DESC']]
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros', error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Libro.findByPk(id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el libro', error: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { titulo, autor, genero, anio_publicacion, url_portada } = req.body;
    
    if (!titulo || !autor || !genero || !anio_publicacion) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios (excepto portada).' });
    }

    const newBook = await Libro.create({
      titulo,
      autor,
      genero,
      anio_publicacion,
      url_portada: url_portada || null
    });
    
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el libro', error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, genero, anio_publicacion, url_portada } = req.body;
    
    const [updatedRows] = await Libro.update(
      { titulo, autor, genero, anio_publicacion, url_portada: url_portada || null },
      { where: { id } }
    );
    
    if (updatedRows === 0) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json({ message: 'Libro actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el libro', error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Libro.destroy({
      where: { id }
    });
    
    if (deletedRows === 0) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json({ message: 'Libro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro', error: error.message });
  }
};
