const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Update role of existing user
router.post("/", async (req, res) => {
  try {
    const { role, userId } = req.body;

    if (!role || !userId) {
      return res.status(400).json({ message: "Role and userId are required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role: role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Role updated successfully",
      user
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;