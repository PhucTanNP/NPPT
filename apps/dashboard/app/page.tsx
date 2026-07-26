"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Wifi, WifiOff, Phone, RefreshCw, Sparkles,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.nguyenphamphuctan.click/api/v1";

// ─── Welcome Screen ────────────────────────────
function WelcomeScreen({
  onConnect,
}: {
  onConnect: () => void;
}) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-60 w-60 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* Avatar + Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-br from-primary/30 to-violet-500/30 blur-md" />
              <img
                src="/logonppt.png"
                alt="Nguyễn Phạm Phúc Tân"
                className="relative max-h-36 w-auto rounded-[28px] border border-border/50 shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-3xl font-bold tracking-tight"
          >
            Nguyễn Phạm Phúc Tân
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-2 text-lg text-muted-foreground"
          >
            A.V.O.R.A
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground/80"
          >
            Hệ thống AI cá nhân hoá 
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.55 }}
            className="my-8 h-px w-16 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          />

          {/* Connect Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            onClick={onConnect}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <Wifi className="h-5 w-5 transition-transform group-hover:scale-110" />
            Kết nối
          </motion.button>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-xs text-muted-foreground/50"
          >
            &copy; {new Date().getFullYear()} Nguyễn Phạm Phúc Tân
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Connecting Screen ─────────────────────────
function ConnectingScreen() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-60 w-60 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mb-8"
          >
            <img src="/logonppt.png" alt="AI OS" className="max-h-20 w-auto rounded-2xl opacity-70" />
          </motion.div>

          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary/10 p-4">
            <Wifi className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Đang kết nối...</h1>
          <p className="mb-8 text-muted-foreground">Kiểm tra kết nối đến backend server</p>
          <div className="flex gap-2">
            <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0s" }} />
            <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.15s" }} />
            <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.3s" }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Error Screen ──────────────────────────────
function ErrorScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-destructive/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center max-w-sm"
        >
          <div className="mb-6">
            <img src="/logonppt.png" alt="AI OS" className="max-h-20 w-auto rounded-xl opacity-40" />
          </div>

          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-destructive/10 p-4">
            <WifiOff className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Server chưa hoạt động</h1>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            Backend server hiện đang offline. Vui lòng gọi điện để được hỗ trợ mở server ngay.
          </p>

          <a
            href="tel:0847120357"
            className="group mb-4 inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 active:scale-[0.97]"
          >
            <Phone className="h-5 w-5 transition-transform group-hover:scale-110" />
            Gọi 0847.120.357 — Phúc Tân
          </a>

          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <RefreshCw className="h-4 w-4" />
            Thử lại kết nối
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────
export default function Home() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const checkConnection = async () => {
    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/system/health`, { signal: AbortSignal.timeout(5000) });
      if (res.ok) router.push("/news");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "loading") return <ConnectingScreen />;
  if (status === "error") return <ErrorScreen onRetry={checkConnection} />;
  return <WelcomeScreen onConnect={checkConnection} />;
}
