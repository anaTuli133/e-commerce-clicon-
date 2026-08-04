import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import StarRating from "./StarRating";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCompare } from "../context/CompareContext";

export default function QuickViewModal({ product, onClose }) {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isComparing, toggleCompare } = useCompare();

  if (!product) return null;
  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-md w-full max-w-3xl max-h-[90vh] overflow-y-auto relative p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-brand-dark">
          <FaTimes size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-square bg-gray-50 rounded overflow-hidden mb-3">
              <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-14 h-14 rounded border overflow-hidden ${
                    i === activeImg ? "border-brand-orange" : "border-gray-200"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <StarRating rating={product.rating} showCount count={product.reviews} />
            <Link to={`/product/${product.id}`} onClick={onClose}>
              <h2 className="text-lg font-semibold mt-2 hover:text-brand-orange">{product.name}</h2>
            </Link>
            <div className="mt-2 flex items-center gap-2">
              {product.oldPrice && <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>}
              <span className="text-brand-blue text-xl font-semibold">${product.price.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-500 mt-3 line-clamp-4">{product.description}</p>

            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center border rounded">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 hover:bg-gray-100">
                  −
                </button>
                <span className="w-10 text-center text-sm">{String(qty).padStart(2, "0")}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 hover:bg-gray-100">
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  addToCart(product.id, qty);
                  onClose();
                }}
                className="flex-1 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold rounded px-6 py-2.5 transition-colors"
              >
                Add to Cart
              </button>
            </div>

            <div className="flex items-center gap-5 mt-4 text-sm text-gray-500">
              <button onClick={() => toggleWishlist(product.id)} className="flex items-center gap-1.5 hover:text-brand-orange">
                {isWishlisted(product.id) ? <FaHeart className="text-brand-orange" /> : <FaRegHeart />} Add to Wishlist
              </button>
              <button onClick={() => toggleCompare(product.id)} className="flex items-center gap-1.5 hover:text-brand-orange">
                <MdCompareArrows /> {isComparing(product.id) ? "Comparing" : "Add to Compare"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
