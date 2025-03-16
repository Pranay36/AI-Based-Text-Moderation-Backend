const Product = require("../model/Product");
const products = require("../seedproduct");

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(products);
      console.log("Products seeded");
    } else {
      console.log("Products already seeded");
    }
  } catch (error) {
    console.error("Seeding error: ", error);
  }
};

module.exports = seedProducts;
