import axios from 'axios';

const API = import.meta.env.VITE_API_URL;
const API_URL = `${API}/api/orders`;

// Order place karne ke liye
export const placeOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/confirm`, orderData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Order fail ho gaya!";
    }
};

// Admin ke liye orders laane ke liye
export const fetchAllOrders = async () => {
    const response = await axios.get(`${API_URL}/all-orders`);
    return response.data;
};