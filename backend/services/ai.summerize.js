const { GoogleGenAI , Type} = require("@google/genai");

require("dotenv").config();

console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.summeriseFeedback = async (prompt) => {
  const output = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  return output.text;
};
