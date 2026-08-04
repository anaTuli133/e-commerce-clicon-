import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const VISIBLE = 4; 

export default function CategoryStrip({ categories = [] }) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  const maxIndex = Math.max(0, categories.length - VISIBLE);

  function goLeft() {
    if (index === 0) {
      setAnimate(false);
      setIndex(maxIndex + 1 > maxIndex ? maxIndex : maxIndex); // safety
      requestAnimationFrame(() => {
        setAnimate(true);
        setIndex(maxIndex);
      });
    } else {
      setAnimate(true);
      setIndex((i) => i - 1);
    }
  }

  function goRight() {
    if (index >= maxIndex) {
      setAnimate(false);
      setIndex(0);
      requestAnimationFrame(() => setAnimate(true));
    } else {
      setAnimate(true);
      setIndex((i) => i + 1);
    }
  }

  return (
    <div className="border-y border-gray-100 py-10">
      <h2 className="text-center text-2xl font-bold mb-8">Shop with Categorys</h2>

      <div className="relative">
        <button
          onClick={goLeft}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-11 h-11 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white items-center justify-center shadow-lg"
        >
          <FaArrowLeft size={15} />
        </button>

        <div className="overflow-hidden">
          <div
            className={`flex gap-4 ${animate ? "transition-transform duration-500 ease-in-out" : ""}`}
            style={{ transform: `translateX(-${index * (100 / VISIBLE)}%)` }}
          >
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/shop?category=${c.id}`}
                className="shrink-0 border border-gray-200 rounded-md p-4 flex flex-col items-center text-center hover:border-brand-orange hover:shadow-md transition-all bg-white"
                style={{ width: `calc(${100 / VISIBLE}% - 14px)` }}
              >
                <img src={c.image} alt={c.name} className="w-full h-32 object-contain mb-4" />
                <span className="text-sm font-medium text-gray-700">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={goRight}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-11 h-11 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white items-center justify-center shadow-lg"
        >
          <FaArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}