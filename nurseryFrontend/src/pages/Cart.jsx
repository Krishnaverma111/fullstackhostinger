import React, { useState, useMemo } from 'react';
import { ShoppingBag, ArrowRight, Flame, Plus, Trash2, Minus, X, Send, Leaf, Star, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import CheckoutModal from '../Components/Cart/CheckoutModal';

const Cart = ({ cartItems, setCartItems, addToCart, inventory = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clearCart = () => setCartItems([]);

  // --- 1. SERVER DATA LOGIC (Modified to show ALL) ---
  const serverRecommended = useMemo(() => {
    if (!inventory || inventory.length === 0) return [];

    return inventory.map(item => ({
      ...item,
      id: item._id || item.id,
      name: item.name || "Green Plant",
      price: Number(item.price) || 0,
      img: item.image || item.img || 'https://images.pexels.com/photos/3096024/pexels-photo-3096024.jpeg',
      category: item.category || "Plants"
    })); 
    // .slice(0, 8) ko hata diya hai taaki saare cards dikhen
  }, [inventory]);

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      (item.cartId === id || item.id === id) 
        ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) } 
        : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => (item.cartId !== id && item.id !== id)));
  };

  const totalAmount = cartItems.reduce((acc, item) => {
    const p = Number(item.price || item.current || 0);
    return acc + (p * (item.qty || 1));
  }, 0);

  const handleAddFromRecommended = (prod) => {
    const formattedProduct = {
        ...prod,
        cartId: prod.id,
        image: prod.img,
        selectedSize: "Standard",
        qty: 1
    };
    addToCart(formattedProduct);
  };

  return (
    <main className="min-h-screen bg-neutral-50 pt-32 pb-20 px-4 md:px-10 font-sans">
      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        cartItems={cartItems} 
        totalAmount={totalAmount} 
        clearCart={clearCart} 
      />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <span className="text-green-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Your Shopping Journey</span>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase italic">
                    Checkout <span className="text-green-600 not-italic">Cart</span>
                </h1>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <ShieldCheck className="text-green-500" size={20} />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">100% Secure Transaction</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-6">
            {/* Cart Items Mapping */}
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-200">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                    <ShoppingBag size={40} />
                </div>
                <h2 className="text-2xl font-black uppercase text-gray-400">Empty Selection</h2>
                <Link to="/" className="mt-8 inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-green-600 transition-all">
                    Explore Our Store <ArrowRight size={16}/>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const p = Number(item.price || item.current || 0);
                  const itemId = item.cartId || item.id;
                  return (
                    <div key={itemId} className="group bg-white p-5 md:p-7 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-transparent hover:border-green-200 hover:shadow-xl transition-all duration-500">
                      <div className="flex items-center gap-6 w-full">
                        <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-green-600 overflow-hidden shadow-inner">
                           {item.image || item.img ? <img src={item.image || item.img} alt="" className="w-full h-full object-cover"/> : <Leaf size={32} />}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-black text-gray-900 leading-none mb-2">{item.name}</h4>
                          <div className="flex items-center gap-3">
                             <span className="bg-gray-100 px-3 py-1 rounded-full text-[9px] font-black uppercase text-gray-400 italic">Size: {item.selectedSize || 'STD'}</span>
                             <span className="text-green-600 font-bold text-xs">₹{p} / unit</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0">
                        <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                           <button onClick={() => updateQty(itemId, -1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl text-gray-400"><Minus size={16}/></button>
                           <span className="w-10 text-center font-black text-gray-900">{item.qty || 1}</span>
                           <button onClick={() => updateQty(itemId, 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl text-gray-400"><Plus size={16}/></button>
                        </div>
                        <p className="text-xl font-black text-gray-900 min-w-[100px] text-right">₹{p * (item.qty || 1)}</p>
                        <button onClick={() => removeItem(itemId)} className="w-12 h-12 flex items-center justify-center rounded-2xl text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all"><Trash2 size={20}/></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* --- 2. DYNAMIC SERVER CARDS SECTION (ALL ITEMS) --- */}
            <div className="pt-20">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-xl font-black uppercase italic tracking-widest text-gray-400">All <span className="text-gray-900 not-italic">Products</span></h2>
                    <div className="h-px flex-1 bg-gray-200"></div>
                </div>
                {/* Grid is same, but now it will render all items from inventory */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {serverRecommended.length > 0 ? (
                      serverRecommended.map((prod) => (
                        <div key={prod.id} className="bg-white p-4 rounded-[2rem] border border-gray-100 hover:shadow-lg transition-all group overflow-hidden">
                            <div className="aspect-square bg-neutral-100 rounded-2xl mb-4 flex items-center justify-center text-gray-300 group-hover:scale-105 transition-all duration-500 overflow-hidden shadow-inner">
                                <img src={prod.img} alt={prod.name} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-[9px] font-black text-green-600 uppercase mb-1 tracking-tighter">{prod.category}</p>
                            <h5 className="font-bold text-gray-900 text-sm mb-1 truncate">{prod.name}</h5>
                            <div className="flex items-center justify-between mt-4">
                                <span className="font-black text-lg">₹{prod.price}</span>
                                <button 
                                  onClick={() => handleAddFromRecommended(prod)}
                                  className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition-all shadow-lg active:scale-90"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>
                      ))
                    ) : (
                      [...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white p-4 rounded-[2rem] border border-gray-100 animate-pulse">
                           <div className="aspect-square bg-gray-100 rounded-2xl mb-4"></div>
                           <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                           <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                        </div>
                      ))
                    )}
                </div>
            </div>
          </div>

          {/* Right Sidebar - Summary */}
          <div className="lg:col-span-4">
            <div className="bg-gray-900 rounded-[3rem] p-8 md:p-10 text-white sticky top-32 shadow-2xl">
                <h3 className="text-2xl font-black uppercase italic mb-8">Order <span className="text-green-500">Summary</span></h3>
                <div className="space-y-4 mb-10">
                    <div className="flex justify-between text-gray-400 text-sm font-bold uppercase">
                        <span>Subtotal</span>
                        <span className="text-white">₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm font-bold uppercase">
                        <span>Shipping</span>
                        <span className="text-green-500 uppercase tracking-widest text-[10px]">Free</span>
                    </div>
                    <div className="h-px bg-white/10 my-6"></div>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Total Payable</p>
                            <h4 className="text-5xl font-black italic text-green-400 leading-none">₹{totalAmount}</h4>
                        </div>
                    </div>
                </div>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  disabled={cartItems.length === 0}
                  className="w-full bg-green-600 hover:bg-white hover:text-green-600 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 group"
                >
                    Confirm Order <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;