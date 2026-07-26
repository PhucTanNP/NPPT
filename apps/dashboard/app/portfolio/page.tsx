"use client";

import { motion } from "framer-motion";
import { Briefcase, Plus, ExternalLink, Github, Tag, Clock } from "lucide-react";
import { PageHeader, EmptyState, TagPill, StatusBadge } from "@ui/index";

const MOCK_PROJECTS = [
  { id: "1", title: "AI OS Platform", desc: "Personal AI operating system with multi-agent support", tags: ["#React", "#FastAPI", "#AI"], status: "active" as const, demo: "#", github: "#" },
  { id: "2", title: "Rust CLI Tool", desc: "Command-line tool for file processing written in Rust", tags: ["#Rust", "#CLI"], status: "active" as const, github: "#" },
];

const MOCK_BLOG = [
  { title: "How I Built an AI OS", date: "Jul 20, 2026", tags: ["#AI", "#Architecture"] },
  { title: "Rust vs Python for AI", date: "Jul 15, 2026", tags: ["#Rust", "#Python"] },
];

const ALL_TAGS = ["#all", "#React", "#Rust", "#AI", "#Python", "#CLI", "#Architecture"];

export default function PortfolioPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <PageHeader icon={Briefcase} title="Portfolio" description="Projects & blog showcase"
        actions={<button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> New Project</button>}
      />

      <section>
        <h2 className="mb-4 text-lg font-semibold">Projects</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_PROJECTS.map((p) => (
            <div key={p.id} className="group rounded-lg border border-muted/50 bg-card p-4 transition-all hover:border-primary/50">
              <div className="mb-3 flex aspect-video items-center justify-center rounded-md bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <Briefcase className="h-8 w-8 text-primary/40" />
              </div>
              <div className="flex items-start justify-between">
                <h3 className="font-semibold">{p.title}</h3>
                <StatusBadge status={p.status} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (<TagPill key={t} label={t} />))}
              </div>
              <div className="mt-3 flex gap-2">
                {p.demo && <a href={p.demo} className="text-xs text-primary hover:underline">Demo →</a>}
                {p.github && <a href={p.github} className="text-xs text-muted-foreground hover:text-foreground">GitHub →</a>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Recent Blog Posts</h2>
        <div className="space-y-3">
          {MOCK_BLOG.map((post) => (
            <div key={post.title} className="rounded-lg border border-muted/50 bg-card p-4 transition-all hover:border-muted">
              <h3 className="font-medium">{post.title}</h3>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.date}</span>
                <div className="flex gap-1.5">{post.tags.map((t) => (<span key={t}>{t}</span>))}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
