import api from './api';

export async function getBooks(params) {
  const { data } = await api.get('/books', { params });
  return data;
}

export async function getBook(id) {
  const { data } = await api.get(`/books/${id}`);
  return data;
}

export async function addFavorite(id) {
  const { data } = await api.post(`/books/${id}/favorite`);
  return data;
}

export async function removeFavorite(id) {
  const { data } = await api.delete(`/books/${id}/favorite`);
  return data;
}

export async function getFavorites() {
  const { data } = await api.get('/users/favorites');
  return data;
}