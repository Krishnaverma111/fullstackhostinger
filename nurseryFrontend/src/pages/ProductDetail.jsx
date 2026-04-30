
import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onAddToCart }) => {
  // Agar product image database mein nahi hai toh default image lag jayegi
  const imageUrl = product.image || "https://via.placeholder.com/300?text=Plant+Image";

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative"
    >
      <figure className="relative aspect-square overflow-hidden rounded-3xl mb-4 bg-slate-50">
        <img 
          src={imageUrl} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          alt={product.name} 
        />
        {/* Discount Badge agar database mein ho */}
        {product.discount && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
            Save {product.discount}%
          </span>
        )}
      </figure>

      <div className="flex flex-col gap-1 mb-4">
        <h3 className="font-bold text-slate-800 text-lg uppercase tracking-tight line-clamp-1">
          {product.name}
        </h3>
        <p className="text-slate-500 text-xs line-clamp-1">{product.category || "Premium Plant"}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-green-600 font-black text-xl">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-slate-400 line-through text-sm">₹{product.oldPrice}</span>
          )}
        </div>
      </div>
      
      <button 
        onClick={() => onAddToCart(product)}
        className="w-full bg-slate-900 text-white py-3.5 rounded-2xl font-bold hover:bg-green-600 transition-all active:scale-95 shadow-md uppercase text-[10px] tracking-[0.2em]"
      >
        Add to Cart
      </button>
    </motion.div>
  );
};

export default ProductCard;