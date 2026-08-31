<div align="center">
  <img src="client/src/assets/cl-logo.png" alt="CineLog logo" width="110" />

# CineLog

### Discover, track, and manage the movies and TV shows you watch.

A full-stack movie and TV tracking application built with React, Node.js, Express, MongoDB, and the TMDB API.

[Live Demo](https://cinelog-tracker.netlify.app/) · [Repository](https://github.com/awaiskamil-dev/cinelog-v2)

</div>

---

## About

CineLog is a responsive full-stack web application for discovering movies and TV shows and keeping a personal watchlist. Users can browse curated movie rows, search and filter titles, open detailed movie/TV overview pages, and track titles using statuses such as **Watching**, **Completed**, **Planning**, and **Dropped**.

The project includes a complete authentication flow with email verification, persistent login sessions, password reset, protected routes, and HTTP-only JWT cookies. User watchlist changes are reflected immediately in the UI while being persisted to MongoDB.

> **Deployment note:** the backend is hosted on Render's free tier, so the first request after inactivity may take a short while while the server wakes up. CineLog includes skeleton loaders and an informational toast to make this cold-start period clear to users.

## Features

- Browse **trending, popular, top-rated, upcoming, action, and animation** titles
- Search across movies and TV shows
- Filter discovery/search results by **genre, year, and format**
- Dedicated movie and TV overview pages with:
  - backdrop and poster artwork
  - ratings and metadata
  - genres
  - cast information
  - reviews
- Personal watchlist with multiple tracking statuses
- Add/remove favorites and edit tracked entries
- Responsive layouts for desktop, tablet, and mobile
- Skeleton loading states for slow network/server responses
- Toast notifications for success, errors, and server wake-up status
- Protected authenticated routes
- Persistent authentication across page refreshes
- Email verification on registration
- Forgot/reset password flow
- Secure logout and refresh-token handling

## Tech Stack

### Frontend

- React 19
- React Router
- Vite
- CSS3
- Font Awesome

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- HTTP-only signed cookies
- bcryptjs
- SendGrid
- TMDB API

### Security / Middleware

- Helmet
- CORS with credentials
- Express Rate Limit
- Mongo sanitize
- XSS protection
- Cookie Parser

### Deployment

- **Frontend:** Netlify
- **Backend:** Render
- **Database:** MongoDB

## Architecture

```text
cinelog-v2/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── config.js
│   └── package.json
│
└── server/                 # Node/Express REST API
    ├── controllers/
    ├── db/
    ├── errors/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── utils/
    ├── app.js
    └── package.json
```

The frontend communicates with the Express REST API. The backend handles authentication and user data in MongoDB and acts as the application layer between CineLog and the TMDB API.

## Authentication

CineLog uses access and refresh JWTs stored in **HTTP-only signed cookies**.

The authentication flow includes:

1. User registration
2. Verification email sent through SendGrid
3. Email verification before login is allowed
4. Access and refresh tokens issued on login
5. Authentication restoration through `/auth/me`
6. Refresh-token validation and rotation when required
7. Secure cookie removal and refresh-token deletion on logout

Passwords are hashed using `bcryptjs`, and protected endpoints use authentication middleware before accessing user-specific data.

## API Overview

The backend is mounted under `/api/v1`.

### Authentication

```text
POST    /api/v1/auth/register
POST    /api/v1/auth/login
DELETE  /api/v1/auth/logout
POST    /api/v1/auth/verify-email
POST    /api/v1/auth/forgot-password
POST    /api/v1/auth/reset-password
GET     /api/v1/auth/me
```

### User Entries

```text
GET     /api/v1/entries/me
GET     /api/v1/entries/movies/:id
POST    /api/v1/entries
DELETE  /api/v1/entries/:id
```

### Movies

```text
GET     /api/v1/movies/trending
GET     /api/v1/movies/popular
GET     /api/v1/movies/top-rated
GET     /api/v1/movies/upcoming
GET     /api/v1/movies/discover
GET     /api/v1/movies/search
GET     /api/v1/movies/action
GET     /api/v1/movies/animation
GET     /api/v1/movies/:id
```

### TV

TV-specific data is exposed through the `/api/v1/tv` routes, including detailed TV overview data.

### Health Check

```text
GET     /api/v1/health
```

The frontend uses the health endpoint on startup to detect a Render cold start and notify the user if the backend is taking longer than expected to respond.

## Local Setup

### Prerequisites

Make sure you have:

- Node.js installed
- MongoDB database / MongoDB Atlas connection string
- TMDB API key
- SendGrid account and verified sender

### 1. Clone the repository

```bash
git clone https://github.com/awaiskamil-dev/cinelog-v2.git
cd cinelog-v2
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
NODE_ENV=development
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_verified_sender_email
ORIGIN=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The API will run on `http://localhost:5000` by default.

### 3. Configure the frontend

Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file inside `client/`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Start the frontend:

```bash
npm run dev
```

Then open the Vite development URL shown in the terminal (normally `http://localhost:5173`).

## Production Cookie Configuration

The application uses different cookie settings between local development and deployment:

```text
Development   → SameSite=Lax, Secure=false
Production    → SameSite=None, Secure=true
```

This allows the deployed Netlify frontend and Render backend to communicate using credentialed cross-site requests while keeping local development straightforward.

## UX & Performance

CineLog includes several production-focused UX improvements:

- Skeleton loaders preserve layout while content is fetched
- Responsive skeletons match movie rows, search grids, overview pages, and authentication states
- A global health check identifies slow backend cold starts
- An informational toast explains when the free-tier server is waking up
- Client-side context keeps user entries synchronized so common watchlist actions update immediately instead of forcing unnecessary refetches
- Frequently requested movie categories are cached by the backend to reduce repeated TMDB requests

## Security

The backend includes several protections intended for a public deployment:

- HTTP-only signed auth cookies
- Hashed passwords
- Protected user-entry routes
- Credentialed CORS restricted to the configured frontend origin
- Authentication and API rate limits
- Helmet security headers
- MongoDB input sanitization
- XSS protection
- Email verification before account access
- Expiring password-reset tokens

## What I Learned

Building CineLog involved working through both application development and real deployment problems, including:

- designing a full frontend/backend data flow
- managing authentication state across refreshes
- implementing access and refresh token cookies
- handling cross-origin cookies in production
- building protected routes without authentication flashes
- synchronizing local UI state with persisted user data
- integrating and filtering third-party API data
- creating responsive reusable components
- designing loading, error, and empty states
- debugging differences between localhost and deployed environments
- deploying a frontend and backend independently and configuring CORS/environment variables correctly

## Future Improvements

CineLog is considered feature-complete for its current scope, but possible future additions include:

- user profiles and custom avatars
- public/shareable watchlists
- richer ratings and personal reviews
- pagination/infinite scrolling for discovery results
- additional sorting options
- automated tests

## Credits

Movie and TV metadata, posters, backdrops, cast data, and reviews are provided by **The Movie Database (TMDB)**.

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Author

**Awais Kamil**

GitHub: [@awaiskamil-dev](https://github.com/awaiskamil-dev)

---

<div align="center">
  Built as a full-stack portfolio project.
</div>
