import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUp, ShoppingCart, Leaf
} from 'lucide-react';

const Gifting = ({ addToCart }) => {
  const [inventory, setInventory] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");

 const API = import.meta.env.VITE_API_URL ;
  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API}/api/products`);
      const data = await res.json();
      setInventory(data);
    };
    fetchData();
  }, []);

  // 🔥 FILTER + DYNAMIC PRICE
  const giftProducts = useMemo(() => {
    return inventory
      .filter(item => item.category?.trim().toLowerCase() === "gifts")
      .map(p => {
        const price = Number(p.price);
        const markup = Math.floor(price * (0.25 + Math.random() * 0.25));

        return {
          id: p._id,
          name: p.name,
          price,
          oldPrice: price + markup,
          img: p.image,
          type: p.category
        };
      });
  }, [inventory]);

  // 🔥 SORT
  const sortedProducts = useMemo(() => {
    let result = [...giftProducts];
    if (sortBy === "Premium First") return result.sort((a, b) => b.price - a.price);
    if (sortBy === "Budget Friendly") return result.sort((a, b) => a.price - b.price);
    return result;
  }, [sortBy, giftProducts]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setNotification(`${item.name} added`);
    setTimeout(() => setNotification(null), 2000);
  };

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 min-h-screen pt-28 px-6">

      {/* 🔔 Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 bg-emerald-700 text-white px-6 py-3 rounded-xl z-50 shadow-lg"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-14">
        <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-clip-text text-transparent">
          Eco Luxury Gifting
        </h1>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-emerald-200 bg-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm"
        >
          <option>Featured</option>
          <option>Premium First</option>
          <option>Budget Friendly</option>
        </select>
      </div>

      {/* 🔥 GRID */}
      {sortedProducts.length === 0 ? (
        <div className="text-center mt-20 bg-white/80 p-10 rounded-3xl shadow">
          <Leaf size={50} className="mx-auto mb-4 text-emerald-400" />
          <p className="text-lg font-bold text-emerald-700">No Gifts Available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {sortedProducts.map((item) => {
            const discount = Math.floor(((item.oldPrice - item.price) / item.oldPrice) * 100);

            return (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-emerald-100 shadow-md hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
              >

                {/* 🌿 Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow">
                  Eco Gift
                </div>

                {/* IMAGE */}
                <div className="h-56 overflow-hidden rounded-2xl relative">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* Glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-200/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                </div>

                {/* NAME */}
                <h3 className="font-bold mt-4 text-lg text-emerald-900">
                  {item.name}
                </h3>

                {/* PRICE */}
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <span className="text-xl font-black text-emerald-800">₹{item.price}</span>
                    <span className="line-through text-gray-400 ml-2">₹{item.oldPrice}</span>
                  </div>

                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 text-xs rounded-lg font-bold">
                    {discount}% OFF
                  </span>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full mt-5 bg-gradient-to-r from-emerald-600 to-green-500 text-white py-3 rounded-2xl font-bold hover:scale-105 transition-all shadow-md"
                >
                  Add To Cart
                </button>

              </div>
            );
          })}

        </div>
      )}

      {/* 🔝 Scroll Top */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-emerald-700 text-white p-4 rounded-full shadow-lg"
        >
          <ChevronUp />
        </button>
      )}

    </div>
  );
};

export default Gifting;