import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, ShoppingCart, Leaf, RotateCcw } from 'lucide-react'; // 1. Added Leaf and RotateCcw

const SwipeableCard = ({ item, onSwipe, index, total }) => {
  const x = useMotionValue(0);
  
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const successColor = useTransform(x, [0, 150], ["rgba(34, 197, 94, 0)", "rgba(34, 197, 94, 0.4)"]);
  const errorColor = useTransform(x, [0, -150], ["rgba(239, 68, 68, 0)", "rgba(239, 68, 68, 0.4)"]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 120) {
      onSwipe('right', item);
    } else if (info.offset.x < -120) {
      onSwipe('left', item);
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity, zIndex: total - index }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileGrab={{ scale: 1.05 }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1 - index * 0.05, y: index * 10, opacity: 1 }}
      exit={{ x: x.get() < 0 ? -500 : 500, opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
      className="absolute w-full max-w-[340px] aspect-[3/4.5] bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 p-5 cursor-grab active:cursor-grabbing"
    >
      <motion.div style={{ backgroundColor: successColor }} className="absolute inset-0 rounded-[3rem] pointer-events-none z-10" />
      <motion.div style={{ backgroundColor: errorColor }} className="absolute inset-0 rounded-[3rem] pointer-events-none z-10" />

      <div className="w-full h-3/5 rounded-[2.5rem] overflow-hidden bg-gray-50">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="mt-6 space-y-2 px-2">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-black uppercase italic tracking-tighter text-gray-800">{item.name}</h3>
          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">New</span>
        </div>
        <p className="text-gray-400 text-xs font-medium tracking-wide">Premium Nursery Collection</p>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-black text-gray-900">₹{item.price}</span>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 px-8 flex justify-between items-center">
        <div className="p-3 bg-red-50 text-red-500 rounded-full opacity-20"><X size={20} /></div>
        <button className="p-5 bg-zinc-900 text-white rounded-[1.5rem] shadow-xl shadow-zinc-200">
          <ShoppingCart size={24} />
        </button>
        <div className="p-3 bg-green-50 text-green-500 rounded-full opacity-20"><Heart size={20} /></div>
      </div>
    </motion.div>
  );
};

const MobileStack = ({ products, onAddToCart }) => {
  // 2. Use state from props directly to allow resetting
  const [stack, setStack] = useState(products || []);

  const handleSwipe = (direction, item) => {
    if (direction === 'right' && onAddToCart) {
      onAddToCart(item);
    }
    setStack((prev) => prev.filter((p) => p.id !== item.id));
  };

  const handleReset = () => {
    setStack(products); // Saare cards wapas lane ke liye
  };

  return (
    <div className="md:hidden w-full h-[70vh] flex flex-col items-center justify-center py-10 overflow-hidden bg-[#fcfdfc]">
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {stack.length > 0 ? (
            stack.slice(0, 3).map((item, index) => (
              <SwipeableCard 
                key={item.id} 
                item={item} 
                index={index} 
                total={stack.length}
                onSwipe={handleSwipe}
              />
            ))
          ) : (
            // 3. Fixed the blank screen by ensuring Leaf is imported and adding a Reset button
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-center p-10 flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Leaf className="text-green-600 animate-pulse" size={48} />
              </div>
              <h4 className="font-black italic text-2xl text-slate-800 uppercase tracking-tighter">Garden Refilled!</h4>
              <p className="text-gray-400 text-sm mt-2 max-w-[200px]">You've explored all current plants.</p>
              
              <button 
                onClick={handleReset}
                className="mt-8 bg-zinc-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-2 shadow-2xl active:scale-95 transition-all"
              >
                <RotateCcw size={16} />
                Refresh Stack
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileStack;