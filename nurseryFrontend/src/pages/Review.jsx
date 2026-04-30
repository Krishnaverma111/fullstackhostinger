import React from 'react';
import { motion } from 'framer-motion';
import MobileStack from '../Components/Cart/MobileStack';


const ReviewGrid = ({ addToCart }) => { // addToCart prop add kiya
  const reviews = [
    { id: 1, author: "Naveen", location: "New Delhi", product: "Nimboo Tree", rating: 4, date: "05/03/2026", title: "Little bit costly", body: "The plant is healthy but slightly on the expensive side compared to local nurseries.", verified: true },
    { id: 2, author: "Rohit", location: "Pune", product: "Rose (Red)", rating: 2, date: "01/03/2026", title: "Delivery delayed", body: "Estimated delivery was 2 days but took 2 weeks. Plant arrived stressed.", verified: false },
    { id: 3, author: "Rana", location: "Guwahati", product: "Rubber Plant", rating: 5, date: "01/03/2026", title: "Good product", body: "Healthy plant received in great condition. Packaging was very secure and professional.", verified: true },
    { id: 4, author: "Priya", location: "Bangalore", product: "Snake Plant", rating: 5, date: "28/02/2026", title: "Air Purifier!", body: "Beautiful thick leaves. It's been a month and the plant is thriving in low light.", verified: true },
    { id: 5, author: "Amit", location: "Mumbai", product: "Peace Lily", rating: 3, date: "25/02/2026", title: "Small size", body: "The flowers were wilted when they arrived. Recovered after some water, but size is small.", verified: true },
    { id: 6, author: "Sonia", location: "Chandigarh", product: "Tulsi (Shyam)", rating: 5, date: "20/02/2026", title: "Sacred & Healthy", body: "Very bushy and green. The aroma is amazing. Very happy with the purchase.", verified: true },
    { id: 7, author: "Vikram", location: "Jaipur", product: "Jade Plant", rating: 4, date: "15/02/2026", title: "Good Luck Charm", body: "Perfect for my office desk. The ceramic pot provided is of high quality.", verified: true },
    { id: 8, author: "Anjali", location: "Kolkata", product: "Money Plant", rating: 5, date: "10/02/2026", title: "Fast Growing", body: "I put it in water and it's already growing new leaves within a week!", verified: true },
    { id: 9, author: "Karan", location: "Hyderabad", product: "Aloe Vera", rating: 1, date: "05/02/2026", title: "Dead on arrival", body: "The leaves were completely yellow and mushy. Customer support not responding.", verified: false },
    { id: 10, author: "Meera", location: "Lucknow", product: "Bonsai Ficus", rating: 5, date: "01/02/2026", title: "True Art", body: "Exceeded my expectations. The shaping of the tree is beautiful. Worth the price.", verified: true },
    { id: 11, author: "Rahul", location: "Indore", product: "Spider Plant", rating: 4, date: "28/01/2026", title: "Bushy", body: "Lots of babies on the plant already. Great value for money.", verified: true },
    { id: 12, author: "Sneha", location: "Chennai", product: "Jasmine", rating: 3, date: "25/01/2026", title: "Fragrance is missing", body: "Plant is growing well but no buds even after using the fertilizer they recommended.", verified: true },
    { id: 13, author: "Deepak", location: "Ahmedabad", product: "Areca Palm", rating: 5, date: "20/01/2026", title: "Living Room Star", body: "Big, bold and green. Transformed my corner. Packaging was top notch.", verified: true },
    { id: 14, author: "Ishita", location: "Bhopal", product: "Cactus Mix", rating: 4, date: "15/01/2026", title: "Cute Minis", body: "Very cute small cacti. One was slightly out of the pot, but fixed it easily.", verified: true },
    { id: 15, author: "Tanmay", location: "Surat", product: "Hibiscus", rating: 2, date: "10/01/2026", title: "Pest issues", body: "Saw some white insects (mealybugs) under the leaves. Had to treat it immediately.", verified: true },
  ];

  // Mobile Stack Data
  const swipeProducts = [
    { id: 401, name: "Nimboo Tree", price: "499", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=500" },
    { id: 402, name: "Rubber Plant", price: "799", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=500" },
    { id: 403, name: "Snake Plant", price: "350", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=500" }
  ];

  return (
    <div className="bg-slate-50 py-16 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- ADDED: MOBILE STACK SECTION (Only on Mobile) --- */}
        <div className="md:hidden mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase">Pick Your Green</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Swipe right to add to cart</p>
          </div>
          <MobileStack 
            products={swipeProducts} 
            onAddToCart={addToCart} 
          />
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Real Stories from Real Gardeners
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Join our community of 6 Lakh+ plant lovers. Here is what they have to say about their green companions.
          </p>
        </div>
        
        {/* Responsive Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {reviews.map((rev) => (
            <div 
              key={rev.id} 
              className="relative break-inside-avoid bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden"
            >
              {/* Product Info Header */}
              <div className="flex justify-between items-start mb-5">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">
                      {rev.verified ? "Verified Purchase" : "Community Review"}
                    </span>
                  </div>
                  <p className="text-base font-black text-slate-800 leading-tight group-hover:text-green-600 transition-colors">
                    {rev.product}
                  </p>
                </div>
                <div className="flex text-yellow-500 text-[11px] font-bold bg-yellow-50 px-2.5 py-1 rounded-full items-center">
                   {rev.rating} <span className="ml-1">★</span>
                </div>
              </div>

              {/* Star Rating Visualization */}
              <div className="flex mb-4 text-xs gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < rev.rating ? "text-yellow-400" : "text-slate-200"}>
                    ★
                  </span>
                ))}
              </div>

              {/* Review Content */}
              <h4 className="font-extrabold text-slate-900 text-lg mb-3 leading-snug">
                {rev.title}
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm mb-8">
                "{rev.body}"
              </p>

              {/* User Metadata */}
              <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-sm font-black text-green-700 uppercase">
                    {rev.author[0]}
                  </div>
                  <div>
                    <p className="text-[13px] font-black text-slate-800 leading-none mb-1.5">{rev.author}</p>
                    <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                       <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                       {rev.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-300 font-bold mb-1">{rev.date}</p>
                  {rev.verified && (
                    <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">
                       <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                       <span className="text-[9px] font-black uppercase tracking-tighter">Buyer</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-20 text-center">
          <button className="relative inline-flex items-center justify-center px-12 py-5 font-black text-white transition-all duration-300 bg-slate-950 rounded-3xl hover:bg-green-600 hover:scale-105 active:scale-95 shadow-2xl group overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Explore All 6.7 Lakh Reviews
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </span>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default ReviewGrid;