import React from 'react';
import useAuth from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ProfileForm from '../components/user/ProfileForm';
import FavoritesList from '../components/user/FavoritesList';

export default function Profile() {
  const { isAuthenticated } = useAuth();

  return (
    <section aria-label="User profile">
      <h1>Profile</h1>
      {isAuthenticated ? (
        <div className="profile__grid">
          <ProfileForm />
          <FavoritesList />
        </div>
      ) : (
        <div className="profile__grid">
          <LoginForm />
          <RegisterForm />
        </div>
      )}
    </section>
  );
}