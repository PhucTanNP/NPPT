"use client";

import {
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Gift,
  Sparkles,
  Zap,
  Gamepad2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@ui/utils";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, badge: null },
  { name: "Portfolio", href: "/portfolio", icon: UserCheck, badge: "DUT 2026" },
  { name: "Sinh Nhật Khánh Đoan", href: "/birthday", icon: Gift, badge: "25/09 🎉" },
  { name: "Wishlist Mini Game", href: "/game", icon: Gamepad2, badge: "🎰 GAME" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col border-r border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-sm z-30 select-none relative"
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-100">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-indigo-500/30 shadow-sm group-hover:border-indigo-600 transition-all">
              <Image src="/logonppt.png" alt="AI OS" fill className="object-cover" />
            </div>
            <div>
              <span className="font-black text-slate-900 text-sm tracking-tight block leading-none">
                AI OS <span className="text-xs font-mono text-indigo-600">v2.0</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                PHÚC TÂN ECOSYSTEM
              </span>
            </div>
          </Link>
        )}

        {collapsed && (
          <Link href="/" className="mx-auto">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-indigo-500/30 shadow-sm">
              <Image src="/logonppt.png" alt="AI OS" width={36} height={36} className="object-cover" />
            </div>
          </Link>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-xl p-1.5 bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors shadow-inner"
          title={collapsed ? "Mở rộng Sidebar" : "Thu gọn Sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {!collapsed && (
          <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Hệ Thống Mô-đun
          </div>
        )}

        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/birthday" && pathname === "/khanhdoan");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all relative group",
                isActive
                  ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-200/80"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className={cn("h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110", isActive ? "text-indigo-600" : "text-slate-500")} />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </div>

              {!collapsed && item.badge && (
                <span
                  className={cn(
                    "px-2 py-0.5 text-[9px] font-mono font-bold rounded-full border shrink-0",
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-slate-100 text-slate-600 border-slate-200"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer User Info */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        {!collapsed ? (
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-300 shrink-0">
                <Image src="/phuctan_studio.png" alt="Phuc Tan" fill className="object-cover" />
              </div>
              <div className="truncate">
                <h4 className="text-xs font-extrabold text-slate-900 truncate">Nguyễn Phạm Phúc Tân</h4>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  AI Engineer Core
                </p>
              </div>
            </div>
            <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-300 shadow-sm">
              <Image src="/phuctan_studio.png" alt="Phuc Tan" fill className="object-cover" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
