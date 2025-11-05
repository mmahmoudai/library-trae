import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useBooks from '../../hooks/useBooks';

export default function BookDetails() {
  const { id } = useParams();
  const { getBook, loading, error } = useBooks();
  const [book, setBook] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getBook(id);
      setBook(data);
    })();
  }, [id]);

  if (loading && !book) return <div className="loading" role="status">Loading…</div>;
  if (error && !book) return <div className="alert" role="alert">{error}</div>;
  if (!book) return null;

  return (
    <article className="details">
      <img src={book.coverImage || 'https://via.placeholder.com/200x300?text=No+Cover'} alt={`Cover of ${book.title}`} />
      <div>
        <h1>{book.title}</h1>
        <p className="details__author">{book.author}</p>
        <p>{book.description || 'No description available.'}</p>
      </div>
    </article>
  );
}