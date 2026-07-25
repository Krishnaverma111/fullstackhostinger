// const Order = require('../models/Order');

// const crypto = require("crypto");
// const Razorpay = require("razorpay");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // 1. Naya Order Create Karne ke Liye (Used by Client/Frontend)
// exports.createOrder = async (req, res) => {
//     try {
//         const { 
//             customerName, 
//             phone, 
//             email, 
//             address, 
//             pincode, 
//             city, 
//             items, 
//             totalAmount 
//         } = req.body;

//         // Validation: Check karein ki zaroori details hain ya nahi
//         if (!customerName || !phone || !items || items.length === 0) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Please provide all required details and items." 
//             });
//         }

//         const newOrder = new Order({
//             customerName,
//             phone,
//             email,
//             address,
//             pincode,
//             city,
//             items,
//             totalAmount
//         });

//         const savedOrder = await newOrder.save();

//         res.status(201).json({
//             success: true,
//             message: "Order received successfully! Our team will contact you soon.",
//             orderId: savedOrder._id
//         });
//     } catch (error) {
//         console.error("Error in createOrder:", error);
//         res.status(500).json({
//             success: false,
//             message: "Server Error: Order save nahi ho paya.",
//             error: error.message
//         });
//     }
// };

// // 2. Saare Orders Get Karne ke Liye (Used by Admin Panel)
// exports.getAllOrders = async (req, res) => {
//     try {
//         // .sort({ createdAt: -1 }) se naye orders sabse upar dikhenge
//         const orders = await Order.find().sort({ createdAt: -1 });
        
//         res.status(200).json({
//             success: true,
//             count: orders.length,
//             orders
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Orders fetch karne mein error aaya."
//         });
//     }
// };

// // 3. Order Status Update Karne ke Liye (For Admin Management)
// exports.updateOrderStatus = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body; // e.g., 'Contacted', 'Delivered'

//         const updatedOrder = await Order.findByIdAndUpdate(
//             id, 
//             { status }, 
//             { new: true }
//         );

//         if (!updatedOrder) {
//             return res.status(404).json({ success: false, message: "Order not found" });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Order status updated!",
//             order: updatedOrder
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Update failed" });
//     }
// };


// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // CREATE RAZORPAY ORDER
// exports.createRazorpayOrder = async (req, res) => {
//   try {
//     const { totalAmount } = req.body;

//     // Validate Amount
//     if (!totalAmount || isNaN(totalAmount) || Number(totalAmount) <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide a valid total amount.",
//       });
//     }

//     // Validate Razorpay keys
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.error('Razorpay keys are missing in environment variables');
//       return res.status(500).json({
//         success: false,
//         message: "Payment configuration error. Please try again later.",
//       });
//     }

//     const options = {
//       amount: Math.round(Number(totalAmount) * 100), // Amount in paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: 1, // Auto capture payment
//       notes: {
//         source: "Nursery Website",
//       },
//     };

//     const order = await razorpay.orders.create(options);

//     if (!order) {
//       return res.status(500).json({
//         success: false,
//         message: "Unable to create Razorpay order.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Razorpay order created successfully.",
//       key: process.env.RAZORPAY_KEY_ID,
//       order: {
//         id: order.id,
//         amount: order.amount,
//         currency: order.currency,
//         receipt: order.receipt,
//         status: order.status,
//       },
//     });
//   } catch (error) {
//     console.error("Create Razorpay Order Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to create Razorpay order. Please try again.",
//       ...(process.env.NODE_ENV === 'development' && { error: error.message }),
//     });
//   }
// };

// // VERIFY RAZORPAY PAYMENT (UPDATED - Database Update Uncommented)
// exports.verifyRazorpayPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderId, // Your internal order ID
//     } = req.body;

//     // Validation
//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment details are missing.",
//       });
//     }

//     // Generate Signature
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     // Verify Signature
//     if (generatedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment verification failed. Invalid signature.",
//       });
//     }

//     // ⭐ IMPORTANT: Update Order in Database (UNCOMMENTED)
//     if (orderId) {
//       try {
//         const updatedOrder = await Order.findByIdAndUpdate(
//           orderId,
//           {
//             paymentStatus: "Paid",
//             paymentId: razorpay_payment_id,
//             razorpayOrderId: razorpay_order_id,
//             paymentDate: new Date(),
//             status: "Confirmed", // Order confirmed after payment
//             updatedAt: new Date()
//           },
//           { new: true } // Return updated document
//         );

//         if (updatedOrder) {
//           console.log(`✅ Order ${orderId} updated with payment ${razorpay_payment_id}`);
//         } else {
//           console.log(`❌ Order ${orderId} not found in database`);
//         }
//       } catch (dbError) {
//         console.error('Database update error:', dbError);
//         // Don't fail the verification if DB update fails
//         // But log it for debugging
//       }
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified successfully.",
//       paymentId: razorpay_payment_id,
//       orderId: razorpay_order_id,
//     });

//   } catch (error) {
//     console.error("Verify Payment Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Payment verification failed. Please contact support.",
//       ...(process.env.NODE_ENV === 'development' && { error: error.message }),
//     });
//   }
// };

const Order = require('../models/Order');
const crypto = require("crypto");
const Razorpay = require("razorpay");

// ⭐ EK BAAR HI INITIALIZE KARO (SIRF EK BAAR)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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

// Add this function to your orderController.js (order-controller file)

// 6. DELETE Order (For Admin Management)
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        await Order.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });
    } catch (error) {
        console.error("Error in deleteOrder:", error);
        res.status(500).json({
            success: false,
            message: "Server Error: Order delete nahi ho paya.",
            error: error.message
        });
    }
};

// 4. CREATE RAZORPAY ORDER
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { totalAmount } = req.body;

    // Validate Amount
    if (!totalAmount || isNaN(totalAmount) || Number(totalAmount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid total amount.",
      });
    }

    // Validate Razorpay keys
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay keys are missing in environment variables');
      return res.status(500).json({
        success: false,
        message: "Payment configuration error. Please try again later.",
      });
    }

    const options = {
      amount: Math.round(Number(totalAmount) * 100), // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Auto capture payment
      notes: {
        source: "Nursery Website",
      },
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({
        success: false,
        message: "Unable to create Razorpay order.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Razorpay order created successfully.",
      key: process.env.RAZORPAY_KEY_ID,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("Create Razorpay Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order. Please try again.",
      ...(process.env.NODE_ENV === 'development' && { error: error.message }),
    });
  }
};

// 5. VERIFY RAZORPAY PAYMENT
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId, // Your internal order ID
    } = req.body;

    // Validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment details are missing.",
      });
    }

    // Generate Signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Verify Signature
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed. Invalid signature.",
      });
    }

    // ⭐ IMPORTANT: Update Order in Database
    if (orderId) {
      try {
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          {
            paymentStatus: "Paid",
            paymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            paymentDate: new Date(),
            status: "Confirmed", // Order confirmed after payment
            updatedAt: new Date()
          },
          { new: true } // Return updated document
        );

        if (updatedOrder) {
          console.log(`✅ Order ${orderId} updated with payment ${razorpay_payment_id}`);
        } else {
          console.log(`❌ Order ${orderId} not found in database`);
        }
      } catch (dbError) {
        console.error('Database update error:', dbError);
        // Don't fail the verification if DB update fails
        // But log it for debugging
      }
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully.",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });

  } catch (error) {
    console.error("Verify Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed. Please contact support.",
      ...(process.env.NODE_ENV === 'development' && { error: error.message }),
    });
  }
};