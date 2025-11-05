import api, { setAuthToken } from './api';

export const setToken = (token) => setAuthToken(token);
export const clearToken = () => setAuthToken(null);

export async function register(name, email, password) {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data;
}

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function getMe() {
  const { data } = await api.get('/auth/me');
  return data;
}

export async function updateProfile(payload) {
  const { data } = await api.put('/users/profile', payload);
  return data;
}