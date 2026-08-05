import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import * as api from "../services/api";

const CompareContext = createContext(null);
const MAX_COMPARE = 4;

export function CompareProvider({ children }) {
  const [ids, setIds] = useState([]);
  const modifiedRef = useRef(false); 

  useEffect(() => {
    api.fetchCompare().then((data) => {
      if (!modifiedRef.current) setIds(data || []);
    });
  }, []);

  const toggleCompare = useCallback((productId) => {
    modifiedRef.current = true;
    setIds((prev) => {
      let next;
      if (prev.includes(productId)) {
        next = prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= MAX_COMPARE) return prev;
        next = [...prev, productId];
      }
      api.saveCompare(next);
      return next;
    });
  }, []);

  const removeFromCompare = useCallback((productId) => {
    modifiedRef.current = true;
    setIds((prev) => {
      const next = prev.filter((id) => id !== productId);
      api.saveCompare(next);
      return next;
    });
  }, []);

  const isComparing = useCallback((productId) => ids.includes(productId), [ids]);

  return (
    <CompareContext.Provider value={{ ids, toggleCompare, removeFromCompare, isComparing, MAX_COMPARE }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}