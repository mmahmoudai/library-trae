import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/books/BookCard';
import useBooks from '../hooks/useBooks';
import api from '../services/api';

export default function Home() {
  const { books, loading, searchBooks } = useBooks();
  const [latestBooks, setLatestBooks] = useState([]);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      const result = await searchBooks({ page: 1, limit: 12 });
      // If no books found, seed the database
      if (result && result.total === 0 && !seeding) {
        setSeeding(true);
        try {
          await api.post('/seed');
          // Reload books after seeding
          await searchBooks({ page: 1, limit: 12 });
        } catch (err) {
          console.error('Failed to seed database:', err);
        } finally {
          setSeeding(false);
        }
      }
    };
    loadBooks();
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      setLatestBooks(books.slice(0, 12));
    }
  }, [books]);

  return (
    <>
      <section className="hero" aria-label="Featured content">
        <div className="hero__content">
          <h1>Welcome to the Library</h1>
          <p>Browse thousands of books, save your favorites, and manage your profile.</p>
          <Link className="btn" to="/browse">Start Browsing</Link>
        </div>
      </section>
      
      {/* Featured books from API */}
      <section aria-label="Featured books" className="container">
        <h2>Latest Books</h2>
        {seeding ? (
          <p>Setting up the library... Please wait.</p>
        ) : loading ? (
          <p>Loading books...</p>
        ) : latestBooks.length > 0 ? (
          <div className="grid">
            {latestBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p>No books available yet. Check back later!</p>
        )}
      </section>
    </>
  );
}