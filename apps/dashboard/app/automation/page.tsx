"use client";

import { motion } from "framer-motion";
import { Settings, Plus, Play, PauseCircle, Trash2, Clock, RefreshCw } from "lucide-react";
import { PageHeader, EmptyState, StatusBadge } from "@ui/index";

const MOCK_WORKFLOWS = [
  { id: "1", name: "Daily News Crawl", desc: "Crawl ArXiv + TechCrunch → Summarize → Save", schedule: "Every 6h", status: "active" as const },
  { id: "2", name: "Weekly Backup", desc: "Backup all data → Upload to Google Drive", schedule: "Sun 2AM", status: "active" as const },
  { id: "3", name: "Clean Old Articles", desc: "Delete articles older than 30 days", schedule: "Disabled", status: "inactive" as const },
];

export default function AutomationPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader icon={Settings} title="Automation" description="Workflows and scheduled tasks"
        actions={
          <>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent"><Clock className="h-4 w-4" /> Schedules</button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> New Workflow</button>
          </>
        }
      />

      <div className="space-y-3">
        {MOCK_WORKFLOWS.map((w) => (
          <div key={w.id} className="rounded-lg border border-muted/50 bg-card p-4 transition-all hover:border-muted">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{w.name}</h3>
                  <StatusBadge status={w.status} />
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{w.desc}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{w.schedule}</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="rounded-md p-2 text-muted-foreground hover:bg-accent"><Play className="h-4 w-4" /></button>
                <button className="rounded-md p-2 text-muted-foreground hover:bg-accent"><PauseCircle className="h-4 w-4" /></button>
                <button className="rounded-md p-2 text-muted-foreground hover:bg-accent"><Settings className="h-4 w-4" /></button>
                <button className="rounded-md p-2 text-muted-foreground hover:bg-accent"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
