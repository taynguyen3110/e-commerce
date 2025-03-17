import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AIChatProps {
  context?: string;
  onResponse?: (response: string) => void;
}

export const AIChat: React.FC<AIChatProps> = ({ context, onResponse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    const userMessage = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      let response;
      if (context) {
        response = await aiService.answerProductQuestion(userMessage, context);
      } else {
        response = await aiService.getProductRecommendations(userMessage);
      }

      setChatHistory(prev => [...prev, { role: 'assistant', content: response.message }]);
      onResponse?.(response.message);
    } catch (error) {
      console.error('Error in AI chat:', error);
      const errorMessage = "I'm having trouble processing your request right now. Please try again later.";
      setChatHistory(prev => [...prev, { role: 'assistant', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 md:bottom-4 md:right-4">
      {/* Chat Icon Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 m-4 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white shadow-xl flex flex-col
          /* Mobile: Full screen */
          fixed inset-0
          /* Tablet and up: Fixed size window */
          md:absolute md:inset-auto md:bottom-0 md:right-0
          md:w-[400px] md:h-[600px]
          md:rounded-lg md:mb-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <h3 className="font-semibold text-gray-800">AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
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
                <p className="text-sm mt-2">Ask me anything about our products!</p>
              </div>
            )}
            
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    chat.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  } break-words`}
                >
                  {chat.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-4 border-t bg-white">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about our products..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                  /* Mobile optimization */
                  text-base md:text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                  disabled:bg-blue-300 transition-colors whitespace-nowrap
                  /* Mobile optimization */
                  text-base md:text-sm"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}; 