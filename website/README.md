# Earning with Solution — Website & Admin Panel / Super Admin Dashboard

Next.js 14 (App Router) + TypeScript + Tailwind CSS. This single Next.js app
serves three things:

- **Public website** (`/`) — marketing landing page + OTP login
- **User dashboard** (`/dashboard`, `/wallet`, `/products`, `/leads`) — for Customer / FOS / Shopkeeper (role-based content)
- **Admin Panel & Super Admin Dashboard** (`/admin/**`) — role-gated via JWT (ADMIN / SUPER_ADMIN)

## Design system (locked, per founder's exact spec)

| Token | Value |
|---|---|
| Primary | `#0B3D91` |
| Secondary | `#1E40AF` |
| Accent (Gold) | `#D4AF37` |
| Success / Warning / Error | `#16A34A` / `#F59E0B` / `#DC2626` |
| Background (light/dark) | `#F8FAFC` / `#0F172A` |
| Card (light/dark) | `#FFFFFF` / `#1E293B` |
| Font | Poppins |
| Button radius | 16px · Card radius | 20px |
| Glassmorphism, soft shadows, gradient buttons | Enabled — see `app/globals.css` |

All tokens are defined once in `tailwind.config.js` — change them there and
they propagate everywhere.

## Setup

```bash
npm install
cp .env.example .env.local
# fill in NEXT_PUBLIC_API_URL (your deployed backend) and Firebase web config

npm run dev
```

Runs on `http://localhost:3000`.

## Wiring up real OTP login

`app/auth/login/page.tsx` has the full premium UI already built. To make it
functional:

1. `npm install firebase`
2. Initialize the Firebase client SDK with your web config (see `.env.example`)
3. Use `signInWithPhoneNumber` + `RecaptchaVerifier` to send/verify OTP client-side
4. POST the resulting `idToken` to `POST {NEXT_PUBLIC_API_URL}/auth/verify-otp`
5. Store the returned `accessToken`/`refreshToken` in `localStorage` (already read by `lib/api.ts`)

## Structure

```
app/
├── page.tsx                  Landing page
├── auth/login/                OTP login + onboarding UI
├── dashboard/                  Home Dashboard (Customer/FOS/Shopkeeper)
├── wallet/                      Wallet & transaction history
├── admin/
│   ├── layout.tsx                 Admin shell (sidebar nav)
│   ├── page.tsx                     Dashboard (KPIs, charts)
│   ├── products/                     Product catalog + affiliate link editor
│   ├── leads/                          Lead management + manual status workflow
│   └── withdrawals/                      Withdrawal approval queue
components/
├── AppShell.tsx                Authenticated layout (sidebar + bottom nav)
└── ui/                            GlassCard, StatCard, CountUp
lib/
├── api.ts                        Axios client w/ JWT + silent refresh
└── utils.ts                        Formatters (currency, date), cn()
```

## Notes

- All admin/dashboard pages currently render with **sample/mock data** so
  the UI can be reviewed immediately. Replace the local arrays with calls
  to `lib/api.ts` (`api.get('/admin/dashboard/kpis')` etc. — endpoints
  already exist on the backend) to go fully live.
- Dark mode toggle is wired at the component level (`AppShell.tsx`) — persist
  the preference via the `PATCH /users/me` endpoint for a signed-in user.
