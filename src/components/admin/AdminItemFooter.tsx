"use client";

import { Plus, Save } from "lucide-react";

type AdminItemFooterProps = {
  addLabel: string;
  onAdd: () => void;
  onSave: () => void;
  saving: boolean;
};

export default function AdminItemFooter({
  addLabel,
  onAdd,
  onSave,
  saving,
}: AdminItemFooterProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-200">
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium"
      >
        <Plus className="w-4 h-4" />
        {addLabel}
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-60 font-medium"
      >
        <Save className="w-4 h-4" />
        {saving ? "A guardar..." : "Guardar alterações"}
      </button>
    </div>
  );
}
