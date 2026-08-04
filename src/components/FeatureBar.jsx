import { FaBoxOpen, FaTrophy, FaCreditCard, FaHeadset } from "react-icons/fa";

const features = [
  { icon: FaBoxOpen, title: "FASTED DELIVERY", desc: "Delivery in 24/H" },
  { icon: FaTrophy, title: "24 HOURS RETURN", desc: "100% money-back guarantee" },
  { icon: FaCreditCard, title: "SECURE PAYMENT", desc: "Your money is safe" },
  { icon: FaHeadset, title: "SUPPORT 24/7", desc: "Live contact/message" },
];

export default function FeatureBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-100 py-8 mt-8">
      {features.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex items-center gap-3">
          <Icon size={26} className="text-brand-dark shrink-0" />
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-gray-400">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
