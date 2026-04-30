import React, { useState } from 'react';
import { placeOrder } from '../../services/orderService';
import { motion } from 'framer-motion';

const CheckoutModal = ({ cartItems, totalAmount, isOpen, onClose, clearCart }) => {
    const [formData, setFormData] = useState({
        customerName: '', 
        phone: '', 
        address: '', 
        pincode: '',
        email: '' 
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Data Structure ready karo jo Admin Panel aur Backend dono ko samajh aaye
            const orderData = {
                customerName: formData.customerName,
                phone: formData.phone,
                address: formData.address,
                pincode: formData.pincode,
                email: formData.email,
                items: cartItems.map(item => ({
                    productName: item.name || item.productName,
                    price: Number(item.price || item.current),
                    quantity: Number(item.qty || 1)
                })),
                totalAmount: Number(totalAmount),
                date: new Date().toLocaleString(),
                status: "Pending"
            };

            // 2. Pehle LocalStorage mein backup dalo (Taaki Admin Panel turant dekh sake)
            const existingOrders = JSON.parse(localStorage.getItem("nurseryOrders") || "[]");
            localStorage.setItem("nurseryOrders", JSON.stringify([orderData, ...existingOrders]));

            // 3. Backend API par bhejo
            const res = await placeOrder(orderData);
            
            alert("Order Successfully Added! Check Admin Panel. 🌿");
            clearCart();
            onClose();
            
        } catch (err) {
            console.error("Order Error:", err);
            alert("Order save ho gaya hai par API mein issue hai: " + err.message);
            // Agar API fail bhi ho jaye, tab bhi modal band kar do kyunki LocalStorage mein save ho chuka hai
            clearCart();
            onClose();
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div 
                initial={{ y: 50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                className="bg-[#042116] border border-yellow-600/30 p-8 rounded-3xl w-full max-w-md shadow-2xl"
            >
                <h2 className="text-2xl font-serif text-yellow-500 mb-6 italic">Finalize Your Purchase</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input required className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none" 
                        placeholder="Aapka Naam" onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
                    
                    <input required type="tel" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none" 
                        placeholder="Mobile Number" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    
                    <textarea required className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none" 
                        placeholder="Pura Address" rows="3" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <input required className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none" 
                            placeholder="Pincode" onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} />
                        <input className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none" 
                            placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    
                    <div className="flex gap-4 mt-6">
                        <button type="button" onClick={onClose} className="flex-1 text-gray-400 font-bold">Cancel</button>
                        <button type="submit" disabled={loading} className="flex-1 bg-yellow-600 text-black font-black py-3 rounded-xl">
                            {loading ? "Saving..." : "Confirm Order"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CheckoutModal;