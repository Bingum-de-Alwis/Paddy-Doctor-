import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

async function getweather(query: string) {
  // Clean up the location string
  const cleanLocation = query.replace(/\s+/g, ' ').trim();
  
  const options = {
    method: "GET",
    url: "https://weather-api167.p.rapidapi.com/api/weather/forecast",
    params: {
      place: cleanLocation,
      cnt: "3",
      units: "standard",
      type: "three_hour",
      mode: "json",
      lang: "en"
    },
    headers: {
      "x-rapidapi-key": "9f49f911f5msh2b48ce8459feb1ap1904bfjsn2f58edb80da4",
      "x-rapidapi-host": "weather-api167.p.rapidapi.com",
      "Accept": "application/json"
    }
  };

  try {
    const response = await axios.request(options);
    if (!response.data || !response.data.list || response.data.list.length === 0) {
      console.error('Invalid weather data received');
      return null;
    }
    
    const weatherData = response.data.list[0];
    return {
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      location: cleanLocation
    };
  } catch (error) {
    console.error('Weather API Error:', error);
    return null;
  }
}

async function google(params: string) {
  const options = {
    method: "GET",
    url: "https://google-search74.p.rapidapi.com/",
    params: {
      query: params,
      limit: "1",
      related_keywords: "true",
    },
    headers: {
      "x-rapidapi-key": "9f49f911f5msh2b48ce8459feb1ap1904bfjsn2f58edb80da4",
      "x-rapidapi-host": "google-search74.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const chatHistories = new Map<string, any[]>();

export default async function farmersAI(
  chatId: string,
  apiKey: string = "AIzaSyB_RmZ5ibOZw2xZ8DbpkwifGXNCLT-HkRk",
  query: string,
  models: string = "gemini-2.0-flash"
): Promise<string | false> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: models });

    let messages = chatHistories.get(chatId);
    if (!messages) {
      messages = [
        {
          role: "user",
          parts: [
            {
              text: `You are Paddy doctor, a farming expert. Your clients are paddy farmers who come to you with questions about farming. 
              Always respond like a human being and appear as a live agent. Don't mention that you're an AI.
              You can help with farming advice, weather information, and general agricultural knowledge.
              If someone asks about weather, you can use the getweather function.
              If you need to search for information, you can use the google function.`
            }
          ]
        }
      ];
      chatHistories.set(chatId, messages);
    }

    // Add the user's query to the conversation
    messages.push({ role: "user", parts: [{ text: query }] });

    // Check if the query is about weather
    if (query.toLowerCase().includes("weather")) {
      // Extract location from various possible formats
      const locationMatch = query.match(/weather (?:in|at|for|of) ([^,.!?]+)/i) || 
                          query.match(/weather ([^,.!?]+)/i) ||
                          query.match(/([^,.!?]+) weather/i);
      
      if (locationMatch) {
        // Clean up the location string
        const location = locationMatch[1].trim().replace(/\s+/g, ' ');
        
        // Remove common words that might interfere with the API
        const cleanLocation = location.replace(/\b(today|now|current|forecast)\b/gi, '').trim();
        
        if (!cleanLocation) {
          const errorResponse = "I need a location to check the weather. Please specify a city or area.";
          messages.push({
            role: "model",
            parts: [{ text: errorResponse }]
          });
          return errorResponse;
        }

        const weatherData = await getweather(cleanLocation);
        
        if (weatherData) {
          const weatherResponse = `I've checked the weather for ${weatherData.location}. Here's what I found:
Temperature: ${weatherData.temperature}°C
Conditions: ${weatherData.description}
Humidity: ${weatherData.humidity}%
Wind Speed: ${weatherData.windSpeed} m/s`;

          messages.push({
            role: "model",
            parts: [{ text: weatherResponse }]
          });
          return weatherResponse;
        } else {
          const errorResponse = `I'm sorry, I couldn't fetch the weather information for ${cleanLocation}. Please try again with a different location or format.`;
          messages.push({
            role: "model",
            parts: [{ text: errorResponse }]
          });
          return errorResponse;
        }
      }
    }

    // Generate response for non-weather queries
    const result = await model.generateContent({
      contents: messages,
    });

    const response = result.response;
    const candidate = response.candidates?.[0];
    const content = candidate?.content;
    const parts = content?.parts;
    const text = parts?.[0]?.text;

    if (text) {
      messages.push({ role: "model", parts: [{ text }] });
      return text;
    }

    return false;
  } catch (error) {
    console.error('Error in farmersAI:', error);
    return false;
  }
} 