const express = require("express");
const {getQuestions} = require("../controllers/questionsController.js");
const authMiddleware = require("../middlewares/authMiddlewars.js");
const router = express.Router();

router.post("/generate", authMiddleware, getQuestions);

module.exports = router;
