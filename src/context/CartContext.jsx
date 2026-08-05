import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from "react";
import * as api from "../services/api";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ productId, qty }]
  const [loaded, setLoaded] = useState(false);
  const modifiedRef = useRef(false); 

  useEffect(() => {
    api.fetchCart().then((data) => {

      if (!modifiedRef.current) {
        setItems(data || []);
      }
      setLoaded(true);
    });
  }, []);

  const persist = useCallback((next) => {
    modifiedRef.current = true;
    setItems(next);
    api.saveCart(next);
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
        api.saveCart(next);
        return next;
      });
    },
    []
  );

  const removeFromCart = useCallback((productId) => {
    modifiedRef.current = true;
    setItems((prev) => {
      const next = prev.filter((i) => i.productId !== productId);
      api.saveCart(next);
      return next;
    });
  }, []);

  const updateQty = useCallback((productId, qty) => {
    modifiedRef.current = true;
    setItems((prev) => {
      const next = prev.map((i) => (i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i));
      api.saveCart(next);
      return next;
    });
  }, []);


  const updateCart = useCallback((changes) => {
    // changes: [{ productId, qty }, ...]
    modifiedRef.current = true;
    setItems((prev) => {
      const changeMap = new Map(changes.map((c) => [c.productId, Math.max(1, c.qty)]));
      const next = prev.map((i) =>
        changeMap.has(i.productId) ? { ...i, qty: changeMap.get(i.productId) } : i
      );
      api.saveCart(next);
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