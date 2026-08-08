import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";


export default function Toast({ message, duration = 5000, onClose }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(pct);
      if (elapsed >= duration) {
        clearInterval(interval);
        onClose?.();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [duration, onClose]);

  return (
    <div className="fixed top-5 right-5 z-[100] w-[320px] bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
      <div className="flex items-start gap-3 p-4">
        <FaCheckCircle className="text-brand-green mt-0.5 shrink-0" size={22} />
        <p className="text-sm text-gray-700 leading-snug">{message}</p>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
          <FaTimes size={14} />
        </button>
      </div>
      <div className="h-1 bg-gray-100">
        <div className="h-full bg-brand-green transition-all duration-75 ease-linear" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}