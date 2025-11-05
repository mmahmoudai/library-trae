# API Endpoints

Base URL: `http://localhost:5000/api`

## Auth
- `POST /auth/register`
  - Body: `{ name, email, password }`
  - Returns: `{ user, token }`

- `POST /auth/login`
  - Body: `{ email, password }`
  - Returns: `{ user, token }`

- `GET /auth/me` (auth required)
  - Header: `Authorization: Bearer <token>`
  - Returns: `{ user }`

## Users
- `GET /users/profile` (auth)
  - Returns: `{ user }`

- `PUT /users/profile` (auth)
  - Body: `{ name, email, password? }`
  - Returns: `{ user }`

## Books
- `GET /books`
  - Query params: `q`, `author`, `title`, `page`, `limit`
  - Returns: `{ data: Book[], page, total }`

- `GET /books/:id`
  - Returns: `Book`

- `POST /books/:id/favorite` (auth)
  - Returns: `{ message: 'added' }`

- `DELETE /books/:id/favorite` (auth)
  - Returns: `{ message: 'removed' }`