import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function StarRating({ rating = 0, size = 14, showCount, count }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex text-brand-yellow">
        {Array.from({ length: full }).map((_, i) => (
          <FaStar key={"f" + i} size={size} />
        ))}
        {half && <FaStarHalfAlt size={size} />}
        {Array.from({ length: empty }).map((_, i) => (
          <FaRegStar key={"e" + i} size={size} className="text-gray-300" />
        ))}
      </div>
      {showCount && <span className="text-xs text-gray-400">({count})</span>}
    </div>
  );
}
