"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Edit3, Trash2, AlertTriangle, Loader2 } from "lucide-react";

interface Post {
  id: any;
  title: string;
  category: string;
  status: string;
  updatedAt: string;
}

export default function DashboardRecentTableClient({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [deleteModalId, setDeleteModalId] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: any) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setDeleteModalId(null);
        router.refresh();
      } else {
        alert("Failed to delete post. Please try again.");
      }
    } catch (err) {
      alert("An error occurred during deletion.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#fde2e8] shadow-sm overflow-hidden font-sans">
      <div className="p-6 border-b border-[#fde2e8] flex items-center justify-between bg-[#fff0f3]/50">
        <h3 className="font-bold text-[#802336] font-display text-lg">Recently Updated Articles</h3>
        <Link
          href="/admin/blogs"
          className="text-sm font-bold text-[#c44d68] hover:text-[#802336] flex items-center gap-1 transition-colors"
        >
          <span>View All Articles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fff0f3]/60 border-b border-[#fde2e8] text-xs font-bold uppercase tracking-wider text-[#c44d68] font-display">
              <th className="py-4 px-6">Article Title</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Last Updated</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#fde2e8]/60 text-sm">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                  No articles found in the database.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#fff0f3]/40 transition-colors border-b border-[#fde2e8]/40">
                  <td className="py-4 px-6 font-bold text-[#802336] max-w-md truncate font-display">
                    {post.title}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#fff0f3] border border-[#fde2e8] text-[#802336] text-xs font-semibold">
                      {post.category || "General"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                        post.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          post.status === "PUBLISHED" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      {post.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-xs font-medium">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blogs/edit/${post.id}`}
                        title="Edit Post"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff0f3] hover:bg-gradient-to-r hover:from-[#e0667e] hover:to-[#c44d68] text-[#c44d68] hover:text-white border border-[#fde2e8] hover:border-transparent font-bold text-xs transition-all shadow-sm"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Link>
                      <button
                        onClick={() => setDeleteModalId(post.id)}
                        title="Delete Post"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 hover:border-transparent font-bold text-xs transition-all shadow-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteModalId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#fde2e8] space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#fff0f3] text-[#c44d68] flex items-center justify-center mx-auto border border-[#fde2e8]">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-[#802336] font-display">Delete Article Permanently?</h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                Are you sure you want to permanently delete this article? This action cannot be undone and will remove the post from live SEO indexes.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 rounded-full bg-[#fff0f3] hover:bg-[#fde2e8] text-[#802336] border border-[#fde2e8] font-bold text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModalId)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#e0667e] to-[#c44d68] hover:from-[#c44d68] hover:to-[#a83a52] text-white font-bold text-sm shadow-md shadow-[#c44d68]/25 flex items-center justify-center gap-2 transition-all"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Yes, Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
