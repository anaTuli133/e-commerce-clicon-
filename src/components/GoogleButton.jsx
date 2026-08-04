import { FcGoogle } from "react-icons/fc";

export default function GoogleButton({ onClick, loading, label = "Continue with Google" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-md py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-60 transition-colors"
    >
      <FcGoogle size={18} />
      {loading ? "Connecting…" : label}
    </button>
  );
}
