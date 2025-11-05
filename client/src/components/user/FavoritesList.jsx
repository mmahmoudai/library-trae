import React, { useEffect } from 'react';
import useBooks from '../../hooks/useBooks';
import BookCard from '../books/BookCard';

export default function FavoritesList() {
  const { favorites, loadFavorites } = useBooks();

  useEffect(() => {
    loadFavorites();
  }, []);

  if (!favorites.length) return <p>No favorites yet.</p>;

  return (
    <section>
      <h2>Favorites</h2>
      <div className="grid">
        {favorites.map((f) => (
          <BookCard key={f._id || f.bookId} book={f.book || { _id: f.bookId, title: f.title, author: f.author, coverImage: f.coverImage }} />
        ))}
      </div>
    </section>
  );
}