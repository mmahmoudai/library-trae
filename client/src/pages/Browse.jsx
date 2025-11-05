import React from 'react';
import BookList from '../components/books/BookList';

export default function Browse() {
  return (
    <section aria-label="Browse books">
      <h1>Browse</h1>
      <BookList />
    </section>
  );
}