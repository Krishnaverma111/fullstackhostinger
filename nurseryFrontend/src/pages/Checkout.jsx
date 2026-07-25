import React, { useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  totalAmount, 
  clearCart,
  navigate 
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    email: ""
  });

  console.log('🔍 CheckoutModal - navigate exists?', !!navigate);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile || !formData.address || !formData.pincode) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      // ✅ ORDER PAYLOAD
      const orderPayload = {
        customerName: formData.name,
        phone: formData.mobile,
        email: formData.email || '',
        address: formData.address,
        pincode: formData.pincode,
        city: formData.city || 'Not Specified',
        state: formData.state || 'Not Specified',
        items: cartItems.map(item => ({
          productName: item.name,
          price: Number(item.price || item.current || 0),
          quantity: item.qty || 1,
          image: item.image || item.img || ''
        })),
        totalAmount: totalAmount
      };

      console.log('📦 Saving Order:', orderPayload);

      // ✅ API CALL - DATA SAVE
      const response = await axios.post(`${API}/orders/confirm`, orderPayload);

      console.log('✅ Order Response:', response.data);

      setLoading(false);
      onClose();

      // ✅ ========== FORCE REDIRECT - 100% KAAM KAREGA ========== ✅
      if (response.data.success) {
        console.log('🔀 Force redirecting to /checkout');
        
        // ✅ Save data to localStorage
        localStorage.setItem('checkoutData', JSON.stringify({
          orderId: response.data.orderId,
          customer: {
            name: formData.name,
            phone: formData.mobile,
            email: formData.email || '',
            address: formData.address,
            pincode: formData.pincode,
            city: formData.city || 'Not Specified',
            state: formData.state || 'Not Specified'
          },
          items: cartItems.map(item => ({
            productName: item.name,
            price: Number(item.price || item.current || 0),
            quantity: item.qty || 1,
            image: item.image || item.img || ''
          })),
          amount: totalAmount
        }));
        
        // ✅ FORCE REDIRECT - Yeh 100% kaam karega
        window.location.href = '/checkout';
      }

    } catch (error) {
      console.error("❌ Order Save Failed:", error);
      alert('Order Save Failed: ' + (error.response?.data?.message || error.message));
      setLoading(false);
      
      // ✅ Fallback - Save to localStorage and redirect
      const fallbackData = {
        customer: {
          name: formData.name,
          phone: formData.mobile,
          email: formData.email || '',
          address: formData.address,
          pincode: formData.pincode,
          city: formData.city || 'Not Specified',
          state: formData.state || 'Not Specified'
        },
        items: cartItems.map(item => ({
          productName: item.name,
          price: Number(item.price || item.current || 0),
          quantity: item.qty || 1,
          image: item.image || item.img || ''
        })),
        amount: totalAmount
      };
      localStorage.setItem('checkoutData', JSON.stringify(fallbackData));
      window.location.href = '/checkout';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-6 md:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 bg-gray-100 p-2 rounded-full transition-colors">
          <X size={20} />
        </button>

        <h3 className="text-2xl font-black uppercase italic mb-6 text-gray-900">
          Finalize Your <span className="text-green-600 not-italic">Purchase</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Name *</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Aapka Naam" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Mobile *</label>
            <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange} placeholder="9876543210" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Address *</label>
            <textarea name="address" required rows="2" value={formData.address} onChange={handleChange} placeholder="House no, Street, Landmark" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition resize-none" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Pincode *</label>
            <input type="text" name="pincode" required value={formData.pincode} onChange={handleChange} placeholder="208011" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Kanpur" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">State</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Uttar Pradesh" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email (optional)</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition" />
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-bold">Items:</span>
              <span className="font-bold">{cartItems.length}</span>
            </div>
            <div className="flex justify-between text-lg font-black mt-1">
              <span>Total:</span>
              <span className="text-green-600">₹{totalAmount}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl uppercase text-xs tracking-widest transition-all">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl uppercase text-xs tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "⏳ Saving..." : "Confirm Order 💳"}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-2">
            <ShieldCheck size={14} className="text-green-500" />
            <span>Your data is secure and encrypted</span>
          </div>
        </form>
      </div>
    </div>
  );
}