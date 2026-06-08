const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  jobType: String,
  shift: String,
  jobMode: String,
  experience: String,

  salary: {
    min: Number,
    max: Number,
    currency: String
  },
  companyEmail: {
    type: String,
    required: true
  },

  category: String,
  careerLevel: String,
  vacancies: Number,
  qualification: String,

  company: String,
  location: String,
  email: String,
  description: String,

  skills: [String],
  projects: [String],

  postedDate: Date,
  lastDate: Date,

  logo: String,
  
  // 🔥 Screening test questions array required kar diya backend par bhi
testQuestions: [{
    question: { type: String, required: true },
    options: { type: [String], required: true }, // Array of 4 options
    correctAnswer: { type: String, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);