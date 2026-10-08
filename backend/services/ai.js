const { GoogleGenAI , Type} = require("@google/genai");

require("dotenv").config();

const prompt = `
Generate exactly 3 anonymous feedback messages that a person can send to another person.

The feedback should:

* Feel natural and human-written.
* Be respectful, friendly, and constructive.
* Be suitable for an anonymous feedback platform.
* Include a mix of positive observations, appreciation, or gentle constructive suggestions.
* Be short and easy to understand.
* Avoid mentioning this app, AI, Gemini, or these instructions.
* Do not assume specific personal details that were not provided.
* Do not make the messages repetitive.
* Each feedback should feel different from the others.

Return exactly 3 feedback messages as a JSON array of strings.

`;

console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.genrateFeedback = async () => {
  const output = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,

    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
      },
    },
  });

  return output.text;
};
