# Rewire

UI prototype for Rewire (“Collective Intelligence”).

## Backend

Serverless live backend endpoint:

- `GET /api/live`
- Returns: `networkStats`, `livePresence`, `fomoStats`, `liveEvents`, `serverTime`
- Used by the frontend to drive the live activity stream and counters

Auth OTP endpoints:

- `POST /api/auth/request-otp`
- `POST /api/auth/verify-otp`

Required environment variables for production OTP:

- `OTP_SECRET`
- One email provider option:
  - Resend: `RESEND_API_KEY`, `OTP_FROM_EMAIL` (optional `OTP_FROM_NAME`)
  - Gmail app password: `GMAIL_USER`, `GMAIL_APP_PASSWORD` (optional `OTP_FROM_EMAIL`, `OTP_FROM_NAME`)
  - Generic SMTP: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (optional `SMTP_SECURE=true`, `OTP_FROM_EMAIL`, `OTP_FROM_NAME`)

## Dev

```bash
npm install
npm run dev
```

Note: `npm run dev` runs Vite only; `/api/live` is available on Vercel deployment.
