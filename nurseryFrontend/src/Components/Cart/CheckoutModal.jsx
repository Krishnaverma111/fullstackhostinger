import React, { useState, useEffect, useRef } from 'react';
import { placeOrder } from '../../services/orderService';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Mail, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';

const CheckoutModal = ({ cartItems, totalAmount, isOpen, onClose, clearCart }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        address: '',
        pincode: '',
        city: '',
        state: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        customerName: '',
        phone: '',
        address: '',
        pincode: '',
        email: ''
    });

    const [loading, setLoading] = useState(false);
    const [pincodeLoading, setPincodeLoading] = useState(false);
    const [pincodeError, setPincodeError] = useState('');
    const debounceRef = useRef(null);

    // --- Field-wise validation rules ---
    const validateField = (name, value) => {
        switch (name) {
            case 'customerName':
                if (!value.trim()) return 'Naam zaroori hai';
                return value.trim().length >= 3 ? '' : 'Kam se kam 3 letters';
            case 'phone':
                if (!value.trim()) return 'Number zaroori hai';
                if (value.length < 10) return `${10 - value.length} digit aur chahiye`;
                return /^\d{10}$/.test(value) ? '' : '10 digit hona chahiye';
            case 'address':
                if (!value.trim()) return 'Address zaroori hai';
                return value.trim().length >= 10 ? '' : 'Thoda detail likho';
            case 'pincode':
                if (!value.trim()) return 'Pincode zaroori hai';
                if (value.length < 6) return `${6 - value.length} digit aur chahiye`;
                return /^\d{6}$/.test(value) ? '' : '6 digit hona chahiye';
            case 'email':
                if (value.trim() === '') return '';
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Sahi format daalo';
            default:
                return '';
        }
    };

    // --- Pincode se City/State auto-fetch ---
    const fetchLocationFromPincode = async (pin) => {
        setPincodeLoading(true);
        setPincodeError('');
        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
            const data = await res.json();

            if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
                const po = data[0].PostOffice[0];
                setFormData((prev) => ({
                    ...prev,
                    city: po.District || po.Block || '',
                    state: po.State || ''
                }));
            } else {
                setPincodeError('Pincode invalid hai');
                setFormData((prev) => ({ ...prev, city: '', state: '' }));
            }
        } catch (err) {
            console.error('Pincode fetch error:', err);
            setPincodeError('City fetch nahi hui, manually likho');
        } finally {
            setPincodeLoading(false);
        }
    };

    // --- Instant validation on every keystroke ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        let cleaned = value;

        if (name === 'phone') cleaned = value.replace(/\D/g, '').slice(0, 10);
        if (name === 'pincode') cleaned = value.replace(/\D/g, '').slice(0, 6);

        setFormData((prev) => ({ ...prev, [name]: cleaned }));
        // instant validation — error turant update, blur ka wait nahi
        setErrors((prev) => ({ ...prev, [name]: validateField(name, cleaned) }));

        if (name === 'pincode') {
            setPincodeError('');
            if (debounceRef.current) clearTimeout(debounceRef.current);

            if (cleaned.length === 6) {
                debounceRef.current = setTimeout(() => {
                    fetchLocationFromPincode(cleaned);
                }, 500);
            } else {
                setFormData((prev) => ({ ...prev, city: '', state: '' }));
            }
        }
    };

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const isFormValid = () => {
        const requiredFields = ['customerName', 'phone', 'address', 'pincode'];
        const newErrors = {
            customerName: validateField('customerName', formData.customerName),
            phone: validateField('phone', formData.phone),
            address: validateField('address', formData.address),
            pincode: validateField('pincode', formData.pincode),
            email: validateField('email', formData.email)
        };
        setErrors(newErrors);

        const requiredOk = requiredFields.every((f) => formData[f].trim() !== '');
        const noErrors = Object.values(newErrors).every((err) => err === '');
        return requiredOk && noErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) return;

        setLoading(true);

        try {
            const orderData = {
                customerName: formData.customerName.trim(),
                phone: formData.phone.trim(),
                address: formData.address.trim(),
                pincode: formData.pincode.trim(),
                city: formData.city.trim() || "Not Specified",
                email: formData.email.trim(),
                items: cartItems.map(item => ({
                    productName: item.name || item.productName,
                    price: Number(item.price || item.current),
                    quantity: Number(item.qty || 1),
                    image: item.image || item.img || ''
                })),
                totalAmount: Number(totalAmount),
                date: new Date().toLocaleString(),
                status: "Pending"
            };

            const existingOrders = JSON.parse(localStorage.getItem("nurseryOrders") || "[]");
            localStorage.setItem("nurseryOrders", JSON.stringify([orderData, ...existingOrders]));

            await placeOrder(orderData);

            alert("Order Successfully  completed. 🌿");
            clearCart();
            onClose();

        } catch (err) {
            console.error("Order Error:", err);
            alert("Order save ho gaya hai par API mein issue hai: " + err.message);
            clearCart();
            onClose();
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    // Field valid hai ya nahi — icon dikhane ke liye (sirf non-empty pe)
    const isValid = (field) => formData[field].trim() !== '' && !errors[field];
    const hasError = (field) => formData[field].trim() !== '' && errors[field];

    const inputClass = (field) => `
        w-full bg-white/5 border p-2.5 pl-9 pr-8 rounded-lg text-white text-sm outline-none
        transition-colors duration-150
        ${hasError(field)
            ? 'border-red-500 focus:border-red-500'
            : isValid(field)
                ? 'border-green-600/50 focus:border-green-500'
                : 'border-white/10 focus:border-yellow-600/60'}
    `;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3">
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#042116] border border-yellow-600/30 p-5 rounded-2xl w-full max-w-md shadow-2xl relative"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
                >
                    <X size={18} />
                </button>

                <h2 className="text-xl font-serif text-yellow-500 mb-0.5 italic">Finalize Your Purchase</h2>
                <p className="text-gray-500 text-xs mb-4">Delivery details bharo order confirm karne ke liye</p>

                <form onSubmit={handleSubmit} className="space-y-2.5" noValidate>
                    {/* Name + Phone in one row */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                required
                                name="customerName"
                                value={formData.customerName}
                                className={inputClass('customerName')}
                                placeholder="Name *"
                                onChange={handleChange}
                            />
                            {isValid('customerName') && (
                                <CheckCircle2 size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-green-500" />
                            )}
                            {hasError('customerName') && (
                                <p className="text-red-500 text-[10px] mt-0.5 flex items-center gap-1">
                                    <AlertCircle size={10} /> {errors.customerName}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                required
                                type="tel"
                                name="phone"
                                inputMode="numeric"
                                maxLength={10}
                                value={formData.phone}
                                className={inputClass('phone')}
                                placeholder="Mobile *"
                                onChange={handleChange}
                            />
                            {isValid('phone') && (
                                <CheckCircle2 size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-green-500" />
                            )}
                            {hasError('phone') && (
                                <p className="text-red-500 text-[10px] mt-0.5 flex items-center gap-1">
                                    <AlertCircle size={10} /> {errors.phone}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="relative">
                        <MapPin size={14} className="absolute left-3 top-3 text-gray-500" />
                        <textarea
                            required
                            name="address"
                            value={formData.address}
                            className={`${inputClass('address')} resize-none pt-2.5`}
                            placeholder="Address (House no, Street, Landmark) *"
                            rows="2"
                            onChange={handleChange}
                        />
                        {isValid('address') && (
                            <CheckCircle2 size={14} className="absolute right-2.5 top-3 text-green-500" />
                        )}
                        {hasError('address') && (
                            <p className="text-red-500 text-[10px] mt-0.5 flex items-center gap-1">
                                <AlertCircle size={10} /> {errors.address}
                            </p>
                        )}
                    </div>

                    {/* Pincode + City + State in one row */}
                    <div className="grid grid-cols-3 gap-2">
                        <div className="relative">
                            <input
                                required
                                name="pincode"
                                inputMode="numeric"
                                maxLength={6}
                                value={formData.pincode}
                                className={`${inputClass('pincode')} pl-2.5`}
                                placeholder="Pincode *"
                                onChange={handleChange}
                            />
                            {pincodeLoading ? (
                                <Loader2 size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-500 animate-spin" />
                            ) : isValid('pincode') && !pincodeError ? (
                                <CheckCircle2 size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500" />
                            ) : null}
                        </div>

                        <input
                            name="city"
                            value={formData.city}
                            readOnly
                            className="w-full bg-white/5 border border-white/10 p-2.5 rounded-lg text-white text-sm outline-none cursor-not-allowed opacity-80 truncate"
                            placeholder="City"
                        />

                        <input
                            name="state"
                            value={formData.state}
                            readOnly
                            className="w-full bg-white/5 border border-white/10 p-2.5 rounded-lg text-white text-sm outline-none cursor-not-allowed opacity-80 truncate"
                            placeholder="State"
                        />
                    </div>
                    {(hasError('pincode') || pincodeError) && (
                        <p className="text-red-500 text-[10px] -mt-1.5 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.pincode || pincodeError}
                        </p>
                    )}

                    {/* Email */}
                    <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            className={inputClass('email')}
                            placeholder="Email (optional)"
                            onChange={handleChange}
                        />
                        {isValid('email') && (
                            <CheckCircle2 size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-green-500" />
                        )}
                        {hasError('email') && (
                            <p className="text-red-500 text-[10px] mt-0.5 flex items-center gap-1">
                                <AlertCircle size={10} /> {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 text-gray-400 font-bold text-sm hover:text-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-yellow-600 text-black font-black py-2.5 rounded-lg text-sm disabled:opacity-50 hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" /> Saving...
                                </>
                            ) : (
                                "Confirm Order"
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CheckoutModal;
