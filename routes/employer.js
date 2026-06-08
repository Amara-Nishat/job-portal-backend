const express = require("express");
const router = express.Router();
const Employer = require("../models/Employer");
const multer = require("multer");

/* ---------------- MULTER ---------------- */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ---------------- CREATE OR UPDATE EMPLOYER (FIXED & MERGED) ---------------- */
router.post(
  "/employer-info",
  upload.single("companyLogo"),
  async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required to save or update profile" });
      }

      // 1. Pehle check karo ke is email se koi employer pehle se database mei hai ya nahi
      let employer = await Employer.findOne({ email });

      // 2. Data bundle taiyar karo jo update ya save hona hai
      const profileData = {
        userId: req.body.userId,
        companyName: req.body.companyName,
        employerName: req.body.employerName,
        companyWebsite: req.body.companyWebsite,
        designation: req.body.designation,
        companyDescription: req.body.companyDescription,
        contactNumber: req.body.contactNumber,
        companyLocation: req.body.companyLocation,
      };

      // Agar user ne naya logo upload kiya hai, sirf tabhi logo field update ho
      if (req.file) {
        profileData.companyLogo = req.file.filename;
      }

      if (employer) {
        // CASE A: Agar employer pehle se maujood hai, toh data UPDATE kar do
        employer = await Employer.findOneAndUpdate(
          { email },
          { $set: profileData },
          { new: true } // Yeh updated data return karega
        );

        return res.status(200).json({
          message: "Employer info updated successfully",
          data: employer,
        });
      } else {
        // CASE B: Agar naya user hai, toh naya document CREATE kar do
        profileData.email = email;
        if (!profileData.companyLogo) profileData.companyLogo = null;

        const newEmployer = new Employer(profileData);
        await newEmployer.save();

        return res.status(201).json({
          message: "Employer info saved successfully",
          data: newEmployer,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ---------------- GET ALL EMPLOYERS ---------------- */
router.get("/all-employers", async (req, res) => {
  try {
    const employers = await Employer.find();
    res.json(employers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- GET EMPLOYER BY EMAIL (FETCH DATA FOR FRONTEND) ---------------- */
router.get("/employer-by-email/:email", async (req, res) => {
  try {
    const employer = await Employer.findOne({ email: req.params.email });

    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    res.json(employer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- UPDATE STATUS ---------------- */
router.put("/update-employer-status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Employer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Status updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/company-name/:email", async (req, res) => {
  try {
    const employer = await Employer.findOne({ email: req.params.email });
    
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

   
    res.json({ 
      companyName: employer.companyName, 
      status: employer.status // Yeh aapke database ka "Declined" status uthayega
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;