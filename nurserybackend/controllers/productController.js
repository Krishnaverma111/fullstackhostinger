const Product = require('../models/Product');



// exports.getProducts = async (req, res) => {

//   try {

//     const page = Number(req.query.page) || 1;

//     const limit = Number(req.query.limit) || 4;

//     const skip = (page - 1) * limit;

//     // CATEGORY FROM QUERY
//     const category = req.query.category;

//     // FILTER OBJECT
//     let filter = {};

//     // APPLY CATEGORY FILTER
//     if (category) {

//       filter.category = {
//         $regex: new RegExp(`^${category}$`, "i")
//       };

//     }

//     // GET PRODUCTS
//     const products = await Product.find(filter)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     res.status(200).json(products);

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message: "Server Error"
//     });

//   }
// };

exports.getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = req.query.limit ? Number(req.query.limit) : null;

    const filter = {};

    if (req.query.category) {
      filter.category = {
        $regex: new RegExp(`^${req.query.category}$`, "i"),
      };
    }

    const totalProducts = await Product.countDocuments(filter);

    let query = Product.find(filter).sort({ createdAt: -1 });

    if (limit) {
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
    }

    const products = await query;

    res.status(200).json({
      success: true,
      totalProducts,
      currentPage: page,
      totalPages: limit ? Math.ceil(totalProducts / limit) : 1,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
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