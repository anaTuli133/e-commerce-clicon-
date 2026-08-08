import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaCcVisa, FaPaypal, FaAmazonPay, FaCreditCard } from "react-icons/fa";
import * as api from "../services/api";
import Breadcrumb from "../components/Breadcrumb";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const PAYMENT_OPTIONS = [
  { id: "cod", label: "Cash on Delivery", icon: FaMoneyBillWave, color: "text-green-600" },
  { id: "venmo", label: "Venmo", icon: FaCcVisa, color: "text-blue-800" },
  { id: "paypal", label: "Paypal", icon: FaPaypal, color: "text-blue-600" },
  { id: "amazonpay", label: "Amazon Pay", icon: FaAmazonPay, color: "text-orange-500" },
  { id: "card", label: "Debit/Credit Card", icon: FaCreditCard, color: "text-gray-700" },
];

export default function Checkout() {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [payment, setPayment] = useState("card");
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", address: "", country: "", region: "", city: "", zip: "",
    email: user?.email || "", phone: "", notes: "",
  });

  useEffect(() => {
    api.fetchProducts().then(({ items }) => setProducts(items));
  }, []);

  const rows = items.map((i) => ({ ...i, product: products.find((p) => p.id === i.productId) })).filter((r) => r.product);
  const subtotal = rows.reduce((sum, r) => sum + r.product.price * r.qty, 0);
  const discount = subtotal > 0 ? Math.round(subtotal * 0.03) : 0;
  const tax = subtotal > 0 ? +(subtotal * 0.06).toFixed(2) : 0;
  const total = subtotal - discount + tax;

  function updateForm(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    if (rows.length === 0) return;
    setPlacing(true);
    const order = await api.placeOrder({
      email: form.email,
      billing: form,
      payment,
      items: rows.map((r) => ({ productId: r.productId, qty: r.qty, price: r.product.price })),
      subtotal, discount, tax, total,
    });
    setPlacing(false);
    clearCart();
    navigate("/checkout-success", { state: { order } });
  }

  return (
    <div>
      <Breadcrumb items={[{ label: "Shopping Cart", to: "/cart" }, { label: "Checkout" }]} />
      <div className="container-x py-8">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <div className="space-y-8">
            <div>
              <h2 className="font-semibold mb-4">Billing Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="First name" value={form.firstName} onChange={(e) => updateForm("firstName", e.target.value)} className="border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange" />
                <input required placeholder="Last name" value={form.lastName} onChange={(e) => updateForm("lastName", e.target.value)} className="border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange" />
                <input required placeholder="Address" value={form.address} onChange={(e) => updateForm("address", e.target.value)} className="md:col-span-2 border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange" />
                <input required placeholder="Country" value={form.country} onChange={(e) => updateForm("country", e.target.value)} className="border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange" />
                <input required placeholder="Region/State" value={form.region} onChange={(e) => updateForm("region", e.target.value)} className="border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange" />
                <input required placeholder="City" value={form.city} onChange={(e) => updateForm("city", e.target.value)} className="border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange" />
                <input required placeholder="Zip Code" value={form.zip} onChange={(e) => updateForm("zip", e.target.value)} className="border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange" />
                <input required type="email" placeholder="Email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} className="border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange" />
                <input required placeholder="Phone Number" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className="border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange" />
              </div>
            </div>

            <div className="border border-gray-100 rounded-md p-5">
              <h2 className="font-semibold mb-4">Payment Option</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                {PAYMENT_OPTIONS.map(({ id, label, icon: Icon, color }) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => setPayment(id)}
                    className={`flex flex-col items-center gap-2 border rounded-md p-3 text-xs ${
                      payment === id ? "border-brand-orange bg-orange-50 text-brand-orange" : "border-gray-200 text-gray-500"
                    }`}
                  >
                    <Icon size={18} className={color} />
                    {label}
                  </button>
                ))}
              </div>
              {payment === "card" && (
                <div className="space-y-3">
                  <input placeholder="Name on Card" className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange" />
                  <input placeholder="Card Number" className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="DD/YY" className="border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange" />
                    <input placeholder="CVC" className="border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange" />
                  </div>
                </div>
              )}
            </div>

            <div>
              <h2 className="font-semibold mb-3">Additional Information</h2>
              <textarea
                placeholder="Notes about your order, e.g. special notes for delivery"
                value={form.notes}
                onChange={(e) => updateForm("notes", e.target.value)}
                rows={4}
                className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          <div className="border border-gray-100 rounded-md p-5 h-fit">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {rows.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <img src={product.image} alt="" className="w-12 h-12 rounded object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs line-clamp-1">{product.name}</p>
                    <p className="text-xs text-gray-400">{qty} x <span className="text-brand-blue">${product.price}</span></p>
                  </div>
                </div>
              ))}
              {rows.length === 0 && <p className="text-sm text-gray-400">Your cart is empty.</p>}
            </div>
            <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
              <div className="flex justify-between"><span className="text-gray-500">Sub-total</span><span>${subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="text-brand-green">Free</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Discount</span><span>${discount}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>${tax}</span></div>
            </div>
            <div className="flex justify-between font-semibold border-t border-gray-100 mt-3 pt-3">
              <span>Total</span><span>${total.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</span>
            </div>
            <button
              type="submit"
              disabled={rows.length === 0 || placing}
              className="w-full mt-5 bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-50 text-white font-semibold text-sm py-3 rounded"
            >
              {placing ? "Placing order..." : "Place Order →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}