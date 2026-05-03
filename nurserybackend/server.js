// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const productRoutes = require('./routes/productRoutes');
// const orderRoutes = require('./routes/orderRoutes');

// // Config load
// dotenv.config();

// // DB connect
// connectDB();

// const app = express();

// app.use(express.json());

// app.use(cors({
//     origin: [
//         "http://localhost:5173",
//         "http://localhost:5174",
//         "http://localhost:3000",
//         "http://93.127.172.136",
//         "http://93.127.172.136:5173",
//         "http://mamtanursery.com",
//         "http://mamtanursery.com:5174"

//     ],
//     credentials: true,
// }));

// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/seeds', productRoutes);

// app.get('/', (req, res) => {
//     res.send('Nursery API is running...');
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Body parser
app.use(express.json());

/* ================= CORS FIX (IMPORTANT) ================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://react-client:3000", 

  "http://93.127.172.136",
  "http://93.127.172.136:5173",
  "http://mamtanursery.com",
  "http://mamtanursery.com:5174",
  "http://www.mamtanursery.com",
  "http://www.mamtanursery.com:5174",
  "https://mamtanursery.com",
  "https://www.mamtanursery.com"
];

app.use(cors({
  origin: (origin, callback) => {
    console.log("🌐 Incoming Origin:", origin);

    if (!origin) return callback(null, true);

    // 🔴 OLD (remove this)
    // const isAllowed = allowedOrigins.some(o => origin.startsWith(o));

    // 🟢 NEW (ADD THIS)
    const isAllowed = allowedOrigins.includes(origin);

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log("❌ CORS Blocked:", origin);
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

/* ================= ROUTES ================= */

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/seeds', productRoutes);

/* ================= ROOT ================= */

app.get('/', (req, res) => {
  res.send('🌱 Nursery API is running...');
});

/* ================= ERROR HANDLER ================= */

app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({
    message: err.message || "Server Error"
  });
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});