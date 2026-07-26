"use client";

import { motion } from "framer-motion";
import { BarChart3, Activity, Cpu, DollarSign, FileText } from "lucide-react";
import { PageHeader, StatusBadge } from "@ui/index";

const WEEKLY_DATA = [12, 24, 8, 32, 18, 28, 15];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AnalyticsPage() {
  const maxVal = Math.max(...WEEKLY_DATA);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader icon={BarChart3} title="Analytics" description="Track system usage, AI costs, and performance metrics" />

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-muted/50 bg-card p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground"><span>AI Queries</span><Activity className="h-4 w-4" /></div>
          <p className="mt-2 text-2xl font-bold">142</p>
          <p className="text-xs text-green-500">+12% from last week</p>
        </div>
        <div className="rounded-lg border border-muted/50 bg-card p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground"><span>Tokens Used</span><Cpu className="h-4 w-4" /></div>
          <p className="mt-2 text-2xl font-bold">1.2M</p>
          <p className="text-xs text-muted-foreground">~$0.34 cost</p>
        </div>
        <div className="rounded-lg border border-muted/50 bg-card p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground"><span>AI Cost</span><DollarSign className="h-4 w-4" /></div>
          <p className="mt-2 text-2xl font-bold">$0.34</p>
          <p className="text-xs text-muted-foreground">This month</p>
        </div>
        <div className="rounded-lg border border-muted/50 bg-card p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground"><span>Documents</span><FileText className="h-4 w-4" /></div>
          <p className="mt-2 text-2xl font-bold">28</p>
          <p className="text-xs text-muted-foreground">Across 3 collections</p>
        </div>
      </div>

      <div className="rounded-lg border border-muted/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium">Usage Last 7 Days</h3>
        <div className="flex items-end gap-2" style={{ height: 120 }}>
          {WEEKLY_DATA.map((val, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground">{val}</span>
              <div
                className="w-full rounded-t bg-primary/60 transition-all hover:bg-primary"
                style={{ height: `${(val / maxVal) * 100}%` }}
              />
              <span className="text-[10px] text-muted-foreground">{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-muted/50 bg-card p-4">
          <h3 className="mb-3 text-sm font-medium">Top Sources</h3>
          <div className="space-y-2">
            {[{ name: "ArXiv", count: 45 }, { name: "TechCrunch", count: 28 }, { name: "HackerNews", count: 22 }, { name: "Medium", count: 15 }].map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <span>{s.name}</span>
                <span className="text-muted-foreground">{s.count} articles</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-muted/50 bg-card p-4">
          <h3 className="mb-3 text-sm font-medium">Cost Breakdown</h3>
          <div className="space-y-2">
            {[{ name: "Gemini (free)", cost: "$0.00" }, { name: "DeepSeek", cost: "$0.28" }, { name: "Embedding", cost: "$0.06" }].map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <span>{c.name}</span>
                <span className="text-muted-foreground">{c.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


