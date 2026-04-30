import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom'; // 1. Added Link for navigation
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronUp, ShoppingCart, Star, ArrowLeft, ArrowRight, 
  CheckCircle, ListFilter, Search, Zap, Info, Sparkles, Home
} from 'lucide-react';

const Seed = ({ addToCart }) => {
  const [allSeeds, setAllSeeds] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sortBy, setSortBy] = useState("Featured");
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const simillarContainerRef = useRef(null);

  useEffect(() => {
    const fetchSeeds = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error(`Server Error: ${response.status}`);
        const data = await response.json();

        const seedOnlyData = data.filter(item => 
          (item.category && item.category.toLowerCase().includes('seed')) || 
          (item.name && item.name.toLowerCase().includes('seed'))
        );

        const formattedData = seedOnlyData.map(item => ({
          id: item._id || item.id,
          name: item.name,
          img: item.img || item.image,
          price: Number(item.price),
          oldPrice: item.oldPrice || Number(item.price) + 250,
          type: item.type || item.category || "Seed",
          rating: item.rating || "4.5",
          isHot: item.isHot || false
        }));

        setAllSeeds(formattedData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSeeds();
  }, []);

  const filteredSeeds = useMemo(() => {
    let result = allSeeds.filter(s => {
      const searchMatch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      const catMatch = selectedCategories.length === 0 || selectedCategories.includes(s.type);
      const priceMatch = selectedPrices.length === 0 || (
        (selectedPrices.includes("Budget") && s.price < 500) ||
        (selectedPrices.includes("Premium") && s.price >= 500 && s.price <= 1000) ||
        (selectedPrices.includes("Luxury") && s.price > 1000)
      );
      return searchMatch && catMatch && priceMatch;
    });
    if (sortBy === "Low to High") result.sort((a, b) => a.price - b.price);
    if (sortBy === "High to Low") result.sort((a, b) => b.price - a.price);
    if (sortBy === "Top Rated") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [allSeeds, selectedCategories, selectedPrices, sortBy, searchQuery]);

  const handleAddToCart = (product) => {
    if (typeof addToCart === "function") {
      addToCart(product);
      setNotification(`${product.name} added to vault!`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const scrollSlider = (dir) => {
    const amount = dir === 'left' ? -350 : 350;
    simillarContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
        <Sparkles className="text-green-600" size={50} />
      </motion.div>
      <p className="mt-4 font-black text-slate-800 uppercase tracking-widest text-xs">Syncing Seed Database...</p>
    </div>
  );

  return (
    <div className="bg-[#f8fafc] mt-10 min-h-screen text-slate-900 font-sans selection:bg-green-200">
      
      {/* Glass Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ y: -100, x: '-50%', opacity: 0 }} animate={{ y: 30, x: '-50%', opacity: 1 }} exit={{ y: -100, x: '-50%', opacity: 0 }}
            className="fixed top-0 left-1/2 z-[200] bg-white/80 backdrop-blur-xl border border-green-100 px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4"
          >
            <CheckCircle className="text-green-500" size={18} />
            <span className="font-bold text-slate-700 tracking-tight">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[100] bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:bg-green-600 border-4 border-white transition-all"
          >
            <ChevronUp size={24} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 py-12 pt-32">
        
        {/* --- Back to Home Button Added Here --- */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-green-600 font-black text-[10px] uppercase tracking-widest mb-6 transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-600 font-black text-xs uppercase tracking-[0.3em]">
              <Sparkles size={14} /> Premium Nursery
            </div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Seed <span className="text-green-600 italic">Vault.</span></h1>
            <p className="text-slate-500 font-medium">Found {filteredSeeds.length} rare seed variations.</p>
          </div>
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-600" size={20} />
            <input 
              type="text" placeholder="Search seed genetics..." 
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-14 pr-6 font-bold outline-none focus:border-green-500/30 shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Filter Sidebar */}
          <aside className="lg:w-72 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-8 text-slate-400 uppercase font-black text-[10px] tracking-widest">
                <ListFilter size={14} /> Refine Collection
              </div>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="font-black text-sm text-slate-800 tracking-tight">Ecosystem</h4>
                  {["Indoor", "Outdoor", "Organic", "Hybrid"].map(cat => (
                    <label key={cat} className="flex items-center justify-between cursor-pointer group">
                      <span className={`text-sm font-bold transition-all ${selectedCategories.includes(cat) ? 'text-green-600 translate-x-1' : 'text-slate-500'}`}>{cat}</span>
                      <input type="checkbox" checked={selectedCategories.includes(cat)} 
                        onChange={() => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])} 
                        className="w-5 h-5 accent-green-600 cursor-pointer" />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl shadow-slate-200">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Sequence</h4>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-green-500 transition-all cursor-pointer"
              >
                <option>Featured</option><option>Low to High</option><option>High to Low</option><option>Top Rated</option>
              </select>
            </div>
          </aside>

          {/* Main Card Grid */}
          <div className="flex-1 space-y-12">
            <AnimatePresence mode='popLayout'>
              {filteredSeeds.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredSeeds.map((item) => (
                    <motion.div layout key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                      className="group bg-white rounded-[2.5rem] border border-slate-100 p-4 hover:shadow-2xl transition-all duration-500 flex flex-col"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-100">
                        <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.name} />
                        {item.isHot && (
                          <div className="absolute top-4 left-4 bg-orange-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-tighter">
                            <Zap size={10} fill="currentColor" /> Trending
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-grow space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">{item.type}</span>
                            <h3 className="font-black text-slate-800 text-xl tracking-tight leading-tight group-hover:text-green-600 transition-colors">{item.name}</h3>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg text-amber-600 font-black text-xs">
                            <Star size={12} fill="currentColor" /> {item.rating}
                          </div>
                        </div>
                        <div className="flex items-end justify-between border-t border-slate-50 pt-4">
                          <div><span className="text-[10px] font-bold text-slate-300 line-through">₹{item.oldPrice}</span><p className="text-3xl font-black text-slate-900 tracking-tighter">₹{item.price}</p></div>
                          <button onClick={() => handleAddToCart(item)} className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-green-600 transition-all shadow-xl active:scale-90"><ShoppingCart size={22} /></button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
                  <Info size={40} className="mx-auto mb-4 text-slate-300" />
                  <h3 className="text-2xl font-black text-slate-800">No match found</h3>
                  <button onClick={() => {setSelectedCategories([]); setSelectedPrices([]); setSearchQuery("");}} className="mt-8 text-green-600 font-black uppercase text-xs tracking-widest underline underline-offset-8">Reset All Filters</button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Recommendations Slider */}
        <section className="mt-32 relative">
          <div className="bg-white rounded-[4rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60" />
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 relative z-10">
              <div className="text-center md:text-left space-y-2">
                <h4 className="text-3xl font-black text-slate-900 tracking-tighter italic">Picked For You</h4>
                <p className="text-slate-400 font-medium">Seasonal seed genetic picks.</p>
              </div>
              <div className="flex gap-4 mt-6 md:mt-0">
                <button onClick={() => scrollSlider('left')} className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-green-600 shadow-xl transition-all"><ArrowLeft size={20} /></button>
                <button onClick={() => scrollSlider('right')} className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-green-600 shadow-xl transition-all"><ArrowRight size={20} /></button>
              </div>
            </div>
            <div ref={simillarContainerRef} className="flex gap-8 overflow-x-hidden scroll-smooth pb-4 relative z-10">
              {allSeeds.slice(0, 10).map(item => (
                <div key={item.id} className="min-w-[300px] bg-slate-50 rounded-[2.5rem] p-6 group transition-all hover:bg-white hover:shadow-2xl border border-transparent hover:border-slate-100">
                  <div className="h-52 rounded-[2rem] overflow-hidden mb-6 bg-white shadow-inner">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                  </div>
                  <div className="space-y-1 mb-6">
                    <h5 className="font-black text-slate-800 text-lg leading-tight">{item.name}</h5>
                    <p className="text-green-600 font-black text-2xl">₹{item.price}</p>
                  </div>
                  <button onClick={() => handleAddToCart(item)} className="w-full py-4 bg-white border-2 border-slate-900 rounded-2xl text-[10px] font-black uppercase hover:bg-slate-900 hover:text-white transition-all tracking-[0.2em] shadow-sm">Add To Vault</button>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Seed;