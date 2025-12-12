import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "",
});

export async function generateCoverLetter(prompt: string) {
  try {
    if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
      console.error("API Key is not configured");
      return "Error: API key is not configured. Please add GEMINI_API_KEY to your .env file.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "Error: Could not generate cover letter.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    console.error("Error details:", error?.message || error);
    
    // Handle quota exceeded error
    if (error?.status === 429 || error?.message?.includes("quota")) {
      return "Error: Daily API quota exceeded. Please try again later or upgrade your API plan at https://ai.google.dev/pricing";
    }
    
    if (error?.message) {
      return `Error: ${error.message}`;
    }
    return "Error: Could not generate cover letter.";
  }
}