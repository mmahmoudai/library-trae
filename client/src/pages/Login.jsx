import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <section aria-label="Login page">
      <h1>Login</h1>
      <div className="auth-container">
        <LoginForm />
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </section>
  );
}
