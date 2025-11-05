import React, { createContext, useContext, useMemo, useState } from 'react';
import * as bookService from '../services/bookService';

const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchBooks = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await bookService.getBooks(params);
      setBooks(res.data);
      return res;
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const getBook = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const book = await bookService.getBook(id);
      return book;
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const favs = await bookService.getFavorites();
      setFavorites(favs);
    } catch (_) {}
  };

  const favoriteBook = async (id) => {
    try {
      await bookService.addFavorite(id);
      await loadFavorites();
    } catch (_) {}
  };

  const unfavoriteBook = async (id) => {
    try {
      await bookService.removeFavorite(id);
      await loadFavorites();
    } catch (_) {}
  };

  const value = useMemo(
    () => ({ books, favorites, loading, error, searchBooks, getBook, favoriteBook, unfavoriteBook, loadFavorites }),
    [books, favorites, loading, error]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBookContext = () => useContext(BookContext);