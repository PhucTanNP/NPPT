"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Radio, Plus, RefreshCw, PauseCircle, Settings, Trash2, Globe, Rss, Code } from "lucide-react";
import { PageHeader, EmptyState, StatusBadge, Modal } from "@ui/index";

const MOCK_SOURCES = [
  { id: "1", name: "ArXiv AI Papers", url: "https://rss.arxiv.org/rss/cs.AI", type: "RSS", status: "active" as const, schedule: "Every 6h", lastCrawl: "2h ago", articles: 5 },
  { id: "2", name: "TechCrunch AI", url: "https://techcrunch.com/category/artificial-intelligence/feed", type: "RSS", status: "active" as const, schedule: "Every 6h", lastCrawl: "1h ago", articles: 3 },
  { id: "3", name: "HackerNews", url: "https://hnrss.org/frontpage", type: "API", status: "active" as const, schedule: "Every 3h", lastCrawl: "30m ago", articles: 12 },
  { id: "4", name: "Medium AI Blog", url: "https://medium.com/tag/artificial-intelligence", type: "Web", status: "inactive" as const, schedule: "Disabled", lastCrawl: "never", articles: 0 },
];

const TYPE_ICONS = { RSS: Rss, API: Code, Web: Globe };

export default function SourcesPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [sources, setSources] = useState(MOCK_SOURCES);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader
        icon={Radio}
        title="Crawl Sources"
        description="Manage your AI news sources for automatic crawling"
        actions={
          <button onClick={() => setShowAdd(true)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Add Source
          </button>
        }
      />

      {sources.length === 0 ? (
        <EmptyState icon={Radio} title="No sources yet" description="Add your first RSS feed or website to start crawling AI news" action={{ label: "Add Source", onClick: () => setShowAdd(true) }} />
      ) : (
        <div className="space-y-3">
          {sources.map((source) => {
            const Icon = TYPE_ICONS[source.type as keyof typeof TYPE_ICONS];
            return (
              <div key={source.id} className="rounded-lg border border-muted/50 bg-card p-4 transition-all hover:border-muted">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{source.name}</h3>
                        <StatusBadge status={source.status as "active" | "inactive"} label={source.status === "active" ? "Active" : "Disabled"} />
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{source.url}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Type: {source.type}</span>
                        <span>Schedule: {source.schedule}</span>
                        <span>Last: {source.lastCrawl}</span>
                        <span>{source.articles} articles</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="rounded-md p-2 text-muted-foreground hover:bg-accent"><RefreshCw className="h-4 w-4" /></button>
                    <button className="rounded-md p-2 text-muted-foreground hover:bg-accent"><PauseCircle className="h-4 w-4" /></button>
                    <button className="rounded-md p-2 text-muted-foreground hover:bg-accent"><Settings className="h-4 w-4" /></button>
                    <button className="rounded-md p-2 text-muted-foreground hover:bg-accent"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={showAdd} title="Add Source" onClose={() => setShowAdd(false)}>
        <div className="space-y-4">
          <div><label className="mb-1.5 block text-sm font-medium">Name</label><input placeholder="e.g. ArXiv AI Papers" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/50" /></div>
          <div><label className="mb-1.5 block text-sm font-medium">URL</label><input placeholder="https://rss.example.com/feed" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/50" /></div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-medium">Type</label>
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/50">
                <option>RSS Feed</option><option>Web Scrape</option><option>API</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-medium">Schedule</label>
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/50">
                <option>Every 3h</option><option>Every 6h</option><option>Every 12h</option><option>Daily</option><option>Manual</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowAdd(false)} className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent">Cancel</button>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Add Source</button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
