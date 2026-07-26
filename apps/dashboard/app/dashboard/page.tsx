"use client";

import { motion } from "framer-motion";
import {
  Briefcase, FileText, MessageSquare, Code, FolderKanban, GraduationCap,
  BarChart3, Settings, Sparkles, Library, Brain, Newspaper, Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import Link from "next/link";

const apps = [
  { name: "AI News", icon: Newspaper, href: "/news", color: "from-sky-500 to-sky-600", description: "AI news aggregator" },
  { name: "AI Chat", icon: MessageSquare, href: "/chat", color: "from-violet-500 to-violet-600", description: "AI conversations" },
  { name: "Knowledge Base", icon: Library, href: "/knowledge", color: "from-amber-500 to-amber-600", description: "Knowledge management" },
  { name: "Research", icon: Brain, href: "/research", color: "from-rose-500 to-rose-600", description: "Papers & research" },
  { name: "Portfolio", icon: Briefcase, href: "/portfolio", color: "from-blue-500 to-blue-600", description: "Projects & blog" },
  { name: "Career Hub", icon: GraduationCap, href: "/career", color: "from-emerald-500 to-emerald-600", description: "Jobs & applications" },
  { name: "Coding Hub", icon: Code, href: "/coding", color: "from-cyan-500 to-cyan-600", description: "Code snippets" },
  { name: "Projects", icon: FolderKanban, href: "/projects", color: "from-orange-500 to-orange-600", description: "Task management" },
  { name: "Documents", icon: FileText, href: "/documents", color: "from-indigo-500 to-indigo-600", description: "File management" },
  { name: "Analytics", icon: BarChart3, href: "/analytics", color: "from-pink-500 to-pink-600", description: "Usage & insights" },
  { name: "Automation", icon: Settings, href: "/automation", color: "from-teal-500 to-teal-600", description: "Workflows" },
  { name: "Admin", icon: Shield, href: "/admin", color: "from-red-500 to-red-600", description: "System administration" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Personal AI OS</h1>
        </div>
        <p className="text-muted-foreground">Your complete AI-powered ecosystem</p>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "New Articles", value: "12", icon: Newspaper, color: "text-sky-500" },
          { label: "Active Chats", value: "3", icon: MessageSquare, color: "text-violet-500" },
          { label: "Documents", value: "28", icon: FileText, color: "text-indigo-500" },
          { label: "AI Cost", value: "$0.34", icon: BarChart3, color: "text-pink-500" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-muted/50 bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-muted/50 bg-card p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Newspaper className="h-4 w-4 text-sky-500" /> Recent News
          </h3>
          <div className="space-y-2">
            {["GPT-5 Announced", "Claude 4 Release Date", "DeepSeek V4 Benchmarks"].map((item) => (
              <Link key={item} href="/news" className="block rounded-md p-2 text-sm transition-colors hover:bg-accent">{item}</Link>
            ))}
            <Link href="/news" className="block text-xs text-primary hover:underline">View all →</Link>
          </div>
        </div>
        <div className="rounded-lg border border-muted/50 bg-card p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
            <MessageSquare className="h-4 w-4 text-violet-500" /> Recent Chats
          </h3>
          <div className="space-y-2">
            {["Rust vs C++ comparison", "Quantum computing explained", "Next.js best practices"].map((item) => (
              <Link key={item} href="/chat" className="block rounded-md p-2 text-sm transition-colors hover:bg-accent">{item}</Link>
            ))}
            <Link href="/chat" className="block text-xs text-primary hover:underline">View all →</Link>
          </div>
        </div>
      </div>

      {/* App Grid */}
      <h2 className="text-lg font-semibold">Applications</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {apps.map((app, index) => (
          <motion.div key={app.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
            <Link href={app.href}>
              <Card className="group cursor-pointer border-muted/50 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg bg-gradient-to-br ${app.color} p-2.5 text-white shadow-lg`}>
                      <app.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{app.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{app.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
