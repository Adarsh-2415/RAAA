"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Award, ArrowRight } from "lucide-react";
import { CSRActivity } from "./types";

interface CardProps {
  activity: CSRActivity;
  baseRoute: string;
}

export function CSRActivityCard({ activity, baseRoute }: CardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border-custom/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
      
      {/* Cover Image or Branded Placeholder */}
      <div className="relative aspect-[16/10] w-full bg-bg-warm overflow-hidden border-b border-border-custom/50">
        {activity.coverImage ? (
          <Image
            src={activity.coverImage}
            alt={activity.title}
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0F172A] flex flex-col items-center justify-center text-accent-gold/40">
            <Award className="w-12 h-12 text-accent-gold/50" />
            <span className="mt-2 text-[10px] tracking-widest uppercase font-bold text-accent-gold/40">
              CSR Program
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Text Details content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          
          {/* Metadata dates */}
          <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs text-text-secondary">
            <div className="flex items-center gap-1">
              <Calendar size={12} className="text-accent-gold" />
              <span>{activity.date}</span>
            </div>
            {activity.location && (
              <div className="flex items-center gap-1">
                <MapPin size={12} className="text-accent-gold" />
                <span>{activity.location}</span>
              </div>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-primary-navy font-heading leading-tight group-hover:text-accent-gold transition-colors duration-200">
            {activity.title}
          </h3>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans line-clamp-3">
            {activity.shortDescription}
          </p>

        </div>

        <div className="pt-2">
          <Link
            href={`${baseRoute}/${activity.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-primary-navy/20 text-primary-navy text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:border-accent-gold hover:text-primary-navy transition-all duration-200"
          >
            <span>View Gallery</span>
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>

    </div>
  );
}
export default CSRActivityCard;
