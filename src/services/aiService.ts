import OpenAI from "openai";

// OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export interface ProductRecommendation {
  productId: string;
  reason: string;
}

export interface AIResponse {
  message: string;
  recommendations?: ProductRecommendation[];
}

const MAX_TOKENS = 110;
const TEMPERATURE = 0.7;
const MODEL = "ft:gpt-4o-mini-2024-07-18:ecommerce::BC3QFqu7";

export const aiService = {
  async getProductRecommendations(
    userPreferences: string
  ): Promise<AIResponse> {
    try {
      const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful e-commerce AI assistant. Provide product recommendations based on user preferences.",
          },
          {
            role: "user",
            content: userPreferences,
          },
        ],
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
      });

      return {
        message:
          completion.choices[0].message.content ||
          "I couldn't generate recommendations at this time.",
      };
    } catch (error) {
      console.error("Error getting product recommendations:", error);
      return {
        message:
          "I'm having trouble generating recommendations right now. Please try again later.",
      };
    }
  },

  async answerProductQuestion(
    question: string,
    productContext: string
  ): Promise<AIResponse> {
    try {
      const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful e-commerce AI assistant. Answer questions about products based on the provided context.",
          },
          {
            role: "user",
            content: `Context: ${productContext}\nQuestion: ${question}`,
          },
        ],
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
      });

      return {
        message:
          completion.choices[0].message.content ||
          "I couldn't answer your question at this time.",
      };
    } catch (error) {
      console.error("Error answering product question:", error);
      return {
        message:
          "I'm having trouble answering your question right now. Please try again later.",
      };
    }
  },

  async enhanceSearchQuery(query: string): Promise<AIResponse> {
    try {
      const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful e-commerce AI assistant. Enhance search queries to improve search results.",
          },
          {
            role: "user",
            content: query,
          },
        ],
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
      });

      return {
        message:
          completion.choices[0].message.content ||
          "I couldn't enhance your search query at this time.",
      };
    } catch (error) {
      console.error("Error enhancing search query:", error);
      return {
        message:
          "I'm having trouble enhancing your search query right now. Please try again later.",
      };
    }
  },
};
