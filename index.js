const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Connect to MongoDB
connectDB();

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
