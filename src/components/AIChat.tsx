import React, { useState, useEffect, useRef } from "react";
import { aiService } from "../services/aiService";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getOrCreateUserId } from "../utils/userId";
import ProductCard, { Product } from "./ProductCard";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

interface AIChatProps {
  onResponse?: (response: string) => void;
}

const initialMessage = {
  role: "assistant" as "assistant",
  content: "👋 Hi! How can I help you today?",
};

export const AIChat: React.FC<AIChatProps> = ({ onResponse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toolTipOpen, setToolTipOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    Array<{ role: "user" | "assistant"; content: string; product?: Product }>
  >([initialMessage]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [typingBuffer, setTypingBuffer] = useState("");

  // Auto-scroll to bottom on new message or loading state change
  useEffect(() => {
    if (messagesEndRef.current) {
      const behavior = typingBuffer ? "auto" : "smooth";
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior });
      });
    }
  }, [chatHistory, typingBuffer]);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Tooltip timer
  useEffect(() => {
    setTimeout(() => {
      setToolTipOpen(true);
    }, 500);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!typingBuffer) return;

    const interval = setInterval(() => {
      setChatHistory((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.role === "assistant") {
          return [
            ...prev.slice(0, -1),
            {
              ...last,
              content: (last.content || "") + typingBuffer[0], // add one char
            },
          ];
        }
        return [...prev, { role: "assistant", content: typingBuffer[0] }];
      });

      setTypingBuffer((prev) => prev.slice(1)); // remove used char
    }, 5); // adjust speed here (ms per char)

    return () => clearInterval(interval);
  }, [typingBuffer]);

  const userId: string = getOrCreateUserId()!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsThinking(true);
    setIsLoading(true);
    const userMessage = message;
    setMessage("");
    setChatHistory((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      await aiService.getProductRecommendationsStream(userMessage, userId, {
        onFirstToken: () => {
          setIsThinking(false);
        },
        onToken: (text) => {
          setTypingBuffer((prev) => prev + text);
          //   setChatHistory((prev) => {
          //     const last = prev[prev.length - 1];
          //     if (last && last.role === "assistant") {
          //       return [
          //         ...prev.slice(0, -1),
          //         { ...last, content: (last.content || "") + text },
          //       ];
          //     }
          //     return [...prev, { role: "assistant", content: text }];
          //   });
        },
        onProduct: (product) => {
          let prodItem = product[0];
          setChatHistory((prev) => {
            const last = prev[prev.length - 1];
            if (last && last.role === "assistant") {
              return [...prev.slice(0, -1), { ...last, product: prodItem }];
            }
            return [
              ...prev,
              { role: "assistant", content: "", product: prodItem },
            ];
          });
        },
        onError: (msg) => {
          setChatHistory((prev) => [
            ...prev,
            { role: "assistant", content: msg },
          ]);
        },
        onComplete: () => {
          if (typingBuffer) {
            setChatHistory((prev) => {
              const last = prev[prev.length - 1];
              if (last && last.role === "assistant") {
                return [
                  ...prev.slice(0, -1),
                  { ...last, content: (last.content || "") + typingBuffer },
                ];
              }
              return [...prev, { role: "assistant", content: typingBuffer }];
            });
            setTypingBuffer("");
          }
        },
      });
    } catch (error) {
      console.error("Error in AI chat:", error);
      const errorMessage =
        "I'm having trouble processing your request right now. Please try again later.";
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: errorMessage },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const onOpenChat = () => {
    setIsOpen(true);
    setToolTipOpen(false);
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    });
  };

  const onCloseChat = () => {
    setIsOpen(false);
    setTimeout(() => setToolTipOpen(true), 1000); // show tooltip again after 1s
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 md:bottom-4 md:right-4">
      {/* Chat Icon Button */}
      {!isOpen && (
        <div className="flex flex-col">
          {/* Tooltip */}
          {toolTipOpen && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                onClick={onOpenChat}
                className="bg-white relative shadow-lg rounded-xl px-3 py-2 text-sm text-gray-700  mr-2 cursor-pointer"
              >
                What are you looking for?
                {/* Arrow */}
                <div className="absolute bottom-[-6px] right-[25px] w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
              </motion.div>
            </AnimatePresence>
          )}
          <div className="flex justify-end">
            <motion.button
              animate={{ scale: [1, 1.1, 1] }} // subtle pulse
              transition={{ repeat: Infinity, duration: 2 }}
              onClick={onOpenChat}
              className="bg-black hover:bg-gray-700 text-white rounded-full p-3 m-4 shadow-md shadow-black/75"
            >
              <ChatBubbleLeftRightIcon className="h-6 w-6 align-middle" />
            </motion.button>
          </div>
        </div>
      )}

      {/* Chat Window with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-2xl shadow-black flex flex-col rounded-lg
          /* Mobile: Full screen */
          fixed inset-0
          /* Tablet and up: Fixed size window */
          md:absolute md:inset-auto md:bottom-0 md:right-0
          md:w-[400px] md:h-[600px]
          md:rounded-lg md:mb-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-lg">
              <h3 className="font-semibold text-gray-800">Shop Assistant</h3>
              <button
                onClick={onCloseChat}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Welcome message when chat history is empty */}
              {chatHistory.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <p>👋 Hi! How can I help you today?</p>
                  <p className="text-sm mt-2">
                    Ask me anything about our products!
                  </p>
                </div>
              )}

              {chatHistory.map((chat, index) => {
                const isLastMessage = index === chatHistory.length - 1;
                return (
                  <div key={index}>
                    <div
                      className={`flex mb-2 ${
                        chat.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg shadow-md px-3 py-2 ${
                          chat.role === "user"
                            ? "bg-black shadow-slate-400 text-white"
                            : "bg-gray-100 text-gray-800"
                        } break-words`}
                      >
                        {chat.content}
                      </div>
                    </div>
                    {chat.role === "assistant" &&
                      chat.product &&
                      (isLastMessage ? (
                        typingBuffer === "" && (
                          <ProductCard key={uuidv4()} {...chat.product} />
                        )
                      ) : (
                        <ProductCard key={uuidv4()} {...chat.product} />
                      ))}
                  </div>
                );
              })}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="flex items-center bg-gray-100 rounded-lg shadow-md px-3 py-2">
                    <span className="sr-only">Assistant is typing...</span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              {/* Move this inside the scrollable container */}
              <div ref={messagesEndRef}></div>
            </div>
            <div className="p-4 border-t bg-white rounded-b-lg">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about our products..."
                  className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black
                  text-base md:text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-600 
                  disabled:bg-gray-300 transition-colors whitespace-nowrap
                  text-base md:text-sm"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
