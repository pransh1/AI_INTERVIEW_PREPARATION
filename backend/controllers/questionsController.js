const { generateQuestions } = require("../services/aiService.js");

const getQuestions = async (req, res) => {
  try {
    const prefernces = req.body;
    const questions = await generateQuestions(prefernces);
    return res.status(200).json({
      success:true,
      questions,
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: "Failed to generate question",
      error: error.message,
    });
  }
}

module.exports = { getQuestions };
