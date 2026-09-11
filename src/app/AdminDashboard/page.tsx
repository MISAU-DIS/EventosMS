'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Users,
  Calendar,
  MessageSquare,
  Settings,
  BarChart3,
  LogOut,
  Menu,
  X,
  Home,
  FileText,
  Camera,
} from 'lucide-react';
import Image from 'next/image';
import DocumentsAdminPanel from '@/components/admin/DocumentsAdminPanel';
import AgendaProgramAdminPanel from '@/components/admin/AgendaProgramAdminPanel';
import PhotosAdminPanel from '@/components/admin/PhotosAdminPanel';
import EvaluationsAdminPanel from '@/components/admin/EvaluationsAdminPanel';
import EventsAdminPanel from '@/components/admin/EventsAdminPanel';
import DashboardOverviewPanel from '@/components/admin/DashboardOverviewPanel';
import ReportsAdminPanel from '@/components/admin/ReportsAdminPanel';
import type { DashboardOverview } from '@/types/admin-dashboard';

export default function AdminDashboard(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<DashboardOverview | null>(null);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  useEffect(() => {
    fetch('/api/admin/session')
      .then((res) => res.json())
      .then(async (data: { authenticated?: boolean }) => {
        if (!data.authenticated) {
          router.push('/Login');
          return;
        }
        const dashRes = await fetch('/api/admin/dashboard');
        if (dashRes.ok) {
          setOverview((await dashRes.json()) as DashboardOverview);
        }
        setLoading(false);
      })
      .catch(() => router.push('/Login'));
  }, [router]);

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: Home },
    { id: 'documents', label: 'Documentos', icon: FileText },
    { id: 'participants', label: 'Participantes', icon: Users },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'photos', label: 'Fotografias', icon: Camera },
    { id: 'comments', label: 'Avaliações', icon: MessageSquare },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Image
            src="/Emblem_of_Mozambique.svg"
            alt="Emblema de Moçambique"
            width={48}
            height={48}
            className="w-8 h-8"
            priority
          />
          <div>
            <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
            {overview?.event && (
              <p className="text-xs text-gray-500 truncate max-w-[140px]">
                {overview.event.shortTitle}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="mt-8 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${isActive
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverviewPanel />;
      case 'documents':
        return <DocumentsAdminPanel />;
      case 'photos':
        return <PhotosAdminPanel />;
      case 'comments':
        return <EvaluationsAdminPanel />;
      case 'participants':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Gestão de Participantes</h2>
            <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
          </div>
        );
      case 'agenda':
        return <AgendaProgramAdminPanel />;
      case 'reports':
        return <ReportsAdminPanel />;
      case 'settings':
        return <EventsAdminPanel />;
      default:
        return <DashboardOverviewPanel />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="mx-auto mb-6 w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-emerald-700"
          >
            <h2 className="text-xl font-semibold mb-2">A carregar...</h2>
            <p className="text-sm text-emerald-600">Aguarde um momento, por favor</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>Dashboard Administrativo - MISAU</title>
      <meta name="description" content="Painel administrativo para gestão do sistema MISAU" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <div className="flex h-screen bg-gray-50">
        <Sidebar />

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 min-w-0">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 shrink-0"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="min-w-0">
                  <h1 className="text-2xl font-bold text-gray-900 capitalize truncate">
                    {menuItems.find((item) => item.id === activeTab)?.label || 'Dashboard'}
                  </h1>
                  {overview?.event && activeTab === 'overview' && (
                    <p className="text-sm text-gray-500 truncate">
                      {overview.event.title} · {overview.event.dateRange}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Administrador</p>
                  <p className="text-xs text-gray-500">MISAU CCS</p>
                </div>
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
}
