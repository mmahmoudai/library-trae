import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthProvider } from '../../context/AuthContext';

test('renders brand and links', async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </BrowserRouter>
  );
  expect(screen.getByText(/Library/)).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: /Home/ })).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: /Browse/ })).toBeInTheDocument();
});