import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowUp, ChevronRight, ShoppingCart, X, Plus, Minus, 
  Trash2, CheckCircle2, SlidersHorizontal, Sparkles, 
  Wrench, ShieldCheck, Heart
} from 'lucide-react';

const Asso = ({ inventory = [], addToCart, cartItems, setCartItems }) => {
  const [showTopButton, setShowTopButton] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // Parallax Effect for Background
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);

  const products = React.useMemo(() => {
    return inventory.filter(item => 
      item.category?.trim().toLowerCase() === "accessories" || 
      item.category?.trim().toLowerCase() === "accessory"
    ).map(p => ({
      id: p._id || p.id,
      name: p.name,
      price: p.price,
      originalPrice: p.price + 100,
      img: p.image || p.img,
      category: p.category
    }));
  }, [inventory]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(product.name);
    setTimeout(() => setNotification(null), 3000);
  };

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) } : item
    ));
  };

  const removeItem = (id) => setCartItems(prev => prev.filter(item => item.id !== id));
  const cartTotal = cartItems?.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0) || 0;

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative mt-16 w-full min-h-screen bg-[#FDFDFD] text-slate-900 font-sans overflow-hidden">
      
      {/* --- ATTRACTIVE BACKGROUND ELEMENTS --- */}
      <motion.div style={{ y: y1 }} className="absolute top-20 left-10 opacity-[0.03] -z-10 text-green-800 rotate-12">
        <Wrench size={300} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-20 right-10 opacity-[0.03] -z-10 text-green-800 -rotate-12">
        <ShieldCheck size={400} />
      </motion.div>

      {/* Modern Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[120] bg-zinc-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 min-w-[320px] border border-white/10"
          >
            <div className="bg-green-500 p-2 rounded-full"><Sparkles size={16} /></div>
            <p className="text-sm font-black uppercase tracking-widest italic">Added: {notification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="px-6 max-w-7xl mx-auto py-12 pt-24 relative">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-10">
          <Link to="/" className="hover:text-green-600 transition-all">Nursery</Link>
          <ChevronRight size={10} className="text-slate-200"/>
          <span className="text-slate-800">Accessories</span>
        </nav>

        {/* Dynamic Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-10 mb-20">
          <div className="text-left">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 font-black uppercase text-xs tracking-widest mb-4 block">Premium Collection 2024</motion.span>
            <motion.h1 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-8 italic"
            >
              Garden <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Armory.</span>
            </motion.h1>
            <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed italic border-l-2 border-green-100 pl-6">
              Precision-engineered tools for the modern botanist. Excellence in every cut.
            </p>
          </div>
          <div className="flex lg:justify-end gap-4">
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-xl shadow-slate-100/50 flex items-center gap-4">
               <div className="bg-zinc-900 p-3 rounded-2xl text-white"><SlidersHorizontal size={18}/></div>
               <div className="text-left">
                 <p className="text-[10px] font-black uppercase text-slate-300">Catalog</p>
                 <p className="text-sm font-black tracking-tight italic">400+ Units</p>
               </div>
            </div>
          </div>
        </div>

        {/* Animated Product Grid */}
        {products.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl p-6 text-center shadow-sm border border-slate-100">
            <Sparkles size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-bold uppercase tracking-widest">No items added</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product, i) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={() => handleAddToCart(product)} 
                index={i} 
              />
            ))}
          </div>
        )}
      </main>

      {/* Glassmorphism Side Cart */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-[60]" />
            <motion.aside 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white/90 backdrop-blur-2xl z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.05)] border-l border-white flex flex-col"
            >
              <div className="p-10 flex justify-between items-center">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">Your Bag</h3>
                <button onClick={() => setIsCartOpen(false)} className="w-12 h-12 flex items-center justify-center bg-zinc-100 rounded-full hover:rotate-90 transition-transform"><X size={20}/></button>
              </div>

              <div className="flex-1 overflow-y-auto px-10 space-y-8 pb-10">
                {cartItems?.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-20">
                    <ShoppingCart size={80} strokeWidth={1}/>
                    <p className="font-black uppercase tracking-widest text-[10px] mt-4">Empty</p>
                  </div>
                ) : (
                  cartItems.map(item => (
                    <motion.div layout key={item.id} className="flex gap-6 items-center">
                      <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden shadow-inner">
                        <img src={item.img || item.image} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-black text-[10px] uppercase tracking-widest mb-1">{item.name}</h4>
                        <div className="flex items-center gap-4">
                          <button onClick={() => updateQty(item.id, -1)} className="text-slate-300 hover:text-green-600 transition-colors"><Minus size={14}/></button>
                          <span className="text-sm font-black italic">{item.qty || 1}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="text-slate-300 hover:text-green-600 transition-colors"><Plus size={14}/></button>
                          <span className="ml-auto font-black text-green-700">₹{item.price * (item.qty || 1)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cartItems?.length > 0 && (
                <div className="p-10 bg-zinc-900 text-white rounded-t-[3rem]">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Total</span>
                    <span className="text-4xl font-black italic tracking-tighter">₹{cartTotal}</span>
                  </div>
                  <button className="w-full bg-green-500 text-zinc-900 py-6 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all">
                    Checkout Now
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <button onClick={() => setIsCartOpen(true)} className="bg-zinc-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform relative">
            <ShoppingCart size={24} />
            {cartItems?.length > 0 && <span className="absolute -top-1 -right-1 bg-green-500 text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black border-4 border-white text-zinc-900">{cartItems.length}</span>}
        </button>
        <AnimatePresence>
            {showTopButton && (
            <motion.button 
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="bg-white border border-slate-100 p-5 rounded-full shadow-2xl hover:bg-green-600 hover:text-white transition-all"
            >
                <ArrowUp size={24} strokeWidth={3} />
            </motion.button>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Sub-component: Advanced Product Card
const ProductCard = ({ product, onAdd, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}
    className="group relative bg-white rounded-[3rem] p-5 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700 border border-slate-50"
  >
    {/* Image Container with Overlay */}
    <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 bg-[#F9F9F9]">
      <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 mix-blend-multiply opacity-90 group-hover:opacity-100" />
      
      {/* Hidden Overlay Button */}
      <div className="absolute inset-0 bg-zinc-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm">
        <button onClick={onAdd} className="bg-white text-zinc-900 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-green-500 transition-colors">
            <Plus size={14} /> Buy Now
        </button>
      </div>

      <div className="absolute top-6 left-6 flex flex-col gap-2">
         <span className="bg-white/80 backdrop-blur px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
            {product.category}
         </span>
      </div>
      
      <button className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors group-hover:scale-110">
         <Heart size={20} />
      </button>
    </div>

    <div className="px-4 text-left pb-4">
      <h5 className="font-black text-2xl uppercase tracking-tighter mb-2 italic">{product.name}</h5>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <span className="text-green-600 font-black text-2xl italic">₹{product.price}</span>
            <span className="text-slate-300 line-through text-[10px] font-bold italic">₹{product.originalPrice}</span>
        </div>
        <div className="bg-green-50 px-3 py-1 rounded-lg">
             <p className="text-green-700 text-[10px] font-black italic">In Stock</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default Asso;