"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Wifi, WifiOff, Phone, RefreshCw, LogIn, Briefcase, FileText,
  MessageSquare, Code, FolderKanban, GraduationCap, BarChart3,
  Settings, Library, Brain, Newspaper, Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.nguyenphamphuctan.click/api/v1";

// ─── Welcome Screen ────────────────────────────
function WelcomeScreen({
  onConnect,
}: {
  onConnect: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center max-w-sm"
      >
        <div className="mb-6 inline-flex items-center justify-center rounded-3xl bg-primary/10 p-6 shadow-lg shadow-primary/5">
          <Sparkles className="h-16 w-16 text-primary" />
        </div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Personal AI OS</h1>
        <p className="mb-8 text-muted-foreground">
          Hệ thống AI cá nhân hoá — bấm kết nối để bắt đầu
        </p>
        <button
          onClick={onConnect}
          className="inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
        >
          <Wifi className="h-6 w-6" />
          Kết nối
        </button>
        <p className="mt-6 text-xs text-muted-foreground">
          Cần backend server chạy tại localhost:8000
        </p>
      </motion.div>
    </div>
  );
}

// ─── Connecting Screen ─────────────────────────
function ConnectingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center"
      >
        <div className="mb-6 inline-flex animate-pulse items-center justify-center rounded-3xl bg-primary/10 p-5">
          <Wifi className="h-12 w-12 text-primary" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">Đang kết nối...</h1>
        <p className="mb-6 text-muted-foreground">Kiểm tra kết nối đến backend server</p>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0s" }} />
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.15s" }} />
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.3s" }} />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Error Screen ──────────────────────────────
function ErrorScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center max-w-sm"
      >
        <div className="mb-6 inline-flex items-center justify-center rounded-3xl bg-destructive/10 p-5">
          <WifiOff className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">Server chưa hoạt động</h1>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          Backend server hiện đang offline. Vui lòng gọi điện để được hỗ trợ mở server ngay.
        </p>
        <a
          href="tel:0847120357"
          className="mb-4 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 active:scale-[0.98]"
        >
          <Phone className="h-5 w-5" />
          Gọi 0847.120.357 - Phúc Tân
        </a>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Thử lại kết nối
        </button>
      </motion.div>
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────
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

function DashboardContent() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Personal AI OS</h1>
        </div>
        <p className="text-muted-foreground">Your complete AI-powered ecosystem</p>
      </motion.div>

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

// ─── Main ──────────────────────────────────────
export default function Home() {
  const [status, setStatus] = useState<"idle" | "loading" | "connected" | "error">("idle");

  const checkConnection = async () => {
    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/system/health`, { signal: AbortSignal.timeout(5000) });
      if (res.ok) setStatus("connected");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "connected") return <DashboardContent />;
  if (status === "loading") return <ConnectingScreen />;
  if (status === "error") return <ErrorScreen onRetry={checkConnection} />;
  return <WelcomeScreen onConnect={checkConnection} />;
}
