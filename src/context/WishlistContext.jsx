import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as api from "../services/api";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    api.fetchWishlist().then((data) => setIds(data || []));
  }, []);

  const toggleWishlist = useCallback((productId) => {
    setIds((prev) => {
      const next = prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId];
      api.saveWishlist(next);
      return next;
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setIds((prev) => {
      const next = prev.filter((id) => id !== productId);
      api.saveWishlist(next);
      return next;
    });
  }, []);

  const isWishlisted = useCallback((productId) => ids.includes(productId), [ids]);

  return (
    <WishlistContext.Provider value={{ ids, toggleWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
