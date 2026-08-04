import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero({ slides = [] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides.length) return <div className="h-full min-h-[320px] bg-gray-100 animate-pulse rounded-md" />;
  const slide = slides[active];

  return (
    <div className="relative bg-gray-50 rounded-md overflow-hidden h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6 p-8 md:p-12 flex-1">
        <div>
          <p className="text-brand-blue text-xs font-semibold tracking-wider mb-2">— {slide.eyebrow}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">{slide.title}</h1>
          <p className="text-gray-500 text-sm max-w-sm mb-6">{slide.description}</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold px-6 py-3 rounded"
          >
            {slide.cta} →
          </Link>
        </div>
        <div className="relative shrink-0">
          {slide.price && (
            <span className="absolute -top-2 -left-2 z-10 w-16 h-16 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-bold shadow-lg">
              ${slide.price}
            </span>
          )}
          <img src={slide.image} alt={slide.title} className="w-64 md:w-80 h-56 object-contain rounded-md" />
        </div>
      </div>
      <div className="pb-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-brand-dark w-5" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}