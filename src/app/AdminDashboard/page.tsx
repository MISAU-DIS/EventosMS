'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  MessageSquare,
  Settings,
  BarChart3,
  FileText,
  Bell,
  Search,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Menu,
  X,
  Home,
  Shield
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalParticipants: number;
  totalComments: number;
  totalSessions: number;
  avgRating: number;
}

interface RecentActivity {
  id: number;
  type: 'comment' | 'registration' | 'session';
  description: string;
  time: string;
  user?: string;
}

interface Comment {
  id: number;
  name: string;
  organization: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

export default function AdminDashboard(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Mock data
  const stats: DashboardStats = {
    totalParticipants: 164,
    totalComments: 12,
    totalSessions: 68,
    avgRating: 4.8
  };

  const recentActivity: RecentActivity[] = [
    {
      id: 1,
      type: 'comment',
      description: 'Novo comentário recebido',
      time: '2 min atrás',
      user: 'Dr. João Silva'
    },
    {
      id: 2,
      type: 'registration',
      description: 'Nova inscrição no evento',
      time: '15 min atrás',
      user: 'Enf. Maria Santos'
    },
    {
      id: 3,
      type: 'session',
      description: 'Sessão atualizada na agenda',
      time: '1 hora atrás',
      user: 'Admin'
    }
  ];

  const comments: Comment[] = [
    {
      id: 1,
      name: 'Dr. Carlos Muthemba',
      organization: 'UEM',
      rating: 5,
      comment: 'Evento de alta qualidade técnica! As apresentações foram muito informativas.',
      date: '2025-06-18',
      status: 'approved'
    },
    {
      id: 2,
      name: 'Enf. Ana Santos',
      organization: 'Hospital Central',
      rating: 4,
      comment: 'Muito bom evento! Gostei especialmente das sessões sobre cuidados neonatais.',
      date: '2025-06-19',
      status: 'pending'
    }
  ];

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: Home },
    { id: 'participants', label: 'Participantes', icon: Users },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'comments', label: 'Comentários', icon: MessageSquare },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold text-gray-900">MISAU Admin</h1>
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  isActive
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
        <Link
          href="/Login"
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </Link>
      </div>
    </div>
  );

  const StatsCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Participantes"
          value={stats.totalParticipants}
          icon={Users}
          color="bg-blue-500"
        />
        <StatsCard
          title="Comentários"
          value={stats.totalComments}
          icon={MessageSquare}
          color="bg-green-500"
        />
        <StatsCard
          title="Sessões do Evento"
          value={stats.totalSessions}
          icon={Calendar}
          color="bg-purple-500"
        />
        <StatsCard
          title="Avaliação Média"
          value={stats.avgRating}
          icon={BarChart3}
          color="bg-orange-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Atividade Recente</h3>
          <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
            Ver todos
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg"
            >
              <div className={`p-2 rounded-lg ${
                activity.type === 'comment' ? 'bg-blue-100' :
                activity.type === 'registration' ? 'bg-green-100' : 'bg-purple-100'
              }`}>
                {activity.type === 'comment' && <MessageSquare className="w-4 h-4 text-blue-600" />}
                {activity.type === 'registration' && <Users className="w-4 h-4 text-green-600" />}
                {activity.type === 'session' && <Calendar className="w-4 h-4 text-purple-600" />}
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                {activity.user && (
                  <p className="text-xs text-gray-500">por {activity.user}</p>
                )}
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const CommentsTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Gestão de Comentários</h2>
        <div className="flex gap-3">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar comentários..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option>Todos os status</option>
              <option>Aprovados</option>
              <option>Pendentes</option>
              <option>Rejeitados</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                      <p className="text-sm text-gray-600">{comment.organization}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${i < comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      comment.status === 'approved' ? 'bg-green-100 text-green-800' :
                      comment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {comment.status === 'approved' ? 'Aprovado' :
                       comment.status === 'pending' ? 'Pendente' : 'Rejeitado'}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{comment.comment}</p>
                  <p className="text-sm text-gray-500">
                    Enviado em {new Date(comment.date).toLocaleDateString('pt-PT')}
                  </p>
                </div>
                <div className="flex gap-2 lg:flex-col">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'comments':
        return <CommentsTab />;
      case 'participants':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Gestão de Participantes</h2>
            <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
          </div>
        );
      case 'agenda':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Gestão da Agenda</h2>
            <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Relatórios e Análises</h2>
            <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Configurações do Sistema</h2>
            <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
          </div>
        );
      default:
        return <OverviewTab />;
    }
  };

  return (
    <>
      <title>Dashboard Administrativo - MISAU</title>
      <meta name="description" content="Painel administrativo para gestão do sistema MISAU" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Overlay para mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </button>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">Administrador</p>
                  </div>
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
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