const mongoose = require("mongoose")
const { boolean } = require("webidl-conversions")

const pokemonSchema = mongoose.Schema(
  {
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Trainer",
    },
    name: {
      type: String,
      required: [false, "Please add a name value"],
    },
    species: {
      type: String,
      require: [true, "Please add a species value"],
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model("Pokemon", pokemonSchema)
