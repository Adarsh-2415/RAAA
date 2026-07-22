"use client";

import React, { useState } from "react";
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Link2 } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function RichTextEditor({ value, onChange, disabled = false }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  // Simple formatting helper
  const insertFormatting = (prefix: string, suffix: string = "") => {
    if (disabled) return;
    
    const textarea = document.getElementById("content-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    const replacement = prefix + (selectedText || "text") + suffix;
    const newValue = text.substring(0, start) + replacement + text.substring(end);
    
    onChange(newValue);
    
    // Focus back and select
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selectedText || "text").length);
    }, 50);
  };

  return (
    <div className="border border-border-custom/80 rounded-xl overflow-hidden bg-white shadow-3xs">
      
      {/* Editor Tabs bar */}
      <div className="bg-bg-warm/50 border-b border-border-custom/50 px-4 py-2 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === "write" ? "bg-primary-navy text-white" : "text-text-secondary hover:bg-gray-100"
            }`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === "preview" ? "bg-primary-navy text-white" : "text-text-secondary hover:bg-gray-100"
            }`}
          >
            Preview Markdown
          </button>
        </div>

        {activeTab === "write" && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => insertFormatting("# ", "\n")}
              disabled={disabled}
              className="p-1.5 text-text-secondary hover:text-accent-gold hover:bg-gray-100 rounded-md disabled:opacity-50"
              title="Heading 1"
            >
              <Heading1 size={14} />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("## ", "\n")}
              disabled={disabled}
              className="p-1.5 text-text-secondary hover:text-accent-gold hover:bg-gray-100 rounded-md disabled:opacity-50"
              title="Heading 2"
            >
              <Heading2 size={14} />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("**", "**")}
              disabled={disabled}
              className="p-1.5 text-text-secondary hover:text-accent-gold hover:bg-gray-100 rounded-md disabled:opacity-50"
              title="Bold"
            >
              <Bold size={14} />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("*", "*")}
              disabled={disabled}
              className="p-1.5 text-text-secondary hover:text-accent-gold hover:bg-gray-100 rounded-md disabled:opacity-50"
              title="Italic"
            >
              <Italic size={14} />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("- ", "\n")}
              disabled={disabled}
              className="p-1.5 text-text-secondary hover:text-accent-gold hover:bg-gray-100 rounded-md disabled:opacity-50"
              title="Bullet List"
            >
              <List size={14} />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("1. ", "\n")}
              disabled={disabled}
              className="p-1.5 text-text-secondary hover:text-accent-gold hover:bg-gray-100 rounded-md disabled:opacity-50"
              title="Number List"
            >
              <ListOrdered size={14} />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("[", "](url)")}
              disabled={disabled}
              className="p-1.5 text-text-secondary hover:text-accent-gold hover:bg-gray-100 rounded-md disabled:opacity-50"
              title="Add Link"
            >
              <Link2 size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Editor Main body */}
      <div className="relative min-h-[300px]">
        {activeTab === "write" ? (
          <textarea
            id="content-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder="Composing article text (supports headings, markdown format list elements)..."
            className="w-full min-h-[300px] p-4 text-xs sm:text-sm font-mono text-primary-navy focus:outline-none resize-y disabled:bg-gray-50/50"
          />
        ) : (
          <div className="p-5 prose prose-sm max-w-none min-h-[300px] overflow-y-auto bg-[#FAFAF8] text-xs sm:text-sm font-sans text-text-secondary">
            {value ? (
              <div className="whitespace-pre-wrap">{value}</div>
            ) : (
              <span className="text-gray-400 italic">Nothing to preview yet.</span>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
export default RichTextEditor;
