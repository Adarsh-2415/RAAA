"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { CSRActivity } from "./types";
import { CSRHero } from "./hero";
import { CSREmptyState } from "./empty-state";
import { CSRLightbox } from "./lightbox";

interface DetailsProps {
  activity: CSRActivity | null;
  breadcrumbLabel: string;
  baseRoute: string;
}

export function CSRDetailsSection({ activity, breadcrumbLabel, baseRoute }: DetailsProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (!activity) {
    return (
      <div className="w-full bg-bg-warm min-h-screen font-sans py-20 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-6 text-center space-y-6">
          <div className="w-16 h-16 bg-[#FAFAF8] text-accent-gold rounded-full flex items-center justify-center mx-auto border border-border-custom/50 shadow-xs">
            <Calendar size={28} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-primary-navy font-heading">
              Activity Unavailable
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-sm mx-auto">
              This activity is currently unavailable. It may have been moved, deleted, or is not yet published.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={baseRoute}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy transition-all duration-200"
            >
              <ArrowLeft size={14} />
              <span>Back to Activities</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const galleryImages = activity.galleryImages || [];

  const handleImageClick = (idx: number) => {
    setActivePhotoIndex(idx);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setActivePhotoIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActivePhotoIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-bg-warm min-h-screen font-sans pb-20">
      
      {/* Hero Header */}
      <CSRHero title={activity.title} breadcrumbLabel={`${breadcrumbLabel} / ${activity.title}`} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* Back Link */}
        <Link
          href={baseRoute}
          className="inline-flex items-center gap-2 text-xs font-bold text-primary-navy hover:text-accent-gold transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          <span>Back to {breadcrumbLabel}</span>
        </Link>

        {/* Overview Details Section */}
        <div className="bg-white border border-border-custom/80 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-text-secondary border-b border-border-custom/50 pb-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-accent-gold" />
              <span>{activity.date}</span>
            </div>
            {activity.location && (
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-accent-gold" />
                <span>{activity.location}</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-primary-navy font-heading">
              Overview
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
              {activity.shortDescription}
            </p>
            {activity.fullDescription && (
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                {activity.fullDescription}
              </p>
            )}
          </div>
        </div>

        {/* Gallery Image Grid section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-primary-navy font-heading">
            Photo Gallery
          </h2>

          {galleryImages.length === 0 ? (
            <CSREmptyState
              title="No Gallery Images Uploaded"
              description="Event photographs will appear here after they are uploaded through the CMS."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => handleImageClick(idx)}
                  className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-border-custom bg-bg-warm shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                >
                  <Image
                    src={img}
                    alt={`Event photograph ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Reusable Lightbox */}
      <CSRLightbox
        images={galleryImages}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

    </div>
  );
}
export default CSRDetailsSection;
