import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaRegEye, FaRegHeart, FaCheck } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import StarRating from "./StarRating";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCompare } from "../context/CompareContext";

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isComparing, toggleCompare } = useCompare();
  const [justAdded, setJustAdded] = useState(false);

  const wished = isWishlisted(product.id);
  const compared = isComparing(product.id);

  function handleAddToCart() {
    addToCart(product.id, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  const badgeColor =
    product.badge === "HOT"
      ? "bg-brand-red"
      : product.badge === "SALE"
      ? "bg-brand-green"
      : product.badge === "BEST DEALS"
      ? "bg-blue-500"
      : "bg-brand-yellow text-brand-dark";

  return (
    <div className="group relative bg-white border border-gray-100 rounded-md p-4 hover:shadow-lg transition-shadow">
      {product.badge && (
        <span className={`absolute top-3 left-3 z-10 text-[11px] font-semibold text-white px-2 py-1 rounded ${badgeColor}`}>
          {product.badge}
        </span>
      )}

      <div className="relative aspect-square mb-3 overflow-hidden rounded bg-gray-50">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => toggleWishlist(product.id)}
            title="Add to wishlist"
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow bg-white hover:bg-brand-orange hover:text-white transition-colors ${
              wished ? "text-brand-orange" : "text-gray-600"
            }`}
          >
            {wished ? <FaHeart size={15} /> : <FaRegHeart size={15} />}
          </button>
          <button
            onClick={() => toggleCompare(product.id)}
            title="Compare"
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow bg-white hover:bg-brand-orange hover:text-white transition-colors ${
              compared ? "text-brand-orange" : "text-gray-600"
            }`}
          >
            <MdCompareArrows size={17} />
          </button>
          <button
            onClick={() => onQuickView?.(product)}
            title="Quick view"
            className="w-9 h-9 rounded-full flex items-center justify-center shadow bg-white text-gray-600 hover:bg-brand-orange hover:text-white transition-colors"
          >
            <FaRegEye size={15} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className={`absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-colors transition-transform duration-300 text-white text-sm py-2 flex items-center justify-center gap-2 ${
            justAdded ? "bg-brand-green" : "bg-brand-dark"
          }`}
        >
          {justAdded ? (
            <>
              <FaCheck size={13} /> Added
            </>
          ) : (
            <>
              <FaShoppingCart size={13} /> Add to Cart
            </>
          )}
        </button>
      </div>

      <StarRating rating={product.rating} showCount count={product.reviews} />
      <Link to={`/product/${product.id}`}>
        <h3 className="mt-1.5 text-sm font-medium text-brand-dark line-clamp-2 hover:text-brand-orange">
          {product.name}
        </h3>
      </Link>
      <div className="mt-1.5 flex items-center gap-2">
        {product.oldPrice && <span className="text-xs text-gray-400 line-through">${product.oldPrice}</span>}
        <span className="text-brand-blue font-semibold">${product.price.toLocaleString()}</span>
      </div>
    </div>
  );
}