import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

/**
 * ARCHITECTURAL BOTANICAL ENGINE v4.0 - FULL SYSTEM
 * Feature: Integrated State-Based Routing (Home <-> Store)
 * Aesthetic: Micro-typography, Luxury Layout, 0% Data Loss
 */

// --- 1. DESIGN SYSTEM: HIGH-FIDELITY SVG ICONS ---
const Icons = {
  Minus: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Plus: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Cart: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  ),
  Star: () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  ),
  Menu: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  )
};

// --- 2. SUB-COMPONENT: REUSABLE ASSETS ---
const CategoryBadge = ({ type }) => (
  <span className="bg-white/95 backdrop-blur-md text-slate-900 text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-sm border border-slate-100">
    {type}
  </span>
);

const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-12">
    <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.4em] mb-4 block">{subtitle}</span>
    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">{children}</h2>
  </div>
);

// --- 3. MAIN APPLICATION ENGINE ---
const PlantStore = ({ inventory = [], addToCart }) => {
  // --- STATE: ROUTING & NAVIGATION ---
  const [view, setView] = useState("store"); // "home" or "store"
  
  // --- STATE: STORE LOGIC ---
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [activeTab, setActiveTab] = useState("All");

  // --- EFFECT: DATA SIMULATION ---
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => clearTimeout(timer);
  }, [view]);

  // --- MEMO: DATA NORMALIZATION ---
  const products = useMemo(() => {
    if (!inventory || inventory.length === 0) return [];
    return inventory.map((item, index) => ({
      id: item._id || item.id || `p-${index}`,
      name: item.name || "Specimen No. " + (index + 1),
      img: item.image || item.img || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
      type: item.category || "Indoor",
      price: Number(item.price) || 499,
      rating: item.rating || (4.5 + Math.random() * 0.4).toFixed(1),
      description: item.description || "A meticulously curated specimen designed for architectural harmony.",
    }));
  }, [inventory]);

  // --- CALLBACKS: HANDLERS ---
  const updateQty = useCallback((id, delta) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));
  }, []);

  const handleAddToCart = (item) => {
    const qty = quantities[item.id] || 1;
    if (addToCart) addToCart({ ...item, quantity: qty });
    setNotification(`${qty} x ${item.name} reserved in basket.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const filtered = useMemo(() => {
    let res = products.filter(p => {
      const sMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const tMatch = activeTab === "All" || p.type === activeTab;
      return sMatch && tMatch;
    });
    if (sortBy === "Low to High") res.sort((a, b) => a.price - b.price);
    else if (sortBy === "High to Low") res.sort((a, b) => b.price - a.price);
    return res;
  }, [products, searchQuery, activeTab, sortBy]);

  // --- RENDER: HOME VIEW ---
  const HomeView = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-20 px-6 md:px-20"
    >
      <div className="max-w-[1440px] mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center  mb-40">
          <motion.div initial={{ x: -50 }} animate={{ x: 0 }}>
            <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.5em] mb-8 block">Est. 2026 — Archive</span>
            <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.8] mb-12">
              LIVING <br /> <span className="italic text-slate-300">SCULPTURE</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium leading-loose max-w-md mb-12">
              Bridging the gap between architecture and nature. We provide sustainably sourced botanical specimens for modern interior environments.
            </p>
            <button 
              onClick={() => setView("store")}
              className="bg-slate-900 text-white px-12 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-green-600 transition-all shadow-2xl active:scale-95"
            >
              Enter The Archive
            </button>
          </motion.div>
          <div className="relative">
             <div className="aspect-[4/5] bg-slate-100 rounded-[4rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=80" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  alt="Minimalist Interior"
                />
             </div>
             <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                   <span className="text-[9px] font-black uppercase tracking-[0.2em]">Live Curator online</span>
                </div>
                <p className="text-[11px] font-bold text-slate-400">Available for <br /> placement advice.</p>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // --- RENDER: STORE VIEW ---
  const StoreView = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
     {/* --- MINIMALIST BACK-TO-HOME NAVIGATION --- */}
{/* --- ARCHITECTURAL HOME REDIRECT NAVIGATION --- */}
<nav className="flex items-center mb-16 py-8 border-b border-slate-100 mt-20">
  <button 
    onClick={() => {
      // Force navigation to the root localhost:5173
      window.location.href = "/";
    }} 
    className="flex items-center gap-5 group transition-all"
  >
    {/* Minimalist Return Icon */}
    <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all duration-500 shadow-sm">
      <Icons.ArrowLeft />
    </div>

    {/* Labeling System */}
    <div className="flex flex-col items-start">
      <span className="text-[7px] font-black uppercase tracking-[0.5em] text-green-600 mb-1.5 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-500">
        Exit Catalogue
      </span>
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 group-hover:text-slate-900 transition-colors">
        Return Home
      </span>
    </div>
  </button>
  
  {/* Decorative Visual Spacer */}
  <div className="ml-auto flex items-center gap-4">
     <div className="h-[1px] w-12 bg-slate-100"></div>
     <span className="text-[8px] font-black text-slate-200 uppercase tracking-widest">Archive v4.0</span>
  </div>
</nav>

      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
        <div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.8] mb-8 uppercase">
            Curated <br /> Collection
          </h1>
          <div className="flex flex-wrap gap-2">
             {["All", "Indoor", "Outdoor", "Succulent"].map(tab => (
               <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${activeTab === tab ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
               >
                 {tab}
               </button>
             ))}
          </div>
        </div>
        
        <div className="relative w-full lg:w-[350px]">
          <input 
            type="text" 
            placeholder="SEARCH CATALOGUE..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-green-500 transition-all shadow-sm font-black text-[9px] uppercase tracking-widest"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"><Icons.Search /></div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar */}
        <aside className="lg:w-60 shrink-0">
           <div className="sticky top-10 space-y-10">
              <div>
                 <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6 flex items-center gap-2">
                   <span className="w-6 h-[1px] bg-green-500"></span> Pricing Model
                 </h4>
                 <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)} 
                  className="w-full bg-white border border-slate-200 rounded-xl p-4 text-[9px] font-black uppercase tracking-widest outline-none focus:border-green-500"
                 >
                   <option>Featured</option>
                   <option>Low to High</option>
                   <option>High to Low</option>
                 </select>
              </div>
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                 <h5 className="text-[11px] font-black uppercase tracking-widest mb-2 relative z-10">Botanical Care</h5>
                 <p className="text-[9px] text-slate-400 font-bold mb-6 relative z-10 leading-relaxed">Download our architectural care guide for every specimen.</p>
                 <button className="text-[8px] font-black uppercase tracking-widest border-b border-green-500 relative z-10">Get Guide</button>
              </div>
           </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <LayoutGroup>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-96 bg-slate-100 animate-pulse rounded-[2.5rem]" />)
              ) : filtered.map((item) => (
                <motion.div layout key={item.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-4 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700 group">
                  <div className="relative h-72 overflow-hidden rounded-[2rem] bg-slate-50 mb-6">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt={item.name} />
                    <div className="absolute top-4 left-4"><CategoryBadge type={item.type} /></div>
                  </div>

                  <div className="px-2">
                     <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-slate-900 text-lg tracking-tighter uppercase leading-none">{item.name}</h3>
                        <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                           <Icons.Star />
                           <span className="text-[9px] font-black text-slate-900">{item.rating}</span>
                        </div>
                     </div>
                     <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6 opacity-60">Specimen ID: {item.id.toString().slice(-4)}</p>

                     <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-2 border border-slate-100 mb-6">
                        <div className="flex items-center gap-3">
                           <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 active:scale-90"><Icons.Minus /></button>
                           <span className="text-[10px] font-black w-4 text-center tabular-nums">{quantities[item.id] || 1}</span>
                           <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 active:scale-90"><Icons.Plus /></button>
                        </div>
                        <div className="pr-3">
                           <span className="text-xl font-black text-slate-900 tracking-tighter">₹{item.price}</span>
                        </div>
                     </div>

                     <button 
                       onClick={() => handleAddToCart(item)}
                       className="w-full bg-slate-900 text-white py-5 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] hover:bg-green-600 transition-all flex items-center justify-center gap-3 active:scale-95"
                     >
                       <Icons.Cart />
                       Reserve Specimen
                     </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </LayoutGroup>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-slate-900 font-sans selection:bg-green-100 overflow-x-hidden">
      
      {/* GLOBAL TOAST */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[400] bg-slate-900 text-white px-8 py-5 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex items-center gap-4 border border-white/10 backdrop-blur-xl"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"><Icons.Cart /></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER VIEW ENGINE */}
      <AnimatePresence mode="wait">
        {view === "home" ? <HomeView key="home" /> : <StoreView key="store" />}
      </AnimatePresence>
      
      {/* --- LUXURY FOOTER --- */}
      <footer className="bg-white border-t border-slate-100 pt-32 pb-16 mt-20">
         <div className="max-w-[1440px] mx-auto px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
               <div className="col-span-1 md:col-span-2">
                  <h2 className="text-2xl font-black tracking-[0.5em] text-slate-900 uppercase mb-8">Flora Studio</h2>
                  <p className="text-slate-400 text-xs font-bold leading-loose max-w-sm uppercase tracking-widest opacity-60">
                    Crafting botanical sanctuaries for the modern architectural space. Sustainable, curated, and delivered with professional care guides.
                  </p>
               </div>
               <div>
                  <h6 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8">Links</h6>
                  <ul className="space-y-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                     <li className="hover:text-green-600 cursor-pointer" onClick={() => setView("home")}>Studio Home</li>
                     <li className="hover:text-green-600 cursor-pointer" onClick={() => setView("store")}>Collection</li>
                     <li className="hover:text-green-600 cursor-pointer">Shipping</li>
                  </ul>
               </div>
               <div>
                  <h6 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8">Social</h6>
                  <ul className="space-y-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                     <li className="hover:text-green-600 cursor-pointer">Instagram</li>
                     <li className="hover:text-green-600 cursor-pointer">Pinterest</li>
                  </ul>
               </div>
            </div>
            <div className="flex justify-between items-center border-t border-slate-50 pt-10">
               <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">© 2026 Architectural Botany</span>
               <div className="flex gap-4">
                  <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                  <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                  <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default PlantStore;