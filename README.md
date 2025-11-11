# Task Management App (React + Node.js + MongoDB)

A full-stack, production-ready Task Management application featuring JWT authentication, secure CRUD operations, responsive UI with TailwindCSS, Redux Toolkit state management, and comprehensive tests on both backend and frontend.

## Tech Stack

- Frontend: Vite + React, TailwindCSS, Redux Toolkit, React Router, Axios, React Hook Form + Zod, Jest + React Testing Library
- Backend: Node.js + Express, MongoDB + Mongoose, JWT, bcrypt, dotenv, CORS, Jest + Supertest

## Folder Structure

```
TASK MANAGEMENT APP/
├── backend/
│   ├── controller/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── tests/
│   ├── config.js
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── frontend/
│       ├── node_modules/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── context/
│       │   ├── redux/
│       │   ├── pages/
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── tests/
│       ├── package.json
│       └── package-lock.json
│
├── server/
├── .gitignore
├── README.md
└── package-lock.json
```

## Setup Instructions

1) Prerequisites
- Node.js 18+
- MongoDB connection string (Atlas or local)

2) Backend
- Create `backend/.env` and set values
- Install deps: `cd backend && npm install`
- Run dev server: `npm start`

3) Frontend
- Install deps: `cd frontend && npm install`
- Run dev server: `npm run dev`

4) Environment Variables

Create `backend/.env` with:

```
MONGO_URI=
JWT_SECRET=
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

## Running Tests

Backend (Jest + Supertest):
```
cd backend
npm test
```

Frontend (Jest + RTL):
```
cd client/frontend
npm test -- --coverage
```

## API Endpoints

- POST `/api/auth/register` — Register user
- POST `/api/auth/login` — Login and receive JWT
- GET `/api/tasks` — List tasks (auth)
- POST `/api/tasks` — Create task (auth)
- PUT `/api/tasks/:id` — Update task (auth)
- DELETE `/api/tasks/:id` — Delete task (auth)

### Example Payloads

Register:
```
{ "username": "john", "email": "john@example.com", "password": "Password123!" }
```

Login:
```
{ "email": "john@example.com", "password": "Password123!" }
```

Create Task:
```
{ "title": "Buy groceries", "description": "Milk, eggs", "status": "pending" }
```

## Notes

- JWT is stored in localStorage and attached via Axios interceptor.
- All task routes are protected and scoped to the authenticated user.
- Input validation: Zod on frontend forms, Mongoose validation on backend.
- CORS is configured for the frontend origin.


