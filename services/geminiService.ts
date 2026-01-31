
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSkillsTest = async (skill: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a 5-question multiple choice test for the skill: ${skill}. 
               Include diverse difficulties (Easy, Medium, Hard).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.INTEGER, description: "0-based index of the correct option" },
            difficulty: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "difficulty"]
        }
      }
    }
  });
  
  return JSON.parse(response.text);
};

export const analyzeResume = async (resumeText: string, targetJob?: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this resume content: "${resumeText}". ${targetJob ? `Target Job: ${targetJob}` : ''}
               Evaluate based on ATS compatibility, keyword matching, formatting, and skill relevance.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          atsScore: { type: Type.NUMBER },
          missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
          relevanceToRole: { type: Type.NUMBER },
          suggestedSummary: { type: Type.STRING }
        },
        required: ["atsScore", "missingKeywords", "improvements", "relevanceToRole"]
      }
    }
  });
  
  return JSON.parse(response.text);
};

export const getProjectRecommendations = async (skills: string[], goal: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Suggest 3 real-world portfolio projects for a developer with skills: ${skills.join(", ")}. Goal: ${goal}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
            roadmap: { type: Type.ARRAY, items: { type: Type.STRING } },
            githubTemplate: { type: Type.STRING }
          },
          required: ["title", "difficulty", "techStack", "roadmap"]
        }
      }
    }
  });
  
  return JSON.parse(response.text);
};
