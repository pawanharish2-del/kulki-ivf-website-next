"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Edit3, Trash2, AlertTriangle, Loader2, CheckCircle, Eye } from "lucide-react";

interface Post {
  id: any;
  title: string;
  isPublished: boolean;
  updatedAt: string;
}

export default function DashboardRecentTableClient({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [deleteModalId, setDeleteModalId] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleToggleSelect = (id: any) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === posts.length) setSelectedIds([]);
    else setSelectedIds(posts.map((p) => p.id));
  };

  const handleTogglePublish = async (id: any, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isPublished: !currentStatus }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isPublished: !currentStatus } : p))
        );
        router.refresh();
      }
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (id: any) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setDeleteModalId(null);
        router.refresh();
      }
    } catch (err) {
      alert("An error occurred.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#fde2e8] shadow-sm overflow-hidden font-sans">
      <div className="p-6 border-b border-[#fde2e8] flex items-center justify-between bg-[#fff0f3]/50">
        <h3 className="font-bold text-[#802336] font-display text-lg">Recently Updated Articles</h3>
        <Link href="/admin/blogs" className="text-sm font-bold text-[#c44d68] hover:text-[#802336] flex items-center gap-1">
          <span>View All Articles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fff0f3]/60 border-b border-[#fde2e8] text-xs font-bold uppercase tracking-wider text-[#c44d68]">
              <th className="py-4 px-6 w-10">
                <input type="checkbox" checked={selectedIds.length === posts.length && posts.length > 0} onChange={handleSelectAll} className="rounded border-[#fde2e8] text-[#c44d68] focus:ring-[#c44d68]" />
              </th>
              <th className="py-4 px-6">Article Title</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Last Updated</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#fde2e8]/60 text-sm">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-[#fff0f3]/40 transition-colors">
                <td className="py-4 px-6">
                  <input type="checkbox" checked={selectedIds.includes(post.id)} onChange={() => handleToggleSelect(post.id)} className="rounded border-[#fde2e8] text-[#c44d68] focus:ring-[#c44d68]" />
                </td>
                <td className="py-4 px-6 font-bold text-[#802336] truncate">{post.title}</td>
                <td className="py-4 px-6">
                  <button onClick={() => handleTogglePublish(post.id, post.isPublished)} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${post.isPublished ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {post.isPublished ? <CheckCircle className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {post.isPublished ? "PUBLISHED" : "DRAFT"}
                  </button>
                </td>
                <td className="py-4 px-6 text-slate-500">{new Date(post.updatedAt).toLocaleDateString()}</td>
                <td className="py-4 px-6 text-right space-x-2">
                  <Link href={`/admin/blogs/edit/${post.id}`} className="px-3 py-1.5 bg-[#fff0f3] text-[#c44d68] rounded-full text-xs font-bold">Edit</Link>
                  <button onClick={() => setDeleteModalId(post.id)} className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-full text-xs font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteModalId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4">
            <h3 className="font-bold text-[#802336]">Delete Article?</h3>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModalId(null)} className="flex-1 px-4 py-2 rounded-full border">Cancel</button>
              <button onClick={() => handleDelete(deleteModalId)} className="flex-1 px-4 py-2 rounded-full bg-rose-600 text-white font-bold" disabled={deleting}>
                {deleting ? <Loader2 className="animate-spin mx-auto w-4 h-4" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
