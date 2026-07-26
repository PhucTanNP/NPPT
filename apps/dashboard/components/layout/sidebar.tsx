"use client";

import {
  Briefcase,
  MessageSquare,
  GraduationCap,
  Library,
  Brain,
  Code,
  FolderKanban,
  FileText,
  BarChart3,
  Settings,
  Newspaper,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@ui/utils";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "AI News", href: "/news", icon: Newspaper },
  { name: "AI Chat", href: "/chat", icon: MessageSquare },
  { name: "Knowledge", href: "/knowledge", icon: Library },
  { name: "Research", href: "/research", icon: Brain },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Career Hub", href: "/career", icon: GraduationCap },
  { name: "Coding Hub", href: "/coding", icon: Code },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Automation", href: "/automation", icon: Settings },
  { name: "Admin", href: "/admin", icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      animate={{ width: collapsed ? 60 : 240 }}
      className="flex flex-col border-r border-border bg-card/50 backdrop-blur"
    >
      <div className="flex h-14 items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold text-sm">AI OS</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-1.5 hover:bg-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}
