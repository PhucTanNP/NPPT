"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, Search, Download, Trash2, Eye } from "lucide-react";
import { PageHeader, EmptyState, SearchInput, StatusBadge, TabBar } from "@ui/index";

const MOCK_FILES = [
  { name: "report.pdf", size: "2.4 MB", date: "Jul 26", type: "PDF" },
  { name: "screenshot.png", size: "1.2 MB", date: "Jul 25", type: "Image" },
  { name: "notes.txt", size: "0.5 KB", date: "Jul 24", type: "Text" },
  { name: "presentation.pptx", size: "5.1 MB", date: "Jul 22", type: "PPT" },
];

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");

  const filtered = MOCK_FILES.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader
        icon={FileText}
        title="Documents"
        description="Upload and manage your files"
        actions={
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Upload className="h-4 w-4" /> Upload File
            <input type="file" className="hidden" />
          </label>
        }
      />

      <div className="flex items-center gap-3">
        <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Search files..." /></div>
        <TabBar tabs={[{ id: "list", label: "List" }, { id: "grid", label: "Grid" }]} activeTab={view} onTabChange={(id) => setView(id as "list" | "grid")} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={FileText} title="No files yet" description="Upload your first document" action={{ label: "Upload File", onClick: () => {} }} />
      ) : view === "list" ? (
        <div className="space-y-2">
          {filtered.map((f) => (
            <div key={f.name} className="flex items-center justify-between rounded-lg border border-muted/50 bg-card p-3 transition-all hover:border-muted">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{f.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <StatusBadge status="info" label={f.type} />
                    <span>{f.size}</span>
                    <span>{f.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="rounded-md p-2 text-muted-foreground hover:bg-accent"><Eye className="h-4 w-4" /></button>
                <button className="rounded-md p-2 text-muted-foreground hover:bg-accent"><Download className="h-4 w-4" /></button>
                <button className="rounded-md p-2 text-muted-foreground hover:bg-accent"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {filtered.map((f) => (
            <div key={f.name} className="rounded-lg border border-muted/50 bg-card p-4 transition-all hover:border-muted">
              <div className="mb-3 flex aspect-video items-center justify-center rounded-md bg-gradient-to-br from-primary/10 to-primary/5">
                <FileText className="h-8 w-8 text-primary/40" />
              </div>
              <p className="font-medium truncate">{f.name}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{f.size}</span><span>{f.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
