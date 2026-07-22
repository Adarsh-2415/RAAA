"use client";

import React, { useEffect, useState } from "react";
import { Search, Plus, Eye, Check, Trash2, X, RefreshCw, AlertCircle, Edit, Globe, EyeOff, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { UpdateArticle } from "@/types/updates";

export function UpdatesList() {
  const supabase = createClient();
  const [articles, setArticles] = useState<UpdateArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const categories = ["GST", "Income Tax", "Accounting", "Audit", "Corporate", "General"];

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("latest_updates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (err) {
      console.error("Load updates error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handlePublishStatus = async (id: string, currentStatus: "draft" | "published" | "deleted") => {
    const nextStatus = currentStatus === "published" ? "draft" : "published";
    try {
      const payload: any = { status: nextStatus };
      if (nextStatus === "published") {
        payload.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from("latest_updates")
        .update(payload)
        .eq("id", id);

      if (error) throw error;
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: nextStatus, published_at: payload.published_at } : a))
      );
    } catch (err) {
      console.error("Toggle publish status error:", err);
    }
  };

  const handleDelete = async (id: string, imagePath?: string | null) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      setDeletingId(id);
      
      // 1. Delete image from Storage if exists
      if (imagePath) {
        await supabase.storage.from("updates-media").remove([imagePath]);
      }

      // 2. Delete database record
      const { error } = await supabase
        .from("latest_updates")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Delete article error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredArticles = articles.filter((item) => {
    const query = searchQuery.toLowerCase();
    
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.slug.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-8">
      
      {/* Title Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link href="/admin/manage-pages" className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-gold transition-colors duration-200">
            <Plus size={12} className="rotate-45" />
            <span>Back to Manage Pages</span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-extrabold text-primary-navy font-heading tracking-tight">
            Latest Updates Manager
          </h2>
        </div>

        <Link href="/admin/manage-pages/latest-updates/new">
          <button className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy transition-all duration-200 shadow-sm cursor-pointer shrink-0">
            <Plus size={14} />
            <span>Add New Update</span>
          </button>
        </Link>
      </div>

      {/* Toolbar filters and Search bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-4 border border-border-custom/80 rounded-2xl shadow-2xs">
        
        {/* Search */}
        <div className="md:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by Title, Category, or Slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAFAF8] border border-border-custom rounded-full text-xs sm:text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/45"
          />
        </div>

        {/* Status select */}
        <div className="md:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 bg-[#FAFAF8] border border-border-custom rounded-full text-xs sm:text-sm focus:outline-none focus:border-accent-gold cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Category select */}
        <div className="md:col-span-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2 bg-[#FAFAF8] border border-border-custom rounded-full text-xs sm:text-sm focus:outline-none focus:border-accent-gold cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Articles table grid */}
      {loading ? (
        <div className="h-64 bg-white border border-border-custom/80 rounded-3xl animate-pulse" />
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white border border-border-custom/80 rounded-3xl space-y-4">
          <div className="w-12 h-12 bg-bg-warm rounded-full flex items-center justify-center mx-auto text-text-secondary/40">
            <EyeOff size={20} />
          </div>
          <p className="text-xs sm:text-sm text-text-secondary">No articles found.</p>
        </div>
      ) : (
        <div className="bg-white border border-border-custom/80 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border-custom bg-bg-warm/50 font-heading text-primary-navy font-bold">
                  <th className="p-4 w-20">Image</th>
                  <th className="p-4">Article Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Publish Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom/50 font-sans text-text-secondary">
                {filteredArticles.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-warm/10 transition-colors duration-150">
                    
                    {/* Image */}
                    <td className="p-4">
                      {item.featured_image_url ? (
                        <div className="w-12 h-8 rounded-lg overflow-hidden bg-gray-100 border border-border-custom/40">
                          <img src={item.featured_image_url} alt="cover" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-8 rounded-lg bg-bg-warm border border-border-custom/40 flex items-center justify-center text-text-secondary/30">
                          <ImageIcon size={14} />
                        </div>
                      )}
                    </td>

                    {/* Title and Slug */}
                    <td className="p-4 max-w-sm">
                      <div className="font-bold text-primary-navy truncate">{item.title}</div>
                      <div className="text-[10px] sm:text-xs text-text-secondary/60 font-mono truncate">{item.slug}</div>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="inline-block px-2 py-0.5 bg-bg-warm border border-border-custom/50 rounded-md text-[10px] font-bold text-primary-navy uppercase">
                        {item.category}
                      </span>
                    </td>

                    {/* Publish date */}
                    <td className="p-4">
                      {item.published_at ? new Date(item.published_at).toLocaleDateString() : "-"}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === "published"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Actions buttons */}
                    <td className="p-4 text-right space-x-2">
                      <Link href={`/admin/manage-pages/latest-updates/edit/${item.id}`}>
                        <button
                          className="p-1.5 hover:text-accent-gold transition-colors duration-150 cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                      </Link>

                      <button
                        onClick={() => handlePublishStatus(item.id, item.status)}
                        className="p-1.5 hover:text-accent-gold transition-colors duration-150 cursor-pointer"
                        title={item.status === "published" ? "Unpublish" : "Publish"}
                      >
                        {item.status === "published" ? <EyeOff size={14} /> : <Check size={14} />}
                      </button>

                      <button
                        onClick={() => handleDelete(item.id, item.featured_image_path)}
                        disabled={deletingId === item.id}
                        className="p-1.5 hover:text-red-500 transition-colors duration-150 cursor-pointer disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === item.id ? <Loader2 size={14} className="animate-spin text-accent-gold" /> : <Trash2 size={14} />}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
export default UpdatesList;
