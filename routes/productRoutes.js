// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  postReview,
  getProducts,
  getProductReviews,
  getFlaggedReviews,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Existing routes for reviews and products...
router.post("/:id/reviews", authMiddleware, postReview);
router.get("/", getProducts);
router.get("/:id/reviews", getProductReviews);
router.get("/:id/flaggedreviews", authMiddleware, getFlaggedReviews);

module.exports = router;
