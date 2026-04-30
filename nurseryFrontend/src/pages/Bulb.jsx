import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowUp, ShoppingCart, X, Plus, Minus, Trash2, 
  CheckCircle2, Sparkles, Leaf, ShieldCheck, Truck, Zap, ChevronRight 
} from 'lucide-react';

const Bulb = ({ inventory = [], addToCart, cartItems, setCartItems }) => {
  const [showTopButton, setShowTopButton] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Scroll Progress Bar for the top of the page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const products = React.useMemo(() => {
    return inventory.filter(item => 
      item.category?.trim().toLowerCase() === "bulbs" || 
      item.category?.trim().toLowerCase() === "bulb"
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
    <div className="relative w-full min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-green-100">
      
      {/* Page Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-green-600 origin-left z-[110]" style={{ scaleX }} />

      {/* Success Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-4 left-1/2 z-[120] w-[90%] max-w-sm bg-white border border-slate-100 p-4 rounded-3xl shadow-2xl flex items-center gap-4 overflow-hidden"
          >
            <div className="bg-green-600 p-2 rounded-2xl text-white shadow-lg shadow-green-200">
              <CheckCircle2 size={18} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Added to Cart</p>
              <p className="text-sm font-black text-slate-800 truncate">{notification}</p>
            </div>
            <motion.div 
              initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: 3 }}
              className="absolute bottom-0 left-0 h-1 bg-green-600/20"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 w-full bg-white/70 backdrop-blur-xl z-40 border-b border-slate-50 px-8 py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-green-700 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
            <Sparkles size={20} />
          </div>
          <h2 className="text-xl font-black tracking-tighter uppercase italic text-slate-800">Premium <span className="text-green-700">Bulbs</span></h2>
        </Link>
        
        <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-slate-900 text-white rounded-2xl hover:scale-105 active:scale-95 transition-all">
          <ShoppingCart size={20} />
          {cartItems?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-black border-4 border-white">
              {cartItems.reduce((a, b) => a + (b.qty || 1), 0)}
            </span>
          )}
        </button>
      </header>

      <main className="px-8 max-w-7xl mx-auto py-12">
        {/* Hero Section */}
        <section className="mb-20 text-left">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
            <Link to="/" className="hover:text-green-700">Nursery</Link>
            <ChevronRight size={10} />
            <span className="text-slate-900">Bulb Collection</span>
          </nav>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-6"
          >
            The Art of <br/> <span className="text-green-700 underline decoration-8 underline-offset-8">Growth.</span>
          </motion.h1>
          <p className="text-slate-500 text-xl max-w-xl font-medium italic">
            Hand-curated rare flower bulbs imported from the finest nurseries across the globe.
          </p>
        </section>

        {/* Dynamic Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
          <BenefitItem icon={<Leaf />} title="100% Organic" />
          <BenefitItem icon={<Truck />} title="Fast Delivery" />
          <BenefitItem icon={<ShieldCheck />} title="Growth Cert" />
          <BenefitItem icon={<Zap />} title="Easy Planting" />
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center text-slate-400 bg-white rounded-[2.5rem] p-6 text-center shadow-sm border border-slate-50">
            <Leaf size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-bold uppercase tracking-widest">No items added</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-[60]" />
            <motion.aside 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b flex justify-between items-center bg-slate-50">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Shopping Bag</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-all"><X /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {cartItems?.length === 0 ? (
                  <div className="text-center py-20 text-slate-300 font-black uppercase tracking-[0.2em] text-xs">Your bag is empty</div>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="flex gap-6 items-center">
                      <img src={item.img || item.image} className="w-20 h-24 rounded-2xl object-cover bg-slate-100 shadow-lg shadow-slate-100" />
                      <div className="flex-1 text-left">
                        <h4 className="font-black text-sm uppercase mb-1">{item.name}</h4>
                        <p className="text-green-700 font-black">₹{item.price}</p>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border border-slate-100 rounded-xl p-1 bg-slate-50">
                            <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-white rounded-lg"><Minus size={12}/></button>
                            <span className="px-3 text-xs font-black">{item.qty || 1}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-white rounded-lg"><Plus size={12}/></button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems?.length > 0 && (
                <div className="p-8 border-t bg-slate-50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Price</span>
                    <span className="text-3xl font-black">₹{cartTotal}</span>
                  </div>
                  <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-green-700 transition-all shadow-xl shadow-slate-200">
                    Secure Checkout
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Floating Scroll Button */}
      <AnimatePresence>
        {showTopButton && (
          <motion.button 
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="fixed bottom-8 right-8 z-50 bg-green-700 text-white p-5 rounded-3xl shadow-2xl hover:bg-slate-900 transition-all"
          >
            <ArrowUp size={20} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const BenefitItem = ({ icon, title }) => (
  <div className="p-8 bg-white border border-slate-50 rounded-[2.5rem] hover:shadow-xl transition-all text-center group">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-green-700 mx-auto mb-4 group-hover:bg-green-700 group-hover:text-white transition-colors">
      {icon}
    </div>
    <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-800">{title}</h4>
  </div>
);

const ProductCard = ({ product, onAdd, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}
    className="group bg-white p-3 rounded-[3rem] border border-slate-50 hover:shadow-2xl transition-all duration-500"
  >
    <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6">
      <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
        {product.category}
      </div>
    </div>
    <div className="px-4 pb-4 text-left">
      <h5 className="font-black text-xl uppercase tracking-tighter mb-1 truncate">{product.name}</h5>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-green-700 font-black text-2xl">₹{product.price}</span>
        <span className="text-slate-300 line-through text-xs font-bold italic">₹{product.originalPrice}</span>
      </div>
      <button 
        onClick={onAdd}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-green-700 transition-all active:scale-95 shadow-lg"
      >
        Add to Bag +
      </button>
    </div>
  </motion.div>
);

export default Bulb;