const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./model/Product");
const connectDB = require("./config/db");

const products = [
  { name: "Product 1", description: "Description for product 1", price: 10 },
  { name: "Product 2", description: "Description for product 2", price: 20 },
  { name: "Product 3", description: "Description for product 3", price: 30 },
  { name: "Product 4", description: "Description for product 4", price: 40 },
  { name: "Product 5", description: "Description for product 5", price: 50 },
  { name: "Product 6", description: "Description for product 6", price: 60 },
  { name: "Product 7", description: "Description for product 7", price: 70 },
  { name: "Product 8", description: "Description for product 8", price: 80 },
  { name: "Product 9", description: "Description for product 9", price: 90 },
  { name: "Product 10", description: "Description for product 10", price: 100 },
  { name: "Product 11", description: "Description for product 11", price: 110 },
  { name: "Product 12", description: "Description for product 12", price: 120 },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();
