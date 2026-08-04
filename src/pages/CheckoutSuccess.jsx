import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Breadcrumb from "../components/Breadcrumb";

export default function CheckoutSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  return (
    <div>
      <Breadcrumb items={[{ label: "Shopping Cart", to: "/cart" }, { label: "Checkout" }]} />
      <div className="container-x py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-6">
          <FaCheck className="text-brand-green" size={24} />
        </div>
        <h1 className="text-xl font-semibold mb-2">Your order is successfully place</h1>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
          {order
            ? `Order #${order.id} has been received and is now being processed. A confirmation email will be sent shortly.`
            : "Thanks for your purchase — a confirmation email is on its way."}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/" className="border border-gray-200 hover:border-brand-orange text-sm font-semibold px-5 py-2.5 rounded">
            ← Go To Dashboard
          </Link>
          <button
            onClick={() => navigate("/track-order")}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold px-5 py-2.5 rounded"
          >
            View Order →
          </button>
        </div>
      </div>
    </div>
  );
}
