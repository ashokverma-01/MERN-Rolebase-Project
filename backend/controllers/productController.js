const Product = require("../models/Product");
const { deleteImage } = require("../config/cloudinary");

// 📌 Create Product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, barcode } = req.body;
    const file = req.file;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      barcode,
      imageUrl: file?.path,
      imageId: file?.filename,
      userId: req.user._id,
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Product creation failed" });
  }
};

// 📌 Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

// 📌 Get Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
};

// 📌 Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // 🔄 Replace image if new image uploaded
    if (req.file) {
      if (product.imageId) {
        await deleteImage(product.imageId);
      }
      product.imageUrl = req.file.path;
      product.imageId = req.file.filename;
    }

    // 🔄 Update other fields
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    await product.save();

    res.status(200).json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Product update failed" });
  }
};

// 📌 Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    if (product.imageId) {
      await deleteImage(product.imageId);
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product and image deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
// productController.js
const getProductByBarcode = async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.code });
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByBarcode,
};
