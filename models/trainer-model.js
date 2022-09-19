const mongoose = require("mongoose");

const trainerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a trainer name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    roles: {
      type: String,
      required: [true, "Please add roles"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trainer", trainerSchema);
