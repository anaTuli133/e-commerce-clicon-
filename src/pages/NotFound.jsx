import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="text-4xl font-bold mb-3">404</h1>
      <p className="text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold px-5 py-2.5 rounded">
        Back to Home
      </Link>
    </div>
  );
}
