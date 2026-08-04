import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Phone, Mail, MessageCircle, Clock } from "lucide-react";

const CHANNELS = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "+1-202-555-0104",
    sub: "Mon - Sat, 9am - 8pm",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "support@clicon.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    detail: "Start a conversation",
    sub: "Avg. response time: 2 min",
  },
  {
    icon: Clock,
    title: "Support Hours",
    detail: "9:00 AM - 8:00 PM",
    sub: "Saturday - Thursday",
  },
];

const FAQS = [
  {
    q: "How do I track my order?",
    a: "Go to 'Track Order' from the top navigation and enter your order ID and email address to see the latest status.",
  },
  {
    q: "What is your return policy?",
    a: "Most items can be returned within 14 days of delivery if unused and in original packaging. Visit the Returns page for full details.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept all major credit/debit cards, mobile banking, and cash on delivery for eligible locations.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard delivery takes 3-5 business days. Express delivery options are available at checkout for select areas.",
  },
];

export default function CustomerSupport() {
  const [form, setForm] = useState({ name: "", email: "", orderId: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to your backend/support ticket API when ready
    setSubmitted(true);
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Customer Support" }]} />

      <div className="container-x py-10">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">Customer Support</h1>
          <p className="text-gray-500">
            We're here to help. Reach out through any channel below or send us a message
            and our team will get back to you shortly.
          </p>
        </div>

        {/* Contact channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {CHANNELS.map(({ icon: Icon, title, detail, sub }) => (
            <div
              key={title}
              className="border border-gray-100 rounded-md p-6 text-center hover:shadow-sm transition"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-orange/10 flex items-center justify-center">
                <Icon size={22} className="text-brand-orange" />
              </div>
              <h3 className="font-medium mb-1">{title}</h3>
              <p className="text-sm text-gray-700">{detail}</p>
              <p className="text-xs text-gray-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div>
            <h2 className="text-lg font-semibold mb-5">Send us a message</h2>
            {submitted ? (
              <div className="border border-brand-green/30 bg-brand-green/5 text-brand-green rounded-md p-6 text-sm">
                Thanks! Your message has been received. Our support team will contact you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Your Name</label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-brand-orange"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-brand-orange"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Order ID (optional)</label>
                  <input
                    name="orderId"
                    value={form.orderId}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-brand-orange"
                    placeholder="#ORD-12345"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-brand-orange resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-6 py-2.5 rounded text-sm"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-lg font-semibold mb-5">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {FAQS.map((item, i) => (
                <div key={item.q} className="border border-gray-100 rounded-md">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between text-left px-4 py-3.5 text-sm font-medium"
                  >
                    {item.q}
                    <span className="text-gray-400 text-lg leading-none">
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <p className="px-4 pb-4 text-sm text-gray-500">{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
