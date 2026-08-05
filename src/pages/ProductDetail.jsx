import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaHeart, FaRegHeart, FaFacebookF, FaTwitter, FaPinterestP, FaChevronLeft, FaChevronRight,
  FaShieldAlt, FaTruck, FaMoneyBillWave, FaHeadset, FaLock,
  FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaCcDiscover, FaCcJcb, FaCcDinersClub, FaCcApplePay,
} from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import * as api from "../services/api";
import Breadcrumb from "../components/Breadcrumb";
import StarRating from "../components/StarRating";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCompare } from "../context/CompareContext";

const TABS = ["Description", "Additional Information", "Specification", "Review"];

const FEATURE_ICONS = [FaShieldAlt, FaTruck, FaMoneyBillWave, FaHeadset, FaLock];

const PAYMENT_ICONS = [
  { Icon: FaCcVisa, color: "#1A1F71" },
  { Icon: FaCcMastercard, color: "#EB001B" },
  { Icon: FaCcPaypal, color: "#003087" },
  { Icon: FaCcAmex, color: "#2E77BC" },
  { Icon: FaCcDiscover, color: "#FF6000" },
  { Icon: FaCcJcb, color: "#0B4EA2" },
  { Icon: FaCcDinersClub, color: "#004A97" },
  { Icon: FaCcApplePay, color: "#000000" },
];

const REVIEW_POOL = [
  { name: "Mateo Bennett", comment: "Great product! Exactly as described and arrived fast." },
  { name: "Jackson Evans", comment: "Highly recommended! Would definitely buy again." },
  { name: "Sadie Morales", comment: "Not worth the price, expected a bit more honestly." },
  { name: "Ava Thompson", comment: "Solid build quality and works perfectly out of the box." },
  { name: "Liam Carter", comment: "Good value for money, does exactly what it says." },
];

