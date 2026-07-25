// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");



// console.log("KEY:", process.env.RAZORPAY_KEY_ID);
// console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET);
// const connectDB = require("./config/db");

// const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const loginRoutes = require("./routes/Adminroutes");

// // ================= LOAD ENV =================
// dotenv.config();

// // ================= CONNECT DATABASE =================
// connectDB();

// const app = express();

// // ================= ALLOWED ORIGINS =================
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",

//   "http://93.127.172.136",
//   "http://93.127.172.136:5174",

//   "http://mamtanursery.com",
//   "https://mamtanursery.com",

//   "http://www.mamtanursery.com",
//   "https://www.mamtanursery.com",
// ];

// // ================= CORS OPTIONS =================
// const corsOptions = {
//   origin: function (origin, callback) {

//     // Allow requests without origin
//     // Postman / mobile apps
//     if (!origin) {
//       return callback(null, true);
//     }

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {

//       console.log("❌ Blocked by CORS:", origin);

//       callback(new Error("Not allowed by CORS"));
//     }
//   },

//   methods: ["GET", "POST", "PUT", "DELETE"],

//   credentials: true,
// };

// // ================= CORS =================
// app.use(cors(corsOptions));

// // ================= BODY PARSER =================
// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// // ================= ROOT ROUTE =================
// app.get("/", (req, res) => {
//   res.send("🌱 Nursery API is running...");
// });

// // ================= ROUTES =================
// app.use("/api/products", productRoutes);

// app.use("/api/orders", orderRoutes);

// app.use("/api/seeds", productRoutes);

// app.use("/api/admin", loginRoutes);

// // ================= ERROR HANDLER =================
// app.use((err, req, res, next) => {

//   console.error("🔥 Error:", err.message);

//   res.status(500).json({
//     success: false,
//     message: err.message || "Server Error",
//   });
// });



// // ================= SERVER =================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });




// const dotenv = require("dotenv");

// // Load environment variables FIRST
// dotenv.config();

// const express = require("express");
// const cors = require("cors");
// const Razorpay = require("razorpay");
// console.log("KEY:", process.env.RAZORPAY_KEY_ID);
// console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET);

// const connectDB = require("./config/db");

// const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const loginRoutes = require("./routes/Adminroutes");

// connectDB();

// const app = express();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "http://93.127.172.136",
//   "http://93.127.172.136:5174",
//   "http://mamtanursery.com",
//   "https://mamtanursery.com",
//   "http://www.mamtanursery.com",
//   "https://www.mamtanursery.com",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };



// const Razorpay = require("razorpay");


// app.use(cors(corsOptions));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("🌱 Nursery API is running...");
// });

// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/seeds", productRoutes);
// app.use("/api/admin", loginRoutes);

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({
//     success: false,
//     message: err.message,
//   });
// });

// const PORT = process.env.PORT || 5000;


// // razor pay ingegrate kar rhe 
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
//   headers: {
//     "X-Razorpay-Account": process.env.RAZORPAY_MERCHANT_ID
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// module.exports = razorpay;

// const dotenv = require("dotenv");

// // Load environment variables
// dotenv.config();

// const express = require("express");
// const cors = require("cors");
// const Razorpay = require("razorpay");

// const connectDB = require("./config/db");

// const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const loginRoutes = require("./routes/Adminroutes");

// // Connect Database
// connectDB();

// const app = express();

// // Check Razorpay Keys
// console.log("KEY:", process.env.RAZORPAY_KEY_ID);
// console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "Not Found");


// // CORS
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "http://93.127.172.136",
//   "http://93.127.172.136:5174",
//   "http://mamtanursery.com",
//   "https://mamtanursery.com",
//   "http://www.mamtanursery.com",
//   "https://www.mamtanursery.com",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };

// app.use(cors(corsOptions));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.get("/", (req, res) => {
//   res.send("🌱 Nursery API is running...");
// });

// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/seeds", productRoutes);
// app.use("/api/admin", loginRoutes);

// // Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);

//   res.status(500).json({
//     success: false,
//     message: err.message,
//   });
// });

// // Start Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const loginRoutes = require("./routes/Adminroutes");

// Connect Database
connectDB();

const app = express();

// ✅ Check Razorpay Keys (Production Safe)
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay keys are missing in environment variables!");
  process.exit(1);
}

// ✅ Only log in development
if (process.env.NODE_ENV !== 'production') {
  console.log("✅ Razorpay Key:", process.env.RAZORPAY_KEY_ID);
  console.log("✅ Razorpay Secret: Loaded");
}

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://93.127.172.136",
  "http://93.127.172.136:5174",
  "http://mamtanursery.com",
  "https://mamtanursery.com",
  "http://www.mamtanursery.com",
  "https://www.mamtanursery.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("🌱 Nursery API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/seeds", productRoutes);
app.use("/api/admin", loginRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log("✅ orderRoutes Loaded");
});