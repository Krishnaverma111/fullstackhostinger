const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Path sahi hai na? Check kar lena

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Seeding...'))
  .catch(err => console.log('❌ Connection Error:', err));

const products = [
  {
    name: "Royal Golden Ceramic Pot",
    image: "https://images.unsplash.com/photo-1612547036242-77002603e5aa?w=800",
    description: "Premium gold-finished ceramic pot for a luxury look.",
    category: "Pots",
    price: 1500,
    countInStock: 15,
  },
  {
    name: "Classic Terracotta Planter",
    image: "https://images.unsplash.com/photo-1520412099561-648319751e54?w=800",
    description: "Traditional clay planter, perfect for outdoor gardens.",
    category: "Planters",
    price: 450,
    countInStock: 25,
  },
  {
    name: "Modern White Geometric Pot",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
    description: "Minimalist geometric design for modern office desks.",
    category: "Pots",
    price: 850,
    countInStock: 12,
  },
  {
    name: "Snake Plant Indoor Special",
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=800",
    description: "Air-purifying snake plant in a premium designer pot.",
    category: "Indoor",
    price: 1200,
    countInStock: 8,
  },
  {
    name: "Organic Tomato Seeds",
    image: "https://images.unsplash.com/photo-1592450800098-8d57df9ecb5f?w=800",
    description: "High-yield organic tomato seeds for home gardening.",
    category: "Seeds",
    price: 150,
    countInStock: 50,
  },
  {
    name: "Hanging Macrame Planter",
    image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800",
    description: "Stylish hanging planter for balcony decoration.",
    category: "Planters",
    price: 600,
    countInStock: 20,
  }
];

const importData = async () => {
  try {
    // Purana data delete karega taaki duplicate na ho
    await Product.deleteMany();
    
    // Naya data insert karega
    await Product.insertMany(products);
    
    console.log('✅ Nursery Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error with data import:', error);
    process.exit(1);
  }
};

importData();