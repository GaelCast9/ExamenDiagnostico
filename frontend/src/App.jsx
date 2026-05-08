import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, PlusCircle } from 'lucide-react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1>
              <BookOpen size={36} color="#a855f7" />
              Librería Digital
            </h1>
          </Link>
          <Link to="/add" className="btn btn-primary">
            <PlusCircle size={20} />
            Añadir Libro
          </Link>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<BookForm />} />
            <Route path="/edit/:id" element={<BookForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
