import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Edit, Trash2, Library, Calendar, User, Tag } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/books';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchBooks(); // Refresh list
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="empty-state">
        <Library size={64} />
        <h3>No hay libros registrados</h3>
        <p>Añade tu primer libro para comenzar a construir tu biblioteca.</p>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/add" className="btn btn-primary">Añadir Libro</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          {book.cover_url ? (
            <img src={book.cover_url} alt={`Portada de ${book.title}`} className="book-cover" />
          ) : (
            <div className="book-cover-placeholder">
              <Library size={48} />
            </div>
          )}
          
          <div className="book-info">
            <h3 className="book-title">{book.title}</h3>
            
            <div className="book-author">
              <User size={16} />
              {book.author}
            </div>
            
            <div className="book-meta">
              <span className="badge">
                <Tag size={12} />
                {book.genre}
              </span>
              <span className="badge">
                <Calendar size={12} />
                {book.publication_year}
              </span>
            </div>
            
            <div className="book-actions">
              <Link to={`/edit/${book.id}`} className="btn btn-secondary">
                <Edit size={16} /> Editar
              </Link>
              <button onClick={() => deleteBook(book.id)} className="btn btn-danger">
                <Trash2 size={16} /> Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
