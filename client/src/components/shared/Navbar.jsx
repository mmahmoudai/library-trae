import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar__brand">
        <Link to="/" className="navbar__logo">📚 Library</Link>
      </div>
      <ul className="navbar__links" role="menubar">
        <li role="none">
          <NavLink role="menuitem" to="/" end>Home</NavLink>
        </li>
        <li role="none">
          <NavLink role="menuitem" to="/browse">Browse</NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li role="none">
              <NavLink role="menuitem" to="/profile">Profile</NavLink>
            </li>
            <li role="none">
              <button className="btn btn--text" onClick={logout} aria-label="Logout">Logout</button>
            </li>
            <li role="none" className="navbar__user">{user?.name}</li>
          </>
        ) : (
          <>
            <li role="none">
              <NavLink role="menuitem" to="/login">Login</NavLink>
            </li>
            <li role="none">
              <NavLink role="menuitem" to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}