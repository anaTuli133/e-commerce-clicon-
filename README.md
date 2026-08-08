<div align="center">

# 🛍️ Clicon — Full-Stack eCommerce Application

A full-stack eCommerce storefront — **React + Vite + Tailwind CSS** frontend, backed by a
**Node.js/Express + MongoDB** REST API, with real Google OAuth sign-in and Cloudinary-powered
product image uploads.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## 📐 Architecture

This is a **monorepo** — one Git repository, two independently runnable apps:

```
ecommerce-frontend/
├── src/                    → React SPA (Vite)
├── backend/                → Express REST API + MongoDB
│   ├── src/
│   │   ├── config/         → DB connection, static metadata (categories, hero slides)
│   │   ├── models/         → Mongoose schemas (User, Product, Order)
│   │   ├── controllers/    → Route handler logic
│   │   ├── routes/         → Express routers, mounted under /api
│   │   ├── middleware/     → JWT auth, optional-auth (guest checkout), admin-key guard, image upload
│   │   └── seed/           → Seed script + seed product data
│   └── public/             → Statically served product/hero/category images
└── vercel.json             → SPA rewrite rules for frontend deployment
```


---

## ✨ Features

- 🏠 Homepage, shop with filters (category/brand/price range/tags/search), product detail with
  variants, cart, wishlist, compare (up to 4), checkout, order tracking
- 🔐 **Auth**: email/password (bcrypt-hashed) **and** real Google Sign-In — verified server-side
  with `google-auth-library` so tokens can't be spoofed
- 🖼️ **Admin-only product management API**: create/update/delete products, plus image upload
  straight to **Cloudinary** via Multer — ready for an admin UI to be built on top
