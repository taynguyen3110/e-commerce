export interface AIResponse {
  message: string;
  product?: any;
}

const MAX_TOKENS = 110;
const TEMPERATURE = 0.7;
const MODEL = "ft:gpt-4o-mini-2024-07-18:ecommerce::BC3QFqu7";
const URL = import.meta.env.VITE_BACKEND_URL;

export type SSEHandlers = {
  onFirstToken?: () => void;
  onToken?: (text: string) => void;
  onProduct?: (product: any) => void;
  onError?: (message: string) => void;
  onComplete?: () => void;
};

export const aiService = {
  async getProductRecommendations(
    query: string,
    userId: string
  ): Promise<AIResponse> {
    try {
      const response = await fetch(`${URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          userId,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error getting product recommendations:", error);
      return {
        message:
          "I'm having trouble generating recommendations right now. Please try again later.",
      };
    }
  },
  async getProductRecommendationsStream(
    query: string,
    userId: string,
    handlers: SSEHandlers
  ): Promise<void> {
    const response = await fetch(`${URL}/chat/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, userId }),
    });

    if (!response.body) {
      handlers.onError?.("No response body");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let productBuffer: any = null;
    let firstTokenReceived = false;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("event:")) {
          continue;
        }

        if (line.startsWith("data:")) {
          try {
            const data = JSON.parse(line.replace("data: ", "").trim());

            if (chunk.includes("event: token")) {
              if (!firstTokenReceived) {
                firstTokenReceived = true;
                handlers.onFirstToken?.(); // ✅ fire once only
              }
              handlers.onToken?.(data.text.delta);
            }
            if (chunk.includes("event: product")) {
              productBuffer = data.product;
            }
            if (chunk.includes("event: error")) {
              handlers.onError?.(data.message);
            }
          } catch (err) {
            handlers.onError?.("Parse error: " + (err as Error).message);
          }
        }
      }
    }
    if (productBuffer) {
      handlers.onProduct?.(productBuffer);
    }
    handlers.onComplete?.();
  },
};
