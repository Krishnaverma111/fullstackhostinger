import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronUp, ShoppingCart, Star,
  Filter, CheckCircle, Droplets
} from 'lucide-react';

// FIX: inventory prop add kiya taaki App.jsx se real data aaye
const Soil = ({ addToCart, inventory = [] }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sortBy, setSortBy] = useState("Featured");
  const [notification, setNotification] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  // 1. Products Data Logic (Database Only)
  const allProducts = useMemo(() => {
    const dbProducts = inventory.filter(item =>
      item.category?.trim().toLowerCase() === "soil & fertilizer" ||
      item.category?.trim().toLowerCase() === "soil"
    );

    return dbProducts.map(p => ({
      id: p._id || p.id,
      name: p.name,
      img: p.image || p.img,
      price: p.price,
      oldPrice: p.price + 100,
      type: p.category,
      rating: p.rating || "4.5",
      discount: "20% OFF"
    }));
  }, [inventory]);

  // 2. Filter & Sort Logic (Remains same as your original)
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const catMatch = selectedCategories.length === 0 || selectedCategories.includes(p.type);
      const priceMatch = selectedPrices.length === 0 || selectedPrices.some(range => {
        if (range === "Under ₹500") return p.price < 500;
        if (range === "₹500 - ₹1000") return p.price >= 500 && p.price <= 1000;
        if (range === "Above ₹1000") return p.price > 1000;
        return true;
      });
      return catMatch && priceMatch;
    }).sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      return 0;
    });
  }, [allProducts, selectedCategories, selectedPrices, sortBy]);

  const handleAddToCart = (item) => {
    if (addToCart && typeof addToCart === 'function') {
      addToCart(item);
      setNotification(`${item.name} added!`);
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const toggleFilter = (state, setState, value) => {
    setState(prev => prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]);
  };

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-800 pb-20 mt-26">

      <AnimatePresence>
        {notification && (
          <motion.div initial={{ y: -60, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -60, opacity: 0 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-8 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <CheckCircle className="text-green-400" size={18} /> {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase mb-6">
          <a href="/">Home</a>
          <ChevronRight size={14} />
          <span className="text-green-700">Soil & Fertilizers</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 text-green-600 font-bold mb-2">
              <Droplets size={20} /> <span className="uppercase text-xs">Nutrients</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">Soil & <span className="text-green-700">Fertilizers</span></h1>
          </div>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="mt-6 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2 font-bold text-sm outline-none"
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-64 space-y-10">
            <div>
              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-6 border-b pb-2">
                <Filter size={14} /> Category
              </h4>
              {["Soil Mix", "Organic", "Chemical", "Additives"].map(cat => (
                <label key={cat} className="flex items-center gap-3 mb-4 cursor-pointer group">
                  <input type="checkbox" onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)} className="w-5 h-5 accent-green-600 rounded" />
                  <span className="text-sm font-bold text-slate-600 group-hover:text-green-700">{cat}</span>
                </label>
              ))}
            </div>

            <div className="bg-green-50/50 p-6 rounded-[2rem] border border-green-100">
              <h4 className="text-[10px] font-black uppercase text-green-800 mb-6 tracking-widest">Price Range</h4>
              {["Under ₹500", "₹500 - ₹1000", "Above ₹1000"].map(range => (
                <label key={range} className="flex items-center gap-3 mb-4 cursor-pointer">
                  <input type="checkbox" checked={selectedPrices.includes(range)} onChange={() => toggleFilter(selectedPrices, setSelectedPrices, range)} className="w-5 h-5 accent-green-600 rounded" />
                  <span className="text-sm font-bold text-slate-700">{range}</span>
                </label>
              ))}
            </div>
          </aside>

          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="w-full h-64 flex flex-col items-center justify-center text-slate-400 bg-white rounded-[2.5rem] p-6 text-center shadow-sm border border-slate-100">
                <Droplets size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-bold uppercase tracking-widest">No items added</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((item) => (
                    <motion.div layout key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all flex flex-col h-full"
                    >
                      <div className="relative aspect-square overflow-hidden bg-slate-50">
                        <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                        <div className="absolute top-5 left-5 bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full">{item.discount}</div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-black text-green-600 uppercase">{item.type}</span>
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg text-amber-600 font-black text-[10px]">
                            <Star size={10} fill="currentColor" /> {item.rating}
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg mb-4">{item.name}</h3>
                        <div className="flex items-end justify-between border-t border-slate-50 pt-4 mt-auto">
                          <div>
                            <p className="text-2xl font-black text-slate-900">₹{item.price}</p>
                            <p className="text-xs text-slate-300 line-through">₹{item.oldPrice}</p>
                          </div>
                          <button onClick={() => handleAddToCart(item)} className="bg-green-700 text-white p-4 rounded-2xl hover:bg-slate-900 transition-all active:scale-95">
                            <ShoppingCart size={20} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </main>

      {showTopBtn && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-10 right-10 bg-slate-900 text-white p-4 rounded-2xl z-50 hover:bg-green-700 transition-all">
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Soil;