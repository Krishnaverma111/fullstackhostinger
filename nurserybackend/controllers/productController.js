const Product = require('../models/Product');

// @desc    Fetch all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }); // Naya data upar dikhega
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, countInStock, stock, discount } = req.body;

    const product = new Product({
      name,
      price: Number(price),
      description,
      image: image || "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=200", // Default image if empty
      category: category.trim(),
      countInStock: Number(countInStock || stock || 0),
      discount: Number(discount || 0),
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Creation Error:", error);
    res.status(500).json({ message: error.message || 'Product creation failed' });
  }
};

// @desc    Update a product (YE BHI ZAROORI HAI)
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, countInStock, stock, discount } = req.body;
    
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price !== undefined ? Number(price) : product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.category = category || product.category;
      product.countInStock = countInStock !== undefined ? Number(countInStock) : (stock !== undefined ? Number(stock) : product.countInStock);
      product.discount = discount !== undefined ? Number(discount) : product.discount;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
};

// @desc    Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: 'Product removed from Database' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error during deletion' });
  }
};