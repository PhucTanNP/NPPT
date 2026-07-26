"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Library, Plus, FileText, Sparkles } from "lucide-react";
import { PageHeader, EmptyState, TagPill, SearchInput } from "@ui/index";
import Link from "next/link";

const MOCK_DOCS = [
  { id: "1", title: "Rust Programming Basics", tags: ["#rust", "#programming"], preview: "Rust is a systems programming language focused on safety...", updated: "2 days ago", words: 1200 },
  { id: "2", title: "Python Async Patterns", tags: ["#python", "#async"], preview: "Async/await in Python allows concurrent code execution...", updated: "5 days ago", words: 850 },
  { id: "3", title: "AI Safety Guidelines", tags: ["#ai", "#safety"], preview: "Key principles for developing safe AI systems...", updated: "1 week ago", words: 2100 },
];

const ALL_TAGS = ["#all", "#rust", "#python", "#ai", "#async", "#programming", "#safety"];

export default function KnowledgePage() {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("#all");

  const filtered = MOCK_DOCS.filter((d) => {
    if (search && !d.title.toLowerCase().includes(search.toLowerCase()) && !d.preview.toLowerCase().includes(search.toLowerCase())) return false;
    if (tag !== "#all" && !d.tags.includes(tag)) return false;
    return true;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader
        icon={Library}
        title="Knowledge Base"
        description="Your personal knowledge management system"
        actions={
          <>
            <Link href="/knowledge/search" className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent">
              <Sparkles className="h-4 w-4" /> AI Search
            </Link>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" /> New Document
            </button>
          </>
        }
      />

      <div className="space-y-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search documents..." />
        <div className="flex flex-wrap gap-1.5">
          {ALL_TAGS.map((t) => (
            <TagPill key={t} label={t} active={tag === t} onClick={() => setTag(t)} />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Library} title="No documents yet" description="Create your first knowledge document to start building your personal knowledge base" action={{ label: "Create Document", onClick: () => {} }} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc) => (
            <Link key={doc.id} href={`/knowledge/${doc.id}`}>
              <div className="group rounded-lg border border-muted/50 bg-card p-4 transition-all hover:border-primary/50">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold group-hover:text-primary">{doc.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{doc.preview}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex gap-1.5">{doc.tags.map((t) => (<span key={t}>{t}</span>))}</div>
                  <span>{doc.updated}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}
