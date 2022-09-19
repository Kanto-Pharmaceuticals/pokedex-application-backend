const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const pokemonSchema = mongoose.Schema(
  {
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Trainer",
    },
    text: {
      type: String,
      required: [false, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Pokemon", pokemonSchema);
