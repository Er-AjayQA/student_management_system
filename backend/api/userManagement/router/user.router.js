// ***************** Imports ***************** //
const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authMiddleware = require("../../../middleware/authMiddleware");

// ***************** Routes ***************** //
router.post("/user-signup", userController.userSignup);
router.post("/login", userController.login);
router.post("/send-otp", authMiddleware, userController.sendOtp);
router.post("/resend-otp", authMiddleware, userController.resendOtp);
router.put("/otp-verification", authMiddleware, userController.otpVerification);

// ***************** Exports ***************** //
module.exports = router;
