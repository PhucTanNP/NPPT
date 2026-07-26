"use client";

import { motion } from "framer-motion";
import { Brain, ArrowLeft, Sparkles } from "lucide-react";
import { PageHeader } from "@ui/index";
import Link from "next/link";
import { useState } from "react";

export default function KnowledgeSearchPage() {
  const [query, setQuery] = useState("");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Link href="/knowledge" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Knowledge
      </Link>

      <PageHeader icon={Brain} title="AI Search & RAG" description="Ask questions about your knowledge base" />

      <div className="relative">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything about your documents..."
          rows={3}
          className="w-full rounded-lg border border-border bg-card p-4 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
        />
        <button className="absolute bottom-3 right-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50" disabled={!query.trim()}>
          <Sparkles className="h-4 w-4" />
        </button>
      </div>

      <div className="rounded-lg border border-muted bg-card/50 p-6 text-center">
        <Brain className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Ask a question and AI will search through your documents to find relevant information</p>
      </div>
    </motion.div>
  );
}
