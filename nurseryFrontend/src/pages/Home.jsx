// update bug free code 
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from "axios";
import Half from './Half';
import Review from './Review';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Sprout, Flower2, Waves, ShoppingBag } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SLIDES = [
  {
    id: 1,
    img: "https://res.cloudinary.com/dv7h1bshe/image/upload/v1779259384/banner3_jc3m2d.jpg",
    title: "Bring Nature Home",
    sub: "Premium Indoor Plants",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/dv7h1bshe/image/upload/v1779259364/banner2_rcnycc.jpg",
    title: "Grow Your Own",
    sub: "Organic Seeds & Bulbs",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/dv7h1bshe/image/upload/v1779259353/banner1_ptww2y.jpg",
    title: "Decorate Better",
    sub: "Exotic Planters & Pots",
  },
  {
    id: 4,
    img: "https://res.cloudinary.com/dv7h1bshe/image/upload/v1779259280/banner4_k5wzwe.jpg",
    title: "Expert Care",
    sub: "Best Fertilizers & Soil",
  },
];

const SLIDE_ICONS = [
  <Leaf size={48} className="text-green-400" />,
  <Sprout size={48} className="text-emerald-400" />,
  <Flower2 size={48} className="text-pink-400" />,
  <Waves size={48} className="text-blue-400" />,
];

const CATEGORY_MAP = {
  "/": "indoor",
  "/plants": "indoor",
  "/seeds": "seeds",
  "/pots": "pots",
  "/planters": "planters",
};

const Home = ({ addToCart }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const location = useLocation();
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);
  const currentCategoryRef = useRef(null);
  const loadingRef = useRef(false); // ✅ loading ka ref — observer ke liye

  const currentCategory =
    CATEGORY_MAP[location.pathname] ||
    location.pathname.replace("/", "").toLowerCase();

  // ================= FETCH PRODUCTS =================
  const fetchProducts = useCallback(async (pageNum, category) => {
    if (loadingRef.current) return;
    try {
      loadingRef.current = true;
      setLoading(true);

      const url = `${API}/api/products?page=${pageNum}&limit=3&category=${category}`;
      const res = await axios.get(url);

      // ✅ Agar user isi beech category badal chuka hai, response ignore karo
      if (category !== currentCategoryRef.current) return;

      let newProducts = [];
      if (Array.isArray(res.data)) {
        newProducts = res.data;
      } else if (res.data.success && res.data.products) {
        newProducts = res.data.products;
      }

      setInventory((prev) => {
        const combined = pageNum === 1 ? newProducts : [...prev, ...newProducts];
        const seen = new Set();
        return combined.filter((item) => {
          if (seen.has(item._id)) return false;
          seen.add(item._id);
          return true;
        });
      });

      const totalPages = res.data.totalPages || 1;
      setHasMore(pageNum < totalPages);
    } catch (error) {
      console.error("🔴 Fetch Error:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  // ================= RESET ON CATEGORY CHANGE =================
  useEffect(() => {
    currentCategoryRef.current = currentCategory;
    setInventory([]);
    setHasMore(true);
    setPage(1);
    fetchProducts(1, currentCategory);
  }, [currentCategory]);

  // ================= FETCH ON PAGE > 1 ONLY =================
  useEffect(() => {
    if (page === 1) return;
    fetchProducts(page, currentCategoryRef.current);
  }, [page]);

  // ================= INTERSECTION OBSERVER =================
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loadingRef.current // ✅ state nahi ref use karo
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasMore]);

  // ================= SLIDER EFFECT =================
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-slate-900 pt-28">

      {/* ================= HERO BANNER ================= */}
      <section className="relative h-[450px] md:h-[650px] mx-4 lg:mx-16 mt-10 overflow-hidden rounded-[3.5rem] shadow-2xl group border-4 border-white">
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {SLIDES.map((slide, index) => (
            <div key={slide.id} className="min-w-full h-full relative">
              <img
                src={slide.img}
                className="w-full h-full object-cover"
                alt={slide.title}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                <div
                  className={`mb-4 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transform transition-all duration-1000 ${currentSlide === index
                    ? "scale-100 opacity-100 rotate-0"
                    : "scale-50 opacity-0 rotate-12"
                    }`}
                >
                  <div className="animate-bounce">{SLIDE_ICONS[index]}</div>
                </div>
                <h2
                  className={`text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-4 drop-shadow-lg transform transition-all duration-700 delay-300 ${currentSlide === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                    }`}
                >
                  {slide.title}
                </h2>
                <p
                  className={`text-sm md:text-xl font-bold uppercase tracking-[0.3em] text-green-400 mb-8 transform transition-all duration-700 delay-500 ${currentSlide === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                    }`}
                >
                  {slide.sub}
                </p>
                <Link
                  to="/plants"
                  className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto bg-slate-50/50 rounded-[4rem] border border-slate-100 my-10">

        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
            {currentCategory}
            <span className="text-green-600"> Collection</span>
          </h2>
          <Link
            to={currentCategory === "indoor" ? "/plants" : `/${currentCategory}`}
            className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-green-600"
          >
            View All
          </Link>
        </div>

        {loading && inventory.length === 0 ? (
          <div className="text-center py-20 font-bold">Loading...</div>
        ) : inventory.length === 0 ? (
          <div className="text-center py-20 font-bold">No Products Found</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {inventory.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group"
                >
                  <figure className="relative aspect-square overflow-hidden rounded-[2.5rem] mb-6 bg-slate-50">
                    <img
                      loading="lazy"
                      src={item.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={item.name}
                    />
                    <div className="absolute top-4 right-4 bg-white/80 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-green-600">
                      {item.category}
                    </div>
                  </figure>
                  <h3 className="font-black text-lg uppercase italic mb-2">
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-black">₹{item.price}</span>
                    <span className="text-xs text-gray-400">
                      {item.countInStock} In Stock
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(item)} 
                    className="w-full bg-black text-white py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-green-600 transition"
                  >
                    <ShoppingBag size={16} />
                    Add To Cart
                  </button>
                </div>
              ))}
            </div>

            {/* ================= INFINITE SCROLL TRIGGER ================= */}
            <div ref={loadMoreRef} className="py-10 mt-4 text-center min-h-[60px]">
              {loading && inventory.length > 0 && (
                <span className="text-sm font-bold text-slate-400">
                  Loading more...
                </span>
              )}
              {!hasMore && !loading && (
                <span className="text-sm font-bold text-slate-300">
                  ✓ All products loaded
                </span>
              )}
            </div>
          </>
        )}
      </section>

      <Half />
      <Review />
    </div>
  );
};

export default Home;