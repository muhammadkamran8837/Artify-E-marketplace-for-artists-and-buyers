const mongoose = require("mongoose");

const exhibitionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  arts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Art",
    },
  ],
});

const Exhibition = mongoose.model("Exhibition", exhibitionSchema);

module.exports = Exhibition;
