"use client";

import { motion } from "framer-motion";
import { Brain, Plus, ExternalLink, BookOpen, CheckCircle, Clock } from "lucide-react";
import { PageHeader, EmptyState, TagPill } from "@ui/index";

const MOCK_PAPERS = [
  { title: "Attention Is All You Need", authors: "Vaswani et al.", year: "2017", tags: ["#Transformer", "#NLP"], read: true, url: "#" },
  { title: "GPT-4 Technical Report", authors: "OpenAI", year: "2023", tags: ["#LLM", "#OpenAI"], read: false, url: "#" },
  { title: "Rust for Systems Programming", authors: "Mozilla", year: "2024", tags: ["#Rust", "#Systems"], read: true, url: "#" },
];

export default function ResearchPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader icon={Brain} title="Research Papers" description="Manage your academic papers"
        actions={
          <>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent"><Plus className="h-4 w-4" /> Import ArXiv</button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> Add Paper</button>
          </>
        }
      />

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {MOCK_PAPERS.length} papers</span>
        <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4" /> {MOCK_PAPERS.filter((p) => p.read).length} read</span>
      </div>

      <div className="space-y-3">
        {MOCK_PAPERS.map((paper) => (
          <div key={paper.title} className="rounded-lg border border-muted/50 bg-card p-4 transition-all hover:border-muted">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{paper.title}</h3>
                  {paper.read ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Clock className="h-4 w-4 text-yellow-500" />}
                </div>
                <p className="text-sm text-muted-foreground">{paper.authors} · {paper.year}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {paper.tags.map((t) => (<TagPill key={t} label={t} />))}
                </div>
              </div>
              <a href={paper.url} className="rounded-md p-2 text-muted-foreground hover:bg-accent"><ExternalLink className="h-4 w-4" /></a>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

