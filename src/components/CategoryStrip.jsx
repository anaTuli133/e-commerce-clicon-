import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function useVisibleCount() {
  const [visible, setVisible] = useState(2);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w >= 1024) setVisible(6);
      else if (w >= 768) setVisible(4);
      else if (w >= 480) setVisible(3);
      else setVisible(2);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visible;
}

export default function CategoryStrip({ categories = [] }) {
  const VISIBLE = useVisibleCount();
  // index-based paging এর বদলে rotation ব্যবহার করছি — এতে সব category
  // screen-এ এমনিতেই ধরে গেলেও (n <= VISIBLE) বাটন চাপলে category গুলো
  // ঘুরতে (loop) থাকবে, একদম infinite carousel-এর মতো।
  const [rotation, setRotation] = useState(0);
  const [animate, setAnimate] = useState(true);

  const n = categories.length;
  const rotated = n ? categories.map((_, i) => categories[(rotation + i) % n]) : [];

  function goLeft() {
    if (!n) return;
    setAnimate(true);
    setRotation((r) => (r - 1 + n) % n);
  }

  function goRight() {
    if (!n) return;
    setAnimate(true);
    setRotation((r) => (r + 1) % n);
  }

  return (
    <div className="border-y border-gray-100 py-8 md:py-10">
      <h2 className="text-center text-lg md:text-2xl font-bold mb-6 md:mb-8">Shop with Categorys</h2>

      <div className="relative px-1">
        {n > 1 && (
          <button
            onClick={goLeft}
            className="flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 w-9 h-9 md:w-11 md:h-11 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white items-center justify-center shadow-lg"
          >
            <FaArrowLeft size={13} />
          </button>
        )}

        <div className="overflow-hidden">
          <div
            className={`flex gap-3 md:gap-4 ${animate ? "transition-transform duration-500 ease-in-out" : ""}`}
          >
            {rotated.map((c) => (
              <Link
                key={c.id}
                to={`/shop?category=${c.id}`}
                className="shrink-0 border border-gray-200 rounded-md p-3 md:p-4 flex flex-col items-center text-center hover:border-brand-orange hover:shadow-md transition-all bg-white"
                style={{ width: `calc(${100 / VISIBLE}% - 12px)` }}
              >
                <img src={c.image} alt={c.name} className="w-full h-20 md:h-32 object-contain mb-2 md:mb-4" />
                <span className="text-xs md:text-sm font-medium text-gray-700 line-clamp-1">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {n > 1 && (
          <button
            onClick={goRight}
            className="flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 w-9 h-9 md:w-11 md:h-11 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white items-center justify-center shadow-lg"
          >
            <FaArrowRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
}