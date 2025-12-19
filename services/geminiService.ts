
import { GoogleGenAI, Type } from "@google/genai";
import { MCQ, TestConfig, PerformanceInsights, UserAnswer } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateQuestions = async (config: TestConfig): Promise<MCQ[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const pyqContext = config.pyqRule 
    ? "Maintain a balance: 60% of questions should reflect historical patterns and standard PYQ difficulty, while 40% should be fresh conceptual applications."
    : "Generate purely original conceptual questions.";

  const prompt = config.sourceText 
    ? `Based on the following study material, generate ${config.questionCount} high-quality multiple choice questions.
       Material: ${config.sourceText.substring(0, 5000)}
       Target Subject: ${config.subject}
       Difficulty: ${config.difficulty}`
    : `Generate ${config.questionCount} high-quality MCQs for the competitive exam category: ${config.category}.
       Subject: ${config.subject}
       Difficulty Level: ${config.difficulty}
       Strategy: ${pyqContext}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "An array of exactly 4 options."
            },
            correctAnswer: { 
              type: Type.INTEGER,
              description: "0-indexed index of the correct option."
            },
            metadata: {
              type: Type.OBJECT,
              properties: {
                subject: { type: Type.STRING },
                difficulty: { type: Type.STRING },
                concept: { type: Type.STRING }
              },
              required: ["subject", "difficulty", "concept"]
            }
          },
          required: ["id", "question", "options", "correctAnswer", "metadata"],
          propertyOrdering: ["id", "question", "options", "correctAnswer", "metadata"]
        }
      }
    }
  });

  try {
    const text = response.text;
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Failed to generate valid test questions. Please try again.");
  }
};

export const generateDiagnosticInsights = async (
  questions: MCQ[],
  answers: UserAnswer[],
  config: TestConfig
): Promise<PerformanceInsights> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const performanceSummary = answers.map((ans, idx) => ({
    question: questions[idx].question,
    correct: ans.selectedOption === questions[idx].correctAnswer,
    concept: questions[idx].metadata.concept,
    timeSpent: ans.timeSpent
  }));

  const prompt = `Analyze this test performance for ${config.subject} at ${config.difficulty} difficulty.
    Performance Data: ${JSON.stringify(performanceSummary)}
    
    Provide a diagnostic report including:
    1. Overall score out of 100.
    2. 3 Specific Strengths (concept names).
    3. 3 Specific Focus Areas (concepts to improve).
    4. A premium synthesis paragraph (3-4 sentences) on the student's conceptual maturity and future roadmap.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallScore: { type: Type.NUMBER },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          focusAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
          synthesis: { type: Type.STRING }
        },
        required: ["overallScore", "strengths", "focusAreas", "synthesis"]
      }
    }
  });

  return JSON.parse(response.text);
};
