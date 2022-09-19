const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Trainer = require("../models/trainer-model");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // gets token from header
      token = req.headers.authorization.split(" ")[1];

      // verifies the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // gets trainers from the token
      req.trainer = await Trainer.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Trainer not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Trainer not authorzed, token not found");
  }
});

module.exports = { protect };
