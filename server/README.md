# Server API

Base: `/api`

## Auth
- `POST /auth/register` – Create account
- `POST /auth/login` – Get JWT
- `GET /auth/me` – Current user

## Users
- `GET /users/profile` – Get profile
- `PUT /users/profile` – Update profile (name/email/password)

## Books
- `GET /books` – List (q/title/author, page, limit)
- `GET /books/:id` – Details
- `POST /books/:id/favorite` – Add to favorites
- `DELETE /books/:id/favorite` – Remove from favorites

## Security
- JWT auth middleware protects private routes
- Rate limiting and Helmet for basic hardening
- CORS configured via env