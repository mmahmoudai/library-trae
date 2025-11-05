import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email.trim(), password);
  };

  return (
    <form className="form" onSubmit={onSubmit} aria-label="Login form">
      <h2>Login</h2>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      {error && <div role="alert" className="alert">{error}</div>}
      <button className="btn" type="submit" disabled={loading}>
        {loading ? 'Logging in…' : 'Login'}
      </button>
    </form>
  );
}