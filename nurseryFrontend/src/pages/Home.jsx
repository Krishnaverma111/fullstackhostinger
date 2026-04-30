import React, { useState, useEffect } from 'react';
import Half from './Half';
import Review from './Review'

import MobileStack from '../Components/Cart/MobileStack';

import { Link } from 'react-router-dom';
import {
  Leaf,
  Sprout,
  Flower2,
  Waves,
  ChevronRight,
  ChevronLeft,
  ShoppingBag
} from "lucide-react";

const Home = ({ inventory, addToCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, img: "src/assets/banner4.jpeg", title: "Bring Nature Home", sub: "Premium Indoor Plants", icon: <Leaf size={48} className="text-green-400" /> },
    { id: 2, img: "src/assets/banner2.jpeg", title: "Grow Your Own", sub: "Organic Seeds & Bulbs", icon: <Sprout size={48} className="text-emerald-400" /> },
    { id: 3, img: "src/assets/banner1.jpeg", title: "Decorate Better", sub: "Exotic Planters & Pots", icon: <Flower2 size={48} className="text-pink-400" /> },
    { id: 4, img: "src/assets/banner3.jpeg", title: "Expert Care", sub: "Best Fertilizers & Soil", icon: <Waves size={48} className="text-blue-400" /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const categories = [
    { name: "Offers", img: "//nurserylive.com/cdn/shop/files/nurserylive-offers-menu_141x160.png?v=1652634796", link: "/offers" },
    { name: "Gardening", img: "//nurserylive.com/cdn/shop/files/nurserylive-gardening-menu_141x160.png?v=1652634796", link: "/gardening" },
    { name: "Plants", img: "//nurserylive.com/cdn/shop/files/nurserylive-plant-menu_141x160.png?v=1652634796", link: "/plants" },
    { name: "Seeds", img: "//nurserylive.com/cdn/shop/files/nurserylive-seeds-menu_141x160.png?v=1652634796", link: "/seeds" },
    { name: "Bulbs", img: "//nurserylive.com/cdn/shop/files/nurserylive-bulbs-menu_141x160.png?v=1652634796", link: "/bulbs" },
    { name: "Planters", img: "//nurserylive.com/cdn/shop/files/nurserylive-pots-menu_f7031d54-4be7-47cb-b6c7-b15010b952a6_141x160.png?v=1652968014", link: "/planters" },
    { name: "Fertilizers", img: "//nurserylive.com/cdn/shop/files/nurserylive-fertilizer-menu_141x160.png?v=1652967754", link: "/soil-fertilizer" },
    { name: "Corporate", img: "//nurserylive.com/cdn/shop/files/nurserylive-corporate-menu_141x160.png?v=1652634796", link: "/gifts" },
    { name: "Pebbles", img: "//nurserylive.com/cdn/shop/files/nurserylive-pebbles-menu_141x160.png?v=1652634796", link: "/pebbles" },
    { name: "Accessories", img: "//nurserylive.com/cdn/shop/files/nurserylive-accessories-menu_141x160.png?v=1652634796", link: "/accessories" },
  ];

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-slate-900 font-sans selection:bg-green-100 pt-28 lg:pt-32">

      {/* 1. HERO SLIDER */}
      <section className="relative h-[450px] md:h-[650px] mx-4 lg:mx-16 mt-10 overflow-hidden rounded-[3.5rem] shadow-2xl group border-4 border-white">
        <div className="flex h-full transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={slide.id} className="min-w-full h-full relative">
              <img src={slide.img} className="w-full h-full object-cover" alt={slide.title} />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                <div className={`mb-4 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transform transition-all duration-1000 ${currentSlide === index ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-12'}`}>
                  <div className="animate-bounce">{slide.icon}</div>
                </div>
                <h2 className={`text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-4 drop-shadow-lg transform transition-all duration-700 delay-300 ${currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>{slide.title}</h2>
                <p className={`text-sm md:text-xl font-bold uppercase tracking-[0.3em] text-green-400 mb-8 transform transition-all duration-700 delay-500 ${currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>{slide.sub}</p>
                <Link to="/offers" className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl">Explore Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. CATEGORIES */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-12 italic tracking-tighter uppercase">Explore <span className="text-green-600">Categories</span></h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-6">
          {categories.map((cat, index) => (
            <Link key={index} to={cat.link} className="group flex flex-col items-center text-center">
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center p-4 transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl group-hover:-translate-y-2">
                <img src={cat.img} alt={cat.name} className="w-20 h-20 object-contain" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-green-600 transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. PREMIUM DATABASE PRODUCTS */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto bg-slate-50/50 rounded-[4rem] border border-slate-100 my-10">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter">Premium <span className="text-green-600">Selection</span></h2>
          <Link to="/plants" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-green-600 transition-all border-b-2 border-slate-200 hover:border-green-600 pb-1">View All Collection</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ✅ FIXED: Handled loading state & Array check */}
          {inventory && inventory.length > 0 ? (
            inventory.slice(0, 4).map((item) => (
              <div key={item._id || item.id} className="bg-white p-6 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <figure className="relative aspect-square overflow-hidden rounded-[2.5rem] mb-6 bg-slate-50">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-green-600 border border-white/20">
                    {item.category || "Premium"}
                  </div>
                </figure>
                <h3 className="font-black text-slate-900 text-lg uppercase italic tracking-tighter mb-2">{item.name}</h3>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{item.price}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.countInStock || item.stock} In Stock</span>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-green-600 transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 shadow-lg">
                  <ShoppingBag size={16} /> Add To Cart
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic animate-pulse">Syncing with MongoDB...</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. VALUE PRODUCTS SECTION */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-12">Value <span className="text-red-600">Deals</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { id: 101, title: "Money Plant (Pack of 3)", oldPrice: "947", newPrice: "758", off: "20%", img: "//nurserylive.com/cdn/shop/files/predict-3dfb876f-1478-4d4e-96dc-34c04c771ced-1_512x512.webp" },
            { id: 102, title: "Flower Plants Pack", oldPrice: "748", newPrice: "598", off: "20%", img: "//nurserylive.com/cdn/shop/files/predict-657653ae-9a52-4359-b1a1-b10bc756f3ac-1_512x512.webp" },
            { id: 103, title: "Easy Grow Combo", oldPrice: "1507", newPrice: "1130", off: "25%", img: "//nurserylive.com/cdn/shop/files/temp_JTmS3q7_512x512.jpg" }
          ].map((prod) => (
            <div key={prod.id} className="bg-white p-5 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
              <figure className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-6">
                <img src={prod.img} className="w-full h-full object-cover" alt={prod.title} />
                <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">-{prod.off} Off</span>
              </figure>
              <div className="flex gap-3 items-center mb-2">
                <span className="text-slate-300 line-through text-xs font-bold italic">₹{prod.oldPrice}</span>
                <span className="text-red-600 font-black text-2xl tracking-tighter">₹{prod.newPrice}</span>
              </div>
              <h3 className="font-black text-slate-800 text-md uppercase italic tracking-tighter mb-6">{prod.title}</h3>
              <button onClick={() => addToCart(prod)} className="w-full bg-slate-100 text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-md">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <Half />
      <Review />

    </div>
  );
};

export default Home;