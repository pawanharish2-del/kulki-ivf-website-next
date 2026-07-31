"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, FileText, PlusCircle, LogOut, ExternalLink, ShieldCheck, X } from "lucide-react";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Manage Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Create New Post", href: "/admin/blogs/create", icon: PlusCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 md:static md:z-auto flex flex-col min-h-screen border-r border-[#fde2e8] shrink-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } bg-white text-slate-800 shadow-2xl md:shadow-none`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-[#fde2e8] flex items-center justify-between gap-3 bg-[#fff0f3]/60">
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src="/assets/images/logo.jpg"
              alt="Kulki IVF Logo"
              className="h-12 w-auto object-contain rounded-xl shrink-0 border border-[#fde2e8] bg-white p-1 shadow-sm"
            />
            <div className="min-w-0 flex flex-col justify-center">
              <h2 className="font-bold text-base leading-tight tracking-tight text-[#802336] truncate font-display">
                Kulki IVF
              </h2>
              <span className="text-[11px] text-[#c44d68] flex items-center gap-1 font-semibold mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c44d68] shrink-0" /> Admin Portal
              </span>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-[#c44d68] hover:bg-[#fff0f3] transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-bold text-[#c44d68]/70 uppercase tracking-wider font-display">
            Content Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onClose && onClose()}
                className={`group flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#e0667e] to-[#c44d68] text-white shadow-md shadow-[#c44d68]/25 font-bold"
                    : "text-slate-600 hover:bg-[#fff0f3] hover:text-[#c44d68] font-medium"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-[#c44d68]"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}

          <div className="pt-6 px-3 py-2 text-[11px] font-bold text-[#c44d68]/70 uppercase tracking-wider font-display">
            Quick Actions
          </div>
          <Link
            href="/"
            target="_blank"
            onClick={() => onClose && onClose()}
            className="group flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-[#fff0f3] hover:text-[#802336] transition-all border border-[#fde2e8] hover:border-[#c44d68]/30 shadow-sm"
          >
            <ExternalLink className="w-4 h-4 text-[#c44d68]/70 group-hover:text-[#c44d68] transition-colors" />
            View Live Website
          </Link>
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-[#fde2e8] bg-[#fff0f3]/40">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#fff0f3] hover:bg-gradient-to-r hover:from-[#e0667e] hover:to-[#c44d68] text-[#c44d68] hover:text-white border border-[#fde2e8] hover:border-transparent text-sm font-semibold transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
