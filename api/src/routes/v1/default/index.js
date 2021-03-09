const express = require("express");
const router = express.Router();

const {
  addUser,
  resendOtp,
  verifyOtp,
  loginUser,
  loginUserConfirmation

} = require("../../../controllers/userController");

router.post("/auth/registration", (req, res) => addUser(req, res));
router.post("/auth/resendOtp", (req, res) => resendOtp(req, res));
router.post("/auth/verifyOtp", (req, res) => verifyOtp(req, res));
router.post("/auth/login", (req, res) => loginUser(req, res));
router.post("/auth/loginVerify", (req, res) => loginUserConfirmation(req, res));

module.exports = router;
