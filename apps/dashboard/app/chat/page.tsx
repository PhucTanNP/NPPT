"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, Plus, Search, Sparkles, Trash2, Settings } from "lucide-react";
import { EmptyState } from "@ui/index";

const MOCK_CONVERSATIONS = [
  { id: "1", title: "Rust vs C++ comparison", preview: "Rust offers memory safety without...", time: "now", model: "Gemini" },
  { id: "2", title: "Quantum computing explained", preview: "Quantum computing leverages...", time: "2h ago", model: "Gemini" },
  { id: "3", title: "Next.js 14 best practices", preview: "Here are the key patterns for...", time: "yesterday", model: "DeepSeek" },
  { id: "4", title: "Python async/await deep dive", preview: "Async/await in Python allows...", time: "Jul 25", model: "Gemini" },
];

const MOCK_MESSAGES = [
  { role: "user", content: "Explain quantum computing in simple terms" },
  { role: "assistant", content: "**Quantum computing** uses quantum bits (qubits) that can exist in multiple states at once (superposition), unlike classical bits that are either 0 or 1.\n\nThink of it like a coin spinning in the air — while it's spinning, it's both heads and tails simultaneously. This allows quantum computers to solve certain problems exponentially faster." },
  { role: "user", content: "What are the practical applications?" },
  { role: "assistant", content: "Current practical applications include:\n\n- **Drug discovery** — Simulating molecular interactions\n- **Cryptography** — Factoring large numbers\n- **Optimization** — Supply chain and logistics\n- **Climate modeling** — Complex weather simulations\n\nHowever, we're still in the **NISQ era** (Noisy Intermediate-Scale Quantum), meaning practical quantum advantage is limited to specific problems." },
];

export default function ChatPage() {
  const [conversationId, setConversationId] = useState<string | null>("2");
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-[calc(100vh-3.5rem-3rem)] -m-6 overflow-hidden">
      {/* Sidebar */}
      <motion.div
        animate={{ width: sidebarOpen ? 280 : 0 }}
        className="flex shrink-0 flex-col border-r border-border bg-card/50"
      >
        {sidebarOpen && (
          <>
            <div className="flex items-center gap-2 border-b border-border p-3">
              <button className="flex flex-1 items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4" /> New Chat
              </button>
            </div>
            <div className="border-b border-border p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input placeholder="Search conversations..." className="w-full rounded-lg border border-muted bg-muted/50 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary/50" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {MOCK_CONVERSATIONS.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setConversationId(conv.id)}
                  className={`w-full rounded-lg p-3 text-left text-sm transition-colors ${
                    conversationId === conv.id ? "bg-primary/10" : "hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">{conv.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{conv.preview}</p>
                  <span className="mt-1 inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{conv.model}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Main Chat */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-md p-1.5 hover:bg-accent">
              <MessageSquare className="h-4 w-4" />
            </button>
            <select className="rounded-md border border-muted bg-transparent px-2 py-1 text-xs outline-none">
              <option>Gemini 1.5 Pro (free)</option>
              <option>Gemini 1.5 Flash (free)</option>
              <option>DeepSeek V4 Flash ($)</option>
            </select>
          </div>
          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"><Trash2 className="h-4 w-4" /></button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!conversationId ? (
            <EmptyState icon={MessageSquare} title="Start a conversation" description="Select a conversation or create a new one to begin chatting with AI" action={{ label: "New Chat", onClick: () => setConversationId("1") }} />
          ) : (
            MOCK_MESSAGES.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex items-end gap-2 rounded-xl border border-muted bg-muted/30 p-2 focus-within:border-primary/50">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              rows={1}
              className="max-h-32 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none"
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); } }}
            />
            <button className="rounded-lg bg-primary p-2 text-primary-foreground hover:bg-primary/90">
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1.5 text-center text-[10px] text-muted-foreground">AI responses are generated by the selected model</p>
        </div>
      </div>
    </div>
  );
}
