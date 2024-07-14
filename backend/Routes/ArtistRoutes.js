const express = require("express");
const Artist = require("../Modals/artistModal");
const Art = require("../Modals/artModal"); // Add this import for the Art model
const Exhibition = require("../Modals/ExhibitionModal");

const router = express.Router();
const multer = require("multer");
const Competition = require("../Modals/competitionModal");
const Order = require("../Modals/orderModal");

/******************ARTIST SIGN UP  ******************/
// Set up multer for file uploads (artist profile picture)
const artistStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile_pictures/"); // Specify the directory for storing files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Specify the filename
  },
});
const artistUpload = multer({ storage: artistStorage });

router.post(
  "/signup",
  artistUpload.single("profilePicture"),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const profilePicture = req.file ? req.file.path : null;

      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
      }

      // Check if email already exists
      const existingArtist = await Artist.findOne({ email });
      if (existingArtist) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Create new artist
      const newArtist = new Artist({
        name,
        email,
        password,
        profilePicture,
      });

      // Save artist to database
      await newArtist.save();

      res.status(201).json({ message: "Artist registered successfully" });
    } catch (error) {
      console.error("Error registering artist:", error.message);
      res
        .status(500)
        .json({ message: "An error occurred while registering artist" });
    }
  }
);

/******************ARTIST LOGIN  ******************/

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Find the artist by email
    const artist = await Artist.findOne({ email });
    if (!artist || artist.password !== password) {
      // Simplified password check
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      artistId: artist._id,
      name: artist.name,
      email: artist.email,
      password: artist.password,
      profilePicture: artist.profilePicture,
    });
  } catch (error) {
    console.error("Error logging in artist:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while logging in artist" });
  }
});

/******************ART UPLOAD BY ARTIST ******************/

// Set up multer for file uploads (art images)
const artStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/art_images/"); // Specify the directory for storing files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Specify the filename
  },
});

const artUpload = multer({ storage: artStorage });
router.post("/upload", artUpload.single("image"), async (req, res) => {
  try {
    const { artistId, title, description, price } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    // Validate input
    if (!artistId || !title || !description || !imageUrl || !price) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Create new art
    const newArt = new Art({
      artist: artistId,
      title,
      description,
      imageUrl,
      price,
    });

    // Save art to database
    await newArt.save();

    res.status(201).json({ message: "Art uploaded successfully", art: newArt });
  } catch (error) {
    console.error("Error uploading art:", error.message);
    res.status(500).json({ message: "An error occurred while uploading art" });
  }
});
/****************** FETCH ARTS BY ARTIST ID ******************/

router.get("/arts/:artistId", async (req, res) => {
  try {
    const artistId = req.params.artistId;

    // Fetch arts by artist ID
    const arts = await Art.find({ artist: artistId });
    res.status(200).json({ message: "Arts fetched successfully", arts });
  } catch (error) {
    console.error("Error fetching arts:", error.message);
    res.status(500).json({ message: "An error occurred while fetching arts" });
  }
});

/****************** ADD ARTS TO EXHIBITION ******************/
// Add art to an exhibition
router.post("/exhibitions/add-art", async (req, res) => {
  try {
    const { exhibitionId } = req.body;
    const { artId } = req.body;

    const exhibition = await Exhibition.findById(exhibitionId);
    if (!exhibition) {
      return res.status(404).json({ message: "Exhibition not found" });
    }

    const art = await Art.findById(artId);
    if (!art) {
      return res.status(404).json({ message: "Art not found" });
    }

    const isArtAlreadyAdded = exhibition.arts.includes(artId);

    if (isArtAlreadyAdded) {
      return res
        .status(400)
        .json({ message: "Art is already in the exhibition" });
    }

    exhibition.arts.push(artId);
    await exhibition.save();

    res.status(200).json({ message: "Art added to exhibition", exhibition });
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

/****************** ADD ARTS TO COMPETITION ******************/
router.post("/competition/add-art", async (req, res) => {
  try {
    const { competitionId, artId } = req.body;

    const competition = await Competition.findById(competitionId);
    if (!competition) {
      return res.status(404).json({ message: "Competition not found" });
    }

    const art = await Art.findById(artId);
    if (!art) {
      return res.status(404).json({ message: "Art not found" });
    }

    const isArtAlreadyAdded = competition.arts.includes(artId);

    if (isArtAlreadyAdded) {
      return res
        .status(400)
        .json({ message: "Art is already in the competition" });
    }

    competition.arts.push(artId);
    await competition.save();

    res.status(200).json({ message: "Art added to competition", competition });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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

// FETCHING ORDERS OF THE ARTIST.............
router.get("/artistOrders/:artistId", async (req, res) => {
  try {
    const { artistId } = req.params;

    // Find all orders for the artist's art
    const orders = await Order.find()
      .populate({
        path: "art",
        match: { artist: artistId },
        select: "title price",
      })
      .populate("buyer", "name email")
      .exec();

    // Filter out orders where the art does not match the artistId
    const filteredOrders = orders.filter((order) => order.art);

    res.status(200).json(filteredOrders);
  } catch (error) {
    console.error("Error fetching orders for artist:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the orders" });
  }
});

module.exports = router;
