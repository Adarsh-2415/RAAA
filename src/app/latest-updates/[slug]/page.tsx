"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { use } from "react";
import { ArrowLeft, AlertCircle, Calendar, Tag, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { UpdateArticle } from "@/types/updates";

interface DynamicArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default function DynamicArticlePage({ params }: DynamicArticlePageProps) {
  const resolvedParams = use(params);
  const supabase = createClient();
  
  const [article, setArticle] = useState<UpdateArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true);
        const { data, error: fetchErr } = await supabase
          .from("latest_updates")
          .select("*")
          .eq("slug", resolvedParams.slug)
          .eq("status", "published")
          .single();

        if (fetchErr) throw fetchErr;
        setArticle(data);
      } catch (err) {
        console.error("Load article details error:", err);
        setError("Article not found.");
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [resolvedParams.slug, supabase]);

  if (loading) {
    return (
      <div className="w-full bg-bg-warm min-h-screen font-sans flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="w-full bg-bg-warm min-h-screen font-sans py-20 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-6 text-center space-y-6">
          <div className="w-16 h-16 bg-[#FAFAF8] text-accent-gold rounded-full flex items-center justify-center mx-auto border border-border-custom/50 shadow-xs">
            <AlertCircle size={28} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-primary-navy font-heading">
              Update Unavailable
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-sm mx-auto">
              This update is currently unavailable. It may have been moved, deleted, or is not yet published.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/latest-updates"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy transition-all duration-200"
            >
              <ArrowLeft size={14} />
              <span>Back to Latest Updates</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-bg-warm min-h-screen font-sans pb-20">
      
      {/* Editorial Header Banner */}
      <div className="bg-[#0F172A] text-white py-16 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 space-y-4 relative z-10 text-center sm:text-left">
          <Link href="/latest-updates" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-accent-gold transition-colors duration-250">
            <ArrowLeft size={12} />
            <span>Back to updates</span>
          </Link>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight pt-2">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-accent-gold" />
              <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Tag size={13} className="text-accent-gold" />
              <span className="uppercase font-bold tracking-wide">{article.category}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Article Content Area */}
      <div className="max-w-4xl mx-auto px-6 pt-12 grid grid-cols-1 gap-10">
        
        {/* Featured Cover Image */}
        {article.featured_image_url && (
          <div className="aspect-video rounded-3xl overflow-hidden bg-gray-100 border border-border-custom/50 shadow-sm">
            <img src={article.featured_image_url} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Text body */}
        <article className="prose prose-sm sm:prose max-w-none text-text-secondary leading-relaxed font-sans whitespace-pre-wrap p-6 bg-white border border-border-custom/80 rounded-3xl shadow-2xs">
          {article.content}
        </article>

      </div>

    </div>
  );
}
