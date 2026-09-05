"use client";

import { useState } from "react";
import AgendaAdminPanel from "@/components/admin/AgendaAdminPanel";
import ProgramAdminPanel from "@/components/admin/ProgramAdminPanel";

type SubTab = "agenda" | "program";

export default function AgendaProgramAdminPanel() {
  const [subTab, setSubTab] = useState<SubTab>("agenda");

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-gray-200 pb-4">
        <button
          type="button"
          onClick={() => setSubTab("agenda")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            subTab === "agenda"
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Agenda
        </button>
        <button
          type="button"
          onClick={() => setSubTab("program")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            subTab === "program"
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Programa
        </button>
      </div>

      {subTab === "agenda" ? <AgendaAdminPanel /> : <ProgramAdminPanel />}
    </div>
  );
}
