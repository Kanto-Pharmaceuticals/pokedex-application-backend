const express = require("express");
const router = express.Router();
const {
  getPokemon,
  setPokemon,
  deletePokemon,
  updatePokemon,
} = require("../controllers/pokemon-controller");
const { protect } = require("../middleware/auth-middleware");

router.route("/").get(protect, getPokemon).post(protect, setPokemon);
router.route("/:id").delete(protect, deletePokemon).put(protect, updatePokemon);

module.exports = router;
