"use client";

import { Bell, Search, Sparkles, User, ShieldCheck } from "lucide-react";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import Link from "next/link";

export function TopBar() {
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/90 px-6 backdrop-blur-xl z-20 shadow-xs">
      {/* Search Input Bar */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Tìm kiếm tin tức AI, kỹ năng hay dự án..."
          className="pl-10 pr-12 bg-slate-50 border-slate-200 text-xs rounded-xl focus-visible:ring-indigo-500 font-medium"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-400 bg-white rounded border border-slate-200">
          ⌘K
        </span>
      </div>

      {/* System Status & Actions */}
      <div className="flex items-center gap-3">
        {/* Connection Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>AI Engine Connected</span>
        </div>

        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-slate-100 text-slate-600">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-indigo-600 animate-ping"></span>
          <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-indigo-600"></span>
        </Button>

        {/* Direct Link to Portfolio */}
        <Link href="/portfolio">
          <Button className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold gap-2 shadow-sm">
            <User className="h-3.5 w-3.5 text-indigo-400" />
            <span>Hồ Sơ AI Engineer</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
