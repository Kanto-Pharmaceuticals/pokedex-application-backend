const asyncHandler = require("express-async-handler")
const { userInfo } = require("os")

const Pokemon = require("../models/pokemon-model")
const Trainer = require("../models/trainer-model")

/* @route GET /api/pokemon */
const getPokemon = asyncHandler(async (req, res) => {
  const pokemon = await Pokemon.find({ trainer: req.trainer.id })

  res.status(200).json({ pokemon })
})

/* @route SET /api/pokemon */
const setPokemon = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error("Please add a Pokémon to set")
  }

  const pokemon = await Pokemon.create({
    name: req.body.name,
    trainer: req.trainer.id,
  })

  res.status(200).json(pokemon)
})

/* @route SET /api/pokemon/i:id */
const updatePokemon = asyncHandler(async (req, res) => {
  const pokemon = await Pokemon.findById(req.params.id)

  if (!pokemon) {
    res.status(400)
    throw new Error("Pokemon not found")
  }

  // checks for trainer
  if (!req.trainer) {
    res.status(401)
    throw new Error("Trainer not found")
  }

  // ensures logged in trainer matches pokemon trainer
  if (pokemon.trainer.toString() !== req.trainer.id) {
    res.status(401)
    throw new Error("Trainer not authorized")
  }

  const updatedPokemon = await Pokemon.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedPokemon)
})

/* @route DELETE /api/pokemon/i:id */
const deletePokemon = asyncHandler(async (req, res) => {
  const pokemon = await Pokemon.findById(req.params.id)

  if (!pokemon) {
    res.status(400)
    throw new Error("Pokemon not found")
  }

  // checks for trainer
  if (!req.trainer) {
    res.status(401)
    throw new Error("Trainer not found")
  }

  // ensures logged in trainer matches pokemon trainer
  if (pokemon.trainer.toString() !== req.trainer.id) {
    res.status(401)
    throw new Error("Trainer not authorized")
  }

  await pokemon.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getPokemon,
  setPokemon,
  updatePokemon,
  deletePokemon,
}
