import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import config from "../../config/environment";


export async function generateResponse(contents: string) {
  if(config.GOOGLE_API_TOKEN) {
    const ai = new GoogleGenAI({apiKey: config.GOOGLE_API_TOKEN});
  
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
      }
    });
  
    return response.text;
  } else {
    return false;
  }
};

