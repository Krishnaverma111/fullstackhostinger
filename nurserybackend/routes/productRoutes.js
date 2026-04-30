const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 
const mongoose = require('mongoose');

// 1. GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 2. ADD PRODUCT
router.post('/', async (req, res) => {
  try {
    const { name, price, stock, category, image, countInStock, description } = req.body;
    
    const newProduct = new Product({
      name: name?.trim(), // Space issue fix
      price: Number(price) || 0,
      // Frontend 'stock' bhej raha hai, Schema 'countInStock' mangta hai
      countInStock: Number(stock || countInStock || 0), 
      category: category?.trim() || 'Indoor', // Trim taaki "Plants " aur "Plants" mismatch na ho
      image: image?.trim() || "https://images.unsplash.com/photo-1585336139118-b31920ad0d1c?w=500",
      description: description?.trim() || "Premium quality product for your nursery."
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("POST Error:", error.message);
    res.status(400).json({ message: "Add Product Failed", error: error.message });
  }
});

// 3. UPDATE PRODUCT
router.put('/:id', async (req, res) => {
  try {
    const { name, price, stock, category, image, countInStock, description } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const updatedData = {
      name: name?.trim(),
      price: price !== undefined ? Number(price) : undefined,
      countInStock: (stock !== undefined || countInStock !== undefined) 
        ? Number(stock || countInStock) 
        : undefined,
      category: category?.trim(),
      image: image?.trim(),
      description: description?.trim()
    };

    // Safely remove undefined fields taaki purana data delete na ho jaye
    Object.keys(updatedData).forEach(key => updatedData[key] === undefined && delete updatedData[key]);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { 
        new: true, 
        runValidators: true // CRITICAL: Taaki Enum (categories) check hon
      }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(400).json({ message: "Update Failed", error: error.message });
  }
});

// 4. DELETE PRODUCT
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete Failed", error: error.message });
  }
});

module.exports = router;