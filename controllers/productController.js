const Product = require("../model/Product");
const User = require("../model/User");
const FlaggedReview = require("../model/FlaggedReview");
const transporter = require("../config/email");

// Import the sentiment analysis package.
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const moderateText = async (text) => {
  try {
    console.log("Moderating text:", text);
    if (!text || typeof text !== "string" || text.trim() === "") {
      return { approved: false, reason: "No valid text provided" };
    }

    const result = sentiment.analyze(text);
    console.log("Sentiment analysis result:", result);

    // Define a threshold. For instance, if the score is below 0, we flag it.
    const threshold = 0;
    if (result.score < threshold) {
      return {
        approved: false,
        reason: `Negative sentiment score: ${result.score}`,
      };
    }

    return { approved: true, reason: "" };
  } catch (error) {
    console.error("Error in sentiment analysis:", error.message);
    return { approved: false, reason: "Sentiment analysis error" };
  }
};

exports.postReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const { comment, rating } = req.body;
    const userId = req.user.id;

    // Check if product exists.
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    // console.log("Received review comment:", comment);

    const moderationResult = await moderateText(comment);
    // console.log("Moderation result:", moderationResult);

    if (!moderationResult.approved) {
      const flaggedReview = new FlaggedReview({
        user: userId,
        product: productId,
        comment,
        rating: rating || 0,
        reason: moderationResult.reason,
      });
      await flaggedReview.save();
      return res.status(400).json({
        msg: "Your review has been flagged for moderation",
        flagged: true,
      });
    }

    const review = {
      user: userId,
      comment,
      rating: rating || 0,
      moderated: true,
    };

    product.reviews.push(review);
    await product.save();

    console.log("Review posted successfully.");
    res.json({ msg: "Review posted successfully", review });
  } catch (err) {
    // console.error("Error posting review:", err.message);
    res.status(500).send("Server error");
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "reviews.user",
      "username email"
    );
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate(
      "reviews.user",
      "username email"
    );
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product.reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
