import { useEffect, useState } from "react";

function getTimeLeft(target) {
  const diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

export default function CountdownTimer({ hours = 40, className = "" }) {
  const [target] = useState(() => Date.now() + hours * 60 * 60 * 1000);
  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <span className={`bg-brand-yellow/90 text-brand-dark font-semibold text-xs px-2 py-1 rounded ${className}`}>
      {time.d}d : {time.h}h : {time.m}m : {time.s}s
    </span>
  );
}
