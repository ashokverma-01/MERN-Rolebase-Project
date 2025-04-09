const express = require("express");
const { getProfile } = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.get("/admin-dashboard", protect, isAdmin, (req, res) => {
  res.send("Welcome to Admin Dashboard");
});

module.exports = router;
