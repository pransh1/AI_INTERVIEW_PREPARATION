const express = require("express");
const { signupController, loginController , profileController } = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddlewars.js");
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", authMiddleware, loginController);
router.get("/profile", authMiddleware, profileController);

module.exports = router;
