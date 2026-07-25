// src/components/PaymentFailed.jsx (Simple Version)
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export default function PaymentFailed() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, errorMessage } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md">
        <XCircle className="text-red-600 mx-auto mb-4" size={64} />
        <h1 className="text-2xl font-bold mb-2">❌ Payment Failed</h1>
        <p className="text-gray-500 mb-6">
          {errorMessage || 'Something went wrong. Please try again.'}
        </p>
        
        {orderId && (
          <p className="text-gray-400 text-sm mb-6">Order Ref: #{orderId.slice(-8)}</p>
        )}
        
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/cart')}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-all"
          >
            Go to Cart
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}