const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    trim: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    default: undefined,
  },
  score: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Result", ResultSchema);