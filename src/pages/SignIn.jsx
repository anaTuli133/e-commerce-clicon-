import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "../components/GoogleButton";
import Breadcrumb from "../components/Breadcrumb";

export default function SignIn() {
  const { login, googleLogin, loading, error, setError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(redirectTo);
    } catch {
      /* error is already set on context */
    }
  }

  async function handleGoogle() {
    setError(null);
    try {
      await googleLogin();
      navigate(redirectTo);
    } catch {
      /* handled via context error */
    }
  }

  return (
    <div>
      <Breadcrumb items={[{ label: "Sign In" }]} />
      <div className="container-x py-12 flex justify-center">
        <div className="w-full max-w-md border border-gray-100 rounded-md p-8">
          <h1 className="text-xl font-semibold mb-1">Sign in to your account</h1>
          <p className="text-sm text-gray-400 mb-6">Welcome back! Please enter your details.</p>

          {error && <p className="text-sm text-brand-red bg-red-50 rounded px-3 py-2 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 block mb-1.5">Email Address</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm text-gray-500">Password</label>
                <a href="#" className="text-xs text-brand-orange hover:underline">Forgot Password?</a>
              </div>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange pr-10"
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-60 text-white font-semibold text-sm py-3 rounded"
            >
              {loading ? "Signing in..." : "Login →"}
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
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-brand-orange hover:underline font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
