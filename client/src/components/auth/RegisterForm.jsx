import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

export default function RegisterForm() {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    await register(name.trim(), email.trim(), password);
  };

  return (
    <form className="form" onSubmit={onSubmit} aria-label="Register form">
      <h2>Register</h2>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />

      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      {error && <div role="alert" className="alert">{error}</div>}
      <button className="btn" type="submit" disabled={loading}>
        {loading ? 'Creating…' : 'Create account'}
      </button>
    </form>
  );
}