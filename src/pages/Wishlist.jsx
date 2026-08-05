import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaCheck } from "react-icons/fa";
import * as api from "../services/api";
import Breadcrumb from "../components/Breadcrumb";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { ids, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [addedIds, setAddedIds] = useState(new Set());

  useEffect(() => {
    api.fetchProducts().then(({ items }) => setProducts(items));
  }, []);

  const rows = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  function handleAddToCart(productId) {
    addToCart(productId, 1);
    setAddedIds((prev) => new Set(prev).add(productId));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }, 2000);
  }

  return (
    <div>
      <Breadcrumb items={[{ label: "Wishlist" }]} />
      <div className="container-x py-8">
        {rows.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">Your wishlist is empty.</p>
            <Link to="/shop" className="text-brand-orange hover:underline">Continue Shopping →</Link>
          </div>
        ) : (
          <div className="border border-gray-100 rounded-md overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 font-semibold">Wishlist</div>
            <div className="hidden md:grid grid-cols-[1fr_120px_120px_140px] text-xs text-gray-400 uppercase px-5 py-3 bg-gray-50">
              <span>Products</span>
              <span>Price</span>
              <span>Stock Status</span>
              <span>Actions</span>
            </div>
            {rows.map((product) => {
              const isAdded = addedIds.has(product.id);
              return (
                <div key={product.id} className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px_140px] items-center gap-3 px-5 py-4 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt="" className="w-12 h-12 rounded object-cover" />
                    <Link to={`/product/${product.id}`} className="text-sm hover:text-brand-orange line-clamp-1">
                      {product.name}
                    </Link>
                  </div>
                  <div className="text-sm">
                    {product.oldPrice && <span className="text-gray-400 line-through mr-1">${product.oldPrice}</span>}
                    <span className="text-brand-blue">${product.price}</span>
                  </div>
                  <span className={`text-sm ${product.stock === "In Stock" ? "text-brand-green" : "text-brand-red"}`}>
                    {product.stock}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={product.stock !== "In Stock"}
                      onClick={() => handleAddToCart(product.id)}
                      className={`text-white text-xs font-semibold px-3 py-2 rounded flex items-center gap-1.5 transition-colors ${
                        isAdded
                          ? "bg-brand-green"
                          : "bg-brand-orange hover:bg-brand-orange-dark disabled:bg-gray-200 disabled:cursor-not-allowed"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <FaCheck size={11} /> Added
                        </>
                      ) : (
                        <>Add to Cart 🛒</>
                      )}
                    </button>
                    <button onClick={() => removeFromWishlist(product.id)} className="text-gray-300 hover:text-brand-red">
                      <FaTimes size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}