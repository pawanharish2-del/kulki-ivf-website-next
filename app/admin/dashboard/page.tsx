import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FileText, CheckCircle2, Clock, PlusCircle, ExternalLink, Activity, Sparkles } from "lucide-react";
import DashboardRecentTableClient from "@/components/admin/DashboardRecentTableClient";

export const revalidate = 0; // Dynamic fetching in admin

export default async function AdminDashboardPage() {
  let totalPosts = 0;
  let publishedPosts = 0;
  let draftPosts = 0;
  let recentPosts: any[] = [];

  try {
    totalPosts = await prisma.blogPost.count();
    publishedPosts = await prisma.blogPost.count({ where: { status: "PUBLISHED" } });
    draftPosts = await prisma.blogPost.count({ where: { status: "DRAFT" } });
    recentPosts = await prisma.blogPost.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
    });
  } catch (err) {
    console.error("Failed to fetch dashboard stats:", err);
  }

  const formattedRecentPosts = recentPosts.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category || "General",
    status: p.status,
    updatedAt: p.updatedAt.toISOString(),
  }));

  const stats = [
    { title: "Total Articles", value: totalPosts, icon: FileText, color: "text-[#c44d68] bg-[#fff0f3] border border-[#fde2e8]" },
    { title: "Published Live", value: publishedPosts, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border border-emerald-200" },
    { title: "Drafts Pending", value: draftPosts, icon: Clock, color: "text-amber-600 bg-amber-50 border border-amber-200" },
    { title: "CMS Status", value: "Optimal", icon: Activity, color: "text-blue-600 bg-blue-50 border border-blue-200" },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[#fde2e8]">
        <div>
          <h1 className="text-2xl font-bold text-[#802336] tracking-tight font-display">Executive Content Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Manage medical articles, SEO content, and patient educational guides for Kulki IVF.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs/create"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e0667e] to-[#c44d68] hover:from-[#c44d68] hover:to-[#a83a52] text-white font-bold text-sm shadow-md shadow-[#c44d68]/25 hover:shadow-lg transition-all duration-300 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            Create New Article
          </Link>
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#fde2e8] hover:bg-[#fff0f3] text-[#802336] text-sm font-semibold shadow-sm transition-all"
          >
            <ExternalLink className="w-4 h-4 text-[#c44d68]" />
            Live Blog
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-[#fde2e8] shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-display">{stat.title}</p>
                <h3 className="text-2xl font-extrabold text-[#802336] mt-0.5 font-display">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEO & AEO Banner (Soft Blush Pink & Cream theme) */}
      <div className="bg-[#fff0f3] border border-[#fde2e8] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#c44d68] text-xs font-bold border border-[#fde2e8] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#c44d68]" /> AEO & GEO Engine Active
          </div>
          <h3 className="text-lg font-bold font-display text-[#802336]">Generative Engine Optimization Enabled</h3>
          <p className="text-sm text-[#802336]/80 max-w-2xl leading-relaxed font-medium">
            All published blog posts automatically generate structured JSON-LD schemas and E-E-A-T key takeaway summaries to maximize visibility on Google AI Overviews, ChatGPT, and Perplexity.
          </p>
        </div>
        <Link
          href="/admin/blogs"
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e0667e] to-[#c44d68] hover:from-[#c44d68] hover:to-[#a83a52] text-white font-bold text-sm shadow-md shadow-[#c44d68]/20 transition-all shrink-0"
        >
          Manage SEO Content
        </Link>
      </div>

      {/* Recent Posts Table with Delete functionality */}
      <DashboardRecentTableClient initialPosts={formattedRecentPosts} />
    </div>
  );
}
