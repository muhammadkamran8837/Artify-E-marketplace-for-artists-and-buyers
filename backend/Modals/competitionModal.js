const mongoose = require("mongoose");

const competitionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  arts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Art",
    },
  ],
});

const Competition = mongoose.model("Competition", competitionSchema);

module.exports = Competition;