- 🧑‍🤝‍🧑 Guest checkout supported (orders don't require a logged-in account) alongside
  logged-in checkout that's linked to the user
- 📦 Cart/wishlist/compare persist server-side per user once logged in, and fall back to
  `localStorage` for guests
- 📬 Newsletter subscribe endpoint (Resend/Nodemailer dependencies included, ready to wire up
  real transactional email — see [Roadmap](#-roadmap))

---

## 🖥️ Tech Stack

| Layer | Choice |
|---|---|
| Frontend framework | React 19 + Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Frontend auth widget | `@react-oauth/google` |
| Backend framework | Node.js + Express |
| Database / ODM | MongoDB + Mongoose |
| Auth | JWT (`jsonwebtoken`) + `bcryptjs` for passwords |
| Google token verification | `google-auth-library` |
| Image uploads | `multer` + `multer-storage-cloudinary` → Cloudinary |
| Email (planned) | `resend` / `nodemailer` |
| Deployment | `vercel.json` included for the frontend (SPA rewrites) |

---

## 🚀 Getting Started

**Requirements:** Node.js 18+, a MongoDB connection (Atlas or local), a Google Cloud OAuth Client ID.

### 1. Clone & install
```bash
git clone <your-repo-url>
cd ecommerce-frontend

npm install            # frontend deps
cd backend && npm install && cd ..   # backend deps
```

### 2. Configure environment variables

**Frontend — `.env`** (root of the repo):
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

**Backend — `backend/.env`**:
```
MONGODB_URI=mongodb://127.0.0.1:27017/clicon        # or an Atlas connection string
JWT_SECRET=<a long random string>
JWT_EXPIRES_IN=30d

PORT=5000
CLIENT_URL=http://localhost:5173
IMAGE_BASE_URL=http://localhost:5000                 # base URL used to serve /products, /hero, /categories statics

GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com   # must match the frontend value exactly

# Admin API (protects product create/update/delete/upload — see below)
ADMIN_KEY=<a secret string only you know>

# Cloudinary (product image uploads)
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Email (optional — for newsletter/order emails, see Roadmap)
RESEND_API_KEY=...
```

> Getting a Google OAuth Client ID: Google Cloud Console → **APIs & Services → Credentials** →
> **Create Credentials → OAuth client ID** → Application type **Web application** → add
> `http://localhost:5173` under **Authorized JavaScript origins**.

### 3. Seed the database
```bash
cd backend
npm run seed            # inserts demo products
npm run seed:destroy    # wipes the products collection
```

### 4. Run both apps
```bash
# Terminal 1
cd backend
npm run dev              # http://localhost:5000

# Terminal 2 (repo root)
npm run dev               # http://localhost:5173
```

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api` (configurable via `VITE_API_BASE_URL` on the frontend and
`PORT`/`CLIENT_URL` on the backend).

**Auth key:**
🔓 Public · 🔒 Requires `Authorization: Bearer <JWT>` · 🟡 Optional auth (works logged-in or as guest) · 🛡️ Requires `x-admin-key` header

### Auth — `/api/auth`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | 🔓 | Create an account with name/email/password |
| POST | `/api/auth/login` | 🔓 | Email/password login → `{ user, token }` |
| POST | `/api/auth/google` | 🔓 | Body: `{ credential }` (Google ID token from `@react-oauth/google`); verified server-side, creates the user on first sign-in |
| POST | `/api/auth/logout` | 🔓 | Stateless — client just discards its token |
| GET | `/api/auth/me` | 🔒 | Returns the current logged-in user |

### Products — `/api/products`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | 🔓 | List products. Query params: `category`, `brand`, `minPrice`, `maxPrice`, `search`, `tag`, `sort` (`price-asc` \| `price-desc` \| `rating`) |
| GET | `/api/products/:id` | 🔓 | Single product by id |
| POST | `/api/products` | 🛡️ | Create a product (JSON body matching the `Product` schema) |
| PUT | `/api/products/:id` | 🛡️ | Update a product (partial `$set`) |
| DELETE | `/api/products/:id` | 🛡️ | Delete a product |
| POST | `/api/products/upload-image` | 🛡️ | `multipart/form-data`, field name `image` — uploads to Cloudinary, returns `{ url, filename }` |

> Admin routes expect an `x-admin-key` header equal to `ADMIN_KEY` from `backend/.env`. There is
> no admin UI yet — call these with Postman/curl, or build the dashboard described in
> [Roadmap](#-roadmap).

### Categories & Hero — `/api/categories`, `/api/hero-slides`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/categories` | 🔓 | `{ categories, allCategoryTree, brands, popularTags }` (static config, see `backend/src/config/staticData.js`) |
| GET | `/api/hero-slides` | 🔓 | Homepage hero carousel slides |

### Cart — `/api/cart`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/cart` | 🔒 | Get the logged-in user's cart (`[{ productId, qty }]`) |
| PUT | `/api/cart` | 🔒 | Replace the cart: body `{ items: [{ productId, qty }] }` |

### Wishlist — `/api/wishlist`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/wishlist` | 🔒 | Get wishlisted product ids |
| PUT | `/api/wishlist` | 🔒 | Replace wishlist: body `{ items: [productId, ...] }` |

### Compare — `/api/compare`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/compare` | 🔒 | Get product ids currently being compared (max 4) |
| PUT | `/api/compare` | 🔒 | Replace compare list: body `{ items: [productId, ...] }` (capped at 4 server-side) |

### Orders — `/api/orders`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/orders` | 🟡 | Place an order. Body: `{ email, billing, payment, items, subtotal, discount, tax, total }`. Linked to the user if logged in, otherwise a guest order tied only to `email` |
| GET | `/api/orders/track?orderId=&email=` | 🔓 | Look up an order by its human-readable id (`ORD-xxxxx`) + the email it was placed with |

### Newsletter — `/api/newsletter`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/newsletter/subscribe` | 🔓 | Body: `{ email }`. Currently logs the signup server-side — see [Roadmap](#-roadmap) to wire up real delivery |

### Misc
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check, returns `{ status: "ok" }` |
| GET | `/products/*`, `/hero/*`, `/categories/*` | Static file serving for locally-stored images (`backend/public/...`) |

---

## 🗄️ Data Models (Mongoose)

- **User** — `name`, `email`, `password` (hashed, omitted for Google accounts), `provider`
  (`local` \| `google`), `googleId`, `avatar`, embedded `cart`, `wishlist`, `compare`
- **Product** — human-readable string `_id` (e.g. `"macbook-pro"`) instead of an ObjectId, so
  frontend routes like `/product/macbook-pro` stay clean; `name`, `price`, `oldPrice`, `rating`,
  `reviews`, `category`, `brand`, `image`/`images`, `stock`, `sku`, variant fields
  (`colors`/`sizes`/`memoryOptions`/`storageOptions`), `features`, `shipping`
- **Order** — human-readable string `_id` (`ORD-xxxxx`), optional `user` ref (null for guest
  checkout), `email`, `billing`, `payment`, `items`, totals, `status`, `placedOn`

---

## 🖼️ Product Images

Two ways images get served:

1. **Cloudinary** — the primary path. `POST /api/products/upload-image` streams a file straight
   to Cloudinary via `multer-storage-cloudinary` and returns a permanent URL to store on the
   product document.
2. **Local static files** — `backend/public/products`, `/hero`, `/categories` are also served
   directly for bundled demo assets; `IMAGE_BASE_URL` in `backend/.env` controls the base URL
   used when building those static image links (must match `PORT`).

---

## 🚢 Deployment Notes

- `vercel.json` is set up for the **frontend** as a single-page app (`/*` rewrites to
  `index.html`) — deploy the repo root to Vercel with the build command `npm run build` and
  output directory `dist`.
- The **backend** is a standard long-running Express server — deploy it anywhere that runs
  Node.js persistently (Render, Railway, Fly.io, a VPS, etc.). Vercel's serverless model isn't a
  natural fit for it as written (stateful `mongoose.connect()` at boot).
- Remember to update `VITE_API_BASE_URL` (frontend) and `CLIENT_URL` (backend CORS) to your real
  deployed URLs, and register the deployed frontend origin in Google Cloud Console's
  **Authorized JavaScript origins**.

---

## 🗺️ Roadmap

- [ ] **Admin Dashboard** — a protected `/admin` area in the frontend (or a separate admin app)
      that calls the existing `x-admin-key`-protected product routes: create/edit/delete
      products, upload images via Cloudinary, view orders, and manage stock — the API side is
      already built, only the UI is missing
- [ ] Wire up real newsletter delivery and order-confirmation emails via Resend/Nodemailer
      (dependencies already installed, not yet called)
- [ ] Payment gateway integration (Stripe / SSLCommerz / etc.) at checkout
- [ ] Role-based auth (`admin` vs `customer`) instead of a shared static `ADMIN_KEY`, once the
      admin dashboard needs its own login
- [ ] Product reviews backed by MongoDB instead of the current UI-only placeholder

---

## 📄 License

This project is open-sourced under the [MIT License](./LICENSE).

---

<div align="center">
Made with ❤️ using React, Tailwind CSS, Express, and MongoDB
</div>
