import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from "react";
import * as api from "../services/api";

const CartContext = createContext(null);

const GUEST_CART_KEY = "clicon_guest_cart";

function isLoggedIn() {
  return !!localStorage.getItem("clicon_token");
}

function readGuestCart() {
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeGuestCart(items) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
}

function persistCart(items) {
  if (isLoggedIn()) {
    api.saveCart(items);
  } else {
    writeGuestCart(items);
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ productId, qty }]
  const [loaded, setLoaded] = useState(false);
  const modifiedRef = useRef(false); 

  useEffect(() => {
    if (isLoggedIn()) {
      api.fetchCart().then((data) => {
        if (!modifiedRef.current) {
          setItems(data || []);
        }
        setLoaded(true);
      }).catch(() => setLoaded(true));
    } else {
      if (!modifiedRef.current) {
        setItems(readGuestCart());
      }
      setLoaded(true);
    }
  }, []);

  const persist = useCallback((next) => {
    modifiedRef.current = true;
    setItems(next);
    persistCart(next);
  }, []);

  const addToCart = useCallback(
    (productId, qty = 1) => {
      modifiedRef.current = true;
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === productId);
        let next;
        if (existing) {
          next = prev.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i));
        } else {
          next = [...prev, { productId, qty }];
        }
        persistCart(next);
        return next;
      });
    },
    []
  );

  const removeFromCart = useCallback((productId) => {
    modifiedRef.current = true;
    setItems((prev) => {
      const next = prev.filter((i) => i.productId !== productId);
      persistCart(next);
      return next;
    });
  }, []);

  const updateQty = useCallback((productId, qty) => {
    modifiedRef.current = true;
    setItems((prev) => {
      const next = prev.map((i) => (i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i));
      persistCart(next);
      return next;
    });
  }, []);


  const updateCart = useCallback((changes) => {

    modifiedRef.current = true;
    setItems((prev) => {
      const changeMap = new Map(changes.map((c) => [c.productId, Math.max(1, c.qty)]));
      const next = prev.map((i) =>
        changeMap.has(i.productId) ? { ...i, qty: changeMap.get(i.productId) } : i
      );
      persistCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => persist([]), [persist]);

  const totalCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, loaded, addToCart, removeFromCart, updateQty, updateCart, clearCart, totalCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}