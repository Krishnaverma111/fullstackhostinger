import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Products ki state (Jo Admin add karega aur Shop dikhayega)
  const [products, setProducts] = useState([
    { id: 1, name: 'Snake Plant', price: 499, image: 'https://via.placeholder.com/150' },
  ]);

  // 2. Cart ki state
  const [cartItems, setCartItems] = useState([]);

  // Function: Naya product add karne ke liye (Admin Panel ke liye)
  const addProductToStore = (newProduct) => {
    setProducts((prev) => [...prev, { ...newProduct, id: Date.now() }]);
  };

  // Function: Cart mein daalne ke liye
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      products, 
      addToCart, 
      addProductToStore // Isse admin panel use karega
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);