import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Import path check kar lein: Components ka 'C' capital hai ya small
import MobileStack from '../Components/Cart/MobileStack';
import videoBgImg from '../assets/Tamb.PNG';

const Half = ({ addToCart }) => { // addToCart prop add kiya taaki swipe par kaam kare
  const handleVideoClick = () => {
    window.open("https://www.youtube.com/watch?si=uemXxNJYtVzZBjKT&v=1u1WFdwdo6o&feature=youtu.be", "_blank");
  };

  const trendingItems = [
    { title: "Bonsai Plants", off: "Upto 25% Off", img: "nurserylive-home-page-trending-bonsai-plants-new_515x515.png" },
    { title: "Ceramic Planters", off: "Starts ₹299", img: "nurserylive-home-page-trending-ceramic-planters-new1_515x515.png" },
    { title: "Kokedama", off: "Starts ₹249", img: "nurserylive-home-page-trending-kokedama-plants-new_515x515.png" },
    { title: "Monthly Gardening", off: "Upto 65% Off", img: "nurserylive-home-page-trending-monthwise-gardening-new_515x515.png" }
  ];

  // Mobile Stack ke liye sample data agar Home se nahi aa raha
  const swipeProducts = [
    { id: 301, name: "Bonsai Tree", price: "1299", image: "//nurserylive.com/cdn/shop/files/nurserylive-home-page-trending-bonsai-plants-new_515x515.png" },
    { id: 302, name: "Ceramic Pot", price: "450", image: "//nurserylive.com/cdn/shop/files/nurserylive-home-page-trending-ceramic-planters-new1_515x515.png" },
    { id: 303, name: "Kokedama", price: "399", image: "//nurserylive.com/cdn/shop/files/nurserylive-home-page-trending-kokedama-plants-new_515x515.png" }
  ];

  return (
    <>
      <section className="promo-mosaic--container py-12 px-4 max-w-7xl mx-auto font-sans">

        {/* --- ADDED: MOBILE STACK SECTION (Only visible on Mobile) --- */}
        <div className="md:hidden mb-12">
          <h2 className="text-2xl font-black mb-6 text-slate-800 tracking-tight flex items-center gap-3">
            <span className="w-2 h-6 bg-green-500 rounded-full"></span>
            Swipe to Explore
          </h2>
          <MobileStack
            products={swipeProducts}
            onAddToCart={addToCart}
          />
        </div>

        {/* --- 1. POPULAR SECTION --- */}
        <div className="mb-16">
          <h2 className="text-3xl font-black mb-8 text-slate-800 tracking-tight flex items-center gap-3">
            <span className="w-2 h-8 bg-green-500 rounded-full"></span>
            Popular
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gift Card */}
            <article className="relative overflow-hidden rounded-[2rem] min-h-[350px] group shadow-xl">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: 'url("//nurserylive.com/cdn/shop/files/nurserylive-home-page-gift_223a0267-5e95-413f-9c5a-52dafe5b34ef_1109x717.jpg?v=1633892191")' }} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
              <div className="absolute inset-0 p-8 flex flex-col justify-start items-start">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg text-left">A Living Gift - Upto 30% Off</h2>
                <p className="text-white/90 text-sm mt-2 font-medium text-left">Express true emotions with a gift that grows forever.</p>
                <Link to="/offers" className="mt-6 bg-white text-black px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-green-500 hover:text-white transition-colors">
                  Shop Now
                </Link>
              </div>
            </article>

            {/* Miniature Garden */}
            <article className="relative overflow-hidden rounded-[2rem] min-h-[350px] group shadow-xl">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: 'url("//nurserylive.com/cdn/shop/files/nurserylive-home-page-miniature-gardens_ccf96d85-dcc2-4da8-b932-8b43a6eccbae_554x470.jpg?v=1633892191")' }} />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all" />
              <div className="absolute inset-0 p-8 flex flex-col justify-start items-start">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg text-left">Miniature Garden - 30% Off</h2>
                <p className="text-white/90 text-sm mt-2 font-medium text-left">Enjoy a living garden even in tiny spaces.</p>
                <Link to="/offers" className="mt-6 bg-white text-black px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-green-500 hover:text-white transition-colors">
                  Shop Now
                </Link>
              </div>
            </article>

            {/* Organic Seeds */}
            <article className="relative overflow-hidden rounded-[2rem] min-h-[350px] group shadow-xl">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: 'url("//nurserylive.com/cdn/shop/files/nurserylive-home-page-seeds-organic_772ae885-6e34-45c1-81f7-584a74ad4315_554x470.jpg?v=1633892191")' }} />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all" />
              <div className="absolute inset-0 p-8 flex flex-col justify-start items-start">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg text-left">Organic Seeds - 50% Off</h2>
                <p className="text-white/90 text-sm mt-2 font-medium text-left">Best quality seeds for organic lovers.</p>
                <Link to="/offers" className="mt-6 bg-white text-black px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-green-500 hover:text-white transition-colors">
                  Shop Now
                </Link>
              </div>
            </article>
          </div>
        </div>

        {/* --- 2. TRENDING SECTION --- */}
        <div className="mb-20 overflow-hidden">
          <h2 className="text-2xl font-bold mb-8 text-slate-800 tracking-tight">Trending Now</h2>

          <div className="hidden md:grid md:grid-cols-4 gap-8">
            {trendingItems.map((item, i) => (
              <Link key={i} to="/offers" className="group text-center">
                <div className="relative aspect-square overflow-hidden rounded-full border-4 border-slate-50 shadow-md group-hover:border-green-200 transition-all duration-300">
                  <img
                    src={`//nurserylive.com/cdn/shop/files/${item.img}`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-4 font-bold text-slate-800 group-hover:text-green-600 transition-colors">{item.title}</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{item.off}</p>
              </Link>
            ))}
          </div>

          <div className="md:hidden flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory">
            {trendingItems.map((item, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.95 }}
                className="min-w-[70%] snap-center bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-xl"
              >
                <Link to="/offers" className="block text-center">
                  <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-slate-50 mb-4">
                    <img
                      src={`//nurserylive.com/cdn/shop/files/${item.img}`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-black text-slate-800 uppercase italic tracking-tighter">{item.title}</h3>
                  <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black uppercase">{item.off}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- 3. GARDEN DECOR & CARE --- */}
        <div className="mb-16">
          <h2 className="text-3xl font-black mb-8 text-slate-800 tracking-tight">Garden Decor & Care</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-[250px] md:h-[300px] rounded-[2rem] overflow-hidden group shadow-lg">
              <img src="//nurserylive.com/cdn/shop/files/nurserylive-home-page-planters_7b92b1a7-6c8b-4dd0-9b93-1026eff0a09c_1210x600.jpg?v=1633894835"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Planters" />
              <div className="relative p-6 md:p-10 h-full flex flex-col justify-center items-start bg-gradient-to-r from-white/95 via-white/60 to-transparent md:max-w-[80%] w-full">
                <h3 className="text-xl font-bold text-slate-800">Planters - Starting ₹129</h3>
                <p className="text-slate-600 text-sm mt-1">Add color to your garden.</p>
                <Link to="/offers" className="mt-4 bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-green-600 transition-colors">Shop Now</Link>
              </div>
            </div>
            <div className="relative h-[250px] md:h-[300px] rounded-[2rem] overflow-hidden group shadow-lg">
              <img src="//nurserylive.com/cdn/shop/files/nurserylive-home-page-soil-and-fertilizers_ee17c551-750c-46ff-a546-45f9c6835abc_1210x600.jpg?v=1633894835"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Soil" />
              <div className="relative p-6 md:p-10 h-full flex flex-col justify-center items-start bg-gradient-to-r from-[#f7e6d5]/95 via-[#f7e6d5]/60 to-transparent md:max-w-[80%] w-full">
                <h3 className="text-xl font-bold text-[#47250f]">Soil & Fertilizers</h3>
                <Link to="/offers" className="mt-4 bg-[#47250f] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-green-800 transition-colors">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. VIDEO SECTION --- */}
        <div className="mt-12 mb-20 px-2 md:px-0">
          <div
            onClick={handleVideoClick}
            className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] shadow-2xl aspect-video md:h-[450px] w-full"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${videoBgImg})` }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500 shadow-2xl">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white fill-current ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h3 className="text-white text-lg md:text-3xl font-black mt-4 md:mt-6 drop-shadow-2xl uppercase tracking-tighter italic">Greenery in Every Home</h3>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default Half;