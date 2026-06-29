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

// import React, {
//   useState,
//   useMemo
// } from 'react';

// import {
//   ShoppingBag,
//   ArrowRight,
//   Plus,
//   Trash2,
//   Minus,
//   Send,
//   ShieldCheck,
//   Sparkles,
//   ShoppingCart,
//   ChevronRight,
//   BadgeCheck
// } from 'lucide-react';

// import {
//   Link
// } from 'react-router-dom';

// import {
//   motion,
//   AnimatePresence
// } from 'framer-motion';

// import CheckoutModal from '../Components/Cart/CheckoutModal';

// const Cart = ({
//   cartItems,
//   setCartItems,
//   addToCart,
//   inventory = []
// }) => {

//   const [isModalOpen, setIsModalOpen] =
//     useState(false);

//   const clearCart = () =>
//     setCartItems([]);

//   // DYNAMIC PRODUCTS
//   const serverRecommended = useMemo(() => {

//     if (
//       !inventory ||
//       inventory.length === 0
//     ) return [];

//     return inventory.map(item => ({

//       ...item,

//       id:
//         item._id || item.id,

//       name:
//         item.name || "Green Plant",

//       price:
//         Number(item.price) || 0,

//       img:
//         item.image ||
//         item.img ||
//         'https://images.pexels.com/photos/3096024/pexels-photo-3096024.jpeg',

//       category:
//         item.category || "Plants"

//     }));

//   }, [inventory]);

//   // UPDATE QTY
//   const updateQty = (
//     id,
//     delta
//   ) => {

//     setCartItems(prev =>
//       prev.map(item =>

//         (
//           item.cartId === id ||
//           item.id === id
//         )

//           ? {
//               ...item,
//               qty: Math.max(
//                 1,
//                 (
//                   item.qty || 1
//                 ) + delta
//               )
//             }

//           : item
//       )
//     );
//   };

//   // REMOVE
//   const removeItem = (id) => {

//     setCartItems(prev =>

//       prev.filter(item =>

//         (
//           item.cartId !== id &&
//           item.id !== id
//         )

//       )

//     );
//   };

//   // TOTAL
//   const totalAmount =
//     cartItems.reduce(

//       (acc, item) => {

//         const p = Number(
//           item.price ||
//           item.current ||
//           0
//         );

//         return (
//           acc +
//           (
//             p *
//             (
//               item.qty || 1
//             )
//           )
//         );

//       },

//       0
//     );

//   // ADD RECOMMENDED
//   const handleAddFromRecommended =
//     (prod) => {

//       const formattedProduct = {

//         ...prod,

//         cartId: prod.id,

//         image: prod.img,

//         selectedSize: "Standard",

//         qty: 1
//       };

//       addToCart(
//         formattedProduct
//       );
//     };

//   return (

//     <main className="min-h-screen bg-[#f5f7f2] pt-28 md:pt-36 pb-24 px-4 md:px-10 overflow-hidden">

//       {/* MODAL */}
//       <CheckoutModal
//         isOpen={isModalOpen}
//         onClose={() =>
//           setIsModalOpen(false)
//         }
//         cartItems={cartItems}
//         totalAmount={totalAmount}
//         clearCart={clearCart}
//       />

//       {/* HERO */}
//       <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-r from-black via-green-800 to-green-600 p-7 md:p-14 mb-10">

//         <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

//         <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

//           {/* LEFT */}
//           <div>

//             <div className="flex items-center gap-2 mb-4">

//               <Sparkles
//                 size={18}
//                 className="text-yellow-300"
//               />

//               <span className="uppercase tracking-[4px] text-[10px] md:text-xs text-green-100 font-black">
//                 Premium Checkout
//               </span>

//             </div>

//             <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">

//               Your
//               <span className="text-yellow-300">
//                 {" "}Cart
//               </span>

//             </h1>

//             <p className="text-green-100 mt-5 max-w-xl text-sm md:text-base">
//               Manage your selected plants,
//               seeds and gardening essentials.

//             </p>

//           </div>

//           {/* SECURE */}
//           <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex items-center gap-4">

//             <div className="bg-white text-green-700 p-4 rounded-2xl">

//               <ShieldCheck size={28} />

