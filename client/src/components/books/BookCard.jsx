import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useBooks from '../../hooks/useBooks';

export default function BookCard({ book }) {
  const { isAuthenticated } = useAuth();
  const { favoriteBook, unfavoriteBook, favorites } = useBooks();
  const isFav = favorites.some((f) => f.bookId === book._id || f.book?._id === book._id);

  return (
    <article className="card" aria-label={book.title}>
      <img src={book.coverImage || 'https://via.placeholder.com/200x300?text=No+Cover'} alt={`Cover of ${book.title}`} />
      <div className="card__body">
        <h3 className="card__title"><Link to={`/books/${book._id}`}>{book.title}</Link></h3>
        <p className="card__meta">{book.author}</p>
        {isAuthenticated && (
          isFav ? (
            <button className="btn btn--secondary" onClick={() => unfavoriteBook(book._id)} aria-label="Remove from favorites">★ Remove Favorite</button>
          ) : (
            <button className="btn" onClick={() => favoriteBook(book._id)} aria-label="Add to favorites">☆ Add Favorite</button>
          )
        )}
      </div>
    </article>
  );
}