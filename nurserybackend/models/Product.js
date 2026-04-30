const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
      type: String, 
      required: true, 
      // Sabhi 12 categories + Plants aur purana 'Pots' data support karne ke liye
      enum: [
        'Plants',
        'Gardening',
        'Seeds',
        'Bulbs', 
        'Planters', 
        'Soil & Fertilizer', 
        'Pebbles', 
        'Accessories', 
        'Gifts',
        'Indoor', 
        'Outdoor', 
        'Offers',
        'Pots' 
      ] 
    },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;