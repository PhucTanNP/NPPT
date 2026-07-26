"use client";

import { motion } from "framer-motion";
import { Shield, Users, Activity, Cpu, HardDrive, Clock } from "lucide-react";
import { PageHeader, StatusBadge } from "@ui/index";
import Link from "next/link";

const MOCK_USERS = [
  { email: "admin@aios.local", role: "Admin", status: "active" as const },
  { email: "friend1@email.com", role: "User", status: "active" as const },
  { email: "friend2@email.com", role: "User", status: "active" as const },
  { email: "blocked@email.com", role: "User", status: "inactive" as const },
];

export default function AdminPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader
        icon={Shield}
        title="Admin Panel"
        description="System administration and user management"
        actions={
          <Link href="/admin/stats" className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent">
            <Activity className="h-4 w-4" /> System Stats
          </Link>
        }
      />

      <section>
        <h2 className="mb-3 text-lg font-semibold flex items-center gap-2"><Users className="h-5 w-5" /> Users</h2>
        <div className="space-y-2">
          {MOCK_USERS.map((u) => (
            <div key={u.email} className="flex items-center justify-between rounded-lg border border-muted/50 bg-card p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  {u.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{u.email}</p>
                  <span className="text-xs text-muted-foreground">{u.role}</span>
                </div>
              </div>
              <StatusBadge status={u.status} label={u.status === "active" ? "Active" : "Banned"} />
            </div>
          ))}
        </div>
        <button className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent">
          + Invite User
        </button>
      </section>
    </motion.div>
  );
}
