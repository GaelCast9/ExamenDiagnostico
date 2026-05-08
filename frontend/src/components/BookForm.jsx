import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/books';

function BookForm() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publication_year: '',
    cover_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${id}`);
      setFormData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los datos del libro');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar el libro');
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2 style={{ marginBottom: '1.5rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {isEditing ? 'Editar Libro' : 'Registrar Nuevo Libro'}
      </h2>
      
      {error && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', borderRadius: '0.5rem', marginBottom: '1.5rem', color: '#fca5a5' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título del libro *</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Ej. Cien años de soledad"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Autor *</label>
          <input
            type="text"
            id="author"
            name="author"
            className="form-control"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Ej. Gabriel García Márquez"
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Género literario *</label>
          <input
            type="text"
            id="genre"
            name="genre"
            className="form-control"
            value={formData.genre}
            onChange={handleChange}
            required
            placeholder="Ej. Realismo mágico"
          />
        </div>

        <div className="form-group">
          <label htmlFor="publication_year">Año de publicación *</label>
          <input
            type="number"
            id="publication_year"
            name="publication_year"
            className="form-control"
            value={formData.publication_year}
            onChange={handleChange}
            required
            min="1000"
            max={new Date().getFullYear()}
            placeholder="Ej. 1967"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cover_url">URL de la Portada (Opcional)</label>
          <input
            type="url"
            id="cover_url"
            name="cover_url"
            className="form-control"
            value={formData.cover_url}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          {formData.cover_url && (
            <div style={{ marginTop: '1rem', borderRadius: '0.5rem', overflow: 'hidden', width: '100px', height: '150px' }}>
              <img src={formData.cover_url} alt="Vista previa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        <div className="form-actions">
          <Link to="/" className="btn btn-secondary">
            <ArrowLeft size={18} /> Cancelar
          </Link>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Save size={18} /> {loading ? 'Guardando...' : 'Guardar Libro'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;
