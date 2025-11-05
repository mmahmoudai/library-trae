import { render, screen } from '@testing-library/react';
import Home from './Home';

test('shows hero content', () => {
  render(<Home />);
  expect(screen.getByRole('heading', { name: /Welcome to the Library/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Start Browsing/i })).toBeInTheDocument();
});