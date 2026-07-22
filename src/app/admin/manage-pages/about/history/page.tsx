"use client";

import React from "react";
import { ConsoleLayout } from "@/components/admin/layout";
import { HistoryEditor } from "@/components/admin/manage-pages/about/history/history-editor";

export default function HistoryCMSPage() {
  return (
    <ConsoleLayout>
      <HistoryEditor />
    </ConsoleLayout>
  );
}
