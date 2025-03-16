const mongoose = require("mongoose");

const flaggedReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  flaggedAt: {
    type: Date,
    default: Date.now,
  },
  reason: {
    type: String,
    default: "Inappropriate content detected",
  },
});

module.exports = mongoose.model("FlaggedReview", flaggedReviewSchema);
