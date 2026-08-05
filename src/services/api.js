/**
 *
 *  Real backend 
 *   1. .env ----VITE_API_BASE_URL=https://your-api.com/api 
 *   2. USE_MOCK = false 
 *   3. mock replace to httpRequest() 
 * =============================================================================
 */

import {
  products as MOCK_PRODUCTS,
  categories,
  allCategoryTree,
  brands,
  popularTags,
  heroSlides,
  orders as MOCK_ORDERS,
  demoUser,
} from "../data/mockData";

// ---------------------------------------------------------------------------
// CONFIG — switch this when the real backend is ready
// ---------------------------------------------------------------------------
export const USE_MOCK = true;
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const wait = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generic real-API request helper — already wired up for when USE_MOCK=false.
 * Sends the JWT (if present) from localStorage as a Bearer token.
 */
async function httpRequest(path, { method = "GET", body, headers = {} } = {}) {
  const token = localStorage.getItem("clicon_token");
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Local persistence helpers (stand-in for a real DB / session while mocking)
// ---------------------------------------------------------------------------
const readLS = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const writeLS = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const LS_KEYS = {
  cart: "clicon_cart",
  wishlist: "clicon_wishlist",
  compare: "clicon_compare",
  user: "clicon_user",
  token: "clicon_token",
};

// =============================================================================
// PRODUCTS
// =============================================================================
export async function fetchProducts({ category, brand, minPrice, maxPrice, search, sort, tag } = {}) {
  if (USE_MOCK) {
    await wait();
    let list = [...MOCK_PRODUCTS];
    if (category) list = list.filter((p) => p.category === category);
    if (brand) list = list.filter((p) => p.brand === brand);
    if (tag) list = list.filter((p) => p.name.toLowerCase().includes(tag.toLowerCase()));
    if (typeof minPrice === "number") list = list.filter((p) => p.price >= minPrice);
    if (typeof maxPrice === "number") list = list.filter((p) => p.price <= maxPrice);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return { items: list, total: list.length };
  }
  return httpRequest(`/products?${new URLSearchParams(arguments[0] || {})}`);
}

export async function fetchProductById(id) {
  if (USE_MOCK) {
    await wait(300);
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  }
  return httpRequest(`/products/${id}`);
}

export async function fetchCategories() {
  if (USE_MOCK) {
    await wait(150);
    return { categories, allCategoryTree, brands, popularTags };
  }
  return httpRequest("/categories");
}

export async function fetchHeroSlides() {
  if (USE_MOCK) {
    await wait(150);
    return heroSlides;
  }
  return httpRequest("/hero-slides");
}

// =============================================================================
// AUTH
// =============================================================================
export async function loginWithEmail({ email, password }) {
  if (USE_MOCK) {
    await wait(500);
    if (email === demoUser.email && password === demoUser.password) {
      const token = "mock-jwt-" + Date.now();
      writeLS(LS_KEYS.user, demoUser);
      writeLS(LS_KEYS.token, token);
      return { user: demoUser, token };
    }
    throw new Error("Invalid email or password");
  }
  const data = await httpRequest("/auth/login", { method: "POST", body: { email, password } });
  writeLS(LS_KEYS.token, data.token);
  return data;
}

export async function registerWithEmail({ name, email, password }) {
  if (USE_MOCK) {
    await wait(500);
    const user = { id: "u_" + Date.now(), name, email, avatar: null };
    const token = "mock-jwt-" + Date.now();
    writeLS(LS_KEYS.user, user);
    writeLS(LS_KEYS.token, token);
    return { user, token };
  }
  const data = await httpRequest("/auth/register", { method: "POST", body: { name, email, password } });
  writeLS(LS_KEYS.token, data.token);
  return data;
}


export async function loginWithGoogle() {
  if (USE_MOCK) {
    await wait(700);
    const user = {
      id: "u_google_" + Date.now(),
      name: "Google User",
      email: "google.user@gmail.com",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Google%20User",
      provider: "google",
    };
    const token = "mock-google-jwt-" + Date.now();
    writeLS(LS_KEYS.user, user);
    writeLS(LS_KEYS.token, token);
    return { user, token };
  }
 
  throw new Error("Google auth not configured yet");
}

export async function logout() {
  if (USE_MOCK) {
    await wait(150);
    localStorage.removeItem(LS_KEYS.user);
    localStorage.removeItem(LS_KEYS.token);
    return { success: true };
  }
  await httpRequest("/auth/logout", { method: "POST" });
  localStorage.removeItem(LS_KEYS.token);
  return { success: true };
}

export function getStoredUser() {
  return readLS(LS_KEYS.user, null);
}

// =============================================================================
// CART
// =============================================================================
export async function fetchCart() {
  if (USE_MOCK) {
    await wait(150);
    return readLS(LS_KEYS.cart, []);
  }
  return httpRequest("/cart");
}

export async function saveCart(cartItems) {
  if (USE_MOCK) {
    await wait(100);
    writeLS(LS_KEYS.cart, cartItems);
    return cartItems;
  }
  return httpRequest("/cart", { method: "PUT", body: { items: cartItems } });
}

// =============================================================================
// WISHLIST
// =============================================================================
export async function fetchWishlist() {
  if (USE_MOCK) {
    await wait(150);
    return readLS(LS_KEYS.wishlist, []);
  }
  return httpRequest("/wishlist");
}

export async function saveWishlist(ids) {
  if (USE_MOCK) {
    await wait(100);
    writeLS(LS_KEYS.wishlist, ids);
    return ids;
  }
  return httpRequest("/wishlist", { method: "PUT", body: { items: ids } });
}

// =============================================================================
// COMPARE
// =============================================================================
export async function fetchCompare() {
  if (USE_MOCK) {
    await wait(150);
    return readLS(LS_KEYS.compare, []);
  }
  return httpRequest("/compare");
}

export async function saveCompare(ids) {
  if (USE_MOCK) {
    await wait(100);
    writeLS(LS_KEYS.compare, ids);
    return ids;
  }
  return httpRequest("/compare", { method: "PUT", body: { items: ids } });
}

// =============================================================================
// ORDERS / CHECKOUT
// =============================================================================
const LS_ORDERS_KEY = "clicon_orders";

export async function placeOrder(orderPayload) {
  if (USE_MOCK) {
    await wait(800);
    const order = {
      id: "ORD-" + Math.floor(10000 + Math.random() * 89999),
      placedOn: new Date().toISOString(),
      status: "Processing",
      ...orderPayload,
    };

    const existing = readLS(LS_ORDERS_KEY, []);
    writeLS(LS_ORDERS_KEY, [order, ...existing]);
    return order;
  }
  return httpRequest("/orders", { method: "POST", body: orderPayload });
}

export async function trackOrder({ orderId, email }) {
  if (USE_MOCK) {
    await wait(500);
    const savedOrders = readLS(LS_ORDERS_KEY, []);
    const allOrders = [...MOCK_ORDERS, ...savedOrders];
    const order = allOrders.find(
      (o) =>
        o.id.toLowerCase() === String(orderId).toLowerCase() &&
        String(o.email || "").toLowerCase() === String(email).toLowerCase()
    );
    if (!order) throw new Error("No order found with that ID and email.");
    return order;
  }
  return httpRequest(`/orders/track?orderId=${orderId}&email=${email}`);
}

// =============================================================================
// NEWSLETTER
// =============================================================================
export async function subscribeNewsletter(email) {
  if (USE_MOCK) {
    await wait(400);
    return { success: true, email };
  }
  return httpRequest("/newsletter/subscribe", { method: "POST", body: { email } });
}
