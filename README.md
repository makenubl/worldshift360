# MindShift360

UI prototype for MindShift360 (“Collective Intelligence”).

## Backend

Serverless live backend endpoint:

- `GET /api/live`
- Returns: `networkStats`, `livePresence`, `fomoStats`, `liveEvents`, `serverTime`
- Used by the frontend to drive the live activity stream and counters

## Dev

```bash
npm install
npm run dev
```

Note: `npm run dev` runs Vite only; `/api/live` is available on Vercel deployment.
