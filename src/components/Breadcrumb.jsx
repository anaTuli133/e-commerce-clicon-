import { Link } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";

export default function Breadcrumb({ items = [] }) {
  return (
    <div className="bg-gray-50 border-b border-gray-100">
      <div className="container-x py-3 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="flex items-center gap-1.5 hover:text-brand-orange">
          <FaHome size={12} /> Home
        </Link>
        {items.map((it, i) => (
          <span key={i} className="flex items-center gap-2">
            <FaChevronRight size={9} />
            {it.to ? (
              <Link to={it.to} className="hover:text-brand-orange">
                {it.label}
              </Link>
            ) : (
              <span className="text-brand-dark">{it.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
