"use client";

import React, { useEffect, useState } from "react";
import LatestUpdatesSection from "@/components/sections/latest-updates";
import { createClient } from "@/lib/supabase/client";
import { UpdateArticle } from "@/types/updates";

export default function LatestUpdatesPage() {
  const supabase = createClient();
  const [articles, setArticles] = useState<UpdateArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ["All", "GST", "Income Tax", "Accounting", "Audit", "Corporate", "General"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const loadPublishedArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from("latest_updates")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      setArticles(data || []);
    } catch (err) {
      console.error("Load public updates error:", err);
      setError("Failed to fetch updates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPublishedArticles();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Client-side search and category filtering
  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Format columns to match layout types
  const formattedArticles = filteredArticles.map(art => ({
    slug: art.slug,
    title: art.title,
    excerpt: art.excerpt,
    content: art.content,
    category: art.category,
    featuredImage: art.featured_image_url,
    publishDate: art.published_at || art.created_at,
    author: "R.A. Aggarwal & Associates",
    status: art.status,
  }));

  return (
    <LatestUpdatesSection
      articles={formattedArticles as any}
      categories={categories}
      isLoading={loading}
      error={error}
      selectedCategory={selectedCategory}
      searchQuery={searchQuery}
      onCategorySelect={handleCategorySelect}
      onSearch={handleSearch}
    />
  );
}
