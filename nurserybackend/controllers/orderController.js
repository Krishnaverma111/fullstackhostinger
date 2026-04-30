const Order = require('../models/Order');

// 1. Naya Order Create Karne ke Liye (Used by Client/Frontend)
exports.createOrder = async (req, res) => {
    try {
        const { 
            customerName, 
            phone, 
            email, 
            address, 
            pincode, 
            city, 
            items, 
            totalAmount 
        } = req.body;

        // Validation: Check karein ki zaroori details hain ya nahi
        if (!customerName || !phone || !items || items.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide all required details and items." 
            });
        }

        const newOrder = new Order({
            customerName,
            phone,
            email,
            address,
            pincode,
            city,
            items,
            totalAmount
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order received successfully! Our team will contact you soon.",
            orderId: savedOrder._id
        });
    } catch (error) {
        console.error("Error in createOrder:", error);
        res.status(500).json({
            success: false,
            message: "Server Error: Order save nahi ho paya.",
            error: error.message
        });
    }
};

// 2. Saare Orders Get Karne ke Liye (Used by Admin Panel)
exports.getAllOrders = async (req, res) => {
    try {
        // .sort({ createdAt: -1 }) se naye orders sabse upar dikhenge
        const orders = await Order.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Orders fetch karne mein error aaya."
        });
    }
};

// 3. Order Status Update Karne ke Liye (For Admin Management)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // e.g., 'Contacted', 'Delivered'

        const updatedOrder = await Order.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated!",
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Update failed" });
    }
};