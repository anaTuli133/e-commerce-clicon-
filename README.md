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

## 🔌 Connecting a real backend

Every network call in this app goes through **one file**: [`src/services/api.js`](./src/services/api.js).
It currently reads/writes mock data (`src/data/mockData.js` + `localStorage`) behind a small artificial
delay, so loading states behave like a real API. Nothing outside this file talks to `localStorage`
directly — pages and components only ever call the exported functions (`fetchProducts`,
`loginWithEmail`, `placeOrder`, etc.).

To switch to a real Node/Express + MongoDB backend:

1. Create a `.env` file (see `.env.example`):
   \`\`\`
   VITE_API_BASE_URL=https://your-api.com/api
   \`\`\`
2. In `src/services/api.js`, flip the flag:
   \`\`\`js
   export const USE_MOCK = false;
   \`\`\`
3. Inside each function, replace the `if (USE_MOCK) { ... }` block with the ready-made
   `httpRequest(...)` call (the helper already attaches the JWT from `localStorage` as a
   Bearer token, so auth-protected routes work out of the box).

### Google Sign-In

`loginWithGoogle()` currently returns a mock user — no real OAuth call happens yet. To wire up real
Google auth:

1. Install [`@react-oauth/google`](https://www.npmjs.com/package/@react-oauth/google) and wrap
   `GoogleButton` (or replace it) with Google's `<GoogleLogin />` component in `SignIn.jsx` / `SignUp.jsx`.
2. POST the returned `credential` token to your backend's `/auth/google` endpoint.
3. On the server, verify the token with `google-auth-library`, find-or-create the user in MongoDB,
   and return your own JWT.
4. Drop that flow into `loginWithGoogle()` in `src/services/api.js` (a commented example is already there).

## 🖼️ Using your own images

Product, category, and promo images currently use placeholder URLs (`picsum.photos`). To use your
own assets, drop image files into `src/assets/` and import them directly wherever an `image:`
field is used in `src/data/mockData.js`, e.g.:

\`\`\`js
import xboxImg from "../assets/hero/xbox-console.jpg";

export const heroSlides = [
  { id: 1, title: "Xbox Consoles", image: xboxImg, /* ... */ },
];
\`\`\`

## 🗺️ Roadmap

- [ ] Wire up real Node/Express + MongoDB backend
- [ ] Real Google OAuth flow
- [ ] Payment gateway integration (Stripe / SSLCommerz / etc.)
- [ ] Admin dashboard for product/order management
- [ ] Product reviews backed by a real database

## 📄 License

This project is open-sourced under the [MIT License](./LICENSE).

---

<div align="center">
Made with by Anamika
</div>