import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";
import Breadcrumb from "../components/Breadcrumb";
import StarRating from "../components/StarRating";
import { useCompare } from "../context/CompareContext";
import { useCart } from "../context/CartContext";
import { Heart } from "lucide-react";

// Each row: key, label, and a render function.
// Optional `show(rows)` lets us hide a row entirely if no product has that data.
const ROWS = [
  {
    key: "rating",
    label: "Customer feedback",
    render: (p) => <StarRating rating={p.rating} showCount count={p.reviews} />,
  },
  {
    key: "price",
    label: "Price",
    render: (p) => (
      <span className="text-brand-blue font-semibold">${p.price?.toLocaleString()}</span>
    ),
  },
  { key: "seller", label: "Sold by", render: (p) => p.seller ?? p.brand ?? "-" },
  { key: "brand", label: "Brand", render: (p) => p.brand ?? "-" },
  { key: "sku", label: "Model", render: (p) => p.sku ?? "-" },
  {
    key: "stock",
    label: "Stock status",
    render: (p) => (
      <span className={`font-semibold uppercase text-xs ${p.stock === "In Stock" ? "text-brand-green" : "text-brand-red"}`}>
        {p.stock}
      </span>
    ),
  },
  { key: "size", label: "Size", render: (p) => p.size, show: (rows) => rows.some((p) => p.size) },
  { key: "weight", label: "Weight", render: (p) => p.weight, show: (rows) => rows.some((p) => p.weight) },
  { key: "category", label: "Category", render: (p) => p.category, show: (rows) => rows.some((p) => p.category) },
];

export default function Compare() {
  const { ids, removeFromCompare } = useCompare();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});

  useEffect(() => {
    api.fetchProducts().then(({ items }) => setProducts(items));
  }, []);

  const rows = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const visibleRows = ROWS.filter((r) => !r.show || r.show(rows));

  const toggleWishlist = (id) =>
    setWishlist((w) => ({ ...w, [id]: !w[id] }));

  return (
    <div>
      <Breadcrumb items={[{ label: "Compare" }]} />
      <div className="container-x py-8">
        {rows.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">No products to compare yet. Add up to 4 products from the shop.</p>
            <Link to="/shop" className="text-brand-orange hover:underline">Browse Products →</Link>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-100 rounded-md">
            <div
              className="grid min-w-[720px]"
              style={{ gridTemplateColumns: `200px repeat(${rows.length}, minmax(220px, 1fr))` }}
            >
              {/* Header row: image, name, add-to-cart / wishlist */}
              <div className="p-5" />
              {rows.map((product) => (
                <div key={product.id} className="p-5 relative border-l border-gray-100">
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute right-3 top-3 w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-brand-red hover:border-brand-red text-sm"
                    aria-label="Remove from compare"
                  >
                    ×
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-contain mb-4"
                  />
                  <Link
                    to={`/product/${product.id}`}
                    className="text-sm font-medium hover:text-brand-orange line-clamp-3 block mb-4 min-h-[3.5rem]"
                  >
                    {product.name}
                  </Link>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(product.id, 1)}
                      disabled={product.stock !== "In Stock"}
                      className={`flex-1 text-xs font-semibold py-2.5 rounded flex items-center justify-center gap-2 ${
                        product.stock === "In Stock"
                          ? "bg-brand-orange hover:bg-brand-orange-dark text-white"
                          : "bg-gray-300 text-white cursor-not-allowed"
                      }`}
                    >
                      ADD TO CART <span aria-hidden>🛒</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="w-9 h-9 shrink-0 flex items-center justify-center rounded border border-gray-200 hover:border-brand-orange"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        size={16}
                        className={wishlist[product.id] ? "fill-brand-red text-brand-red" : "text-gray-400"}
                      />
                    </button>
                  </div>
                </div>
              ))}

              {/* Data rows, zebra striped across full width */}
              {visibleRows.map((r, i) => (
                <div key={r.key} className="contents">
                  <div className={`p-4 text-xs text-gray-400 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    {r.label}
                  </div>
                  {rows.map((product) => (
                    <div
                      key={product.id}
                      className={`p-4 text-sm border-l border-gray-100 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      {r.render(product)}
                    </div>
                  ))}
                </div>
              ))}

              {/* Rating row placed right under the header, first data row */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}