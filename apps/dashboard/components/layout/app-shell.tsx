"use client";

import React, { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

function AppShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isRootPage = pathname === "/";
  const isStandaloneRoute =
    pathname === "/game" ||
    pathname === "/minigame" ||
    searchParams.get("standalone") === "true" ||
    searchParams.get("share") === "true" ||
    searchParams.get("public") === "true";

  const isAdminView = searchParams.get("admin") === "true";

  // Standalone public mode: Hide Sidebar & TopBar completely for shared guest links
  if (isRootPage || (isStandaloneRoute && !isAdminView)) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main
          className={`flex-1 overflow-y-auto ${
            pathname === "/portfolio" ||
            pathname === "/birthday" ||
            pathname === "/khanhdoan" ||
            pathname === "/game" ||
            pathname === "/minigame"
              ? "p-0 sm:p-2"
              : "p-6"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <AppShellContent>{children}</AppShellContent>
    </Suspense>
  );
}
