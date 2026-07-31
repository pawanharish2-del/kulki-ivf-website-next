"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import { Loader2, Menu } from "lucide-react";

export default function AdminClientLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.replace("/admin/login");
    } else if (status === "authenticated" && pathname === "/admin/login") {
      router.replace("/admin/dashboard");
    }
  }, [status, pathname, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#fff0f3] flex flex-col items-center justify-center text-[#802336] gap-3 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-[#c44d68]" />
        <p className="text-sm font-semibold tracking-wide text-[#c44d68]">Loading Admin Portal...</p>
      </div>
    );
  }

  if (status === "unauthenticated" && pathname !== "/admin/login") {
    return null;
  }

  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="min-h-screen bg-[#fff0f3]/40 flex font-sans text-slate-900">
      {!isLoginPage && (
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <main className="flex-1 flex flex-col min-w-0 bg-[#fff0f3]/30">
        {!isLoginPage && (
          <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md border-b border-[#fde2e8] sticky top-0 z-30 shadow-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src="/assets/images/logo.jpg"
                alt="Kulki IVF Logo"
                className="h-8 w-auto object-contain rounded-md shrink-0 border border-[#fde2e8] bg-white p-0.5"
              />
              <span className="font-bold text-base text-[#802336] tracking-tight truncate font-display">
                Kulki IVF Admin
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-white border border-[#fde2e8] text-[#802336] hover:bg-[#fff0f3] transition-colors shadow-sm shrink-0"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5 text-[#c44d68]" />
            </button>
          </header>
        )}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
