import { useBookContext } from '../context/BookContext';

export default function useBooks() {
  return useBookContext();
}