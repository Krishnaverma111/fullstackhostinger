// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');

// const connectDB = require('./config/db');
// const productRoutes = require('./routes/productRoutes');
// const orderRoutes = require('./routes/orderRoutes');

// // ================= LOAD ENV =================
// dotenv.config();

// // ================= CONNECT DB =================
// connectDB();

// const app = express();

// // ================= CORS (FIXED) =================
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "http://93.127.172.136:5174",
//     "http://93.127.172.136",
//     "http://93.127.172.136:5174/"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// // Preflight requests fix
// app.options('/*', cors());
// // ================= BODY PARSER =================
// app.use(express.json());

// // ================= ROUTES =================
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/seeds', productRoutes);

// // ================= ROOT =================
// app.get('/', (req, res) => {
//   res.send('🌱 Nursery API is running...');
// });

// // ================= ERROR HANDLER =================
// app.use((err, req, res, next) => {
//   console.error("🔥 Error:", err.message);

//   res.status(500).json({
//     success: false,
//     message: err.message || "Server Error"
//   });
// });

// // ================= SERVER =================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const loginRoutes = require("./routes/Adminroutes")

// ================= LOAD ENV =================
dotenv.config();

// ================= CONNECT DB =================
connectDB();

const app = express();

// ================= CORS =================
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://93.127.172.136:5174",
    "http://93.127.172.136"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ================= BODY PARSER =================
app.use(express.json());

// ================= ROUTES =================
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/seeds', productRoutes);
app.use("/api/admin",loginRoutes );


// ================= ROOT =================
app.get('/', (req, res) => {
  res.send('🌱 Nursery API is running...');
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
})