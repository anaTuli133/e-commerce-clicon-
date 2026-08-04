import { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import {
  Package,
  RotateCcw,
  CreditCard,
  Truck,
  ShieldCheck,
  UserCircle,
  Search,
} from "lucide-react";

const TOPICS = [
  {
    icon: Package,
    title: "Orders",
    desc: "Track, modify, or cancel an order",
    items: ["Track my order", "Change delivery address", "Cancel an order"],
  },
  {
    icon: RotateCcw,
    title: "Returns & Refunds",
    desc: "Return an item or check refund status",
    items: ["Start a return", "Refund timeline", "Exchange an item"],
  },
  {
    icon: Truck,
    title: "Shipping & Delivery",
    desc: "Delivery times, fees, and coverage",
    items: ["Delivery areas", "Shipping fees", "Delayed shipment"],
  },
  {
    icon: CreditCard,
    title: "Payments",
    desc: "Payment methods and billing issues",
    items: ["Accepted payment methods", "Failed payment", "Invoice request"],
  },
  {
    icon: UserCircle,
    title: "Account",
    desc: "Manage your account and settings",
    items: ["Reset password", "Update profile", "Delete account"],
  },
  {
    icon: ShieldCheck,
    title: "Warranty & Safety",
    desc: "Product warranty and safety info",
    items: ["Warranty claim", "Product recalls", "Report a safety issue"],
  },
];

export default function NeedHelp() {
  const [query, setQuery] = useState("");

  const filteredTopics = TOPICS.map((topic) => ({
    ...topic,
    items: topic.items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter(
    (topic) =>
      query === "" ||
      topic.title.toLowerCase().includes(query.toLowerCase()) ||
      topic.items.length > 0
  );

  return (
    <div>
      <Breadcrumb items={[{ label: "Need Help" }]} />

      <div className="bg-gray-50 py-14">
        <div className="container-x text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-3">How can we help you?</h1>
          <p className="text-gray-500 mb-6">
            Search our help center or browse topics below to find quick answers.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search help articles, e.g. 'track order'"
              className="w-full border border-gray-200 rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-orange bg-white"
            />
          </div>
        </div>
      </div>

      <div className="container-x py-12">
        {filteredTopics.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-3">No help articles found for "{query}".</p>
            <p className="text-sm text-gray-500">
              Try a different search term, or{" "}
              <Link to="/customer-support" className="text-brand-orange hover:underline">
                contact customer support
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map(({ icon: Icon, title, desc, items }) => (
              <div key={title} className="border border-gray-100 rounded-md p-6">
                <div className="w-11 h-11 rounded-full bg-brand-orange/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-orange" />
                </div>
                <h3 className="font-medium mb-1">{title}</h3>
                <p className="text-sm text-gray-400 mb-4">{desc}</p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item}>
                      <button className="text-sm text-gray-600 hover:text-brand-orange text-left">
                        {item} →
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 border border-gray-100 rounded-md p-8 text-center bg-gray-50">
          <h3 className="font-semibold mb-2">Still need help?</h3>
          <p className="text-sm text-gray-500 mb-5">
            Our support team is ready to assist you directly.
          </p>
          <Link
            to="/customer-support"
            className="inline-block bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold px-6 py-2.5 rounded"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
