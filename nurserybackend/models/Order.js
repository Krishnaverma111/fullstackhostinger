// // const mongoose = require('mongoose');

// // const orderSchema = new mongoose.Schema({
// //     // --- Client ki Complete Details ---
// //     customerName: {
// //         type: String,
// //         required: [true, "Client ka naam zaroori hai"],
// //         trim: true
// //     },
// //     phone: {
// //         type: String,
// //         required: [true, "Phone number zaroori hai"],
// //         trim: true
// //     },
// //     email: {
// //         type: String,
// //         trim: true,
// //         lowercase: true
// //         // Email optional rakha hai, agar client dena chahe toh
// //     },
// //     address: {
// //         type: String,
// //         required: [true, "Pura address likhna zaroori hai"]
// //     },
// //     pincode: {
// //         type: String,
// //         required: [true, "Area pin code zaroori hai"]
// //     },
// //     city: {
// //         type: String,
// //         default: "Not Specified"
// //     },

// //     // --- Order & Products ---
// //     items: [
// //         {
// //             productName: { type: String, required: true },
// //             price: { type: Number, required: true },
// //             quantity: { type: Number, required: true },
// //             image: String
// //         }
// //     ],
    
// //     totalAmount: {
// //         type: Number,
// //         required: true
// //     },

// //     // --- Admin Control ---
// //     status: {
// //         type: String,
// //         enum: ['Pending', 'Contacted', 'Shipped', 'Delivered', 'Cancelled'],
// //         default: 'Pending'
// //     },
    
// //     createdAt: {
// //         type: Date,
// //         default: Date.now
// //     }


// // });

// // module.exports = mongoose.model('Order', orderSchema);

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
//             image: { type: String, default: '' }
//         }
//     ],
    
//     totalAmount: {
//         type: Number,
//         required: true
//     },

//     // --- Payment Details (New Fields for Payment Gateway) ---
//     paymentStatus: {
//         type: String,
//         enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
//         default: 'Pending'
//     },
//     paymentId: {
//         type: String,
//         default: '',
//         trim: true
//     },
//     razorpayOrderId: {
//         type: String,
//         default: '',
//         trim: true
//     },
//     paymentDate: {
//         type: Date,
//         default: null
//     },

//     // --- Admin Control ---
//     status: {
//         type: String,
//         enum: ['Pending', 'Contacted', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
//         default: 'Pending'
//     },
    
//     // --- Timestamps ---
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// });


// // Optional: Index for faster queries
// orderSchema.index({ createdAt: -1 });
// orderSchema.index({ paymentStatus: 1 });
// orderSchema.index({ status: 1 });

// module.exports = mongoose.model('Order', orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Customer Details
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      default: "Not Specified",
      trim: true,
    },

    // Products
    items: [
      {
        productName: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          default: "",
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    // Payment
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    paymentId: {
      type: String,
      default: "",
    },

    razorpayOrderId: {
      type: String,
      default: "",
    },

    paymentDate: {
      type: Date,
      default: null,
    },

    // Order Status
    status: {
      type: String,
      enum: [
        "Pending",
        "Contacted",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Automatically creates createdAt & updatedAt
  }
);

// Indexes
orderSchema.index({ createdAt: -1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ status: 1 });

module.exports = mongoose.model("Order", orderSchema);