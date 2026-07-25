// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     // --- Client ki Complete Details ---
//     customerName: {
//         type: String,
//         required: [true, "Client ka naam zaroori hai"],
//         trim: true
//     },
//     phone: {
//         type: String,
//         required: [true, "Phone number zaroori hai"],
//         trim: true
//     },
//     email: {
//         type: String,
//         trim: true,
//         lowercase: true
//         // Email optional rakha hai, agar client dena chahe toh
//     },
//     address: {
//         type: String,
//         required: [true, "Pura address likhna zaroori hai"]
//     },
//     pincode: {
//         type: String,
//         required: [true, "Area pin code zaroori hai"]
//     },
//     city: {
//         type: String,
//         default: "Not Specified"
//     },

//     // --- Order & Products ---
//     items: [
//         {
//             productName: { type: String, required: true },
//             price: { type: Number, required: true },
//             quantity: { type: Number, required: true },
//             image: String
//         }
//     ],
    
//     totalAmount: {
//         type: Number,
//         required: true
//     },

//     // --- Admin Control ---
//     status: {
//         type: String,
//         enum: ['Pending', 'Contacted', 'Shipped', 'Delivered', 'Cancelled'],
//         default: 'Pending'
//     },
    
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }


// });

// module.exports = mongoose.model('Order', orderSchema);

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
            image: { type: String, default: '' }
        }
    ],
    
    totalAmount: {
        type: Number,
        required: true
    },

    // --- Payment Details (New Fields for Payment Gateway) ---
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
        default: 'Pending'
    },
    paymentId: {
        type: String,
        default: '',
        trim: true
    },
    razorpayOrderId: {
        type: String,
        default: '',
        trim: true
    },
    paymentDate: {
        type: Date,
        default: null
    },

    // --- Admin Control ---
    status: {
        type: String,
        enum: ['Pending', 'Contacted', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    
    // --- Timestamps ---
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware: Automatically update updatedAt field on save
orderSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Optional: Index for faster queries
orderSchema.index({ createdAt: -1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ status: 1 });

module.exports = mongoose.model('Order', orderSchema);