"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { SendIcon, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function MathAIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Halo! Saya Math AI, asisten matematika Anda. Apa yang ingin Anda tanyakan tentang matematika hari ini?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    setIsLoading(true);

    try {
      const response = await fetch("/api/math-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage,
          history: messages.map((msg: any) => ({
            role: msg.role,
            parts: [{ text: msg.content }],
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to get response from Math AI"
        );
      }

      const data = await response.json();

      // Add AI response to chat
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (err) {
      console.error("Error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        <span className="text-amber-500">Math AI</span> - Asisten Matematika
        Pintar
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Info Panel - Desktop */}
          <div className="hidden md:block bg-amber-50 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Tanya Apapun Tentang Matematika
            </h2>
            <p className="text-gray-600 mb-6">
              Math AI adalah asisten virtual yang dapat membantu Anda memahami
              konsep matematika, menyelesaikan soal, dan menjawab pertanyaan
              seputar matematika.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span>Penjelasan langkah demi langkah</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span>Visualisasi konsep matematika</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span>Bantuan untuk PR matematika</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span>Tersedia 24/7 untuk menjawab pertanyaan Anda</span>
              </li>
            </ul>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 flex flex-col h-[600px]">
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message: any, index: number) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-amber-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800">
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <p>Math AI sedang berpikir...</p>
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="flex justify-center mb-4">
                  <div className="max-w-[80%] p-3 rounded-lg bg-red-100 text-red-800">
                    <p>Error: {error}</p>
                    <p className="text-sm mt-1">
                      Silakan coba lagi atau hubungi administrator jika masalah
                      berlanjut.
                    </p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="border-t p-4">
              <div className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik pertanyaan matematika Anda..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-amber-500 text-white px-4 py-2 rounded-r-lg hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <SendIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
