import { Link } from "react-router-dom";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { popularTags } from "../data/mockData";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-300 mt-16">
      <div className="container-x py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-full border-2 border-brand-orange flex items-center justify-center text-brand-orange">
              ◎
            </span>
            <span className="text-white text-xl font-bold">CLICON</span>
          </Link>
          <p className="text-xs text-gray-500 mb-1">Customer Supports:</p>
          <p className="text-white font-semibold mb-3">(629) 555-0129</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            4517 Washington Ave.
            <br />
            Manchester, Kentucky 39495
          </p>
          <p className="text-sm text-gray-400 mt-2">info@kinbo.com</p>
        </div>

        <div>
          <h5 className="text-white font-semibold mb-4 text-sm tracking-wide">TOP CATEGORY</h5>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/shop?category=computer-laptop" className="hover:text-brand-orange">Computer & Laptop</Link></li>
            <li><Link to="/shop?category=smartphone" className="hover:text-brand-orange">SmartPhone</Link></li>
            <li><Link to="/shop?category=headphone" className="hover:text-brand-orange">Headphone</Link></li>
            <li><span className="text-brand-orange">— Accessories</span></li>
            <li><Link to="/shop?category=camera-photo" className="hover:text-brand-orange">Camera & Photo</Link></li>
            <li><Link to="/shop?category=tv-homes" className="hover:text-brand-orange">TV & Homes</Link></li>
            <li>
              <Link to="/shop" className="text-brand-orange hover:underline">
                Browse All Product →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-semibold mb-4 text-sm tracking-wide">QUICK LINKS</h5>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/shop" className="hover:text-brand-orange">Shop Product</Link></li>
            <li><Link to="/cart" className="hover:text-brand-orange">Shopping Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-brand-orange">Wishlist</Link></li>
            <li><Link to="/compare" className="hover:text-brand-orange">Compare</Link></li>
            <li><Link to="/track-order" className="hover:text-brand-orange">Track Order</Link></li>
            <li><a href="#" className="hover:text-brand-orange">Customer Help</a></li>
            <li><a href="#" className="hover:text-brand-orange">About Us</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-semibold mb-4 text-sm tracking-wide">DOWNLOAD APP</h5>
          <div className="flex flex-col gap-3">
            <a href="#" className="flex items-center gap-2 border border-gray-700 rounded px-3 py-2 hover:border-brand-orange">
              <FaGooglePlay size={20} />
              <span className="text-xs">
                Get it now
                <br />
                <span className="text-sm font-semibold text-white">Google Play</span>
              </span>
            </a>
            <a href="#" className="flex items-center gap-2 border border-gray-700 rounded px-3 py-2 hover:border-brand-orange">
              <FaApple size={20} />
              <span className="text-xs">
                Get it now
                <br />
                <span className="text-sm font-semibold text-white">App Store</span>
              </span>
            </a>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h5 className="text-white font-semibold mb-4 text-sm tracking-wide">POPULAR TAG</h5>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Link
                key={tag}
                to={`/shop?search=${encodeURIComponent(tag)}`}
                className="text-xs border border-gray-700 rounded px-2.5 py-1.5 hover:border-brand-orange hover:text-brand-orange"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4">
        <p className="text-center text-xs text-gray-500">
          Kinbo - eCommerce Template © {new Date().getFullYear()}. Design by Templatecookie, rebuilt by anamika.
        </p>
      </div>
    </footer>
  );
}
