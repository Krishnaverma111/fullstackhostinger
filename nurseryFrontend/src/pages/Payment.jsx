// src/pages/Payment.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// const API_URL = 'http://localhost:5000';

export default function Payment({ setCartItems }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(!!window.Razorpay);

  // ✅ Fallback: state na mile to localStorage se le lo (refresh-safe)
  const [checkoutData] = useState(() => {
    if (location.state?.customer) return location.state;
    const stored = localStorage.getItem('checkoutData');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (window.Razorpay) {
      setSdkReady(true);
      return;
    }
    // Agar script abhi load ho rahi hai, poll karke check karo
    const interval = setInterval(() => {
      if (window.Razorpay) {
        setSdkReady(true);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  if (!checkoutData || !checkoutData.customer) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <ShieldCheck size={28} />
        </div>
        <h3 className="text-lg font-bold text-gray-800">No payment data found.</h3>
        <p className="text-sm text-gray-500 mt-1">Please start your order again from the cart.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl uppercase text-xs tracking-widest transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const { amount, customer, orderId } = checkoutData;

  const handlePayment = async () => {
    if (!sdkReady) {
      alert('Payment gateway load ho raha hai, thoda ruk kar try karein.');
      return;
    }

    setLoading(true);
    console.log(API_URL)

    try {
      const orderResponse = await axios.post(
        `${API_URL}/api/orders/create-razorpay-order`,
        { totalAmount: amount }
      );

      if (!orderResponse.data.success) {
        alert(orderResponse.data.message);
        setLoading(false);
        return;
      }

      const { key, order } = orderResponse.data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: 'Mamta Nursery',
        description: `Order #${orderId?.slice(-8) || ''}`,
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        notes: {
          address: customer.address,
          orderId,
        },
        order_id: order.id,

        handler: async function (response) {
          try {
            // ✅ FIX: /api prefix add kiya — pehle missing tha, isi wajah se
            // payment ho jaata tha lekin verify silently fail ho jaata tha
            const verifyResponse = await axios.post(
              `${API_URL}/api/orders/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId,
              }
            );

            if (verifyResponse.data.success) {
              localStorage.removeItem('checkoutData'); // stale data clear
              if (setCartItems) setCartItems([]);
              navigate('/order-success', {
                state: {
                  paymentId: response.razorpay_payment_id,
                  orderId,
                  amount,
                },
              });
            } else {
              alert('Payment verification failed. Support se contact karein.');
            }
          } catch (error) {
            console.error('Verification error:', error);
            alert('Payment verification failed. Support se contact karein.');
          } finally {
            setLoading(false);
          }
        },

        theme: { color: '#16a34a' },
        modal: {
          ondismiss: function () {
            setLoading(false); // user ne popup band kiya, order ko dobara try karne do
          },
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on('payment.failed', function (response) {
        navigate('/payment-failed', {
          state: {
            orderId,
            errorMessage: response.error?.description || 'Payment failed',
          },
        });
        setLoading(false);
      });

      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment process nahi ho paya. Dobara try karein.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <span className="text-green-600 font-black text-[10px] uppercase tracking-[0.3em] block mb-2">
            One Step Away
          </span>
          <h2 className="text-3xl font-black uppercase italic text-gray-900">
            Complete <span className="text-green-600 not-italic">Payment</span>
          </h2>
        </div>

        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-gray-100">
          {orderId && (
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              Order #{orderId.slice(-8)}
            </p>
          )}

          <div className="bg-gray-50 p-5 rounded-2xl mb-6 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-bold text-gray-500">Name</span>
              <span>{customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-500">Phone</span>
              <span>{customer.phone}</span>
            </div>
            {customer.email && (
              <div className="flex justify-between">
                <span className="font-bold text-gray-500">Email</span>
                <span className="truncate max-w-[220px]">{customer.email}</span>
              </div>
            )}
            <div className="pt-2 border-t border-gray-200">
              <span className="font-bold text-gray-500 block mb-1">Delivery Address</span>
              <span>{customer.address}, {customer.city}, {customer.state} - {customer.pincode}</span>
            </div>
            <div className="flex justify-between items-end pt-3 border-t border-gray-200">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Payable</span>
              <span className="text-2xl font-black text-green-600">₹{amount}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading || !sdkReady}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl uppercase text-xs tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Processing...
              </>
            ) : !sdkReady ? (
              'Loading Gateway...'
            ) : (
              `Pay ₹${amount} Now 💳`
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
            <ShieldCheck size={14} className="text-green-500" />
            <span>Secured by Razorpay</span>
          </div>
        </div>
      </div>
    </div>
  );
}