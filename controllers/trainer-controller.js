const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const Trainer = require("../models/trainer-model")

/**
 * Register a new trainer
 * @route POST /api/trainers
 * @access Public
 */
const registerTrainer = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // check if necessary fields were entered
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please fill in all fields")
  }

  // check if a trainer exists with the same
  const trainerExists = await Trainer.findOne({ name })

  // throw a new error if a trainer already exists with the same email or name
  if (trainerExists) {
    res.status(400)
    throw new Error("Trainer already exists")
  }

  // generate salt and hash the password using it
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create a new trainer using the provided fields with the default role
  const trainer = await Trainer.create({
    name,
    email,
    password: hashedPassword,
    roles: "Novice",
  })

  // return status depending on outcome
  if (trainer) {
    // trainer was created successfully, send back details
    res.status(201).json({
      _id: trainer.id,
      name: trainer.name,
      email: trainer.email,
      roles: trainer.roles,
      token: generateToken(trainer._id),
    })
  } else {
    // trainer data was invalid, throw a new error
    res.status(400)
    throw new Error("Invalid trainer data")
  }
})

/**
 * Authenticate a trainer
 * @route POST /api/trainers/login
 * @access Public
 */
const loginTrainer = asyncHandler(async (req, res) => {
  const { name, password } = req.body

  // checks for the trainers name
  const trainer = await Trainer.findOne({ name })

  // compare the password with the one stored in database
  if (trainer && (await bcrypt.compare(password, trainer.password))) {
    // trainer authentication was successful, send back detail
    res.json({
      _id: trainer.id,
      name: trainer.name,
      email: trainer.email,
      roles: trainer.roles,
      token: generateToken(trainer._id),
    })
  } else {
    // invalid credentials
    res.status(400)
    throw new Error("Invalid trainer credentials")
  }
})

/**
 * Get user data
 * @route GET /api/trainers/me
 * @access Private
 */
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.trainer)
})

/**
 * Generates a JWT
 */
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

module.exports = {
  registerTrainer,
  loginTrainer,
  getMe,
}
