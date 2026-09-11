"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  Camera,
  FileText,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { formatRelativeTimePt } from "@/lib/format-relative-time";
import type { DashboardActivityType, DashboardOverview } from "@/types/admin-dashboard";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  subtitle?: string;
};

function StatsCard({ title, value, icon: Icon, color, subtitle }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

function activityIcon(type: DashboardActivityType) {
  switch (type) {
    case "evaluation":
      return { Icon: MessageSquare, bg: "bg-blue-100", fg: "text-blue-600" };
    case "document":
      return { Icon: FileText, bg: "bg-emerald-100", fg: "text-emerald-600" };
    case "photo":
      return { Icon: Camera, bg: "bg-amber-100", fg: "text-amber-700" };
    default:
      return { Icon: Calendar, bg: "bg-purple-100", fg: "text-purple-600" };
  }
}

export default function DashboardOverviewPanel() {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/dashboard");
      if (!response.ok) throw new Error("Falha ao carregar dashboard.");
      setData((await response.json()) as DashboardOverview);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return <p className="text-gray-600">A carregar visão geral...</p>;
  }

  if (error || !data) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
        {error ?? "Sem dados."}
      </div>
    );
  }

  const { event, stats, documentSections, agendaDays, programDays, evaluationsByDay, recentActivity } =
    data;

  return (
    <div className="space-y-6">
      {event && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-emerald-700 uppercase tracking-wide">
                {event.isFallback ? "Último evento activo" : "Evento actual"}
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">{event.title}</h2>
              <p className="text-gray-600 mt-1">
                {event.location} · {event.dateRange}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                {event.status === "active" ? "Activo" : event.status === "archived" ? "Arquivado" : "Rascunho"}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                {event.edition}.ª edição
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={load}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Actualizar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Avaliações"
          value={stats.evaluations}
          subtitle={`${stats.evaluationsWithComments} com comentário · ${stats.uniqueRespondents} respondentes`}
          icon={MessageSquare}
          color="bg-green-500"
        />
        <StatsCard
          title="Avaliação média"
          value={stats.avgRating ?? "—"}
          subtitle="Escala 0–5 por critério"
          icon={BarChart3}
          color="bg-orange-500"
        />
        <StatsCard
          title="Sessões (programa)"
          value={stats.programSessions}
          subtitle={`${stats.eventDays} dias · ${stats.agendaThemes} temas na agenda`}
          icon={Calendar}
          color="bg-purple-500"
        />
        <StatsCard
          title="Conteúdo publicado"
          value={stats.documents + stats.photos}
          subtitle={`${stats.documents} docs · ${stats.photos} fotos`}
          icon={FileText}
          color="bg-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentos por secção</h3>
          <ul className="space-y-2">
            {documentSections.map((section) => (
              <li key={section.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{section.label}</span>
                <span className="font-semibold text-gray-900">{section.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dias do evento</h3>
          <ul className="space-y-3">
            {agendaDays.map((day, index) => (
              <li key={day.id} className="text-sm border-b border-gray-100 pb-2 last:border-0">
                <p className="font-medium text-gray-900">{day.label}</p>
                <p className="text-gray-500 mt-0.5">
                  {day.themeCount} temas · {programDays[index]?.sessionCount ?? 0} sessões
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Avaliações por dia</h3>
          <ul className="space-y-2">
            {evaluationsByDay.map((row) => (
              <li key={row.day} className="flex justify-between text-sm">
                <span className="text-gray-700">Dia {row.day}</span>
                <span className="font-semibold text-gray-900">{row.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Actividade recente</h3>
        {recentActivity.length === 0 ? (
          <p className="text-gray-500 text-sm italic">Ainda sem actividade registada.</p>
        ) : (
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const { Icon, bg, fg } = activityIcon(activity.type);
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className={`p-2 rounded-lg ${bg}`}>
                    <Icon className={`w-4 h-4 ${fg}`} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    {activity.user && (
                      <p className="text-xs text-gray-500">por {activity.user}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">
                    {formatRelativeTimePt(activity.at)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
