import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronUp, ShoppingCart, Star, 
  ArrowLeft, ArrowRight, Filter, CheckCircle, IndianRupee 
} from 'lucide-react';

// 'inventory' prop ko add kiya gaya hai jo App.jsx se database ka data layega
const Planter = ({ addToCart, inventory }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]); 
  const [sortBy, setSortBy] = useState("Featured");
  const [notification, setNotification] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  
  const scrollRef = useRef(null);

  // 1. FILTER & SORT LOGIC (Ab ye Database 'inventory' par kaam karega)
  const filteredPlanters = useMemo(() => {
    // Agar inventory load nahi hui toh khali array rakho
    if (!inventory || !Array.isArray(inventory)) return [];

    return inventory.filter(p => {
      // Step A: Check category (Planters aur Pots dono ko allow kar rahe hain)
      const isPlanterOrPot = p.category === "Planters" || p.category === "Pots";
      
      // Step B: Sidebar Material Filter (Ceramic, Plastic, etc.)
      // Note: Agar aapke DB mein ye field 'type' ki jagah 'material' hai, toh p.material check karein
      const itemType = p.type || p.material; 
      const catMatch = selectedCategories.length === 0 || selectedCategories.includes(itemType);
      
      // Step C: Price Range Filter
      const priceMatch = selectedPrices.length === 0 || selectedPrices.some(range => {
        if (range === "Under ₹500") return p.price < 500;
        if (range === "₹500 - ₹1000") return p.price >= 500 && p.price <= 1000;
        if (range === "Above ₹1000") return p.price > 1000;
        return true;
      });

      return isPlanterOrPot && catMatch && priceMatch;
    }).sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      return 0;
    });
  }, [inventory, selectedCategories, selectedPrices, sortBy]);

  const handlePriceChange = (range) => {
    setSelectedPrices(prev => 
      prev.includes(range) ? prev.filter(p => p !== range) : [...prev, range]
    );
  };

  const handleAddToCart = (item) => {
    if (typeof addToCart === 'function') {
      addToCart(item);
      setNotification(`${item.name} added!`);
      setTimeout(() => setNotification(null), 2000);
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 pb-20">
      
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ y: -50 }} animate={{ y: 20 }} exit={{ y: -50 }} className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-8 py-3 rounded-full flex items-center gap-3">
            <CheckCircle className="text-green-400" size={18} /> {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 pt-38">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900">Pots & Planters</h1>
          <p className="text-slate-500 mt-2">Find the perfect home for your plants.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR WITH PRICING RANGE */}
          <aside className="lg:w-64 space-y-10">
            {/* Category Filter */}
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-4 border-b pb-2">Materials</h4>
              {["Ceramic", "Plastic", "Metal", "Terracotta"].map(mat => (
                <label key={mat} className="flex items-center gap-3 mb-3 cursor-pointer group">
                  <input type="checkbox" onChange={(e) => e.target.checked ? setSelectedCategories([...selectedCategories, mat]) : setSelectedCategories(selectedCategories.filter(c => c !== mat))} className="w-4 h-4 accent-green-600" />
                  <span className="text-sm font-bold group-hover:text-green-700 transition-colors">{mat}</span>
                </label>
              ))}
            </div>

            {/* Price Range Filter */}
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
              <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-4 border-b pb-2">Price Range</h4>
              {["Under ₹500", "₹500 - ₹1000", "Above ₹1000"].map(range => (
                <label key={range} className="flex items-center gap-3 mb-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedPrices.includes(range)}
                    onChange={() => handlePriceChange(range)}
                    className="w-4 h-4 accent-green-600" 
                  />
                  <span className="text-sm font-bold group-hover:text-green-700 transition-colors">{range}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-sm font-bold text-slate-400">{filteredPlanters.length} Products found</p>
              <select onChange={(e) => setSortBy(e.target.value)} className="bg-slate-100 px-4 py-2 rounded-xl font-bold text-sm outline-none border-none">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {filteredPlanters.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-[3rem]">
                <p className="text-slate-400 font-bold italic">Abhi is category mein koi products nahi hain.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredPlanters.map((item) => (
                  <motion.div layout key={item._id || item.id} className="border rounded-[2.5rem] p-4 group hover:shadow-2xl transition-all">
                    <div className="aspect-square overflow-hidden rounded-3xl bg-slate-100 mb-4">
                      {/* Note: Check kariye aapke DB mein image ki field ka naam 'image' hai ya 'img' */}
                      <img src={item.image || item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="font-bold text-slate-800">{item.name}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-2xl font-black text-slate-900">₹{item.price}</p>
                      <button onClick={() => handleAddToCart(item)} className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-green-700 transition-all shadow-lg active:scale-90">
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Planter;