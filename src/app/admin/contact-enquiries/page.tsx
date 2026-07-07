"use client";

import React, { useEffect, useState } from "react";
import { Search, Mail, Phone, Calendar, ArrowRight, Eye, Check, Trash2, X, Clock, HelpCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ConsoleLayout } from "@/components/admin/layout";
import { ContactEnquiry } from "@/types/admin";

export default function ContactEnquiriesPage() {
  const supabase = createClient();
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);

  // Load submissions from Supabase DB
  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("contact_enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEnquiries(data || []);
    } catch (err) {
      console.error("Load enquiries error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleMarkRead = async (id: string, currentRead: boolean) => {
    try {
      const { error } = await supabase
        .from("contact_enquiries")
        .update({ is_read: !currentRead })
        .eq("id", id);

      if (error) throw error;
      
      // Update local state
      setEnquiries(prev =>
        prev.map(item => (item.id === id ? { ...item, is_read: !currentRead } : item))
      );
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(prev => prev ? { ...prev, is_read: !currentRead } : null);
      }
    } catch (err) {
      console.error("Update read status error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      const { error } = await supabase
        .from("contact_enquiries")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setEnquiries(prev => prev.filter(item => item.id !== id));
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error("Delete enquiry error:", err);
    }
  };

  const filteredEnquiries = enquiries.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.full_name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.phone.toLowerCase().includes(query) ||
      item.subject.toLowerCase().includes(query)
    );
  });

  return (
    <ConsoleLayout>
      
      {/* Header section */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold tracking-widest text-[#E56E58] uppercase block">
          Communications
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-navy font-heading tracking-tight">
          Contact Enquiries
        </h1>
        <div className="h-[2px] w-10 bg-accent-gold rounded-full" />
      </div>

      {/* Toolbar Search Stack */}
      <div className="flex items-center gap-4 bg-white p-4 border border-border-custom/80 rounded-2xl shadow-2xs">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by Name, Email, or Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAFAF8] border border-border-custom rounded-full text-xs sm:text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/45"
          />
        </div>
      </div>

      {/* Main content view */}
      {loading ? (
        <div className="h-64 bg-white border border-border-custom/80 rounded-3xl animate-pulse" />
      ) : filteredEnquiries.length === 0 ? (
        <div className="text-center py-16 bg-white border border-border-custom/80 rounded-3xl space-y-4">
          <div className="w-12 h-12 bg-bg-warm rounded-full flex items-center justify-center mx-auto text-text-secondary/40">
            <Mail size={20} />
          </div>
          <p className="text-xs sm:text-sm text-text-secondary">No enquiries found.</p>
        </div>
      ) : (
        <div className="bg-white border border-border-custom/80 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border-custom bg-bg-warm/50 font-heading text-primary-navy font-bold">
                  <th className="p-4">Sender</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom/50 font-sans text-text-secondary">
                {filteredEnquiries.map(item => (
                  <tr key={item.id} className="hover:bg-bg-warm/10 transition-colors duration-150">
                    <td className="p-4">
                      <div className="font-bold text-primary-navy">{item.full_name}</div>
                      <div className="text-[10px] sm:text-xs text-text-secondary/70">{item.email}</div>
                    </td>
                    <td className="p-4 truncate max-w-xs">{item.subject}</td>
                    <td className="p-4">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.is_read
                          ? "bg-gray-100 text-gray-600"
                          : "bg-green-50 text-green-700 border border-green-200"
                      }`}>
                        {item.is_read ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedEnquiry(item)}
                        className="p-1.5 hover:text-accent-gold transition-colors duration-150 cursor-pointer"
                        title="View details"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => handleMarkRead(item.id, item.is_read)}
                        className="p-1.5 hover:text-accent-gold transition-colors duration-150 cursor-pointer"
                        title={item.is_read ? "Mark unread" : "Mark read"}
                      >
                        <Check size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 hover:text-red-500 transition-colors duration-150 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DETAIL MODAL DRAWER OVERLAY */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-border-custom rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-custom-lg relative space-y-6">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-4 right-4 text-text-secondary/50 hover:text-text-secondary cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest uppercase font-bold text-accent-gold">
                Enquiry Details
              </span>
              <h3 className="text-lg font-bold text-primary-navy font-heading">
                {selectedEnquiry.subject}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs font-sans text-text-secondary border-y border-border-custom/50 py-4">
              <div>
                <span className="font-bold text-primary-navy block">Sender Name</span>
                <span>{selectedEnquiry.full_name}</span>
              </div>
              <div>
                <span className="font-bold text-primary-navy block">Email</span>
                <span>{selectedEnquiry.email}</span>
              </div>
              <div>
                <span className="font-bold text-primary-navy block">Phone</span>
                <span>{selectedEnquiry.phone}</span>
              </div>
              <div>
                <span className="font-bold text-primary-navy block">Received</span>
                <span>{new Date(selectedEnquiry.created_at).toLocaleString()}</span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary-navy block">Message</span>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans bg-[#FAFAF8] p-4 rounded-xl border border-border-custom/50">
                {selectedEnquiry.message}
              </p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => handleMarkRead(selectedEnquiry.id, selectedEnquiry.is_read)}
                className="px-4 py-2 border border-border-custom text-primary-navy text-xs font-bold uppercase tracking-wider rounded-full hover:bg-bg-warm transition-all duration-200 cursor-pointer"
              >
                {selectedEnquiry.is_read ? "Mark Unread" : "Mark Read"}
              </button>
              <button
                onClick={() => handleDelete(selectedEnquiry.id)}
                className="px-4 py-2 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-red-600 transition-all duration-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </ConsoleLayout>
  );
}
