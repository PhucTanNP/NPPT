"use client";

import { motion } from "framer-motion";
import { FolderKanban, Plus, MoreHorizontal } from "lucide-react";
import { PageHeader, StatusBadge, TagPill } from "@ui/index";

const MOCK_PROJECTS = [
  { id: "1", name: "AI OS Platform", tasks: 5, done: 4, progress: 80, status: "active" as const, due: "Aug 2026" },
  { id: "2", name: "Personal Blog", tasks: 2, done: 1, progress: 50, status: "active" as const, due: "Aug 2026" },
  { id: "3", name: "Rust Project", tasks: 0, done: 0, progress: 0, status: "inactive" as const, due: "Sep 2026" },
];

const KANBAN = {
  todo: [
    { id: "t1", title: "Design database schema", assignee: "Admin", due: "Jul 30" },
    { id: "t2", title: "Implement auth endpoints", assignee: "Admin", due: "Aug 5" },
  ],
  doing: [
    { id: "t3", title: "Build news aggregator UI", assignee: "Admin", due: "Aug 1" },
  ],
  done: [
    { id: "t4", title: "Setup project structure", assignee: "Admin", due: "Jul 20" },
    { id: "t5", title: "Configure Docker", assignee: "Admin", due: "Jul 18" },
  ],
};

export default function ProjectsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader icon={FolderKanban} title="Projects" description="Manage your projects and tasks"
        actions={<button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> New Project</button>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {MOCK_PROJECTS.map((p) => (
          <div key={p.id} className="rounded-lg border border-muted/50 bg-card p-4 transition-all hover:border-muted">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{p.name}</h3>
              <StatusBadge status={p.status === "active" ? "active" : "inactive"} />
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>{p.done}/{p.tasks} tasks</span><span>{p.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Due: {p.due}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold">Kanban Board</h2>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(KANBAN).map(([col, tasks]) => (
          <div key={col} className="rounded-lg border border-muted/50 bg-muted/20 p-3">
            <h3 className="mb-3 text-sm font-medium capitalize text-muted-foreground">{col} ({tasks.length})</h3>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="rounded-lg border border-muted/50 bg-card p-3">
                  <p className="text-sm font-medium">{task.title}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>👤 {task.assignee}</span><span>📅 {task.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
