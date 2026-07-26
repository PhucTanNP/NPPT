"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Trash2, FolderOpen, Newspaper, Clock } from "lucide-react";
import { PageHeader, EmptyState, StatusBadge, TagPill, TabBar } from "@ui/index";
import Link from "next/link";

const MOCK_BOOKMARKS = [
  { id: "1", title: "GPT-5 Announced: What We Know So Far", source: "ArXiv", time: "2h ago", folder: "To Read", note: "Compare with Claude 4 capabilities" },
  { id: "3", title: "DeepSeek V4 Breaks Reasoning Benchmarks", source: "Medium", time: "8h ago", folder: "Important", note: "Key competitor to track" },
];

const FOLDERS = ["All Folders", "To Read", "Important", "Reference", "Archive"];

export default function BookmarksPage() {
  const [folder, setFolder] = useState("All Folders");
  const filtered = folder === "All Folders" ? MOCK_BOOKMARKS : MOCK_BOOKMARKS.filter((b) => b.folder === folder);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader icon={Star} title="Saved Articles" description="Your bookmarked AI news for later reading" />

      <div className="flex flex-wrap gap-2">
        {FOLDERS.map((f) => (
          <TagPill key={f} label={f} active={folder === f} onClick={() => setFolder(f)} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Star} title="No saved articles" description="Bookmark articles from the news feed to read them later" action={{ label: "Browse News", onClick: () => window.location.href = "/news" }} />
      ) : (
        <div className="space-y-3">
          {filtered.map((bookmark) => (
            <Link key={bookmark.id} href={`/news/${bookmark.id}`}>
              <div className="group rounded-lg border border-muted/50 bg-card p-4 transition-all hover:border-yellow-500/50">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 shrink-0 text-yellow-500" fill="currentColor" />
                      <h3 className="font-semibold group-hover:text-yellow-500">{bookmark.title}</h3>
                    </div>
                    <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                      <StatusBadge status="info" label={bookmark.source} />
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{bookmark.time}</span>
                      <span className="flex items-center gap-1"><FolderOpen className="h-3 w-3" />{bookmark.folder}</span>
                    </div>
                    {bookmark.note && (
                      <p className="mt-2 rounded-md bg-muted/50 px-3 py-1.5 text-xs italic text-muted-foreground">📝 {bookmark.note}</p>
                    )}
                  </div>
                  <button onClick={(e) => { e.preventDefault(); }} className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}
