"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wifi, WifiOff, Phone, RefreshCw } from "lucide-react";
import DashboardPage from "./dashboard/page";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.nguyenphamphuctan.click/api/v1";

export default function Home() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading");

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/system/health`, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        setStatus("connected");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "connected") {
    return <DashboardPage />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <AnimatePresence mode="wait">
        {status === "loading" ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6 inline-flex animate-pulse items-center justify-center rounded-3xl bg-primary/10 p-5">
              <Sparkles className="h-12 w-12 text-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">Personal AI OS</h1>
            <div className="mb-4 flex items-center gap-2 text-muted-foreground">
              <Wifi className="h-4 w-4 animate-pulse" />
              <span>Đang kết nối đến server...</span>
            </div>
            <div className="flex gap-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0s" }} />
              <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.15s" }} />
              <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.3s" }} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6 inline-flex items-center justify-center rounded-3xl bg-destructive/10 p-5">
              <WifiOff className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="mb-2 text-2xl font-bold">Server chưa hoạt động</h1>
            <p className="mb-6 max-w-sm text-muted-foreground">
              Backend server hiện đang offline. Vui lòng liên hệ để được hỗ trợ.
            </p>
            <a
              href="tel:0847120357"
              className="mb-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Phone className="h-5 w-5" />
              Gọi 0847.120.357 - Phúc Tân
            </a>
            <button
              onClick={checkConnection}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-4 w-4" />
              Thử lại kết nối
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-muted/50 bg-card p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Newspaper className="h-4 w-4 text-sky-500" /> Recent News
          </h3>
          <div className="space-y-2">
            {["GPT-5 Announced", "Claude 4 Release Date", "DeepSeek V4 Benchmarks"].map((item) => (
              <Link key={item} href="/news" className="block rounded-md p-2 text-sm transition-colors hover:bg-accent">
                {item}
              </Link>
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
              <Link key={item} href="/chat" className="block rounded-md p-2 text-sm transition-colors hover:bg-accent">
                {item}
              </Link>
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
