const mongoose = require("mongoose");

const ApplyJobSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    
    // 🔥 PERMANENT STORAGE ATTACHMENTS (Inhe schema mei hona lazmi hai)
    status: { 
      type: String, 
      default: "Pending" // Agar kuch na bheja jaye toh automatic initial state "Pending" hogi
    },
    interviewDate: { 
      type: String, 
      default: "" 
    },
    interviewTime: { 
      type: String, 
      default: "" 
    },
    interviewNotes: { 
      type: String, 
      default: "" 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApplyJob", ApplyJobSchema);