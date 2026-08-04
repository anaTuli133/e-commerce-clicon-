<div align="center">

# 🛍️ Clicon — eCommerce Frontend

A modern, fully responsive eCommerce storefront built with **React**, **Vite**, and **Tailwind CSS**.
Pixel-inspired by the Clicon design template — homepage, shop with filters, product details, cart,
wishlist, compare, checkout, order tracking, and authentication (with Google sign-in).

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## ✨ Features
git pull origin main
- 🏠 **Homepage** — hero carousel, category strip, featured products, flash-sale/best-seller/top-rated/new-arrival rails, newsletter
- 🛒 **Shop page** — sidebar filters (category, price range, brand, tags), sorting, pagination, live search
- 📦 **Product detail** — image gallery, variant selectors (color/size/memory/storage), tabs (description, specs, reviews), related products
- ❤️ **Wishlist**, 🔁 **Compare** (up to 4 products), 🛍️ **Cart** with quantity controls and coupon field
- 💳 **Checkout** — billing form, multiple payment method UI, order summary, success page
- 📍 **Track order** by Order ID + email
- 🔐 **Auth** — email/password sign in & sign up, plus a Google sign-in button (mock, ready to wire up to real OAuth)
- ⚡ Cart / Wishlist / Compare state persists via `localStorage` through a single mock API layer
- 🎨 Fully responsive, built with Tailwind CSS v4 utility classes only (no external UI kit)

## 🖥️ Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Icons | react-icons |
| State | React Context API (Cart / Wishlist / Compare / Auth) |
| Data layer | `src/services/api.js` — mock now, swappable to a real REST API later |


## 🚀 Getting Started

**Requirements:** Node.js 18+

\`\`\`bash
git clone https://github.com/<your-username>/clicon-ecommerce-frontend.git
cd clicon-ecommerce-frontend
npm install
npm run dev
\`\`\`

Open **http://localhost:5173** in your browser.

Build for production:

\`\`\`bash
npm run build
npm run preview
\`\`\`

### Demo credentials

| | |
|---|---|
| Email | `demo@example.com` |
| Password | `password123` |
| Track order | Order ID `ORD-10293` with the same demo email |


### Google Sign-In

`loginWithGoogle()` currently returns a mock user — no real OAuth call happens yet. To wire up real
Google auth:

1. Install [`@react-oauth/google`](https://www.npmjs.com/package/@react-oauth/google) and wrap
   `GoogleButton` (or replace it) with Google's `<GoogleLogin />` component in `SignIn.jsx` / `SignUp.jsx`.
2. POST the returned `credential` token to your backend's `/auth/google` endpoint.
3. On the server, verify the token with `google-auth-library`, find-or-create the user in MongoDB,
   and return your own JWT.
4. Drop that flow into `loginWithGoogle()` in `src/services/api.js` (a commented example is already there).



## 🗺️ Roadmap

- [ ] Wire up real Node/Express + MongoDB backend
- [ ] Real Google OAuth flow
- [ ] Payment gateway integration (Stripe / SSLCommerz / etc.)
- [ ] Admin dashboard for product/order management
- [ ] Product reviews backed by database

## 📄 License

This project is open-sourced under the [MIT License](./LICENSE).

---

<div align="center">
Made by Anamika
</div>