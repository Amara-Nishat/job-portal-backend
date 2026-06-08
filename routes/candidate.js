const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const multer = require("multer");

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST candidate info
router.post("/candidate-info", upload.single("cv"), async (req, res) => {
  try {

    const newCandidate = new Candidate({
      userId: req.body.userId,
      name: req.body.name,
      email: req.body.email,
      github: req.body.github,
      skills: req.body.skills,
      projects: req.body.projects,
      experience: req.body.experience,
      education: req.body.education,
      cv: req.file ? req.file.filename : null
    });

    await newCandidate.save();

    res.status(201).json({
      message: "Candidate info saved successfully",
      data: newCandidate
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;



router.get("/candidate-info/email/:email", async (req, res) => {
  try {

    const candidate = await Candidate.findOne({
      email: req.params.email
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(candidate);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// UPDATE candidate info
// UPDATE candidate info by email
router.put("/candidate-info/email/:email", upload.single("cv"), async (req, res) => {
  try {

    const updatedData = {
      name: req.body.name,
      github: req.body.github,
      skills: req.body.skills,
      projects: req.body.projects,
      experience: req.body.experience,
      education: req.body.education
    };

    if (req.file) {
      updatedData.cv = req.file.filename;
    }

    const candidate = await Candidate.findOneAndUpdate(
      { email: req.params.email },
      updatedData,
      { new: true }
    );

    res.json({
      message: "Profile updated successfully",
      data: candidate
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// candidate routes

router.get("/all-candidates", async (req, res) => {

  try {

    const candidates = await Candidate.find();

    res.status(200).json(candidates);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});