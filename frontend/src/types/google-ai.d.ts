declare module '@google/generative-ai' {
  export class GoogleGenerativeAI {
    constructor(apiKey: string);
    getGenerativeModel(params: {
      model: string;
      generationConfig?: {
        temperature?: number;
        topK?: number;
        topP?: number;
        maxOutputTokens?: number;
      };
    }): GenerativeModel;
  }

  export interface GenerativeModel {
    generateContent(params: {
      contents: Array<{
        role: string;
        parts: Array<{
          text?: string;
          functionCall?: {
            name: string;
            args: any;
          };
        }>;
      }>;
      safetySettings?: Array<{
        category: string;
        threshold: string;
      }>;
    }): Promise<{
      response: {
        candidates?: Array<{
          content?: {
            parts: Array<{
              text?: string;
              functionCall?: {
                name: string;
                args: any;
              };
            }>;
          };
        }>;
      };
    }>;
  }
} 