const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Config load
dotenv.config();

// DB connect
connectDB();

const app = express();

app.use(express.json());

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://93.127.172.136",
        "http://mamtanursery.com:5174"
    ],
    credentials: true,
}));

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/seeds', productRoutes);

app.get('/', (req, res) => {
    res.send('Nursery API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});