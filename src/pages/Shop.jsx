import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import * as api from "../services/api";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import appleWatchImg from "../assets/promo/apple-watch-series7.png";
import appleLogoImg from "../assets/promo/apple-logo.png";

const PRICE_RANGES = [
  { label: "All Price", min: undefined, max: undefined },
  { label: "Under $20", min: 0, max: 20 },
  { label: "$25 to $100", min: 25, max: 100 },
  { label: "$100 to $300", min: 100, max: 300 },
  { label: "$300 to $500", min: 300, max: 500 },
  { label: "$500 to $1,000", min: 500, max: 1000 },
  { label: "$1,000 to $10,000", min: 1000, max: 10000 },
];

const SLIDER_MIN = 0;
const SLIDER_MAX = 10000;
const PAGE_SIZE = 12;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [meta, setMeta] = useState({ categories: [], allCategoryTree: [], brands: [], popularTags: [] });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [localSearch, setLocalSearch] = useState(searchParams.get("search") || "");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category = searchParams.get("category") || "";
  const priceLabel = searchParams.get("price") || "All Price";
  const sort = searchParams.get("sort") || "";
  const search = searchParams.get("search") || "";
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [sliderMin, setSliderMin] = useState(SLIDER_MIN);
  const [sliderMax, setSliderMax] = useState(SLIDER_MAX);

  useEffect(() => {
    api.fetchCategories().then(setMeta);
  }, []);

  // মোবাইলে filter drawer খোলা থাকলে background scroll বন্ধ
  useEffect(() => {
    document.body.style.overflow = filtersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  useEffect(() => {
    setLoading(true);
    const preset = PRICE_RANGES.find((r) => r.label === priceLabel) || {};
    const usingPreset = priceLabel !== "All Price";
    const min = usingPreset ? preset.min : (sliderMin > SLIDER_MIN ? sliderMin : undefined);
    const max = usingPreset ? preset.max : (sliderMax < SLIDER_MAX ? sliderMax : undefined);

    api
      .fetchProducts({ category: category || undefined, minPrice: min, maxPrice: max, sort: sort || undefined, search: search || undefined })
      .then(({ items }) => {
        let filtered = items;
        if (selectedBrands.length) filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
        setProducts(filtered);
        setLoading(false);
        setPage(1);
      });
  }, [category, priceLabel, sort, search, selectedBrands, sliderMin, sliderMax]);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  function toggleBrand(brand) {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  }

  function handleMinSlider(e) {
    const val = Math.min(Number(e.target.value), sliderMax - 1);
    setSliderMin(val);
    if (priceLabel !== "All Price") updateParam("price", "");
  }
  function handleMaxSlider(e) {
    const val = Math.max(Number(e.target.value), sliderMin + 1);
    setSliderMax(val);
    if (priceLabel !== "All Price") updateParam("price", "");
  }
  function handleMinInput(e) {
    const val = Math.max(SLIDER_MIN, Math.min(Number(e.target.value) || 0, sliderMax - 1));
    setSliderMin(val);
    if (priceLabel !== "All Price") updateParam("price", "");
  }
  function handleMaxInput(e) {
    const val = Math.min(SLIDER_MAX, Math.max(Number(e.target.value) || 0, sliderMin + 1));
    setSliderMax(val);
    if (priceLabel !== "All Price") updateParam("price", "");
  }

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const paged = useMemo(() => products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [products, page]);

  const categoryLabel = meta.allCategoryTree.find((c) => c.id === category)?.name;
  const minPercent = (sliderMin / SLIDER_MAX) * 100;
  const maxPercent = (sliderMax / SLIDER_MAX) * 100;
  const activeFilterCount = (category ? 1 : 0) + (priceLabel !== "All Price" ? 1 : 0) + selectedBrands.length;

  // পুরো sidebar কনটেন্টটা একবার লিখে desktop + mobile drawer দুই জায়গায় reuse করছি
  const filterContent = (
    <div className="space-y-8">
      <div>
        <h4 className="font-semibold mb-3">Category</h4>
        <ul className="space-y-2 text-sm">
          <li>
            <button
              onClick={() => updateParam("category", "")}
              className={`text-left ${!category ? "text-brand-orange font-medium" : "text-gray-600 hover:text-brand-orange"}`}
            >
              All Categories
            </button>
          </li>
          {meta.allCategoryTree.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => updateParam("category", c.id)}
                className={`text-left ${category === c.id ? "text-brand-orange font-medium" : "text-gray-600 hover:text-brand-orange"}`}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-3 uppercase text-xs tracking-wide">Price Range</h4>

        <div className="relative h-1 bg-gray-200 rounded-full mt-6 mb-4">
          <div
            className="absolute h-1 bg-brand-orange rounded-full"
            style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
          />
          <input
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            value={sliderMin}
            onChange={handleMinSlider}
            className="range-thumb absolute w-full h-1 top-0 left-0 appearance-none bg-transparent pointer-events-none"
          />
          <input
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            value={sliderMax}
            onChange={handleMaxSlider}
            className="range-thumb absolute w-full h-1 top-0 left-0 appearance-none bg-transparent pointer-events-none"
          />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="number"
            value={sliderMin}
            onChange={handleMinInput}
            placeholder="Min price"
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm outline-none focus:border-brand-orange"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            value={sliderMax}
            onChange={handleMaxInput}
            placeholder="Max price"
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm outline-none focus:border-brand-orange"
          />
        </div>

        <ul className="space-y-2 text-sm">
          {PRICE_RANGES.map((r) => (
            <li key={r.label} className="flex items-center gap-2">
              <input
                type="radio"
                checked={priceLabel === r.label}
                onChange={() => {
                  updateParam("price", r.label === "All Price" ? "" : r.label);
                  setSliderMin(r.min ?? SLIDER_MIN);
                  setSliderMax(r.max ?? SLIDER_MAX);
                }}
                className="accent-brand-orange"
              />
              <span className={priceLabel === r.label ? "text-brand-orange" : "text-gray-600"}>{r.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Popular Brands</h4>
        <ul className="space-y-2 text-sm">
          {meta.brands.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} className="accent-brand-orange" />
              <span className="text-gray-600">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Popular Tag</h4>
        <div className="flex flex-wrap gap-2">
          {meta.popularTags.map((t) => (
            <button
              key={t}
              onClick={() => updateParam("search", t)}
              className="text-xs border border-gray-200 rounded px-2.5 py-1.5 hover:border-brand-orange hover:text-brand-orange"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-brand-orange/40 rounded p-5 text-center">
        <img src={appleWatchImg} alt="Apple Watch Series 7" className="w-full mb-4" />
        <p className="font-semibold text-sm tracking-wide flex items-center justify-center gap-1.5">
          <img src={appleLogoImg} alt="Apple" className="w-4 h-4 object-contain" />
          WATCH
        </p>
        <p className="text-brand-red text-xs font-semibold mb-2">SERIES 7</p>
        <p className="font-semibold leading-snug mb-3">
          Heavy on Features.
          <br /> Light on Price.
        </p>
        <p className="text-sm text-gray-500 mb-3">
          Only for: <span className="bg-yellow-200 px-2 py-0.5 rounded font-medium text-gray-800">$299 USD</span>
        </p>
        <button className="w-full bg-brand-orange text-white rounded py-2 text-sm font-medium flex items-center justify-center gap-2 mb-2 hover:bg-brand-orange/90">
          <FaCartShopping size={13} /> ADD TO CART
        </button>
        <button className="w-full border border-brand-orange text-brand-orange rounded py-2 text-sm font-medium hover:bg-brand-orange/5">
          VIEW DETAILS →
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Breadcrumb items={[{ label: "Shop", to: "/shop" }, { label: categoryLabel || "All Products" }]} />

      <div className="container-x py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">{filterContent}</aside>

        {/* Product grid */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            {/* মোবাইলে Filters বাটন */}
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 border border-gray-200 rounded px-3 py-2 text-sm hover:border-brand-orange"
            >
              <FaFilter size={12} /> Filters
              {activeFilterCount > 0 && (
                <span className="bg-brand-orange text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateParam("search", localSearch);
              }}
              className="flex bg-white border border-gray-200 rounded overflow-hidden flex-1 max-w-sm"
            >
              <input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search for anything..."
                className="flex-1 px-3 py-2 text-sm outline-none"
              />
              <button type="submit" className="px-3 text-gray-500 hover:text-brand-orange">
                <FaSearch size={13} />
              </button>
            </form>

            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="border border-gray-200 rounded px-3 py-2 text-sm outline-none"
            >
              <option value="">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {(category || search || selectedBrands.length > 0) && (
            <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
              <span className="text-gray-500">Active Filters:</span>
              {categoryLabel && (
                <span className="bg-gray-100 rounded px-2 py-1 flex items-center gap-1">
                  {categoryLabel}{" "}
                  <button onClick={() => updateParam("category", "")} className="text-gray-400 hover:text-brand-red">
                    ×
                  </button>
                </span>
              )}
              {search && (
                <span className="bg-gray-100 rounded px-2 py-1 flex items-center gap-1">
                  "{search}"{" "}
                  <button onClick={() => updateParam("search", "")} className="text-gray-400 hover:text-brand-red">
                    ×
                  </button>
                </span>
              )}
              <span className="text-gray-400 ml-auto">{products.length.toLocaleString()} Results found</span>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 animate-pulse rounded" />
              ))}
            </div>
          ) : paged.length === 0 ? (
            <p className="text-center text-gray-400 py-20">No products match these filters.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {paged.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-40"
              >
                ←
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${page === i + 1 ? "bg-brand-orange text-white" : "border border-gray-200 hover:border-brand-orange"
                    }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-40"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFiltersOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <FaTimes size={18} />
              </button>
            </div>
            {filterContent}
            <button
              onClick={() => setFiltersOpen(false)}
              className="w-full mt-6 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-sm py-3 rounded"
            >
              Show {products.length} Results
            </button>
          </div>
        </div>
      )}

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}