function generateReviews(product) {
  const seed = product.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return Array.from({ length: 3 }).map((_, i) => {
    const r = REVIEW_POOL[(seed + i) % REVIEW_POOL.length];
    const rating = Math.max(3, Math.min(5, Math.round(product.rating) - i + 1));
    const email = r.name.toLowerCase().replace(" ", ".") + "@x.dummyjson.com";
    return { ...r, rating, email, date: new Date(Date.now() - i * 12 * 24 * 60 * 60 * 1000).toISOString() };
  });
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState(TABS[0]);
  const [colorIdx, setColorIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isComparing, toggleCompare } = useCompare();

  useEffect(() => {
    setLoading(true);
    api
      .fetchProductById(id)
      .then((p) => {
        setProduct(p);
        setActiveImg(0);
        setQty(1);
        return api.fetchProducts({ category: p.category });
      })
      .then(({ items }) => setRelated(items.filter((p) => p.id !== id).slice(0, 4)))
      .catch(() => navigate("/shop"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !product) {
    return <div className="container-x py-20 text-center text-gray-400">Loading product…</div>;
  }

  const images = product.images?.length ? product.images : [product.image];
  const wished = isWishlisted(product.id);
  const compared = isComparing(product.id);

  return (
    <div>
      <Breadcrumb items={[{ label: "Shop", to: "/shop" }, { label: product.category, to: `/shop?category=${product.category}` }, { label: product.name.slice(0, 30) + "…" }]} />

      <div className="container-x py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square bg-gray-50 rounded-md overflow-hidden mb-4">
              <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
                  >
                    <FaChevronLeft size={12} />
                  </button>
                  <button
                    onClick={() => setActiveImg((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
                  >
                    <FaChevronRight size={12} />
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded border overflow-hidden ${i === activeImg ? "border-brand-orange" : "border-gray-200"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <StarRating rating={product.rating} />
              <span className="text-xs text-gray-400">{product.rating} Star Rating ({product.reviews.toLocaleString()} User feedback)</span>
            </div>
            <h1 className="text-xl font-semibold mb-3">{product.name}</h1>

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
              <p>Sku: <span className="text-brand-dark">{product.sku}</span></p>
              <p>Availability: <span className="text-brand-green">{product.stock}</span></p>
              <p>Brand: <span className="text-brand-dark">{product.brand}</span></p>
              <p>Category: <span className="text-brand-dark">{product.company || product.category}</span></p>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-semibold text-brand-blue">${product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <>
                  <span className="text-gray-400 line-through">${product.oldPrice}</span>
                  <span className="bg-brand-yellow/90 text-brand-dark text-xs font-semibold px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {product.colors && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Color</p>
                <div className="flex gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c}
                      onClick={() => setColorIdx(i)}
                      style={{ backgroundColor: c }}
                      className={`w-8 h-8 rounded-full border-2 ${colorIdx === i ? "border-brand-orange" : "border-transparent"}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Size</p>
                <select className="border border-gray-200 rounded px-3 py-2 text-sm w-full max-w-xs">
                  {product.sizes.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            {(product.memoryOptions || product.storageOptions) && (
              <div className="grid grid-cols-2 gap-3 mb-5 max-w-sm">
                {product.memoryOptions && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Memory</p>
                    <select className="border border-gray-200 rounded px-3 py-2 text-sm w-full">
                      {product.memoryOptions.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                )}
                {product.storageOptions && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Storage</p>
                    <select className="border border-gray-200 rounded px-3 py-2 text-sm w-full">
                      {product.storageOptions.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="flex items-center border border-gray-200 rounded">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-11 hover:bg-gray-50">−</button>
                <span className="w-12 text-center text-sm">{String(qty).padStart(2, "0")}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-10 h-11 hover:bg-gray-50">+</button>
              </div>
              <button
                onClick={() => addToCart(product.id, qty)}
                className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-sm px-6 py-3 rounded flex items-center gap-2"
              >
                Add To Cart 🛒
              </button>
              <button
                onClick={() => {
                  addToCart(product.id, qty);
                  navigate("/checkout");
                }}
                className="border border-brand-dark hover:bg-brand-dark hover:text-white text-sm font-semibold px-6 py-3 rounded transition-colors"
              >
                Buy Now
              </button>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
              <button onClick={() => toggleWishlist(product.id)} className="flex items-center gap-1.5 hover:text-brand-orange">
                {wished ? <FaHeart className="text-brand-orange" /> : <FaRegHeart />} Add to Wishlist
              </button>
              <button onClick={() => toggleCompare(product.id)} className="flex items-center gap-1.5 hover:text-brand-orange">
                <MdCompareArrows /> {compared ? "Comparing" : "Add to Compare"}
              </button>
              <span className="flex items-center gap-2 ml-auto">
                Share:
                <a href="#" className="hover:text-brand-orange"><FaFacebookF /></a>
                <a href="#" className="hover:text-brand-orange"><FaTwitter /></a>
                <a href="#" className="hover:text-brand-orange"><FaPinterestP /></a>
              </span>
            </div>

            <div className="border border-gray-100 rounded-md p-5 mt-5">
              <p className="text-sm font-medium mb-3">100% Guarantee Safe Checkout</p>
              <div className="flex flex-wrap gap-3">
                {PAYMENT_ICONS.map(({ Icon, color }, i) => (
                  <Icon key={i} size={30} style={{ color }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-14">
          <div className="flex gap-8 border-b border-gray-100 mb-6 text-sm">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 border-b-2 uppercase tracking-wide font-medium ${
                  tab === t ? "border-brand-orange text-brand-orange" : "border-transparent text-gray-400 hover:text-brand-dark"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "Description" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
              <div className="space-y-6">
                {product.features && (
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Feature</h4>
                    <ul className="space-y-3 text-sm text-gray-500">
                      {product.features.map((f, i) => {
                        const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
                        return (
                          <li key={f} className="flex items-center gap-2.5">
                            <Icon className="text-brand-orange shrink-0" size={15} /> {f}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {product.shipping && (
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Shipping Information</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                      {product.shipping.map((s) => (
                        <li key={s.label}>
                          <span className="text-brand-dark">{s.label}:</span> {s.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          {tab === "Additional Information" && (
            <p className="text-sm text-gray-500">Brand: {product.brand} · SKU: {product.sku} · Stock: {product.stock}</p>
          )}
          {tab === "Specification" && (
            <p className="text-sm text-gray-500">Detailed specifications are provided by the manufacturer and available on request.</p>
          )}
          {tab === "Review" && (
            <div>
              <h4 className="font-semibold mb-5">Customer Reviews</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {generateReviews(product).map((r) => (
                  <div key={r.email} className="border border-gray-100 rounded-md p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="text-sm font-semibold">{r.name}</p>
                        <p className="text-xs text-gray-400">{r.email}</p>
                      </div>
                      <StarRating rating={r.rating} size={12} />
                    </div>
                    <p className="text-sm text-gray-600 italic mb-3">{r.comment}</p>
                    <p className="text-xs text-gray-400">{r.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="font-semibold mb-5">Related Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}