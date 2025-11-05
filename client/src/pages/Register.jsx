import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  return (
    <section aria-label="Register page">
      <h1>Register</h1>
      <div className="auth-container">
        <RegisterForm />
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </section>
  );
}
