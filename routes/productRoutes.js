const express = require("express");
const router = express.Router();
const {
  postReview,
  getProducts,
  getProductReviews,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Post a review for a product (protected route)
router.post("/:id/reviews", authMiddleware, postReview);

// Get all products (public route)
router.get("/", getProducts);

// Get reviews for a specific product (public route)
router.get("/:id/reviews", getProductReviews);

module.exports = router;
