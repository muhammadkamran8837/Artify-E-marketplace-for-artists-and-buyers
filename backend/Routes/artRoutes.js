const express = require("express");
const Art = require("../Modals/artModal");
const Buyer = require("../Modals/buyerModal");
const Competition = require("../Modals/competitionModal");
const router = express.Router();

// Fetch all arts
router.get("/allArts", async (req, res) => {
  try {
    const arts = await Art.find().populate("artist", "name");
    res.status(200).json(arts);
  } catch (error) {
    console.error("Error fetching arts:", error.message);
    res.status(500).json({ message: "An error occurred while fetching arts" });
  }
});

// Like an art
router.post("/:id/like", async (req, res) => {
  try {
    const artId = req.params.id;
    const userId = req.body.userId;

    const art = await Art.findById(artId);
    if (!art) {
      return res.status(404).json({ message: "Art not found" });
    }

    // Check if the user has already liked the art
    if (art.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this art" });
    }

    // Add user to likes array
    art.likes.push(userId);
    await art.save();

    res
      .status(200)
      .json({ message: "Art liked successfully", likes: art.likes.length });
  } catch (error) {
    console.error("Error liking art:", error.message);
    res.status(500).json({ message: "An error occurred while liking art" });
  }
});

// Comment on an art
router.post("/:id/comment", async (req, res) => {
  try {
    const artId = req.params.id;
    const { userId, commentText } = req.body;

    const art = await Art.findById(artId);
    if (!art) {
      return res.status(404).json({ message: "Art not found" });
    }

    // Fetch the buyer's name from the database
    const buyer = await Buyer.findById(userId);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    // Add comment to comments array
    const newComment = {
      text: commentText,
      buyer: buyer._id,
      createdAt: new Date(),
    };

    art.comments.push(newComment);
    await art.save();

    // Populate the comments with buyer's name
    await art.populate("comments.buyer", "name");

    res
      .status(200)
      .json({ message: "Comment added successfully", comments: art.comments });
  } catch (error) {
    console.error("Error commenting on art:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while commenting on art" });
  }
});

// Fetch specific art details by ID
router.get("/:id", async (req, res) => {
  try {
    const art = await Art.findById(req.params.id)
      .populate("artist", "name")
      .populate("comments.buyer", "name");
    if (!art) {
      return res.status(404).json({ message: "Art not found" });
    }
    res.status(200).json(art);
  } catch (error) {
    console.error("Error fetching art:", error.message);
    res.status(500).json({ message: "An error occurred while fetching art" });
  }
});

// RATING AN ART
// RATING AN ART
router.post("/:id/rate", async (req, res) => {
  try {
    const artId = req.params.id;
    const { userId, rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const art = await Art.findById(artId);
    if (!art) {
      return res.status(404).json({ message: "Art not found" });
    }

    const competition = await Competition.findOne({ arts: artId });
    if (!competition) {
      return res.status(400).json({ message: "Art is not in a competition" });
    }

    const existingRating = art.ratings.find(
      (r) => r.buyer.toString() === userId.toString()
    );

    if (existingRating) {
      return res
        .status(400)
        .json({ message: "You have already rated this art" });
    } else {
      art.ratings.push({ buyer: userId, rating });
    }

    await art.save();
    res
      .status(200)
      .json({ message: "Art rated successfully", ratings: art.ratings });
  } catch (error) {
    console.error("Error rating art:", error.message);
    res.status(500).json({ message: "An error occurred while rating art" });
  }
});

module.exports = router;
