const express = require("express");
const multer = require("multer");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/productController.js");
const { storage } = require("../config/cloudinary.js");
const { protect, isAdmin } = require("../middleware/authMiddleware.js");
const upload = multer({ storage });
const router = express.Router();

// 📌 Routes
router.post("/create", protect, isAdmin, upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

router.get("/get", getAllProducts);
router.get("/:id", getProductById);

module.exports = router;
