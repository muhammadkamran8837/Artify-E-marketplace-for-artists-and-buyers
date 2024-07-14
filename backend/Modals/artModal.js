const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buyer",
    },
  ],
  comments: [
    {
      text: String,
      buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyer",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  ratings: [
    {
      buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyer",
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Art = mongoose.model("Art", ArtSchema);

module.exports = Art;
