const express = require("express");
const Artist = require("../Modals/artistModal");
const Art = require("../Modals/artModal"); // Add this import for the Art model
const router = express.Router();
const multer = require("multer");
const Exhibition = require("../Modals/ExhibitionModal");
const Competition = require("../Modals/competitionModal");

/******************ADMIN LOGIN ******************/
const adminEmail = "admin@example.com";
const adminPassword = "adminpassword";
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  if (email === adminEmail && password === adminPassword) {
    return res.json({ email: adminEmail, password: adminPassword });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

/******************AUTHENTICATE ADMIN ******************/
const authenticateAdmin = (req, res, next) => {
  const { email, password } = req.body;

  if (email === adminEmail && password === adminPassword) {
    return next();
  }

  res.status(403).json({ message: "Unauthorized" });
};

/******************EXHIBITIONS ENDPOINTS ******************/
// Create a new exhibition
router.post("/createExhibitions", async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    if (!name || !description || !startDate || !endDate) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const newExhibition = new Exhibition({
      name,
      description,
      startDate,
      endDate,
    });
    await newExhibition.save();
    res
      .status(201)
      .json({ message: "Exhibition created", exhibition: newExhibition });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all exhibitions (Admin and Artists can use this endpoint)
router.get("/allexhibitions", async (req, res) => {
  try {
    const exhibitions = await Exhibition.find().populate("arts"); // Populate arts to show existing arts in exhibitions
    res.status(200).json(exhibitions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/******************Competition ENDPOINTS ******************/

// Create a competition
router.post("/createCompetition", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send({ error: "All fields are required" });
  }

  try {
    const competition = new Competition({
      name,
      description,
    });
    await competition.save();
    res.status(201).send(competition);
  } catch (error) {
    res.status(400).send(error);
  }
});
// GET ALL COMPETITIONS
router.get("/allCompetitions", async (req, res) => {
  try {
    const competitions = await Competition.find().populate("arts");
    res.status(200).send(competitions);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
