const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  github: String,
  skills: String,
  projects: String,
  experience: String,
  education: String,
  cv: String
});

module.exports = mongoose.model("Candidate", CandidateSchema);