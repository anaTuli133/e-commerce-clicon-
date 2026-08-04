import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";
import Hero from "../components/Hero";
import CategoryStrip from "../components/CategoryStrip";
import FeatureBar from "../components/FeatureBar";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import CountdownTimer from "../components/CountdownTimer";
import Newsletter from "../components/Newsletter";
import promoAccessoriesImg from "../assets/promo-accessories.jpg";
import pixel6Promo from "../assets/pixel6-promo.png";
import flipbudsPro from "../assets/flipbuds-pro.png";
import homepodMini from "../assets/homepod-mini.png";
import xiaomiMi11Ultra from "../assets/xiaomi-mi11-ultra.png";

const TABS = ["All Product", "Smart Phone", "Laptop", "Headphone", "TV"];

export default function Home() {
  const [heroSlides, setHeroSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [tab, setTab] = useState(TABS[0]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.fetchHeroSlides(), api.fetchCategories(), api.fetchProducts()]).then(
      ([slides, cats, prods]) => {
        setHeroSlides(slides);
        setCategories(cats.categories);
        setProductList(prods.items);
        setLoading(false);
      }
    );
  }, []);

  const featured = productList.slice(0, 8);
  const flashSale = productList.slice(0, 3);
  const bestSellers = productList.slice(3, 6);
  const topRated = [...productList].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const newArrivals = [...productList].reverse().slice(0, 3);

  return (
    <div className="container-x py-6">
      {/* Hero + side promo cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 h-full">
          <Hero slides={heroSlides} />
        </div>
        <div className="grid grid-rows-2 gap-4">

          {/* Pixel 6 Pro promo */}
          <div className="bg-brand-dark rounded-md flex items-center text-white relative overflow-hidden h-[220px]">
            <div className="pl-6 py-6 z-10 relative w-1/2">
              <span className="text-brand-yellow text-[11px] font-semibold tracking-wide">SUMMER SALES</span>
              <h3 className="text-lg font-bold mt-1 leading-snug">New Google Pixel 6 Pro</h3>
              <Link to="/shop" className="inline-block mt-3 bg-brand-orange text-white text-xs font-semibold px-4 py-2 rounded">
                SHOP NOW →
              </Link>
            </div>

            <img
              src={pixel6Promo}
              alt="Google Pixel 6 Pro"
              className="absolute right-0 top-0 h-full w-1/2 object-cover object-left"
            />

            <span className="absolute top-3 right-3 bg-brand-yellow text-brand-dark text-[11px] font-bold px-2 py-1 rounded z-20">
              29% OFF
            </span>
          </div>

          {/* Xiaomi FlipBuds Pro promo */}
          <div className="bg-gray-50 rounded-md p-6 flex items-center justify-between">
            <img
              src={flipbudsPro}
              alt="Xiaomi FlipBuds Pro"
              className="object-fill"
            />
            <div>
              <h3 className="text-base font-bold leading-snug">Xiaomi FlipBuds Pro</h3>
              <p className="text-brand-blue font-semibold mt-1">$299 USD</p>
              <Link to="/shop" className="inline-block mt-3 bg-brand-orange text-white text-xs font-semibold px-4 py-2 rounded">
                SHOP NOW →
              </Link>
            </div>
          </div>

        </div>
      </div>

      <FeatureBar />
      <CategoryStrip categories={categories} />

      {/* Featured products */}
      <section className="py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="hidden lg:flex flex-col bg-brand-yellow/90 rounded-md overflow-hidden h-fit">
            <div className="p-6 text-center">
              <p className="text-xs font-semibold text-red-500 tracking-wide">COMPUTER & ACCESSORIES</p>
              <h3 className="text-2xl font-bold mt-3 mb-2">32% Discount</h3>
              <p className="text-sm text-brand-dark/70 mb-4">For all ellectronics products</p>
              <div className="flex items-center justify-center gap-2 text-sm mb-5">
                <span>Offers ends in:</span>
                <span className="bg-white text-brand-dark text-xs font-semibold px-3 py-1.5 rounded">
                  ENDS OF CHRISTMAS
                </span>
              </div>
              <Link
                to="/shop?category=computer-accessories"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold px-6 py-3 rounded"
              >
                SHOP NOW →
              </Link>
            </div>
            <img
              src={promoAccessoriesImg}
              alt="Computer & accessories flat lay"
              className="w-full object-cover"
            />
          </div>

          <div className="lg:col-span-3">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h2 className="text-xl font-semibold">Featured Products</h2>
              <div className="flex items-center gap-4 text-sm">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`pb-1 border-b-2 transition-colors ${tab === t ? "border-brand-orange text-brand-orange" : "border-transparent text-gray-500 hover:text-brand-dark"
                      }`}
                  >
                    {t}
                  </button>
                ))}
                <Link to="/shop" className="text-brand-orange whitespace-nowrap hover:underline">
                  Browse All Product →
                </Link>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-64 bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featured.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Two promo banners */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">

        <div className="bg-gray-50 rounded-md p-8 flex items-center justify-between overflow-hidden">
          <div>
            <span className="text-xs font-semibold text-brand-blue bg-blue-100 px-2 py-1 rounded">INTRODUCING</span>
            <h3 className="text-xl font-bold mt-3 mb-2">New Apple Homepod Mini</h3>
            <p className="text-sm text-gray-500 mb-4 max-w-xs">
              Jam-packed with innovation, HomePod mini delivers unexpectedly.
            </p>
            <Link to="/shop" className="inline-block bg-brand-orange text-white text-xs font-semibold px-4 py-2 rounded">
              SHOP NOW →
            </Link>
          </div>
          <img
            src={homepodMini}
            alt="Apple HomePod Mini"
            className="w-40 h-40 object-contain shrink-0"
          />
        </div>

        <div className="bg-brand-dark rounded-md p-8 flex items-center justify-between text-white relative overflow-hidden">
          <div>
            <span className="text-xs font-semibold text-brand-yellow bg-white/10 px-2 py-1 rounded">INTRODUCING NEW</span>
            <h3 className="text-xl font-bold mt-3 mb-2">Xiaomi Mi 11 Ultra 12GB+256GB</h3>
            <p className="text-sm text-white/60 mb-4 max-w-xs">*Data provided by internal laboratories.</p>
            <Link to="/shop" className="inline-block bg-brand-orange text-white text-xs font-semibold px-4 py-2 rounded">
              SHOP NOW →
            </Link>
          </div>
          <img
            src={xiaomiMi11Ultra}
            alt="Xiaomi Mi 11 Ultra"
            className="absolute right-0 bottom-0 h-full max-h-[220px] object-contain object-bottom"
          />
          <span className="absolute top-4 right-4 bg-brand-blue text-white text-sm font-bold w-14 h-14 rounded-full flex items-center justify-center z-10">
            $590
          </span>
        </div>

      </section>

      {/* Four columns */}
      <section className="py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Today Best Deals</h2>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            Deals ends in: <CountdownTimer hours={40} />
            <Link to="/shop" className="text-brand-orange hover:underline">
              Browse All Product →
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            ["FLASH SALE TODAY", flashSale],
            ["BEST SELLERS", bestSellers],
            ["TOP RATED", topRated],
            ["NEW ARRIVAL", newArrivals],
          ].map(([label, list]) => (
            <div key={label}>
              <h4 className="text-xs font-semibold tracking-wide text-gray-400 mb-4">{label}</h4>
              <div className="space-y-4">
                {list.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="flex items-center gap-3 group">
                    <img src={p.image} alt="" className="w-14 h-14 rounded object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm line-clamp-2 group-hover:text-brand-orange">{p.name}</p>
                      <p className="text-brand-blue text-sm font-semibold mt-1">${p.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />

      <div className="-mx-4">
        <Newsletter />
      </div>
    </div>
  );
}
