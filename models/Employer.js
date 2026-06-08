const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema({

  userId: String,
  companyName: String,
  companyLogo: String,
  employerName: String,
  email: String,
  companyWebsite: String,
  designation: String,
  companyDescription: String,
  contactNumber: String,
  companyLocation: String,
  
   status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
});

module.exports = mongoose.model("Employer", EmployerSchema);