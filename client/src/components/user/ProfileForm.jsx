import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

export default function ProfileForm() {
  const { user, updateProfile, loading, error, refreshMe } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    refreshMe();
  }, []);

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const ok = await updateProfile({ name, email, password: password || undefined });
    if (ok) {
      setPassword('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit} aria-label="Profile form">
      <h2>Profile</h2>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="password">New Password</label>
      <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {error && <div role="alert" className="alert">{error}</div>}
      {success && <div role="status" className="success">Saved!</div>}
      <button className="btn" type="submit" disabled={loading}>
        {loading ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  );
}