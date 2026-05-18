# DoubtConnect

DoubtConnect is a full-stack student learning support web application for asking doubts, sharing notes, getting mentor help, and using an AI doubt solver.

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT with bcrypt password hashing
- **File Uploads:** Local storage using Multer (`backend/uploads`)
- **AI:** Placeholder solver with an optional OpenAI-compatible API integration hook

## Project Structure

```text
DoubtConnect/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Edit `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/doubtconnect
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
AI_API_KEY=
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-4o-mini
```

Backend runs at `http://localhost:5000`.

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Important API Routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Doubts

- `POST /api/doubts`
- `GET /api/doubts/my-doubts`
- `GET /api/doubts/available`
- `GET /api/doubts/:id`
- `POST /api/doubts/:id/answer`

### Notes

- `POST /api/notes/upload`
- `GET /api/notes`
- `GET /api/notes/my-notes`
- `DELETE /api/notes/:id`

### AI

- `POST /api/ai/solve-doubt`

## AI Integration

The backend includes a placeholder response when `AI_API_KEY` is not set. To enable an OpenAI-compatible integration, set `AI_API_KEY`, `AI_API_URL`, and `AI_MODEL` in `backend/.env`. The integration point is documented in `backend/routes/aiRoutes.js`.

## File Uploads

Uploaded doubt images, answer images, and notes are stored locally in `backend/uploads`. In production, replace the local Multer storage in `backend/middleware/upload.js` with Cloudinary or another object-storage provider.
