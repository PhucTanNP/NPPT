"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Plus, Settings, ExternalLink, Clock, Sparkles, Star, Filter, Search } from "lucide-react";
import { PageHeader, EmptyState, LoadingSkeleton, ErrorState, StatusBadge, TagPill, SearchInput, TabBar } from "@ui/index";
import Link from "next/link";

// Mock data for UI demo
const MOCK_ARTICLES = [
  { id: "1", title: "GPT-5 Announced: What We Know So Far", source: "ArXiv", time: "2h ago", summary: "A comprehensive look at OpenAI's next generation language model with 2M token context window.", tags: ["#AI", "#GPT5"], bookmarked: true, image: null },
  { id: "2", title: "Claude 4 Release Date Confirmed by Anthropic", source: "TechCrunch", time: "5h ago", summary: "Anthropic announces Claude 4 will launch next month with significant improvements.", tags: ["#Claude", "#Anthropic"], bookmarked: false, image: null },
  { id: "3", title: "DeepSeek V4 Breaks Reasoning Benchmarks", source: "Medium", time: "8h ago", summary: "New model from DeepSeek achieves state-of-the-art results on mathematical reasoning.", tags: ["#DeepSeek", "#AI"], bookmarked: true, image: null },
  { id: "4", title: "The Future of Open Source LLMs", source: "HackerNews", time: "1d ago", summary: "How open source models are closing the gap with proprietary alternatives.", tags: ["#OpenSource", "#LLM"], bookmarked: false, image: null },
  { id: "5", title: "AI in Healthcare: 2026 Breakthroughs", source: "MIT News", time: "1d ago", summary: "New AI systems achieve 99% accuracy in medical diagnosis trials.", tags: ["#Healthcare", "#AI"], bookmarked: false, image: null },
  { id: "6", title: "Rust vs C++: Systems Programming in the AI Era", source: "Dev.to", time: "2d ago", summary: "Why Rust is becoming the language of choice for AI infrastructure.", tags: ["#Rust", "#Programming"], bookmarked: false, image: null },
];

const SOURCES = ["All Sources", "ArXiv", "TechCrunch", "Medium", "HackerNews", "MIT News", "Dev.to"];
const TAGS = ["#all", "#AI", "#GPT5", "#Claude", "#DeepSeek", "#LLM", "#Rust", "#OpenSource"];

export default function NewsPage() {
  const [search, setSearch] = useState("");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [selectedTag, setSelectedTag] = useState("#all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = MOCK_ARTICLES.filter((a) => {
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedSource !== "All Sources" && a.source !== selectedSource) return false;
    if (selectedTag !== "#all" && !a.tags.includes(selectedTag)) return false;
    return true;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader
        icon={Newspaper}
        title="AI News"
        description="Stay updated with the latest AI breakthroughs and research"
        actions={
          <>
            <Link href="/news/sources" className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent">
              <Settings className="h-4 w-4" /> Sources
            </Link>
            <Link href="/news/bookmarks" className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent">
              <Star className="h-4 w-4" /> Saved
            </Link>
          </>
        }
      />

      {/* Filters */}
      <div className="space-y-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search articles..." />
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {SOURCES.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSource(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedSource === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {TAGS.map((t) => (
            <TagPill key={t} label={t} active={selectedTag === t} onClick={() => setSelectedTag(t)} />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <TabBar
            tabs={[
              { id: "grid", label: "Grid" },
              { id: "list", label: "List" },
            ]}
            activeTab={view}
            onTabChange={(id) => setView(id as "grid" | "list")}
          />
          <span className="text-xs text-muted-foreground">{filtered.length} articles</span>
        </div>
      </div>

      {/* Article List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Newspaper}
          title="No articles found"
          description={search ? "Try a different search term" : "Add sources to start crawling AI news"}
          action={!search ? { label: "Manage Sources", onClick: () => window.location.href = "/news/sources" } : undefined}
        />
      ) : view === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/news/${article.id}`}>
                <div className="group cursor-pointer rounded-lg border border-muted/50 bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <div className="mb-3 flex aspect-video items-center justify-center rounded-md bg-gradient-to-br from-primary/10 to-primary/5">
                    <Newspaper className="h-8 w-8 text-primary/40" />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 flex-1 font-semibold group-hover:text-primary">{article.title}</h3>
                    <button
                      onClick={(e) => { e.preventDefault(); }}
                      className={`shrink-0 ${article.bookmarked ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500"}`}
                    >
                      <Star className="h-4 w-4" fill={article.bookmarked ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{article.summary}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <StatusBadge status="info" label={article.source} />
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.time}</span>
                    <span className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-green-500" />Summarized</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {article.tags.map((t) => (
                      <span key={t} className="text-xs text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((article) => (
            <Link key={article.id} href={`/news/${article.id}`}>
              <div className="group flex gap-4 rounded-lg border border-muted/50 bg-card p-4 transition-all hover:border-primary/50">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary/10 to-primary/5">
                  <Newspaper className="h-6 w-6 text-primary/40" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold group-hover:text-primary">{article.title}</h3>
                    <Star className={`h-4 w-4 shrink-0 ${article.bookmarked ? "text-yellow-500 fill-current" : "text-muted-foreground"}`} />
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{article.summary}</p>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                    <StatusBadge status="info" label={article.source} />
                    <span>{article.time}</span>
                    <span className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-green-500" />AI Summary</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}
