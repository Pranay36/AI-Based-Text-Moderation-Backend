const express = require("express");
const router = express.Router();
const { signups, login } = require("../controllers/authController");

router.post("/signups", signups);
router.post("/login", login);
router.post("/logout", (req, res) => {
  res.json({ msg: "Logged out successfully" });
});

module.exports = router;
