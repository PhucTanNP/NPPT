"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Star, Copy, Download, Sparkles, Clock, Tag } from "lucide-react";
import { PageHeader, StatusBadge, TagPill } from "@ui/index";
import Link from "next/link";
import { useParams } from "next/navigation";

const MOCK_ARTICLE = {
  id: "1",
  title: "GPT-5 Announced: What We Know So Far",
  source: "ArXiv",
  author: "John Smith et al.",
  date: "July 26, 2026",
  url: "https://arxiv.org/abs/example",
  summary: "OpenAI has announced GPT-5, their next-generation language model with significant improvements in reasoning, context length (up to 2M tokens), and multimodal capabilities. The model demonstrates near-human performance on complex reasoning tasks and shows particular strength in mathematical problem-solving and code generation.",
  content: `## Key Highlights

- **2M token context window** — 8x larger than GPT-4, capable of processing entire codebases
- **Enhanced reasoning** — 40% improvement on MATH benchmark, 35% on GSM8K
- **Multimodal** — Native image, audio, and video understanding
- **Tool use** — Improved function calling and API integration
- **Safety** — New alignment techniques reduce harmful outputs by 60%

## Performance

GPT-5 achieves state-of-the-art results across multiple benchmarks:

| Benchmark | GPT-4 | GPT-5 | Improvement |
|-----------|-------|-------|-------------|
| MMLU | 86.4% | 92.1% | +5.7% |
| HumanEval | 87.2% | 94.8% | +7.6% |
| GSM8K | 92.0% | 96.5% | +4.5% |

## Availability

OpenAI plans to roll out GPT-5 via API starting Q3 2026, with consumer products following shortly after. Pricing details have not been announced.

## Implications

The release of GPT-5 represents a significant leap forward in AI capabilities, particularly in areas requiring deep reasoning and long-context understanding. This could accelerate progress in scientific research, software development, and creative work.`,
  tags: ["#AI", "#GPT5", "#OpenAI", "#LLM"],
  bookmarked: true,
};

export default function ArticleDetailPage() {
  const params = useParams();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-6">
      <Link href="/news" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to News
      </Link>

      {/* Hero */}
      <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <span className="text-6xl">🤖</span>
      </div>

      {/* Title & Meta */}
      <div>
        <h1 className="text-3xl font-bold">{MOCK_ARTICLE.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <StatusBadge status="info" label={MOCK_ARTICLE.source} />
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{MOCK_ARTICLE.date}</span>
          <span>👤 {MOCK_ARTICLE.author}</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap gap-2">
        <a href={MOCK_ARTICLE.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <ExternalLink className="h-4 w-4" /> Read Original
        </a>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent">
          <Star className="h-4 w-4" fill={MOCK_ARTICLE.bookmarked ? "currentColor" : "none"} /> Save
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent">
          <Copy className="h-4 w-4" /> Copy
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent">
          <Download className="h-4 w-4" /> Download
        </button>
      </div>

      {/* Summary Card */}
      <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-500">
          <Sparkles className="h-4 w-4" /> AI Summary (by Gemini)
        </div>
        <p className="leading-relaxed text-muted-foreground">{MOCK_ARTICLE.summary}</p>
      </div>

      {/* Full Content */}
      <div className="prose prose-invert max-w-none">
        {MOCK_ARTICLE.content.split("\n").map((line, i) => {
          if (line.startsWith("## ")) return <h2 key={i} className="mb-3 mt-6 text-xl font-bold">{line.slice(3)}</h2>;
          if (line.startsWith("| ")) return null;
          if (line.startsWith("- **")) {
            const match = line.match(/- \*\*(.+?)\*\* — (.+)/);
            if (match) return <li key={i} className="mb-1 text-muted-foreground"><strong>{match[1]}</strong> — {match[2]}</li>;
          }
          if (line.startsWith("---")) return <hr key={i} className="my-6 border-border" />;
          if (line.trim()) return <p key={i} className="mb-2 text-muted-foreground">{line}</p>;
          return null;
        })}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 border-t border-border pt-4">
        <Tag className="h-4 w-4 text-muted-foreground" />
        {MOCK_ARTICLE.tags.map((t) => (
          <TagPill key={t} label={t} />
        ))}
      </div>
    </motion.div>
  );
}
