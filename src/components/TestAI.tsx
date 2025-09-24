import { useState } from "react";

export default function TestAI() {
  const [messages, setMessages] = useState<string[]>([]);
  const [product, setProduct] = useState<any>(null);

  const sendQuery = async (query: string) => {
    const response = await fetch("http://localhost:3002/chat/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, userId: "user123" }),
    });

    if (!response.body) {
      console.error("No response body");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("event:")) {
          const eventType = line.replace("event: ", "").trim();
          continue;
        }
        if (line.startsWith("data:")) {
          try {
            const data = JSON.parse(line.replace("data: ", "").trim());
            if (chunk.includes("event: token")) {
              setMessages((prev) => [...prev, data.text.delta]);
            }
            if (chunk.includes("event: product")) {
              setProduct(data.product);
            }
            if (chunk.includes("event: error")) {
              console.error("Error from server:", data.message);
            }
          } catch (err) {
            console.error("Parse error:", err);
          }
        }
      }
    }
  };

  return (
    <div className="p-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => sendQuery("Show me some shirts")}
      >
        Ask
      </button>

      <div className="mt-4">
        <h2 className="font-bold">AI Reply:</h2>
        <p>{messages.join("")}</p>
      </div>
    </div>
  );
}
