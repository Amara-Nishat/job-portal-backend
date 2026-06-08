const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema({
  userEmail: String,

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  }

}, { timestamps: true });

module.exports = mongoose.model("SavedJob", savedJobSchema);