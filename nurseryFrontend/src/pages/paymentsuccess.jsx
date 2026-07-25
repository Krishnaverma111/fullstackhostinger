// src/components/PaymentSuccess.jsx (Simple Version)
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, paymentId, amount } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md">
        <CheckCircle className="text-green-600 mx-auto mb-4" size={64} />
        <h1 className="text-2xl font-bold mb-2">✅ Payment Successful!</h1>
        <p className="text-gray-500 mb-6">Thank you for your order</p>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
          <p><strong>Order ID:</strong> #{orderId?.slice(-8)}</p>
          <p><strong>Payment ID:</strong> {paymentId?.slice(-8)}</p>
          <p className="text-green-600 text-xl font-bold">₹{amount}</p>
        </div>
        
        <button
          onClick={() => navigate('/')}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}