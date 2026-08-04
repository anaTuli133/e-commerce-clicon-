import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import blackBadge from "../assets/black-friday-badge.png";
import {
  FaTwitter, FaFacebookF, FaPinterestP, FaRedditAlien, FaYoutube, FaInstagram,
  FaSearch, FaHeart, FaUser, FaShoppingCart, FaTimes, FaChevronDown,
  FaMapMarkerAlt, FaExchangeAlt, FaHeadset, FaInfoCircle, FaPhoneAlt, FaEye,
} from "react-icons/fa";
import { allCategoryTree } from "../data/mockData";
import { products } from "../data/mockData";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const subMenus = {
  SmartPhone: ["All", "iPhone", "Samsung", "Realme", "Xiaomi", "Oppo", "Vivo", "OnePlus", "Infinix", "Tecno"],
};

export default function Header() {
  const [showBanner, setShowBanner] = useState(true);
  const [catOpen, setCatOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const catRef = useRef(null);
  const userRef = useRef(null);
  const cartRef = useRef(null);

  const { items, totalCount, removeFromCart } = useCart();
  const { ids: wishIds } = useWishlist();
  const { user, logout } = useAuth();

  const cartProducts = items
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.productId) }))
    .filter((i) => i.product);
  const cartTotal = cartProducts.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  useEffect(() => {
    function onClick(e) {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
      if (cartRef.current && !cartRef.current.contains(e.target)) setCartOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function submitSearch(e) {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(search)}`);
  }

  return (
    <header className="relative z-40">
      {/* Black Friday top bar */}
      {showBanner && (
        <div className="bg-black text-white text-sm">
          <div className="container-x flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2">
              <img src={blackBadge} alt="Black" className="h-6 rounded" />
              <span className="font-medium">Friday</span>
            </div>
            <div className="hidden sm:block">
              Up to <span className="text-brand-yellow font-bold text-2xl">59%</span> OFF
            </div>
            <div className="flex items-center gap-4">
              <Link to="/shop" className="bg-brand-yellow text-brand-dark font-semibold px-4 py-1.5 rounded flex items-center gap-2 hover:brightness-95">
                SHOP NOW <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Welcome bar */}
      <div className="bg-brand-blue text-white/90 text-xs">
        <div className="container-x flex items-center justify-between py-2">
          <span>Welcome to Clicon online eCommerce store.</span>
          <div className="hidden md:flex items-center gap-3">
            <span>Follow us:</span>
            {[FaTwitter, FaFacebookF, FaPinterestP, FaRedditAlien, FaYoutube, FaInstagram].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-brand-yellow">
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-brand-blue">
        <div className="container-x flex items-center gap-6 py-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-lg">
              ◎
            </span>
            <span className="text-white text-2xl font-bold tracking-wide">CLICON</span>
          </Link>

          <form onSubmit={submitSearch} className="flex-1 hidden sm:flex">
            <div className="flex w-full bg-white rounded overflow-hidden">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for anything..."
                className="flex-1 px-4 py-2.5 text-sm outline-none text-brand-dark"
              />
              <button type="submit" className="px-4 text-brand-dark hover:text-brand-orange">
                <FaSearch />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-5 text-white ml-auto sm:ml-0">
            <div ref={cartRef} className="relative">
              <button onClick={() => setCartOpen((v) => !v)} className="relative flex items-center gap-1">
                <FaShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-brand-orange text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              </button>
              {cartOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white text-brand-dark rounded shadow-xl p-4 z-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-sm">Shopping Cart ({totalCount})</h4>
                  </div>
                  {cartProducts.length === 0 ? (
                    <p className="text-sm text-gray-400 py-4 text-center">Your cart is empty.</p>
                  ) : (
                    <div className="max-h-64 overflow-y-auto space-y-3">
                      {cartProducts.map(({ product, qty, productId }) => (
                        <div key={productId} className="flex items-center gap-3">
                          <img src={product.image} alt="" className="w-12 h-12 rounded object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs line-clamp-1">{product.name}</p>
                            <p className="text-xs text-gray-400">
                              {qty} x <span className="text-brand-blue">${product.price}</span>
                            </p>
                          </div>
                          <button onClick={() => removeFromCart(productId)} className="text-gray-400 hover:text-brand-red">
                            <FaTimes size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {cartProducts.length > 0 && (
                    <>
                      <div className="flex items-center justify-between text-sm mt-4 pt-3 border-t">
                        <span>Sub-Total:</span>
                        <span className="text-brand-blue font-semibold">${cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col gap-2 mt-3">
                        <button
                          onClick={() => {
                            setCartOpen(false);
                            navigate("/checkout");
                          }}
                          className="bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold py-2 rounded"
                        >
                          Checkout Now
                        </button>
                        <button
                          onClick={() => {
                            setCartOpen(false);
                            navigate("/cart");
                          }}
                          className="border border-gray-300 hover:border-brand-orange text-sm py-2 rounded"
                        >
                          View Cart
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link to="/wishlist" className="relative">
              <FaHeart size={20} />
              <span className="absolute -top-2 -right-2 bg-brand-orange text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishIds.length}
              </span>
            </Link>

            <div ref={userRef} className="relative">
              <button onClick={() => setUserOpen((v) => !v)}>
                {user?.avatar ? (
                  <img src={user.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <FaUser size={19} />
                )}
              </button>
              {userOpen &&
                (user ? (
                  <div className="absolute right-0 top-full mt-3 w-56 bg-white text-brand-dark rounded shadow-xl p-4 z-50">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-400 mb-3">{user.email}</p>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link to="/wishlist" onClick={() => setUserOpen(false)} className="hover:text-brand-orange">
                        My Wishlist
                      </Link>
                      <Link to="/track-order" onClick={() => setUserOpen(false)} className="hover:text-brand-orange">
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserOpen(false);
                        }}
                        className="text-left text-brand-red hover:underline mt-1"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute right-0 top-full mt-3 w-72 bg-white text-brand-dark rounded shadow-xl p-5 z-50">
                    <h4 className="font-semibold mb-3">Sign in to your account</h4>
                    <Link
                      to="/sign-in"
                      onClick={() => setUserOpen(false)}
                      className="block w-full text-center bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold py-2 rounded mb-2"
                    >
                      Login →
                    </Link>
                    <Link
                      to="/sign-up"
                      onClick={() => setUserOpen(false)}
                      className="block w-full text-center border border-gray-300 hover:border-brand-orange text-sm py-2 rounded"
                    >
                      Create Account
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sub nav */}
      <div className="bg-white border-b border-gray-200 hidden md:block">
        <div className="container-x flex items-center justify-between py-3 text-sm text-gray-600">
          <div className="flex items-center gap-6">
            <div ref={catRef} className="relative">
              <button
                onClick={() => setCatOpen((v) => !v)}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-2 hover:border-brand-orange"
              >
                All Category <FaChevronDown size={10} />
              </button>
              {catOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded z-50 py-2">
                  {allCategoryTree.map((c) => (
                    <div key={c.id} className="relative group">
                      <Link
                        to={`/shop?category=${c.id}`}
                        onClick={() => setCatOpen(false)}
                        className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 hover:text-brand-orange"
                      >
                        {c.name}
                        {subMenus[c.name] && <FaChevronDown size={9} className="-rotate-90" />}
                      </Link>
                      {subMenus[c.name] && (
                        <div className="hidden group-hover:block absolute left-full top-0 w-48 bg-white shadow-xl rounded py-2">
                          {subMenus[c.name].map((s) => (
                            <Link
                              key={s}
                              to={`/shop?category=${c.id}&tag=${s}`}
                              onClick={() => setCatOpen(false)}
                              className="block px-4 py-2 hover:bg-gray-50 hover:text-brand-orange"
                            >
                              {s}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/track-order" className="flex items-center gap-1.5 hover:text-brand-orange">
              <FaMapMarkerAlt size={13} /> Track Order
            </Link>
            <Link to="/compare" className="flex items-center gap-1.5 hover:text-brand-orange">
              <FaExchangeAlt size={13} /> Compare
            </Link>
            <a href="/customer-support" className="flex items-center gap-1.5 hover:text-brand-orange">
              <FaHeadset size={13} /> Customer Support
            </a>
            <a href="/help" className="flex items-center gap-1.5 hover:text-brand-orange">
              <FaInfoCircle size={13} /> Need Help
            </a>
          </div>
          <div className="flex items-center gap-2 text-brand-dark font-medium">
            <FaPhoneAlt size={13} /> +1-202-555-0104
          </div>
        </div>
      </div>
    </header>
  );
}