//             </div>

//             <div>

//               <p className="text-[10px] uppercase tracking-[3px] text-green-100 font-black">
//                 Secure Payment
//               </p>

//               <h3 className="text-white text-lg md:text-xl font-black mt-1">
//                 100% Protected
//               </h3>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* EMPTY */}
//       {cartItems.length === 0 ? (

//         <div className="bg-white rounded-[2.5rem] p-10 md:p-20 text-center border border-gray-100 shadow-sm">

//           <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">

//             <ShoppingBag
//               size={40}
//               className="text-green-600"
//             />

//           </div>

//           <h2 className="text-3xl md:text-5xl font-black text-gray-900">
//             Your Cart Is Empty
//           </h2>

//           <p className="text-gray-500 mt-5 max-w-lg mx-auto text-sm md:text-base">
//             Explore premium plants, seeds
//             and gardening accessories.

//           </p>

//           <Link
//             to="/"
//             className="mt-10 inline-flex items-center gap-3 bg-black hover:bg-green-600 text-white px-10 py-5 rounded-full font-black uppercase text-[10px] tracking-[4px] transition-all"
//           >

//             Explore Store

//             <ArrowRight size={18} />

//           </Link>

//         </div>

//       ) : (

//         <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

//           {/* LEFT */}
//           <div className="xl:col-span-8">

//             {/* TITLE */}
//             <div className="flex items-center justify-between mb-6">

//               <div>

//                 <p className="text-[10px] uppercase tracking-[4px] text-green-600 font-black">
//                   Selected Products
//                 </p>

//                 <h2 className="text-2xl md:text-3xl font-black mt-2">
//                   Shopping Items
//                 </h2>

//               </div>

//               <div className="bg-black text-white px-4 py-3 rounded-2xl text-xs md:text-sm font-black">
//                 {cartItems.length} Items
//               </div>

//             </div>

//             {/* ITEMS */}
//             <div className="space-y-5">

//               {cartItems.map((item) => {

//                 const p = Number(
//                   item.price ||
//                   item.current ||
//                   0
//                 );

//                 const itemId =
//                   item.cartId ||
//                   item.id;

//                 return (

//                   <motion.div
//                     key={itemId}

//                     initial={{
//                       opacity: 0,
//                       y: 40
//                     }}

//                     animate={{
//                       opacity: 1,
//                       y: 0
//                     }}

//                     className="group bg-white rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-6 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-500"
//                   >

//                     {/* MOBILE + DESKTOP RESPONSIVE */}
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

//                       {/* LEFT */}
//                       <div className="flex gap-4">

//                         {/* IMAGE */}
//                         <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-[1.5rem] overflow-hidden bg-gray-100 shadow-inner shrink-0">

//                           <img
//                             src={
//                               item.image ||
//                               item.img
//                             }
//                             alt={item.name}
//                             className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//                           />

//                         </div>

//                         {/* INFO */}
//                         <div className="min-w-0">

//                           <span className="text-[9px] md:text-[10px] uppercase tracking-[3px] text-green-600 font-black">
//                             {
//                               item.category ||
//                               "Plant"
//                             }
//                           </span>

//                           <h3 className="text-lg md:text-2xl font-black mt-2 line-clamp-2">
//                             {item.name}
//                           </h3>

//                           <div className="flex flex-wrap items-center gap-2 mt-3">

//                             <span className="bg-gray-100 px-3 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">
//                               Size:
//                               {" "}
//                               {
//                                 item.selectedSize ||
//                                 "STD"
//                               }
//                             </span>

//                             <span className="text-green-600 font-black text-sm md:text-base">
//                               ₹{p} / unit
//                             </span>

//                           </div>

//                         </div>

//                       </div>

//                       {/* RIGHT */}
//                       <div className="flex items-center justify-between md:justify-end gap-3 md:gap-5">

//                         {/* QTY */}
//                         <div className="flex items-center bg-gray-50 rounded-2xl p-2 border border-gray-100">

//                           <button
//                             onClick={() =>
//                               updateQty(
//                                 itemId,
//                                 -1
//                               )
//                             }
//                             className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl text-gray-400 transition"
//                           >

//                             <Minus size={16} />

