import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "../components/GoogleButton";
import Breadcrumb from "../components/Breadcrumb";

export default function SignUp() {
  const { register, googleLogin, loading, error, setError } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLocalError(null);
    if (form.password !== form.confirm) {
      setLocalError("Passwords do not match.");
      return;
    }
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch {
      /* handled via context error */
    }
  }

  async function handleGoogle() {
    setError(null);
    try {
      await googleLogin();
      navigate("/");
    } catch {
      /* handled via context error */
    }
  }

  return (
    <div>
      <Breadcrumb items={[{ label: "Sign Up" }]} />
      <div className="container-x py-12 flex justify-center">
        <div className="w-full max-w-md border border-gray-100 rounded-md p-8">
          <h1 className="text-xl font-semibold mb-1">Create your account</h1>
          <p className="text-sm text-gray-400 mb-6">Sign up to start shopping with Clicon.</p>

          {(error || localError) && (
            <p className="text-sm text-brand-red bg-red-50 rounded px-3 py-2 mb-4">{localError || error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 block mb-1.5">Full Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1.5">Email Address</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1.5">Password</label>
                <input
                  required
                  type="password"
                  minLength={6}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1.5">Confirm</label>
                <input
                  required
                  type="password"
                  minLength={6}
                  value={form.confirm}
                  onChange={(e) => update("confirm", e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-60 text-white font-semibold text-sm py-3 rounded"
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <span className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">OR</span>
            <span className="flex-1 h-px bg-gray-100" />
          </div>

          <GoogleButton
            loading={loading}
            onSuccess={async (credential) => {
              setError(null);
              try {
                await googleLogin(credential);
                navigate("/");
              } catch { }
            }}
            onError={(msg) => setError(msg)}
          />

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-brand-orange hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
