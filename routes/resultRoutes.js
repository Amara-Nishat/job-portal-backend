const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const mongoose = require("mongoose");

// SAVE SCORE (FINAL FIX)
router.post("/save-score", async (req, res) => {
  try {
    const { userEmail, jobId, score, total } = req.body;

    if (!userEmail || score == null || total == null) {
      return res.status(400).json({ msg: "Missing data" });
    }

    let finalJobId = null;

    if (jobId && mongoose.Types.ObjectId.isValid(jobId)) {
      finalJobId = new mongoose.Types.ObjectId(jobId);
    }

    // 🔥 IMPORTANT: prevent duplicate
    const already = await Result.findOne({
      userEmail,
      jobId: finalJobId,
    });

    if (already) {
      return res.status(200).json({
        already: true,
        msg: "Already submitted test",
      });
    }

    const result = await Result.create({
      userEmail,
      jobId: finalJobId,
      score: Number(score),
      total: Number(total),
    });

    return res.json({
      success: true,
      msg: "Saved successfully",
      result,
    });

  } catch (err) {
    console.log("SAVE ERROR:", err);

    return res.status(500).json({
      msg: "Server error",
    });
  }
});

// HISTORY
router.get("/:userEmail", async (req, res) => {
  try {
    const data = await Result.find({
      userEmail: req.params.userEmail,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;