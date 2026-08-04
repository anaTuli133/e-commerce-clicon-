import { useState } from "react";
import * as api from "../services/api";

import googleLogo from "../assets/logos/google.png";
import amazonLogo from "../assets/logos/amazon.png";
import philipsLogo from "../assets/logos/philips.png";
import toshibaLogo from "../assets/logos/toshiba.png";
import samsungLogo from "../assets/logos/samsung.png";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await api.subscribeNewsletter(email);
    setStatus("done");
    setEmail("");
  }

  return (
    <section className="bg-[#3d5a80]">
      <div className="container-x py-14 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h2>
        <p className="text-white/70 max-w-xl mx-auto text-sm mb-6">
          Get first access to new arrivals, special offers, and Clicon news — straight to your inbox, no spam.
        </p>
        <form onSubmit={handleSubmit} className="flex max-w-md mx-auto bg-white rounded overflow-hidden">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="flex-1 px-4 py-3 text-sm text-brand-dark outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-brand-orange hover:bg-brand-orange-dark px-5 text-sm font-semibold flex items-center gap-2 disabled:opacity-60"
          >
            {status === "loading" ? "..." : status === "done" ? "Subscribed ✓" : "Subscribe →"}
          </button>
        </form>
        <div className="flex flex-wrap items-center justify-center gap-8 mt-10 opacity-60">
          <img src={googleLogo} alt="Google" className="h-15 object-contain" />
          <img src={amazonLogo} alt="Amazon" className="h-15 object-contain" />
          <img src={philipsLogo} alt="Philips" className="h-15 object-contain" />
          <img src={toshibaLogo} alt="Toshiba" className="h-15 object-contain" />
          <img src={samsungLogo} alt="Samsung" className="h-15 object-contain" />
        </div>
      </div>
    </section>
  );
}