import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

async function getweather(query) {
  const options = {
    method: "GET",
    url: "https://weather-api167.p.rapdapi.com/api/weather/forecast",
    params: {
      place: `${query}`,
      cnt: "3",
      units: "standard",
      type: "three_hour",
      mode: "json",
      lang: "en",
    },
    headers: {
      "x-rapidapi-key": "9f49f911f5msh2b48ce8feb1ap1904bfjsn2f58edb80da4",
      "x-rapidapi-host": "weater-api167.p.rapidapi.com",
      Accept: "application/json",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.list;
  } catch (error) {
    console.error(error);
  }
}

async function google(params) {
  const options = {
    method: "GET",
    url: "https://google-search74.p.rapdapi.com/",
    params: {
      query: params,
      limit: "1",
      related_keywords: "true",
    },
    headers: {
      "x-rapidapi-key": "9f49f911f5msh2b8ce8459f1ap1904bfjsn2f58e0da4",
      "x-rapidapi-host": "google-search74.p.rapipi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
}

const chatHistories = new Map();
export default async function farmersAI(
  chatId,
  apiKey = "AIzaSyB_RmZ5ibOZw2xZ8DifGXNCLT-Hk",
  query,
  models = "gemini-2.0-flash"
) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: models });

    // Define the function schema
    const googleSearchSchema = {
      name: "google_search",
      description: "you can search on google",
      parameters: {
        type: "OBJECT",
        properties: {
          query: { type: "STRING", description: "The search query." },
        },
        required: ["query"],
      },
    };

    const getWhatherSchema = {
      name: "get_weather",
      description: "can get the weather",
      parameters: {
        type: "OBJECT",
        properties: {
          place: { type: "STRING", description: "The place. e.g panadura,LK." },
        },
        required: ["place"],
      },
    };

    let messages = chatHistories.get(chatId);
    if (!messages) {
      messages = [
        {
          role: "assistant",
          parts: [
            { text: "Your name is Paddy doctor." },
            {
              text: "Don't say ' As a language model'. Our users don't need to know that you're an AI. You're a Paddy doctor. only Paddy doctor. understand that. you are human not a AI.",
            },
          ],
        },
        {
          role: "assistant",
          parts: [
            {
              text: ` Always respond like a human being. Appear to the client as a live agent.`,
            },
          ],
        },
        {
          role: "assistant",
          parts: [
            {
              text: ` Your clients are often paddy farmers. They will come to you with questions related to their farming. Listen carefully and answer their questions.`,
            },
          ],
        },
      ];
      chatHistories.set(chatId, messages);
    }

    messages.push({ role: "user", parts: [{ text: query }] });

    let finalResponse = null;
    let safetyBreak = 0;

    while (safetyBreak++ < 5) {
      const result = await model.generateContent({
        contents: messages,
        tools: [
          { function_declarations: [googleSearchSchema] },
          { function_declarations: [getWhatherSchema] },
        ],
      });

      const response = result.response;
      const candidate = response.candidates?.[0];
      const content = candidate?.content;

      if (!content) break;

      const parts = content.parts;
      if (!parts || parts.length === 0) break;

      const part = parts[0];
      if (part.functionCall) {
        const functionCall = part.functionCall;
        let functionResult;

        switch (functionCall.name) {
          case "google_search":
            functionResult = await google(functionCall.args.id);
            break;
          case "get_weather":
            functionResult = await getweather(functionCall.args.place);
            break;

          default:
            console.log("Unknown function called:", functionCall.name);
            functionResult = null;
        }
        messages.push({
          role: "model",
          parts: [{ functionCall }],
        });

        messages.push({
          role: "function",
          parts: [
            {
              functionResponse: {
                name: functionCall.name,
                response: { result: functionResult },
              },
            },
          ],
        });
      } else if (part.text) {
        finalResponse = part.text;
        messages.push({ role: "model", parts: [{ text: finalResponse }] });
        break;
      } else {
        break;
      }
    }
    return finalResponse; // || "I couldn't process that request. Please try again.";
  } catch (error) {
    return false;
  }
}
