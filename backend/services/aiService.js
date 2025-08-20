const openai = require("../config/openAi.js");

// generate interview question using AI
async function generateQuestions(preferences) {
  const { topic, difficulty, mode } = preferences;

  const prompt = `Topic : ${topic}
Difficulty : ${difficulty}
Mode: ${mode}

Format response strictly as JSON array:
[
    { "question": "string", "topic": "string", "difficulty": "string" }
]`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const raw = response.choices[0].message.content.trim();

  let questions = [];
  try {
    // extract only the JSON array part
    const match = raw.match(/\[[\s\S]*\]/);
    if (match) {
      questions = JSON.parse(match[0]);
    } else {
      console.error("No JSON array found in AI response:", raw);
    }
  } catch (error) {
    console.error("Failed to parse AI response:", error, "\nRaw:", raw);
  }

  return questions;
}

module.exports = { generateQuestions };
