import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import './styles/main.css';
import './styles/components.css';

const container = document.getElementById('root');
const root = createRoot(container);

// Render without JSX to avoid import-analysis parse issues in entry
root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      BrowserRouter,
      null,
      React.createElement(
        AuthProvider,
        null,
        React.createElement(
          BookProvider,
          null,
          React.createElement(App, null)
        )
      )
    )
  )
);