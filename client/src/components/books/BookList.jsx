import React, { useEffect, useState } from 'react';
import useBooks from '../../hooks/useBooks';
import BookCard from './BookCard';

export default function BookList({ initialQuery = {} }) {
  const { books, loading, error, searchBooks, loadFavorites } = useBooks();
  const [query, setQuery] = useState({ q: '', author: '', title: '', page: 1, limit: 12, ...initialQuery });

  useEffect(() => {
    searchBooks(query);
    loadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page, query.limit]);

  const onSearch = (e) => {
    e.preventDefault();
    searchBooks(query);
  };

  return (
    <section>
      <form className="filter" onSubmit={onSearch} aria-label="Book search">
        <input aria-label="Search query" placeholder="Search" value={query.q} onChange={(e) => setQuery({ ...query, q: e.target.value })} />
        <input aria-label="Filter by author" placeholder="Author" value={query.author} onChange={(e) => setQuery({ ...query, author: e.target.value })} />
        <input aria-label="Filter by title" placeholder="Title" value={query.title} onChange={(e) => setQuery({ ...query, title: e.target.value })} />
        <button className="btn" type="submit">Search</button>
      </form>

      {loading && <div className="loading" role="status">Loading…</div>}
      {error && <div className="alert" role="alert">{error}</div>}

      <div className="grid">
        {books.map((b) => (
          <BookCard key={b._id} book={b} />
        ))}
      </div>
    </section>
  );
}