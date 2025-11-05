import React from 'react';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <p>© {new Date().getFullYear()} Library. Built with Node.js + React.</p>
    </footer>
  );
}