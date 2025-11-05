import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetails from './components/books/BookDetails';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main role="main" className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;