# DeshiQ — Food Order and Delivery Frontend

A Next.js 16 (App Router) food ordering and delivery web application built with React 19, TypeScript, MUI v7, Redux Toolkit, and next-auth (Google OAuth).

## Features

- Google OAuth authentication (next-auth v4)
- Product browsing with categories and deals
- Cart with addons and soft drinks
- Checkout with delivery address selection and payment method
- Order history with invoice download (PDF)
- Admin panel (react-admin) for managing products, categories, addons, and orders
- Multi-language support (English / Urdu) via i18next
- Google Maps integration for location selection
- Cloudinary for image uploads

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, MUI v7, React Compiler
- **State:** Redux Toolkit + RTK Query, React Context
- **Auth:** next-auth v4 (Google OAuth, JWT strategy)
- **Admin:** react-admin + ra-data-simple-rest
- **Maps:** @react-google-maps/api
- **i18n:** react-i18next + i18next
- **Images:** Cloudinary (unsigned upload preset)

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `example.env` to `.env` and fill in the values:

```bash
cp example.env .env
```

Required variables:

| Variable | Description |
|----------|-------------|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXTAUTH_URL` | App URL (e.g. `http://localhost:3000` for dev) |
| `NEXTAUTH_SECRET` | Random string for JWT encryption |
| `NEXT_PUBLIC_MAP_API_KEY` | Google Maps JavaScript API key |
| `NEXT_PUBLIC_BASE_URL` | Backend API base URL (e.g. `http://localhost:8080/api/v1`) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (for invoices) |

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run start
```

### Lint & Typecheck

```bash
npm run lint
npm run typecheck
```

## Project Structure

```
src/
├── app/                 # App Router pages and layouts
│   ├── (main)/          # Main route group (shop pages)
│   ├── admin/           # Admin panel (react-admin)
│   ├── api/             # API route handlers (next-auth)
│   ├── error.tsx        # Global error boundary
│   ├── not-found.tsx    # 404 page
│   ├── layout.tsx       # Root layout (fonts, providers)
│   └── Providers.tsx    # Client providers (Redux, Context, next-auth)
├── components/          # React components
│   ├── admin/           # Admin panel components
│   ├── cart/            # Cart UI
│   ├── checkout/        # Checkout flow
│   ├── commons/         # Shared components (Header, Footer, Card, etc.)
│   ├── deals/           Deal section components
│   └── MyKFC/           # User profile, orders, favourites
├── constants/           # App constants (delivery locations, fees)
├── context/             # React Context providers
├── redux/               # Redux Toolkit store, slices, RTK Query APIs
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Security

- **Admin access** is server-gated via `src/proxy.ts` (Next.js proxy/middleware) using next-auth JWT role verification
- **CSP and security headers** are configured in `next.config.ts`
- **Open redirect** protection on the login page (redirect param validated)
- Backend JWT is stored in `localStorage` (consider moving to httpOnly cookies for production)

## Notes

- The backend API is expected at `NEXT_PUBLIC_BASE_URL` (Node.js/Express separate project)
- Cloudinary upload preset should be locked down in the Cloudinary dashboard (allowed formats, max size, folder restriction)
- Google Maps API key should be HTTP-referrer restricted in Google Cloud Console
