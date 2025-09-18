'use client';
import { motion } from 'framer-motion';
import { Clock, Calendar, Users, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Session {
    time: string;
    title: string;
    type: string;
    speaker: string;
    description: string;
    fileUrl?: string; 
}

interface DayData {
    date: string;
    theme: string;
    sessions: Session[];
}

interface AgendaData {
    [key: string]: DayData;
}

const Agenda = () => {
    const [selectedDay, setSelectedDay] = useState<string>('dia1');

    const agendaData: AgendaData = {
        dia1: {
            date: '10 de Setembro de 2025',
            theme: 'Sessões do XIII Conselho Hospitalar',
            sessions: [
                { time: '08:00 - 08:40h', title: 'Registo dos participantes/entrada para sala de reuniões', type: 'Entrada', speaker: 'Protocolo', description: '' },
                { time: '08:40', title: 'Chegada do Excelentíssimo Presidente do Município da Cidade de Maputo', type: 'Protocolo', speaker: 'Protocolo', description: '' },
                { time: '08:45', title: 'Chegada de S. Excia Secretário de Estado da Cidade de Maputo', type: 'Protocolo', speaker: 'Protocolo', description: '' },
                { time: '08:50', title: 'Chegada de S. Excia Ministro da Saúde', type: 'Protocolo', speaker: 'Protocolo', description: '' },
                { time: '08:55', title: 'Entrada do Presidium', type: 'Protocolo', speaker: 'Protocolo', description: '' },
                { time: '09:05', title: 'Hino Nacional', type: 'Protocolo', speaker: 'Protocolo', description: '' },
                { time: '09:05 - 09:15', title: 'Intervenção do Excelentíssimo Presidente do Município da Cidade de Maputo', type: 'Discurso', speaker: 'Presidente do Município', description: '' },
                { time: '09:15 - 09:25', title: 'Intervenção do Parceiro de 1º Contacto', type: 'Discurso', speaker: 'Parceiro de 1º Contacto', description: '' },
                { time: '09:25 - 09:35', title: 'Momento Cultural', type: 'Cultural', speaker: 'Grupo Cultural', description: '' },
                { time: '09:35 - 09:45', title: 'Intervenção de S. Excia Secretário de Estado da Província de Inhambane', type: 'Discurso', speaker: 'Secretário de Estado', description: '' },
                { time: '09:45 - 10:00', title: 'Discurso de Abertura por S. Excia Ministro da Saúde', type: 'Discurso', speaker: 'S. Excia o Ministro', description: '' },
                { time: '10:00 - 10:30', title: 'Pausa para a foto de Família e café', type: 'Intervalo', speaker: '', description: '' },
                { time: '10:30 - 10:35', title: 'Adopção da Agenda e do Programa', type: 'Sessão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '10:35 - 10:40', title: 'Objectivos da reunião', type: 'Sessão', speaker: 'DNAM', description: '' },
                { time: '10:40 - 11:40', title: 'Ponto de situação dos indicadores de desempenho hospitalar 2023 e 2024', type: 'Apresentação', speaker: 'DNAM', description: '', fileUrl: 'www.google.com'},
                { time: '11:40 - 12:40', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '12:40 - 13:40', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
                { time: '13:40 - 14:10', title: 'PCI (Situação actual, desafios e próximos passos)', type: 'Apresentação', speaker: 'DNAM', description: '' },
                { time: '14:10 - 14:40', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '14:40 - 15:00', title: 'Abordagem 5S (situação actual, desafios e próximos passos)', type: 'Apresentação', speaker: 'DNAM', description: '' },
                { time: '15:00 - 16:00', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '16:05h', title: 'Fim dos trabalhos do 1º dia', type: 'Encerramento', speaker: '', description: '' }
            ]
        },
        dia2: {
            date: '11 de Setembro - Quinta-feira',
            theme: 'Sessões do XIII Conselho Hospitalar',
            sessions: [
                { time: '08:30 - 09:00', title: 'Leitura e aprovação da Síntese do 1º dia', type: 'Leitura', speaker: 'Secretariado', description: '' },
                { time: '09:00 - 09:30', title: 'Ponto de situação dos especialistas', type: 'Apresentação', speaker: 'DNAM', description: 'situação actual,  desafios e próximos passos; apresentação conjuta entre DNAM, DNFPS  e DRH' },
                { time: '09:30 - 10:00', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '10:00 - 10:20', title: 'Incluir Tema', type: 'Outro', speaker: '', description: '' },
                { time: '10:20 - 10:35', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '10:35 - 10:50', title: 'Pausa para o café', type: 'Intervalo', speaker: '', description: '' },
                { time: '11:05 - 11:20', title: 'Apetrechamento dos hospitais versus utilização e manutenção dos equipamentos', type: 'Apresentação', speaker: 'DNAM', description: '' },
                { time: '11:20 - 11:35', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '11:35 - 11:50', title: 'Incluir Tema', type: 'Outro', speaker: '', description: '' },
                { time: '11:50 - 12:05', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '13:05 - 14:05', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
                { time: '14:05 - 14:25', title: 'Fontes alternativas ao Financiamento dos Hospitais', type: 'Apresentação', speaker: 'DNAM', description: '' },
                { time: '14:25 - 14:55', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '14:55 - 15:25', title: 'Incluir Tema', type: 'Outro', speaker: '', description: '' },
                { time: '15:25 - 16:00', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '16:00 - 16:30', title: 'Apresentação do Comunicado final', type: 'Leitura', speaker: 'Secretariado', description: '' },
                { time: '16:35h', title: 'Fim dos trabalhos do 2º dia', type: 'Encerramento', speaker: '', description: '' }
            ]
        },
        dia3: {
            date: '12 de Setembro  - Sexta-feira',
            theme: 'Sessões do XIII Conselho Hospitalar',
            sessions: [
                { time: '08:30 - 09:00h', title: 'Adopção da Agenda e do Programa', type: 'Sessão', speaker: 'DPC', description: '' },
                { time: '09:00 - 09:30h', title: 'Objectivos da reunião', type: 'Sessão', speaker: 'DPC', description: '' },
                { time: '09:30 - 10:00h', title: 'Matriz das Recomendações do CCS do XL', type: 'Sessão', speaker: 'DPC', description: '' },
                { time: '10:00 - 10:20h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '10:20 - 10:35h', title: 'Balanço do desempenho do sector 2024 e Primeiro semestre 2025', type: 'Balanço', speaker: 'Área de Saúde Pública', description: '' },
                { time: '10:35 - 10:50h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '10:50 - 11:05h', title: 'Pausa para a foto em família e café', type: 'Intervalo', speaker: '', description: '' },
                { time: '11:05 - 11:20h', title: 'Balanço do desempenho do sector 2024 e Primeiro semestre 2025', type: 'Balanço', speaker: 'Área de apoio', description: '' },
                { time: '11:20 - 11:35h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '11:35 - 11:50h', title: 'Incluir Tema', type: 'Outro', speaker: '', description: '' },
                { time: '11:50 - 12:05h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '13:05 - 14:05h', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
                { time: '14:05 - 15:05h', title: 'Socialização dos instrumentos orientadores do sector (ENDE, PQG, PESS, PESOE, EFSS)', type: 'Sessão', speaker: 'DPC', description: '' },
                { time: '15:05 - 16:05h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '16:05h', title: 'Fim dos trabalhos', type: 'Encerramento', speaker: '', description: '' }
            ]
        },
        dia4: {
            date: '13 de Setembro - Sábado',
            theme: 'Sessões do XIII Conselho Hospitalar',
            sessions: [
                { time: '08:30 - 09:00h', title: 'Leitura e aprovação da Síntese do 1º dia', type: 'Leitura', speaker: 'Secretariado', description: '' },
                { time: '09:00 - 09:30h', title: 'Proposta do PESOE 2026: Prioridades e Linhas estratégicas', type: 'Sessão', speaker: 'DPC', description: '' },
                { time: '09:30 - 10:00h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '10:00 - 10:20h', title: 'Partilha das inovações da Lei do Sistema Nacional de Saúde', type: 'Apresentação', speaker: 'URESS', description: '' },
                { time: '10:20 - 10:35h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '10:35 - 10:55h', title: 'Pausa para o café', type: 'Intervalo', speaker: '', description: '' },
                { time: '10:55 - 11:15h', title: 'Partilha de boas práticas nas províncias', type: 'Apresentação', speaker: 'Províncias', description: '' },
                { time: '11:15 - 11:30h', title: 'RH/DAF/DNSP', type: 'Apresentação', speaker: 'RH/DAF/DNSP', description: '' },
                { time: '11:30 - 11:45h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '11:45 - 12:00h', title: 'CMAM/ANARME/IGS/INS', type: 'Apresentação', speaker: 'CMAM/ANARME/IGS/INS', description: '' },
                { time: '12:15 - 12:30h', title: 'Discussão', type: 'Discussão', speaker: '', description: '' },
                { time: '12:30 - 13:30h', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
                { time: '13:30 - 13:40h', title: 'Momento cultural', type: 'Cultural', speaker: 'Grupo Cultural', description: '' },
                { time: '13:40 - 14:00h', title: 'Leitura do Comunicado final', type: 'Leitura', speaker: 'Secretariado', description: '' },
                { time: '14:00 - 14:15h', title: 'Discurso de encerramento', type: 'Discurso', speaker: 'S. Excia o Ministro', description: '' },
                { time: '14:30h', title: 'Fim do evento', type: 'Encerramento', speaker: '', description: '' }
            ]
        }
    };

    const getSessionColor = (type: string): string => {
        const colors: Record<string, string> = {
            Protocolo: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
            Discurso: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
            Apresentação: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white',
            Sessão: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white',
            Discussão: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
            Cultural: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white',
            Intervalo: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white',
            Encerramento: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
            Entrada: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white',
            Leitura: 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white',
            Balanço: 'bg-gradient-to-r from-violet-500 to-violet-600 text-white',
            Outro: 'bg-gradient-to-r from-slate-500 to-slate-600 text-white'
        };
        return colors[type] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    };

    const getDayInfo = (dayKey: string) => {
        const dayNumbers = { dia1: 1, dia2: 2, dia3: 3, dia4: 4 };
        const dayNumber = dayNumbers[dayKey as keyof typeof dayNumbers];
        return { number: dayNumber, total: Object.keys(agendaData).length };
    };

    return (
        <>
            <title>Agenda - Eventos MS</title>
            <meta name="description" content="Agenda completa do Evento MISAU 2025 - Conselho Coordenador de Saúde" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <main className="min-h-screen bg-slate-50">
                {/* Header compacto */}
                <div className="bg-white shadow-sm border-b">
                    <div className="container mx-auto mt-20 px-4 py-8">
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
                                Agenda do XIII Conselho Hospitalar & L Conselho Coordenador de Saúde
                            </h1>
                            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>10 - 13 Setembro 2025</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>Maputo, Moçambique</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Navegação por Dias - Mais moderna */}
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl shadow-lg p-2 max-w-2xl mx-auto">
                            <div className="grid grid-cols-4 gap-2">
                                {Object.keys(agendaData).map((day, index) => {
                                    const isActive = selectedDay === day;
                                    return (
                                        <motion.button
                                            key={day}
                                            onClick={() => setSelectedDay(day)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`relative px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                                isActive
                                                    ? 'bg-emerald-600 text-white shadow-lg'
                                                    : 'bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                                            }`}
                                        >
                                            <div className="text-xs opacity-80 mb-1">Dia</div>
                                            <div className="text-lg font-bold">{index + 1}</div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Timeline Design */}
                    <motion.div
                        key={selectedDay}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-5xl mx-auto"
                    >
                        {/* Header do dia */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        {agendaData[selectedDay].date}
                                    </h2>
                                    <p className="text-gray-600">{agendaData[selectedDay].theme}</p>
                                </div>
                                <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=XIII+Conselho+Hospitalar+e+L+Conselho+Cordenador&details=O+Ministerio+da+Saude+realiza+dois+eventos+estrategicos:+Conselho+Hospitalar+e+Conselho+Coordenador+de+Saude,+avaliando+normas,+desempenho+hospitalar+e+estrategias+para+melhorar+o+Sistema+Nacional+de+Saude+(2025-2034).&details=Evento+MISAU&location=Instituto+de+Ciências+de+Saúde+do+Infulene" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-green-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg"
                                >
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                    Adicionar ao Google Calendar
                                    </span>
                                </a>
                                <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
                                    Dia {getDayInfo(selectedDay).number} de {getDayInfo(selectedDay).total}
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Linha vertical */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-200"></div>

                            <div className="space-y-6">
                                {agendaData[selectedDay].sessions.map((session, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="relative pl-20"
                                    >
                                        {/* Ponto na timeline */}
                                        <div className="absolute left-6 top-6 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-lg"></div>

                                        {/* Card da sessão */}
                                        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                                            <div className="p-6">
                                                <div className="flex flex-col lg:flex-row gap-4">
                                                    {/* Horário */}
                                                    <div className="lg:w-32 flex-shrink-0">
                                                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg font-bold text-sm">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{session.time}</span>
                                                        </div>
                                                    </div>

                                                    {/* Conteúdo */}
                                                    <div className="flex-grow">
                                                        <div className="mb-3">
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                                                                {session.title}
                                                            </h3>
                                                            {session.speaker && (
                                                                <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                                                                    <Users className="w-4 h-4" />
                                                                    <span>{session.speaker}</span>
                                                                </div>
                                                            )}
                                                            {session.description && (
                                                                <p className="text-gray-600 text-sm mt-2">
                                                                    {session.description}
                                                                </p>
                                                            )}

                                                            {/* Botão de download */}
              {session.fileUrl && (
                <a
                  href={session.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-sm text-emerald-600 hover:text-emerald-800 font-semibold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5v-12m0 12l-3-3m3 3l3-3M3 19.5h18" />
                  </svg>
                  Baixar apresentação
                </a>
              )}
                                                        </div>
                                                    </div>

                                                    {/* Tag do tipo */}
                                                    <div className="flex-shrink-0">
                                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getSessionColor(session.type)} shadow-sm`}>
                                                            {session.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* CTA - Mais simples */}
                <div className="bg-emerald-700 text-white py-12 px-4 mt-16">
                    <div className="container mx-auto text-center max-w-2xl">
                        <h3 className="text-2xl font-bold mb-4">
                            Precisa de mais informações?
                        </h3>
                        <p className="text-emerald-100 mb-6">
                            Entre em contacto connosco para esclarecimentos adicionais sobre o evento.
                        </p>
                        <Link
                            href="/contacto"
                            className="bg-white text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-block"
                        >
                            Entrar em Contacto
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Agenda;
