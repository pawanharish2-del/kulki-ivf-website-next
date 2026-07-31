"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, Search, Filter, Edit3, Trash2, ExternalLink, AlertTriangle, Loader2 } from "lucide-react";

interface Post {
  id: any;
  title: string;
  slug: string;
  featuredImage?: string | null;
  author: string;
  category: string;
  status: string;
  updatedAt: string;
}

export default function BlogsTableClient({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [deleteModalId, setDeleteModalId] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const categories = ["ALL", "Clinic News", "Guide", "Treatment Cost", "Fertility Facts", "Preservation"];

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "ALL" || p.category === selectedCat;
    const matchesStatus = selectedStatus === "ALL" || p.status === selectedStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

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
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#fde2e8]">
        <div>
          <h1 className="text-2xl font-bold text-[#802336] tracking-tight font-display">Manage Articles</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Total of {posts.length} articles stored in the Kulki IVF database.
          </p>
        </div>
        <Link
          href="/admin/blogs/create"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e0667e] to-[#c44d68] hover:from-[#c44d68] hover:to-[#a83a52] text-white font-bold text-sm shadow-md shadow-[#c44d68]/25 hover:shadow-lg transition-all duration-300 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Article
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#fde2e8] shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#c44d68]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#fff0f3]/50 border border-[#fde2e8] rounded-xl text-sm text-[#802336] placeholder-slate-400 focus:outline-none focus:border-[#c44d68] focus:bg-white transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#c44d68]/70" />
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="bg-[#fff0f3]/50 border border-[#fde2e8] rounded-xl px-3.5 py-2.5 text-sm text-[#802336] focus:outline-none focus:border-[#c44d68] font-semibold shadow-sm cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "ALL" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex rounded-xl bg-[#fff0f3]/70 p-1 border border-[#fde2e8] text-xs font-semibold shadow-inner">
            {["ALL", "PUBLISHED", "DRAFT"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  selectedStatus === status
                    ? "bg-white text-[#c44d68] shadow-sm font-bold border border-[#fde2e8]"
                    : "text-slate-500 hover:text-[#802336]"
                }`}
              >
                {status === "ALL" ? "All Status" : status === "PUBLISHED" ? "Published" : "Drafts"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#fde2e8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fff0f3]/60 border-b border-[#fde2e8] text-xs font-bold uppercase tracking-wider text-[#c44d68] font-display">
                <th className="py-4 px-6">Article</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Author</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Last Updated</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#fde2e8]/60 text-sm">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    No matching articles found. Try adjusting your search filters.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-[#fff0f3]/40 transition-colors border-b border-[#fde2e8]/40">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={post.featuredImage || "/assets/images/blog1.webp"}
                          alt={post.title}
                          className="w-12 h-10 rounded-xl object-cover bg-[#fff0f3] border border-[#fde2e8] shrink-0 shadow-sm"
                        />
                        <div className="min-w-0 max-w-xs md:max-w-md">
                          <Link
                            href={`/admin/blogs/edit/${post.id}`}
                            className="font-bold text-[#802336] hover:text-[#c44d68] block truncate transition-colors font-display"
                          >
                            {post.title}
                          </Link>
                          <span className="text-xs text-slate-400 truncate block font-mono mt-0.5">/{post.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#fff0f3] border border-[#fde2e8] text-[#802336] text-xs font-semibold">
                        {post.category || "General"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[#802336] text-xs font-semibold">{post.author}</td>
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
                    <td className="py-4 px-6 text-slate-500 text-xs font-medium">{new Date(post.updatedAt).toLocaleDateString()}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {post.status === "PUBLISHED" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            title="View on live site"
                            className="p-2 rounded-lg text-slate-400 hover:text-[#802336] hover:bg-[#fff0f3] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
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
      </div>

      {/* Delete Confirmation Modal */}
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
