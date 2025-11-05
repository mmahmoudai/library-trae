# Frontend Components & Architecture

## Components
### Auth
- `LoginForm`: Email/password login, shows errors and loading state.
- `RegisterForm`: Creates account, basic client-side validation.

### Books
- `BookCard`: Displays cover, title, author, favorite toggle.
- `BookList`: Grid list with pagination; uses `useBooks` data.
- `BookDetails`: Detailed view of a single book.

### User
- `ProfileForm`: Edit name/email/password; shows success/error states.
- `FavoritesList`: Shows user’s favorite books.

### Shared
- `Navbar`: Global nav; shows auth state; links to Home/Browse/Profile.
- `Footer`: Site footer and attribution.

## Pages
- `Home`: Responsive hero with featured content.
- `Browse`: Search, filter, and list books.
- `Profile`: User profile and favorites.

## State & Data Flow
- `AuthContext`: Holds `{ user, token }`, methods: `login`, `logout`, `register`, `refreshMe`.
- `BookContext`: Holds `{ books, loading, error }`, methods: `searchBooks`, `getBook`, `favoriteBook`, `unfavoriteBook`.
- Hooks `useAuth`, `useBooks` wrap contexts for convenience.
- Services:
  - `authService`: `register`, `login`, `getMe`
  - `bookService`: `getBooks`, `getBook`, `addFavorite`, `removeFavorite`

## UI/UX Patterns
- Responsive Grid/Flexbox layouts
- Accessible forms with labels, roles, and focus management
- Consistent theme (colors, typography) and spacing scale
- Loading spinners/skeletons + inline error messages