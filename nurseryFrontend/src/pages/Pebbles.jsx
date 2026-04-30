import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Home wapas jaane ke liye zaroori hai
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowUp, ChevronRight, ShoppingCart, X, Plus, Minus, 
  Trash2, CheckCircle2, Sparkles, Filter 
} from 'lucide-react';

const Pebbles = ({ inventory = [], addToCart, cartItems, setCartItems }) => {
  const [showTopButton, setShowTopButton] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const products = React.useMemo(() => {
    return inventory.filter(item => 
      item.category?.trim().toLowerCase() === "pebbles" || 
      item.category?.trim().toLowerCase() === "pebble"
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
    <div className="relative mt-28 w-full min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans">
      
      {/* Top Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-green-600 origin-left z-[110]" style={{ scaleX }} />

      {/* Modern Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-4 left-1/2 z-[120] w-[90%] max-w-sm bg-zinc-900 text-white p-4 rounded-3xl shadow-2xl flex items-center gap-4 overflow-hidden"
          >
            <div className="bg-green-500 p-2 rounded-xl"><CheckCircle2 size={18} /></div>
            <div className="flex-1 text-left">
              <p className="text-[10px] font-black uppercase text-zinc-400">Added to Bag</p>
              <p className="text-sm font-bold truncate">{notification}</p>
            </div>
            <motion.div 
              initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: 3 }}
              className="absolute bottom-0 left-0 h-1 bg-green-500"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      

      <main className="px-6 max-w-7xl mx-auto mt-12 pb-24 text-left">
        {/* Breadcrumbs - FIX: Now using Link to go back */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">
          <Link to="/" className="hover:text-green-700 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span className="text-zinc-900">Premium Pebbles</span>
        </nav>

        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-4"
          >
            Polished <br/> <span className="text-green-700">Perfection.</span>
          </motion.h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <p className="text-zinc-500 font-medium max-w-md italic">Transform your garden and terrariums with our hand-sorted collection of natural pebbles.</p>
            <div className="flex items-center gap-2 text-xs font-bold bg-white border px-4 py-2 rounded-full w-fit">
              <Filter size={14}/>
              <span>400+ Products Available</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center text-zinc-400 bg-white rounded-3xl p-6 text-center shadow-sm border border-zinc-100">
            <Sparkles size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-bold uppercase tracking-widest">No items added</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} onAdd={() => handleAddToCart(product)} index={i} />
            ))}
          </div>
        )}
      </main>

      {/* Side Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsCartOpen(false)} 
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" 
            />
            <motion.aside 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b flex justify-between items-center">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Your Bag</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-all"><X /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {cartItems?.length === 0 ? (
                  <div className="text-center py-20 text-zinc-300 uppercase font-black tracking-widest text-xs">Bag is empty</div>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="flex gap-6 items-center">
                      <img src={item.img || item.image} className="w-20 h-24 rounded-2xl object-cover bg-zinc-100" />
                      <div className="flex-1 text-left">
                        <h4 className="font-black text-sm uppercase mb-1">{item.name}</h4>
                        <p className="text-green-700 font-black">₹{item.price}</p>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border border-zinc-100 rounded-xl p-1 bg-zinc-50">
                            <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-white rounded-lg"><Minus size={12}/></button>
                            <span className="px-3 text-xs font-black">{item.qty || 1}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-white rounded-lg"><Plus size={12}/></button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-zinc-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems?.length > 0 && (
                <div className="p-8 border-t bg-zinc-50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Total</span>
                    <span className="text-3xl font-black">₹{cartTotal}</span>
                  </div>
                  <button className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-green-700 transition-all shadow-xl shadow-zinc-200">
                    Checkout Now
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showTopButton && (
          <motion.button 
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="fixed bottom-10 right-6 z-50 bg-green-700 text-white p-5 rounded-full shadow-2xl hover:bg-zinc-900 transition-all"
          >
            <ArrowUp size={20} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductCard = ({ product, onAdd, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group bg-white p-3 rounded-[2.5rem] border border-zinc-100 hover:shadow-2xl transition-all duration-500"
  >
    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6">
      <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">25% OFF</div>
    </div>
    <div className="px-4 pb-4 text-left">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h5 className="font-black text-lg uppercase tracking-tight leading-tight mb-1 truncate max-w-[150px]">{product.name}</h5>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Hand-Polished</p>
        </div>
        <div className="text-right">
          <p className="text-green-700 font-black text-xl">₹{product.price}</p>
          <p className="text-zinc-300 line-through text-[10px] font-bold italic">₹{product.originalPrice}</p>
        </div>
      </div>
      <button 
        onClick={onAdd}
        className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-green-700 transition-all active:scale-95"
      >
        Add to Bag +
      </button>
    </div>
  </motion.div>
);

export default Pebbles;