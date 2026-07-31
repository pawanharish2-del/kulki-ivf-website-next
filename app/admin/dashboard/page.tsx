import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FileText, CheckCircle2, Clock, PlusCircle, Sparkles } from "lucide-react";
import DashboardRecentTableClient from "@/components/admin/DashboardRecentTableClient";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  let totalPosts = 0;
  let publishedPosts = 0;
  let draftPosts = 0;
  let recentPosts: any[] = [];
  // pendingReviews removed as status field no longer exists

  try {
    totalPosts = await prisma.blogPost.count();
    publishedPosts = await prisma.blogPost.count({ where: { isPublished: true } });
    draftPosts = await prisma.blogPost.count({ where: { isPublished: false } });
    // pendingReviews query removed
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
    isPublished: p.isPublished,
    updatedAt: p.updatedAt.toISOString(),
  }));

  const stats = [
    { title: "Total Articles", value: totalPosts, icon: FileText, color: "text-[#c44d68] bg-[#fff0f3]" },
    { title: "Live Published", value: publishedPosts, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { title: "Drafts", value: draftPosts, icon: Clock, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Content Control Center</h1>
          <p className="text-sm text-slate-500 mt-1">Manage articles, AI schema generation, and publication workflow.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            New Post
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.title}</p>
                <h3 className="text-xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex gap-4">
          <div className="mt-1 p-2 bg-white rounded-lg shadow-sm border border-indigo-100">
            <Sparkles className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-md font-bold text-indigo-900">AI Optimization Engine</h3>
            <p className="text-sm text-indigo-700/80 max-w-xl">
              Automatic Schema markup, E-E-A-T analysis, and Key Takeaway generation are active for all published content.
            </p>
          </div>
        </div>
        <Link
          href="/admin/settings"
          className="px-4 py-2 bg-white text-indigo-600 text-sm font-bold rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors"
        >
          Configure SEO
        </Link>
      </div>

      <DashboardRecentTableClient initialPosts={formattedRecentPosts} />
    </div>
  );
}