//                           </button>

//                           <span className="w-10 text-center font-black text-lg">
//                             {
//                               item.qty || 1
//                             }
//                           </span>

//                           <button
//                             onClick={() =>
//                               updateQty(
//                                 itemId,
//                                 1
//                               )
//                             }
//                             className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl text-gray-400 transition"
//                           >

//                             <Plus size={16} />

//                           </button>

//                         </div>

//                         {/* PRICE */}
//                         <h3 className="text-xl md:text-3xl font-black text-green-700 min-w-[90px] text-right">
//                           ₹{
//                             p *
//                             (
//                               item.qty || 1
//                             )
//                           }
//                         </h3>

//                         {/* REMOVE */}
//                         <button
//                           onClick={() =>
//                             removeItem(
//                               itemId
//                             )
//                           }
//                           className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
//                         >

//                           <Trash2 size={18} />

//                         </button>

//                       </div>

//                     </div>

//                   </motion.div>

//                 );
//               })}

//             </div>

//           </div>

//           {/* RIGHT SUMMARY */}
//           <div className="xl:col-span-4">

//             {/* MOBILE FIXED CHECKOUT */}
//             <div className="xl:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">

//               <div className="flex items-center justify-between gap-4">

//                 <div>

//                   <p className="text-[10px] uppercase tracking-[3px] text-gray-400 font-black">
//                     Total
//                   </p>

//                   <h2 className="text-2xl font-black text-green-700">
//                     ₹{totalAmount}
//                   </h2>

//                 </div>

//                 {/* FIXED BUTTON */}
//                 <button
//                   onClick={() =>
//                     setIsModalOpen(true)
//                   }

//                   className="flex-1 bg-green-600 hover:bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[3px] text-xs transition-all flex items-center justify-center gap-3"
//                 >

//                   <BadgeCheck size={18} />

//                   Confirm Order

//                   <ChevronRight size={18} />

//                 </button>

//               </div>

//             </div>

//             {/* DESKTOP SUMMARY */}
//             <div className="hidden xl:block sticky top-32">

//               <div className="relative overflow-hidden bg-black rounded-[3rem] p-8 md:p-10 text-white shadow-2xl">

//                 <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />

//                 <div className="relative z-10">

//                   <p className="text-[10px] uppercase tracking-[4px] text-green-400 font-black">
//                     Payment Summary
//                   </p>

//                   <h2 className="text-4xl font-black mt-4">
//                     Order Total
//                   </h2>

//                   {/* PRICE BOX */}
//                   <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 mt-8">

//                     <div className="flex justify-between items-center mb-5">

//                       <span className="text-gray-400 uppercase text-xs font-black tracking-[3px]">
//                         Subtotal
//                       </span>

//                       <span className="text-2xl font-black">
//                         ₹{totalAmount}
//                       </span>

//                     </div>

//                     <div className="flex justify-between items-center mb-5">

//                       <span className="text-gray-400 uppercase text-xs font-black tracking-[3px]">
//                         Shipping
//                       </span>

//                       <span className="text-green-400 font-black">
//                         FREE
//                       </span>

//                     </div>

//                     <div className="h-px bg-white/10 my-6" />

//                     <div className="flex justify-between items-end">

//                       <div>

//                         <p className="text-[10px] uppercase tracking-[3px] text-gray-400">
//                           Total Payable
//                         </p>

//                         <h1 className="text-5xl font-black text-green-400 mt-2">
//                           ₹{totalAmount}
//                         </h1>

//                       </div>

//                     </div>

//                   </div>

//                   {/* BUTTON */}
//                   <button
//                     onClick={() =>
//                       setIsModalOpen(true)
//                     }

//                     disabled={
//                       cartItems.length === 0
//                     }

//                     className="w-full mt-8 bg-green-600 hover:bg-white hover:text-green-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-[4px] text-xs transition-all flex items-center justify-center gap-4 group"
//                   >

//                     Confirm Order

//                     <Send
//                       size={20}
//                       className="group-hover:translate-x-1 transition"
//                     />

//                   </button>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       )}

//       {/* MOBILE SPACE */}
//       <div className="h-28 xl:hidden" />

//     </main>

//   );
// };

// export default Cart;