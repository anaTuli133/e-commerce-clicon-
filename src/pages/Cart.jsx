import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import * as api from "../services/api";
import Breadcrumb from "../components/Breadcrumb";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, updateQty, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [localQty, setLocalQty] = useState({}); // productId -> local (uncommitted) qty
  const navigate = useNavigate();

  useEffect(() => {
    api.fetchProducts().then(({ items }) => setProducts(items));
  }, []);

  // whenever items (context) changes — e.g. after "Update Cart" or remove —
  // resync local state so it doesn't drift out of sync
  useEffect(() => {
    const initial = {};
    items.forEach((i) => (initial[i.productId] = i.qty));
    setLocalQty(initial);
  }, [items]);

  const rows = items
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.productId) }))
    .filter((r) => r.product);

  const getQty = (productId) => localQty[productId] ?? 1;

  const changeLocalQty = (productId, delta) => {
    setLocalQty((prev) => {
      const next = Math.max(1, (prev[productId] ?? 1) + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleUpdateCart = () => {
    rows.forEach(({ productId }) => {
      const newQty = localQty[productId];
      const currentQty = items.find((i) => i.productId === productId)?.qty;
      if (newQty !== undefined && newQty !== currentQty) {
        updateQty(productId, newQty);
      }
    });
  };

  // totals should reflect the LOCAL (pending) quantities, not the committed ones,
  // so the user sees what they're about to confirm
  const subtotal = rows.reduce((sum, r) => sum + r.product.price * getQty(r.productId), 0);
  const discount = subtotal > 0 ? Math.round(subtotal * 0.03) : 0;
  const tax = subtotal > 0 ? +(subtotal * 0.06).toFixed(2) : 0;
  const shipping = 0;
  const total = subtotal - discount + tax + shipping;

  return (
    <div>
      <Breadcrumb items={[{ label: "Shopping Cart" }]} />
      <div className="container-x py-8">
        <h1 className="text-xl font-semibold mb-6">Shopping Cart</h1>

        {rows.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">Your cart is empty.</p>
            <Link to="/shop" className="text-brand-orange hover:underline">Continue Shopping →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            <div>
              <div className="hidden md:grid grid-cols-[1fr_100px_140px_100px] text-xs text-gray-400 uppercase pb-3 border-b border-gray-100">
                <span>Products</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-center">Sub-Total</span>
              </div>
              {rows.map(({ product, productId }) => {
                const qty = getQty(productId);
                return (
                  <div key={productId} className="grid grid-cols-1 md:grid-cols-[1fr_100px_140px_100px] items-center gap-3 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <button onClick={() => removeFromCart(productId)} className="text-gray-300 hover:text-brand-red">
                        <FaTimes size={12} />
                      </button>
                      <img src={product.image} alt="" className="w-14 h-14 rounded object-cover" />
                      <Link to={`/product/${product.id}`} className="text-sm hover:text-brand-orange line-clamp-2">
                        {product.name}
                      </Link>
                    </div>
                    <span className="text-center text-sm text-gray-500">${product.price}</span>
                    <div className="flex items-center justify-center border border-gray-200 rounded w-fit mx-auto">
                      <button onClick={() => changeLocalQty(productId, -1)} className="w-8 h-8 hover:bg-gray-50">−</button>
                      <span className="w-9 text-center text-sm">{String(qty).padStart(2, "0")}</span>
                      <button onClick={() => changeLocalQty(productId, 1)} className="w-8 h-8 hover:bg-gray-50">+</button>
                    </div>
                    <span className="text-center text-sm font-semibold text-brand-blue">${(product.price * qty).toLocaleString()}</span>
                  </div>
                );
              })}
              <div className="flex justify-between mt-6">
                <Link to="/shop" className="border border-gray-200 hover:border-brand-orange text-sm px-5 py-2.5 rounded">
                  ← Return to Shop
                </Link>
                <button
                  onClick={handleUpdateCart}
                  className="border border-gray-200 hover:border-brand-orange text-sm px-5 py-2.5 rounded"
                >
                  Update Cart
                </button>
              </div>
            </div>

            <div className="space-y-6 h-fit">
              <div className="border border-gray-100 rounded-md p-5">
                <h3 className="font-semibold mb-4">Card Totals</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Sub-total</span><span>${subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="text-brand-green">Free</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Discount</span><span>${discount}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>${tax}</span></div>
                </div>
                <div className="flex justify-between font-semibold text-base border-t border-gray-100 mt-3 pt-3">
                  <span>Total</span><span>${total.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</span>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-sm py-3 rounded"
                >
                  Proceed to Checkout →
                </button>
              </div>

              <div className="border border-gray-100 rounded-md p-5">
                <h3 className="font-semibold mb-3">Coupon Code</h3>
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm mb-3 outline-none"
                />
                <button className="bg-brand-blue hover:bg-brand-blue-light text-white text-sm font-semibold px-4 py-2 rounded">
                  Apply Coupon
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}