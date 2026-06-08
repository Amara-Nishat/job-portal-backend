const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true,
    unique: true
  },
  password: { 
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["candidate", "employer", "admin"], // sirf ye 3 values allowed
    default: null // signup ke waqt null, baad me user select karega
  }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;