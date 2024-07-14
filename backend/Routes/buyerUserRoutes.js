const express = require("express");
const router = express.Router();
const Buyer = require("../Modals/buyerModal");
const Exhibition = require("../Modals/ExhibitionModal");
const Competition = require("../Modals/competitionModal");

/****************** BUYER SIGN UP ******************/
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check if email already exists
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new buyer
    const newBuyer = new Buyer({
      name,
      email,
      password,
    });

    // Save buyer to database
    await newBuyer.save();

    res.status(201).json({ message: "Buyer registered successfully" });
  } catch (error) {
    console.error("Error registering buyer:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while registering buyer" });
  }
});

/****************** BUYER LOGIN ******************/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Find the buyer by email
    const buyer = await Buyer.findOne({ email });
    if (!buyer || buyer.password !== password) {
      // Simplified password check
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      buyerId: buyer._id,
      name: buyer.name,
      email: buyer.email,
    });
  } catch (error) {
    console.error("Error logging in buyer:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while logging in buyer" });
  }
});
router.get("/allexhibitions", async (req, res) => {
  try {
    const exhibitions = await Exhibition.find().populate("arts"); // Populate arts to show existing arts in exhibitions
    console.log(exhibitions); // Log exhibitions to see if arts are populated

    res.status(200).json(exhibitions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET A COMPETITION BY ID
router.get("/competition/:id", async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id).populate(
      "arts"
    );
    if (!competition) {
      return res.status(404).json({ message: "Competition not found" });
    }
    res.status(200).json(competition);
  } catch (error) {
    console.error("Error fetching competition details:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching competition details",
    });
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
