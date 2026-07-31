"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Image as ImageIcon, Sparkles, Upload, Loader2, CheckCircle2, Eye } from "lucide-react";
import Link from "next/link";

interface PostData {
  id?: any;
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
}

export default function BlogFormClient({ initialData, isEdit = false }: { initialData?: PostData; isEdit?: boolean }) {
  const [formData, setFormData] = useState<PostData>(
    initialData || {
      title: "",
      slug: "",
      content: "<h3>Introduction</h3>\n<p>Write your medical article content here...</p>",
      featuredImage: "/assets/images/blog1.webp",
      metaTitle: "",
      metaDescription: "",
      isPublished: true,
    }
  );
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    // Auto-generate slug if not editing existing post
    if (!isEdit) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData((prev) => ({ ...prev, title, slug }));
    } else {
      setFormData((prev) => ({ ...prev, title }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (res.ok && json.url) {
        setFormData((prev) => ({ ...prev, featuredImage: json.url }));
      } else {
        alert(json.error || "Failed to upload image.");
      }
    } catch (err) {
      alert("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/blogs/${formData.id}` : "/api/blogs";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        setError(json.error || "Failed to save article.");
      }
    } catch (err) {
      setError("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16 font-sans">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#fde2e8]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2.5 rounded-full bg-white border border-[#fde2e8] hover:bg-[#fff0f3] text-[#802336] transition-all shadow-sm shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#802336] tracking-tight font-display">
              {isEdit ? "Edit Article" : "Create New Article"}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5 font-medium">
              {isEdit ? `Editing "/${formData.slug}"` : "Publish evidence-based health articles for SEO."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={formData.isPublished ? "true" : "false"}
            onChange={(e) => setFormData((prev) => ({ ...prev, isPublished: e.target.value === "true" }))}
            className="bg-white border border-[#fde2e8] rounded-xl px-4 py-2.5 text-sm font-bold text-[#802336] focus:outline-none focus:border-[#c44d68] shadow-sm cursor-pointer"
          >
            <option value="true">Published Live</option>
            <option value="false">Save as Draft</option>
          </select>

          <button
            type="submit"
            disabled={saving || uploading}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e0667e] to-[#c44d68] hover:from-[#c44d68] hover:to-[#a83a52] text-white font-bold text-sm shadow-md shadow-[#c44d68]/25 hover:shadow-lg transition-all duration-300 disabled:opacity-50 shrink-0"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEdit ? "Update Post" : "Publish Post"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-[#c44d68] text-sm font-bold animate-shake">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#fde2e8] shadow-sm space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-display">
                Article Title <span className="text-[#c44d68]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Why Kulki IVF is Ranked the Best IVF Centre in Jaipur"
                className="w-full bg-[#fff0f3]/50 border border-[#fde2e8] rounded-xl px-4 py-3 text-base font-semibold text-[#802336] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#c44d68] transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-display">
                URL Slug <span className="text-[#c44d68]">*</span>
              </label>
              <div className="flex items-center bg-[#fff0f3]/50 border border-[#fde2e8] rounded-xl overflow-hidden focus-within:border-[#c44d68] focus-within:bg-white transition-all shadow-sm">
                <span className="px-3.5 py-3 bg-[#fff0f3] text-[#c44d68] text-sm font-mono border-r border-[#fde2e8] select-none font-bold">
                  /blog/
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="article-url-slug"
                  className="flex-1 bg-transparent px-3 py-3 text-sm font-mono text-[#802336] focus:outline-none font-medium"
                />
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-2xl border border-[#fde2e8] shadow-sm overflow-hidden">
            <div className="p-4 bg-[#fff0f3]/60 border-b border-[#fde2e8] flex items-center justify-between">
              <label className="text-xs font-bold text-[#802336] uppercase tracking-wider font-display">
                Article Body (HTML / Markdown) <span className="text-[#c44d68]">*</span>
              </label>
              <div className="flex bg-[#fff0f3] p-1 rounded-xl text-xs font-semibold border border-[#fde2e8]">
                <button
                  type="button"
                  onClick={() => setActiveTab("write")}
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    activeTab === "write"
                      ? "bg-white text-[#c44d68] shadow-sm font-bold border border-[#fde2e8]"
                      : "text-slate-500 hover:text-[#802336]"
                  }`}
                >
                  Write Code
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === "preview"
                      ? "bg-white text-[#c44d68] shadow-sm font-bold border border-[#fde2e8]"
                      : "text-slate-500 hover:text-[#802336]"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-[#c44d68]" />
                  Live Preview
                </button>
              </div>
            </div>

            {activeTab === "write" ? (
              <textarea
                required
                rows={18}
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Write your article content using standard HTML (<p>, <h2>, <ul>) or Markdown formatting..."
                className="w-full font-mono text-sm p-5 text-[#802336] bg-[#fff0f3]/30 focus:outline-none focus:bg-white transition-all leading-relaxed"
              />
            ) : (
              <div
                className="p-6 min-h-[400px] max-h-[600px] overflow-y-auto prose prose-rose max-w-none text-slate-800 leading-relaxed font-sans"
                dangerouslySetInnerHTML={{ __html: formData.content }}
              />
            )}
          </div>
        </div>

        {/* Sidebar Settings (1 Col) */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#fde2e8] shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-[#802336] uppercase tracking-wider pb-3 border-b border-[#fde2e8] flex items-center gap-2 font-display">
              <Sparkles className="w-4 h-4 text-[#c44d68]" /> SEO & GEO Optimization
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-display">Meta Title Tag</label>
              <input
                type="text"
                value={formData.metaTitle || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))}
                placeholder={formData.title || "Custom SEO Title"}
                className="w-full bg-[#fff0f3]/50 border border-[#fde2e8] rounded-xl px-3.5 py-2.5 text-xs text-[#802336] focus:outline-none focus:bg-white focus:border-[#c44d68] transition-all font-medium shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-display">Meta Description</label>
              <textarea
                rows={3}
                value={formData.metaDescription || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, metaDescription: e.target.value }))}
                placeholder="Compelling 150-160 character description for search results..."
                className="w-full bg-[#fff0f3]/50 border border-[#fde2e8] rounded-xl p-3 text-xs text-[#802336] focus:outline-none focus:bg-white focus:border-[#c44d68] transition-all font-medium shadow-sm"
              />
            </div>
          </div>

          {/* Publishing Settings */}
          <div className="bg-white p-6 rounded-2xl border border-[#fde2e8] shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-[#802336] uppercase tracking-wider pb-3 border-b border-[#fde2e8] font-display">
              Publishing Details
            </h3>

            {/* Featured Image */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 font-display">Featured Image</label>
              {formData.featuredImage && (
                <div className="mb-3 relative rounded-xl overflow-hidden border border-[#fde2e8] aspect-video bg-[#fff0f3]/30 shadow-sm">
                  <img src={formData.featuredImage} alt="Featured" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="space-y-2.5">
                <input
                  type="text"
                  value={formData.featuredImage || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featuredImage: e.target.value }))}
                  placeholder="/assets/images/blog1.webp or image URL"
                  className="w-full bg-[#fff0f3]/50 border border-[#fde2e8] rounded-xl px-3.5 py-2 text-xs text-[#802336] font-mono focus:outline-none focus:bg-white focus:border-[#c44d68] transition-all shadow-sm"
                />

                <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#fff0f3]/60 hover:bg-[#fff0f3] text-[#802336] text-xs font-bold cursor-pointer border border-[#fde2e8] transition-all shadow-sm hover:border-[#c44d68]/50">
                  {uploading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#c44d68]" />
                      <span>Uploading Image...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5 text-[#c44d68]" />
                      <span>Upload New Image File</span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
