import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronUp, ShoppingCart,
  Gift, CheckCircle, Leaf, Send, Users, Sparkles, Box
} from 'lucide-react';

const Gifting = ({ addToCart, inventory = [] }) => {
  const [notification, setNotification] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");

  const giftProducts = useMemo(() => {
    return inventory.filter(item =>
      item.category?.trim().toLowerCase() === "gift" ||
      item.category?.trim().toLowerCase() === "gifts" ||
      item.category?.trim().toLowerCase() === "gifting"
    ).map(p => ({
      id: p._id || p.id,
      name: p.name,
      price: p.price,
      oldPrice: p.price + 200,
      img: p.image || p.img,
      type: p.category
    }));
  }, [inventory]);

  const sortedProducts = useMemo(() => {
    let result = [...giftProducts];
    if (sortBy === "Premium First") return result.sort((a, b) => b.price - a.price);
    if (sortBy === "Budget Friendly") return result.sort((a, b) => a.price - b.price);
    return result;
  }, [sortBy, giftProducts]);

  const handleAddToCart = (item) => {
    if (addToCart) {
      addToCart(item);
      setNotification(`${item.name} added to your selection`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#fcfaf8] lg:mt-33 mt-22 min-h-screen text-neutral-900 selection:bg-emerald-100 pb-20 font-sans">

      {/* Premium Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-neutral-900/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[320px] border border-white/10"
          >
            <div className="bg-emerald-500 p-1 rounded-full text-neutral-900">
              <CheckCircle size={20} />
            </div>
            <span className="font-medium text-sm">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-12">

        {/* Breadcrumb & Theme Toggle Placeholder */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            <a href="/" className="hover:text-emerald-700 transition-colors">Home</a>
            <ChevronRight size={12} />
            <span className="text-emerald-800">Gifting</span>
          </div>
          <Sparkles className="text-emerald-600 animate-pulse" size={20} />
        </div>

        {/* Modern Hero Section - Bento Style */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24">
          <div className="lg:col-span-8 bg-emerald-900 rounded-[3.5rem] p-10 md:p-16 text-white relative overflow-hidden flex flex-col justify-center min-h-[500px] shadow-2xl shadow-emerald-900/20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative z-10"
            >
              <span className="inline-block bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 px-4 py-1.5 rounded-full text-emerald-300 text-[10px] font-black tracking-widest uppercase mb-6">
                Corporate Excellence
              </span>
              <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8">
                The New Standard of <br />
                <span className="font-serif italic font-normal text-emerald-200">Green Gifting.</span>
              </h1>
              <p className="text-emerald-100/70 text-lg max-w-lg mb-10 leading-relaxed font-light">
                Curated botanical gifts designed for meaningful connections. Sustainable, living, and exceptionally crafted.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:singhbrijveer92@gmail.com" className="bg-white text-emerald-950 px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-black/10">
                  Contact Concierge <Send size={18} />
                </a>
                <button onClick={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-emerald-800 border border-emerald-700 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all">
                  View Catalog
                </button>
              </div>
            </motion.div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <Gift className="w-full h-full scale-150 rotate-12 translate-x-1/4" />
            </div>
          </div>

          <div className="lg:col-span-4 bg-stone-200 rounded-[3.5rem] p-10 flex flex-col justify-between items-start relative overflow-hidden group">
            <h2 className="text-3xl font-light leading-tight tracking-tight">Personalized <br /><span className="font-bold">Branding.</span></h2>
            <p className="text-neutral-500 text-sm mb-6">Custom laser-etched logos on premium ceramics.</p>
            <Box size={80} className="text-stone-400/50 group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-0 bg-emerald-800 translate-y-full group-hover:translate-y-0 transition-transform duration-700 p-10 flex flex-col justify-center text-white">
              <h3 className="text-xl font-bold mb-2">Request Mockup</h3>
              <p className="text-sm opacity-80">See your logo on our pots in 24 hours.</p>
            </div>
          </div>
        </section>

        {/* Categories & Sorting Bar */}
        <div id="catalog-section" className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 px-4">
          <div>
            <h2 className="text-4xl font-light tracking-tight text-neutral-900 italic font-serif">Luxury Selection</h2>
            <div className="h-1 w-20 bg-emerald-600 mt-4 rounded-full"></div>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-neutral-100">
            <span className="text-[10px] font-black text-neutral-400 uppercase pl-4">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-50 border-none rounded-xl px-4 py-2 text-sm font-bold focus:ring-0 cursor-pointer outline-none"
            >
              <option value="Featured">Featured Collection</option>
              <option value="Premium First">Elite Pricing</option>
              <option value="Budget Friendly">Essentials</option>
            </select>
          </div>
        </div>

        {/* Product Grid - Modern Cards */}
        {sortedProducts.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center text-neutral-400 bg-white rounded-[3.5rem] p-6 text-center shadow-sm border border-neutral-100">
            <Gift size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-bold uppercase tracking-widest">No items added</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <AnimatePresence mode="popLayout">
              {sortedProducts.map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative aspect-[4/5] bg-neutral-100 rounded-[2.5rem] overflow-hidden transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-emerald-900/10 group-hover:-translate-y-2">
                    <img
                      src={item.img}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      alt={item.name}
                    />

                    {/* Floating Add to Cart for Modern Feel */}
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-white text-neutral-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-colors"
                      >
                        Quick Add <ShoppingCart size={16} />
                      </button>
                    </div>

                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black tracking-tighter uppercase shadow-sm">
                      {item.type}
                    </div>
                  </div>

                  <div className="mt-6 px-4">
                    <h3 className="text-lg font-bold text-neutral-800 leading-tight mb-2 transition-colors group-hover:text-emerald-700">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-black text-neutral-900 tracking-tighter">₹{item.price}</span>
                      <span className="text-sm text-neutral-300 line-through font-medium">₹{item.oldPrice}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Bottom Banner Inquiry */}
        <section className="mt-32 bg-stone-100 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <Users className="mx-auto text-emerald-700 mb-6" size={40} />
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 italic font-serif">Thinking in <span className="font-bold not-italic">Bulk?</span></h2>
            <p className="text-neutral-500 mb-10 leading-relaxed">Join 500+ companies including Google and Zomato who gift green. Get a custom proposal for your next event.</p>
            <a href="mailto:singhbrijveer92@gmail.com" className="inline-block bg-neutral-900 text-white px-10 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-emerald-800 transition-all shadow-2xl">
              Get Enterprise Quote
            </a>
          </div>
        </section>

      </main>

      {/* Modern Back to Top */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 w-14 h-14 bg-white text-emerald-900 border border-neutral-100 rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-emerald-900 hover:text-white transition-all group"
          >
            <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gifting;