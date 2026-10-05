# DSAT Prep – Frontend

Web interface for an AI-assisted Digital SAT (DSAT) practice tool. Paste a DSAT
question, type your answer, and the app shows the section, question type, the
correct choice, a short explanation, whether your answer was correct, and the
"trap" the question was setting.

- Live site: https://dsatprep-frontend.vercel.app
- Backend repo (FastAPI + Gemini): https://github.com/bekhruzsuleyman/dsatprep-backend

## How it works

The whole UI is a single client component (`src/app/page.tsx`). When you click
**Analyze Question**, it sends

```http
POST https://dsatprep-backend.onrender.com/solve
Content-Type: application/json

{ "questionText": "...", "userAnswer": "..." }
```

and renders the JSON response (`section`, `questionType`, `correctChoice`,
`explanation`, `wasUserCorrect`, `trapType`). The backend does the solving with
Google Gemini; see the backend repo for the response schema.

The backend is hosted on Render's free tier, so the first request after a period
of inactivity can be slow while the server wakes up. The page shows an error
alert if the request fails.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19
- TypeScript
- CSS Modules (no UI library)
- ESLint (`eslint-config-next`)
- Deployed on Vercel

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

### Backend URL

The backend URL is hard-coded in `src/app/page.tsx`
(`https://dsatprep-backend.onrender.com/solve`); there is no environment variable
for it yet. To use a local backend, change that URL to e.g.
`http://localhost:8000/solve/`. The backend's default CORS allow-list already
includes `http://localhost:3000`.

## Project structure

```
src/app/
├── layout.tsx         Root layout and page metadata (title, description, Open Graph)
├── page.tsx           The single page: question form, API call, result card
├── page.module.css    Styles for the page (responsive below 700px)
├── globals.css        Global reset and body layout
└── favicon.ico
```

`public/` still contains the default create-next-app SVGs; they are not used by
the app.

## Status / next steps

Early prototype with one flow: analyze a single question. Possible next steps:
move the backend URL into an environment variable (`NEXT_PUBLIC_API_URL`), show
the backend's `confidence` score, support image-based questions, and add a
history of past attempts once the backend stores them.
