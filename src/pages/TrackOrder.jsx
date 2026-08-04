import { useState } from "react";
import * as api from "../services/api";
import Breadcrumb from "../components/Breadcrumb";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const order = await api.trackOrder({ orderId, email });
      setResult(order);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Breadcrumb items={[{ label: "Pages" }, { label: "Track Order" }]} />
      <div className="container-x py-10 max-w-2xl">
        <h1 className="text-xl font-semibold mb-2">Track Order</h1>
        <p className="text-sm text-gray-500 mb-6">
          To track your order please enter your order ID in the input field below and press the "Track Order"
          button. This was given to you on your receipt and in the confirmation email you should have received.
          <br />
          <span className="text-xs text-gray-400">(Try demo order: ORD-10293 / demo@example.com)</span>
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1.5">Order ID</label>
            <input
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="ID..."
              className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1.5">Billing Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange"
            />
          </div>
          <p className="md:col-span-2 text-xs text-gray-400 -mt-2">Order ID that we sent to you in your email.</p>
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-fit bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-60 text-white text-sm font-semibold px-6 py-3 rounded"
          >
            {loading ? "Tracking..." : "Track Order →"}
          </button>
        </form>

        {error && <p className="text-sm text-brand-red">{error}</p>}

        {result && (
          <div className="border border-gray-100 rounded-md p-5 mt-6">
            <div className="flex justify-between mb-3">
              <div>
                <p className="text-sm text-gray-400">Order</p>
                <p className="font-semibold">{result.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Status</p>
                <p className="font-semibold text-brand-blue">{result.status}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">Placed on {result.placedOn}</p>
            <div className="flex justify-between font-semibold text-base border-t border-gray-100 pt-3">
              <span>Total</span>
              <span>${result.total} USD</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
