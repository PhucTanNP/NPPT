"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Plus, ExternalLink, Clock } from "lucide-react";
import { PageHeader, EmptyState, StatusBadge, TagPill, TabBar, SearchInput } from "@ui/index";

const MOCK_JOBS = [
  { company: "Google", position: "Senior AI Engineer", status: "applied" as const, date: "Jul 20", url: "#" },
  { company: "Anthropic", position: "ML Engineer", status: "saved" as const, date: "Jul 18", url: "#" },
  { company: "OpenAI", position: "Research Scientist", status: "rejected" as const, date: "Jul 15", url: "#" },
  { company: "Meta", position: "AI Researcher", status: "interview" as const, date: "Jul 10", url: "#" },
];

const STATUS_LABELS = { saved: "Saved", applied: "Applied", interview: "Interview", offer: "Offer", rejected: "Rejected" };
const STATUS_COLORS = { saved: "info" as const, applied: "active" as const, interview: "warning" as const, offer: "success" as const, rejected: "error" as const };

export default function CareerPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const stats = { applied: MOCK_JOBS.filter((j) => j.status === "applied").length, interview: MOCK_JOBS.filter((j) => j.status === "interview").length, offer: MOCK_JOBS.filter((j) => j.status === "offer").length, rejected: MOCK_JOBS.filter((j) => j.status === "rejected").length };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader icon={GraduationCap} title="Career Hub" description="Track jobs and applications"
        actions={<button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> Add Job</button>}
      />

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center"><p className="text-2xl font-bold text-green-500">{stats.applied}</p><p className="text-xs text-muted-foreground">Applied</p></div>
        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 text-center"><p className="text-2xl font-bold text-yellow-500">{stats.interview}</p><p className="text-xs text-muted-foreground">Interview</p></div>
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 text-center"><p className="text-2xl font-bold text-blue-500">{stats.offer}</p><p className="text-xs text-muted-foreground">Offer</p></div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center"><p className="text-2xl font-bold text-red-500">{stats.rejected}</p><p className="text-xs text-muted-foreground">Rejected</p></div>
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder="Search jobs..." />

      <div className="space-y-3">
        {MOCK_JOBS.filter((j) => filter === "all" || j.status === filter).map((job) => (
          <div key={job.company + job.position} className="rounded-lg border border-muted/50 bg-card p-4 transition-all hover:border-muted">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{job.position}</h3>
                  <StatusBadge status={STATUS_COLORS[job.status]} label={STATUS_LABELS[job.status]} />
                </div>
                <p className="text-sm text-muted-foreground">{job.company}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{job.date}</span>
              </div>
              <a href={job.url} className="rounded-md p-2 text-muted-foreground hover:bg-accent"><ExternalLink className="h-4 w-4" /></a>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
