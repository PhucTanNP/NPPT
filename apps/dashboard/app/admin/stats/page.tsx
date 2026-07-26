"use client";

import { motion } from "framer-motion";
import { Activity, Cpu, HardDrive, Clock, Monitor, Users, Globe } from "lucide-react";
import { PageHeader, StatusBadge } from "@ui/index";
import Link from "next/link";

export default function AdminStatsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        ← Back to Admin
      </Link>

      <PageHeader icon={Activity} title="System Statistics" description="Health and performance metrics" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-muted/50 bg-card p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Monitor className="h-4 w-4" /> Status</div>
          <div className="mt-2 flex items-center gap-2"><StatusBadge status="active" label="Healthy" /><span className="text-xs text-muted-foreground">All systems operational</span></div>
        </div>
        <div className="rounded-lg border border-muted/50 bg-card p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" /> Uptime</div>
          <p className="mt-2 text-2xl font-bold">12d 3h</p>
        </div>
        <div className="rounded-lg border border-muted/50 bg-card p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Cpu className="h-4 w-4" /> CPU</div>
          <p className="mt-2 text-2xl font-bold">23%</p>
          <p className="text-xs text-muted-foreground">8 cores</p>
        </div>
        <div className="rounded-lg border border-muted/50 bg-card p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><HardDrive className="h-4 w-4" /> Memory</div>
          <p className="mt-2 text-2xl font-bold">4.2 GB</p>
          <p className="text-xs text-muted-foreground">/ 16 GB (26%)</p>
        </div>
      </div>

      <div className="rounded-lg border border-muted/50 bg-card p-4">
        <h3 className="mb-3 font-semibold flex items-center gap-2"><Globe className="h-4 w-4" /> Version Info</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">App Version</span><span>1.0.0</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Environment</span><span>Development</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Python</span><span>3.12.4</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Database</span><span>PostgreSQL 15</span></div>
        </div>
      </div>
    </motion.div>
  );
}
