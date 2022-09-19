const express = require("express");
const router = express.Router();
const {
  registerTrainer,
  loginTrainer,
  getMe,
} = require("../controllers/trainer-controller");
const { protect } = require("../middleware/auth-middleware");

router.post("/", registerTrainer);
router.post("/login", loginTrainer);
router.get("/me", protect, getMe);

module.exports = router;
