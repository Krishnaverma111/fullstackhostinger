import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Ripple Effect Helper Component ---
const RippleButton = ({ children, onClick, className }) => {
  const [ripples, setRipples] = useState([]);
  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    setRipples((prev) => [...prev, { x, y, size, id: Date.now() }]);
    onClick && onClick(event);
  };
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => setRipples((prev) => prev.slice(1)), 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  return (
    <button className={`relative overflow-hidden ${className}`} onClick={createRipple}>
      <span className="relative z-10">{children}</span>
      {ripples.map((r) => (
        <span key={r.id} className="absolute rounded-full bg-white/40 animate-ripple"
          style={{ width: r.size, height: r.size, top: r.y, left: r.x }} />
      ))}
    </button>
  );
};

const Gardining = ({ addToCart, inventory = [] }) => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({ category: [], price: [], sort: "Featured" });
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter toggle ke liye
  const cardsPerPage = 20;

  // Scroll visibility logic
  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 1. DATA GENERATION (Real Database Data)
  const allProducts = useMemo(() => {
    const dbProducts = inventory.filter(item => 
      item.category?.trim().toLowerCase() === "gardening"
    );

    return dbProducts.map(p => ({
      id: p._id || p.id,
      name: p.name,
      img: p.image || p.img,
      price: p.price,
      oldPrice: p.price + 250,
      discount: "10% OFF", 
      rating: p.rating || 4.5,
      reviews: 50,
      type: p.category || "General",
      badge: null
    }));
  }, [inventory]);

  // 2. FILTER & SORT LOGIC
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];
    if (activeFilters.category.length > 0) result = result.filter(p => activeFilters.category.includes(p.type));
    if (activeFilters.price.length > 0) {
      result = result.filter(p => {
        if (activeFilters.price.includes("Under ₹500") && p.price < 500) return true;
        if (activeFilters.price.includes("₹500 - ₹1,000") && p.price >= 500 && p.price <= 1000) return true;
        if (activeFilters.price.includes("₹1,000 - ₹2,000") && p.price > 1000 && p.price <= 2000) return true;
        if (activeFilters.price.includes("Above ₹2,000") && p.price > 2000) return true;
        return false;
      });
    }
    if (activeFilters.sort === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    if (activeFilters.sort === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    if (activeFilters.sort === "Rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [allProducts, activeFilters]);

  // 3. PAGINATION
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);

  useEffect(() => { setCurrentPage(1); }, [activeFilters]);

  const handleFilterChange = (type, value) => {
    setActiveFilters(prev => {
      const currentArr = prev[type];
      const newArr = currentArr.includes(value) ? currentArr.filter(i => i !== value) : [...currentArr, value];
      return { ...prev, [type]: newArr };
    });
  };

  return (
    <div className="relative mt-20 md:mt-26 w-full bg-slate-50 p-4 md:p-8 min-h-screen text-slate-900">
      <AnimatePresence>
        {showTopBtn && (
          <motion.button initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}
            className="fixed bottom-6 right-6 z-50 bg-green-600 h-12 w-12 md:h-14 md:w-14 rounded-full text-white shadow-xl flex items-center justify-center"
            onClick={() => window.scrollTo({top:0, behavior:'smooth'})}
          ><i className="fa-solid fa-arrow-up"></i></motion.button>
        )}
      </AnimatePresence>

      <div className="mb-6 md:mb-10">
        <h2 className="text-2xl md:text-4xl font-black text-green-900">Gardening Essentials</h2>
        <div className="flex justify-between items-center mt-2">
           <p className="text-slate-500 font-medium text-sm md:text-base">{filteredProducts.length} Products Found</p>
           {/* Mobile Filter Toggle Button */}
           <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 text-sm font-bold">
             <i className="fa-solid fa-sliders text-green-600"></i> Filters
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR FILTERS - Mobile Responsive */}
        <aside className={`${isFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72 space-y-6 md:space-y-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit lg:sticky lg:top-4 z-40`}>
          <div className="flex justify-between items-center lg:hidden mb-4">
            <h4 className="font-bold text-lg">Filters</h4>
            <button onClick={() => setIsFilterOpen(false)} className="text-slate-400 text-xl">✕</button>
          </div>
          
          <div>
            <p className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-3">Sort By</p>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {["Featured", "Price: Low to High", "Price: High to Low", "Rating"].map(s => (
                <label key={s} className="flex items-center gap-2 cursor-pointer text-[13px] font-semibold">
                  <input type="radio" name="sort" checked={activeFilters.sort === s} 
                    onChange={() => setActiveFilters(prev => ({...prev, sort: s}))}
                    className="w-4 h-4 accent-green-600" /> {s}
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-50 pt-4 lg:border-none lg:pt-0">
            <p className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-3">Categories</p>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {["Indoor", "Outdoor", "Succulent", "Air Purifier"].map(c => (
                <label key={c} className="flex items-center gap-2 cursor-pointer text-[13px] font-semibold">
                  <input type="checkbox" checked={activeFilters.category.includes(c)}
                    onChange={() => handleFilterChange('category', c)}
                    className="w-4 h-4 accent-green-600 rounded" /> {c}
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-50 pt-4 lg:border-none lg:pt-0">
            <p className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-3">Price Range</p>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {["Under ₹500", "₹500 - ₹1,000", "₹1,000 - ₹2,000", "Above ₹2,000"].map(p => (
                <label key={p} className="flex items-center gap-2 cursor-pointer text-[13px] font-semibold">
                  <input type="checkbox" checked={activeFilters.price.includes(p)}
                    onChange={() => handleFilterChange('price', p)}
                    className="w-4 h-4 accent-green-600 rounded" /> {p}
                </label>
              ))}
            </div>
          </div>
          <button onClick={() => setIsFilterOpen(false)} className="lg:hidden w-full bg-green-600 text-white py-3 rounded-2xl font-bold text-sm mt-4">Apply Filters</button>
        </aside>

        {/* PRODUCT GRID */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="h-64 md:h-96 flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl p-6 text-center">
              <i className="fa-solid fa-box-open text-5xl md:text-6xl mb-4"></i>
              <p className="text-lg md:text-xl font-bold">No products match your filters</p>
              <button onClick={() => setActiveFilters({category:[], price:[], sort:"Featured"})} className="mt-4 text-green-600 font-bold underline">Clear All Filters</button>
            </div>
          ) : (
            <>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                <AnimatePresence mode='popLayout'>
                  {currentProducts.map((item) => (
                    <motion.div key={item.id} layout initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
                      whileHover={{y:-10}} className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col group"
                    >
                      <div className="h-48 md:h-56 overflow-hidden relative bg-slate-100">
                        <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                        {item.badge && <span className="absolute top-3 left-3 bg-black text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase">{item.badge}</span>}
                        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-green-700">⭐ {item.rating}</div>
                      </div>
                      <div className="p-4 md:p-5 flex-grow">
                        <p className="text-[10px] font-bold text-green-600 uppercase mb-1">{item.type}</p>
                        <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1 mb-2">{item.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-lg md:text-xl font-black text-slate-900">₹{item.price}</span>
                          <span className="text-xs md:text-sm text-slate-400 line-through">₹{item.oldPrice}</span>
                        </div>
                      </div>
                      <div className="p-4 md:p-5 pt-0">
                        <RippleButton onClick={() => addToCart(item)} className="w-full bg-slate-900 text-white py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs hover:bg-green-700 transition-colors">
                          ADD TO CART
                        </RippleButton>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* PAGINATION - Improved for Mobile */}
              <div className="mt-10 md:mt-12 flex justify-center flex-wrap gap-2">
                {Array.from({length: totalPages}).map((_, i) => (
                  <button key={i} onClick={() => {setCurrentPage(i+1); window.scrollTo({top:0, behavior:'smooth'})}}
                    className={`h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl font-bold text-sm transition-all ${currentPage === i+1 ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-slate-600 shadow-sm border border-slate-100 hover:bg-green-50'}`}>
                    {i + 1}
                  </button>
                )).slice(Math.max(0, currentPage-3), currentPage+2)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gardining;