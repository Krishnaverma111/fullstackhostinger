const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // --- Client ki Complete Details ---
    customerName: {
        type: String,
        required: [true, "Client ka naam zaroori hai"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Phone number zaroori hai"],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
        // Email optional rakha hai, agar client dena chahe toh
    },
    address: {
        type: String,
        required: [true, "Pura address likhna zaroori hai"]
    },
    pincode: {
        type: String,
        required: [true, "Area pin code zaroori hai"]
    },
    city: {
        type: String,
        default: "Not Specified"
    },

    // --- Order & Products ---
    items: [
        {
            productName: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: String
        }
    ],
    
    totalAmount: {
        type: Number,
        required: true
    },

    // --- Admin Control ---
    status: {
        type: String,
        enum: ['Pending', 'Contacted', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);