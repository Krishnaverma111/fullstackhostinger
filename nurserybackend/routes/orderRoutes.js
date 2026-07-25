const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// 1. Naya Order Receive karne ke liye (Frontend/Client se)
// Path: POST /api/orders/confirm
router.post('/confirm', orderController.createOrder);

// 2. Saare Orders dikhane ke liye (Admin Panel ke liye)
// Path: GET /api/orders/all-orders
router.get('/all-orders', orderController.getAllOrders);

// 3. Order ka Status change karne ke liye (Admin ke liye)
// Path: PUT /api/orders/update-status/:id
router.put('/update-status/:id', orderController.updateOrderStatus);
router.post("/create-razorpay-order", orderController.createRazorpayOrder);
router.post("/verify-payment", orderController.verifyRazorpayPayment);
router.delete('/delete/:id', orderController.deleteOrder);

module.exports = router;


