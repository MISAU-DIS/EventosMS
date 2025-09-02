'use client';
import { motion } from 'framer-motion';
import { Mic } from 'lucide';
import Link from 'next/link';
import { useState } from 'react';

interface Session {
    time: string;
    title: string;
    type: string;
    speaker: string;
    description: string;
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

    // const agendaData: AgendaData = {
    //     dia1: {
    //         date: '12-13 de Setembro de 2025',
    //         theme: 'Abertura e Visão Estratégica',
    //         sessions: [
    //             {
    //                 time: '08:30 - 09:00',
    //                 title: 'Leitura e aprovação da Síntese do 1º dia',
    //                 type: 'Inicio',
    //                 speaker: 'Secretariado',
    //                 description: 'Leitura e aprovação da Síntese do 1º dia'
    //             },
    //             {
    //                 time: '09:00 - 10:25',
    //                 title: 'Painel I: Desafios da Saúde Digital em Moçambique',
    //                 type: 'Painel',
    //                 speaker: 'Moderador, Facilitador, Painelistas, S. Excia o Ministro',
    //                 description: 'Apresentação do painel, Apresentação do tema, Intervenções (3), Moderação do debate'
    //             },
    //             {
    //                 time: '10:25 - 11:05',
    //                 title: 'Lanche da manhã',
    //                 type: 'Lunche',
    //                 speaker: '',
    //                 description: 'Lanche da manhã'
    //             },
    //             {
    //                 time: '11:05 - 12:55',
    //                 title: 'Painel II: Prontidão e resiliência aos eventos climáticos extremos na saúde',
    //                 type: 'Painel',
    //                 speaker: 'Moderador, Facilitador, Painelistas, S. Excia o Ministro',
    //                 description: 'Apresentação do painel, Apresentação do tema, Intervenções (3), Moderação do debate'
    //             },
    //             {
    //                 time: '12:55 - 13:10',
    //                 title: 'Prioridades e acções estratégicas para o PESOE 2025 ',
    //                 type: 'Painel',
    //                 speaker: 'DPC',
    //                 description: 'Prioridades e acções estratégicas para o PESOE 2025 '
    //             },
    //             {
    //                 time: '13:10 - 13:25',
    //                 title: 'Linhas gerais do PESS 2025-2034',
    //                 type: 'Linhas gerais',
    //                 speaker: 'DPC',
    //                 description: 'Linhas gerais do PESS 2025-2034'
    //             },
    //             {
    //                 time: '13:25 - 13:50',
    //                 title: 'Discussão',
    //                 type: 'Discussão',
    //                 speaker: 'S. Excia o Ministro',
    //                 description: 'Discussão'
    //             },
    //             {
    //                 time: '13:50 - 14:10',
    //                 title: 'Gestão de Recursos Humanos - desafios e perspectivas',
    //                 type: 'Apresentação',
    //                 speaker: 'DRH',
    //                 description: 'Gestão de Recursos Humanos - desafios e perspectivas'
    //             },
    //             {
    //                 time: '14:10 - 14:30h',
    //                 title: 'Discussão ',
    //                 type: 'Discussão',
    //                 speaker: 'S. Excia o Ministro',
    //                 description: 'Discussão'
    //             },
    //             {
    //                 time: '14:30 - 15:30',
    //                 title: 'Almoço',
    //                 type: 'Intervalo',
    //                 speaker: '',
    //                 description: 'Almoço'
    //             },
    //             {
    //                 time: '15:30 - 15:40',
    //                 title: 'Momento Cultural',
    //                 type: 'Momento Cultural',
    //                 speaker: 'Grupo Cultural',
    //                 description: 'Momento Cultural'
    //             },
    //             {
    //                 time: '15:40 - 15:55',
    //                 title: 'Leitura do Comunicado Final',
    //                 type: 'Apresentação',
    //                 speaker: 'Secretariado',
    //                 description: 'Leitura do Comunicado Final'
    //             },
    //             {
    //                 time: '15:55 - 16:05',
    //                 title: 'Discurso de Encerramento',
    //                 type: 'Discurso',
    //                 speaker: 'S. Excia o Ministro',
    //                 description: 'Discurso de Encerramento do evento'
    //             },
    //             {
    //                 time: '16:05',
    //                 title: 'Fim do Conselho Coordenador',
    //                 type: 'Ceremónia de enceramento',
    //                 speaker: '',
    //                 description: 'Fim do Conselho Coordenador'
    //             }
    //         ]
    //     },
    //     dia2: {
    //         date: '17 de Junho - Terça-feira',
    //         theme: 'Saúde Infantil e Nutrição',
    //         sessions: [
    //             {
    //                 time: '09:00 - 10:30',
    //                 title: 'Seminário: Desnutrição Infantil - Desafios e Soluções',
    //                 type: 'seminar',
    //                 speaker: 'Dr. João Mavie - UNICEF',
    //                 description: 'Estratégias para combater a desnutrição em crianças menores de 5 anos'
    //             },
    //             {
    //                 time: '10:30 - 11:00',
    //                 title: 'Pausa para Café',
    //                 type: 'break',
    //                 speaker: '',
    //                 description: ''
    //             },
    //             {
    //                 time: '11:00 - 12:30',
    //                 title: 'Mesa Redonda: Vacinação e Imunização',
    //                 type: 'roundtable',
    //                 speaker: 'Especialistas em Imunização',
    //                 description: 'Discussão sobre cobertura vacinal e novos programas'
    //             },
    //             {
    //                 time: '12:30 - 14:00',
    //                 title: 'Almoço',
    //                 type: 'break',
    //                 speaker: '',
    //                 description: ''
    //             },
    //             {
    //                 time: '14:00 - 15:30',
    //                 title: 'Workshop: Cuidados Neonatais Essenciais',
    //                 type: 'workshop',
    //                 speaker: 'Equipe de Pediatria MISAU',
    //                 description: 'Práticas para redução da mortalidade neonatal'
    //             },
    //             {
    //                 time: '15:30 - 16:00',
    //                 title: 'Pausa para Café',
    //                 type: 'break',
    //                 speaker: '',
    //                 description: ''
    //             },
    //             {
    //                 time: '16:00 - 17:30',
    //                 title: 'Grupo de Trabalho: Políticas de Nutrição',
    //                 type: 'workgroup',
    //                 speaker: 'Coordenadores de Nutrição',
    //                 description: 'Desenvolvimento de estratégias provinciais de nutrição'
    //             }
    //         ]
    //     },
    //     dia3: {
    //         date: '18 de Junho - Quarta-feira',
    //         theme: 'Saúde Adolescente e Reprodutiva',
    //         sessions: [
    //             {
    //                 time: '09:00 - 10:30',
    //                 title: 'Conferência: Saúde Sexual e Reprodutiva dos Adolescentes',
    //                 type: 'conference',
    //                 speaker: 'Dra. Ana Macamo - UNFPA',
    //                 description: 'Abordagem integral da saúde reprodutiva na adolescência'
    //             },
    //             {
    //                 time: '10:30 - 11:00',
    //                 title: 'Pausa para Café',
    //                 type: 'break',
    //                 speaker: '',
    //                 description: ''
    //             },
    //             {
    //                 time: '11:00 - 12:30',
    //                 title: 'Painel: Prevenção de Gravidezes Precoces',
    //                 type: 'panel',
    //                 speaker: 'Especialistas em Saúde Reprodutiva',
    //                 description: 'Estratégias de prevenção e educação sexual'
    //             },
    //             {
    //                 time: '12:30 - 14:00',
    //                 title: 'Almoço',
    //                 type: 'break',
    //                 speaker: '',
    //                 description: ''
    //             },
    //             {
    //                 time: '14:00 - 15:30',
    //                 title: 'Workshop: Serviços Amigáveis aos Adolescentes',
    //                 type: 'workshop',
    //                 speaker: 'Coordenadores de Saúde Adolescente',
    //                 description: 'Criação de espaços de atendimento adequados aos jovens'
    //             },
    //             {
    //                 time: '15:30 - 16:00',
    //                 title: 'Pausa para Café',
    //                 type: 'break',
    //                 speaker: '',
    //                 description: ''
    //             },
    //             {
    //                 time: '16:00 - 17:00',
    //                 title: 'Sessão de Networking',
    //                 type: 'networking',
    //                 speaker: '',
    //                 description: 'Oportunidade para estabelecer parcerias e trocar experiências'
    //             }
    //         ]
    //     },
    //     dia4: {
    //         date: '19 de Junho - Quinta-feira',
    //         theme: 'Fortalecimento do Sistema de Saúde',
    //         sessions: [
    //             {
    //                 time: '09:00 - 10:30',
    //                 title: 'Seminário: Recursos Humanos em Saúde',
    //                 type: 'seminar',
    //                 speaker: 'Direção de Recursos Humanos MISAU',
    //                 description: 'Estratégias para formação e retenção de profissionais de saúde'
    //             },
    //             {
    //                 time: '10:30 - 11:00',
    //                 title: 'Pausa para Café',
    //                 type: 'break',
    //                 speaker: '',
    //                 description: ''
    //             },
    //             {
    //                 time: '11:00 - 12:30',
    //                 title: 'Mesa Redonda: Financiamento da Saúde',
    //                 type: 'roundtable',
    //                 speaker: 'Parceiros de Desenvolvimento',
    //                 description: 'Mobilização de recursos e sustentabilidade financeira'
    //             },
    //             {
    //                 time: '12:30 - 14:00',
    //                 title: 'Almoço',
    //                 type: 'break',
    //                 speaker: '',
    //                 description: ''
    //             },
    //             {
    //                 time: '14:00 - 15:30',
    //                 title: 'Workshop: Gestão da Cadeia de Abastecimento',
    //                 type: 'workshop',
    //                 speaker: 'CMAM - Central de Medicamentos',
    //                 description: 'Otimização da distribuição de medicamentos e equipamentos'
    //             },
    //             {
    //                 time: '15:30 - 16:00',
    //                 title: 'Pausa para Café',
    //                 type: 'break',
    //                 speaker: '',
    //                 description: ''
    //             },
    //             {
    //                 time: '16:00 - 17:30',
    //                 title: 'Grupo de Trabalho: Qualidade dos Cuidados',
    //                 type: 'workgroup',
    //                 speaker: 'Coordenadores de Qualidade',
    //                 description: 'Melhoria contínua da qualidade dos serviços de saúde'
    //             }
    //         ]
    //     },
    // };

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
                { time: '10:40 - 11:40', title: 'Ponto de situação dos indicadores de desempenho hospitalar 2023 e 2024', type: 'Apresentação', speaker: 'DNAM', description: '' },
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
                { time: '09:00 - 09:30', title: 'Ponto de situação dos especialistas', type: 'Apresentação', speaker: 'DNAM', description: 'Apresentação conjunta entre DNAM, DNFPS e DRH' },
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
            theme: 'Sessões do L Conselho Coordenador',
            sessions: [
                { time: '08:30 - 09:00', title: 'Adopção da Agenda e do Programa', type: 'Sessão', speaker: 'DPC', description: '' },
                { time: '09:00 - 09:30', title: 'Objectivos da reunião', type: 'Sessão', speaker: 'DPC', description: '' },
                { time: '09:30 - 10:00', title: 'Matriz das Recomendações do CCS do XL', type: 'Sessão', speaker: 'DPC', description: '' },
                { time: '10:00 - 10:20', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '10:20 - 10:35', title: 'Pausa para o café', type: 'Intervalo', speaker: '', description: '' },
                { time: '10:35 - 11:00', title: 'Balanço do PES 2024', type: 'Sessão', speaker: 'DPC', description: '' },
                { time: '11:00 - 11:30', title: 'Plano Económico Social e Orçamento para 2025', type: 'Sessão', speaker: 'DPC', description: '' },
                { time: '11:30 - 12:30', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
                { time: '12:30 - 13:30', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
                { time: '13:30 - 15:00', title: 'Início dos Trabalhos em Grupos', type: 'Grupo', speaker: 'Todos os participantes', description: '' },
                { time: '15:00 - 16:00', title: 'Pausa e continuação dos grupos', type: 'Grupo', speaker: 'Todos os participantes', description: '' },
                { time: '16:30', title: 'Fim dos trabalhos do 3º dia', type: 'Encerramento', speaker: '', description: '' }
            ]
        },
        dia4: {
            date: '13 de Setembro - Sábado',
            theme: 'Sessões do L Conselho Coordenador',
            sessions: [
                { time: '08:30 - 10:30', title: 'Continuação dos trabalhos de grupos', type: 'Grupo', speaker: 'Todos os participantes', description: '' },
                { time: '10:30 - 11:00', title: 'Pausa para o café', type: 'Intervalo', speaker: '', description: '' },
                { time: '11:00 - 12:30', title: 'Plenária', type: 'Plenária', speaker: 'Coordenação', description: '' },
                { time: '12:30 - 13:30', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
                { time: '13:30 - 14:30', title: 'Apresentação do Comunicado final', type: 'Leitura', speaker: 'Secretariado', description: '' },
                { time: '14:30 - 15:00', title: 'Cerimónia de encerramento', type: 'Encerramento', speaker: 'S. Excia o Ministro', description: '' },
                { time: '15:00', title: 'Fim do evento', type: 'Encerramento', speaker: '', description: '' }
            ]
        }
    };

    const getSessionIcon = (type: string): string => {
        const icons = {
            keynote: '',
            panel: '',
            workshop: '',
            seminar: '',
            Apresentação: '',
            ceremony: '',
            networking: '',
            Intervalo: '',
            conference: '',
            Encerramento: '',
            workgroup: '',
            Entrada: ''

            // keynote: '🎯',
            // panel: '💬',
            // workshop: '🛠️',
            // seminar: '📚',
            // presentation: '📊',
            // ceremony: '🎭',
            // networking: '🤝',
            // break: '☕',
            // conference: '🎤',
            // roundtable: '⭕',
            // workgroup: '👥'
        };
        //return icons[type as keyof typeof icons] || '📋';
        return icons[type as keyof typeof icons] || '';

    };

    const getSessionColor = (type: string): string => {
        const colors: Record<string, string> = {
            keynote: 'bg-purple-100 border-purple-300 text-purple-800',
            panel: 'bg-blue-100 border-blue-300 text-blue-800',
            workshop: 'bg-green-100 border-green-300 text-green-800',
            seminar: 'bg-orange-100 border-orange-300 text-orange-800',
            Apresentação: 'bg-gray-100 border-gray-300 text-gray-800',
            ceremony: 'bg-red-100 border-red-300 text-red-800',
            networking: 'bg-yellow-100 border-yellow-300 text-yellow-800',
            Intervalo: 'bg-gray-100 border-red-300 text-red-600',
            conference: 'bg-pink-100 border-pink-300 text-pink-800',
            Encerramento: 'bg-gray-100 border-red-300 text-red-600',
            workgroup: 'bg-cyan-100 border-cyan-300 text-cyan-800',
            // Entrada: 'bg-teal-100 border-teal-300 text-teal-800' 
            Entrada: 'bg-gray-100 border-gray-300 text-gray-800'
        };
        return colors[type] || 'bg-gray-100 border-gray-300 text-gray-800';
    };

    return (
        <>
            <title>Agenda - Eventos MS</title>
            <meta name="description" content="Agenda completa do Evento MISAU 2025 - Conselho Coordenador de Saúde" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
                {/* Hero Section */}
                <div className="pt-24 pb-16 px-4 bg-gradient-to-r text-green-700">
                    <div className="container mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4"
                        >
                            Agenda do Evento
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-xl sm:text-2xl mb-2 text-gray-700"
                        >
                            Ministério da Saúde - 2025
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg text-green-800"
                        >
                            10 a 13 de Setembro de 2025 • Maputo, Moçambique
                        </motion.p>
                    </div>
                </div>

                {/* Navegação por Dias */}
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {Object.keys(agendaData).map((day, index) => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedDay === day
                                        ? 'bg-green-600 text-white shadow-lg transform scale-105'
                                        : 'bg-white text-green-600 border border-green-600 hover:bg-green-50'
                                    }`}
                            >
                                Dia {index + 1}
                            </button>
                        ))}
                    </div>

                    {/* Conteúdo da Agenda */}
                    <motion.div
                        key={selectedDay}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Cabeçalho do Dia  border-l-4 border-green-500*/}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">
                                {agendaData[selectedDay].date}
                            </h2>
                            <p className="text-lg text-gray-600 font-medium">
                                Tema: {agendaData[selectedDay].theme}
                            </p>
                        </div>

                        {/* Lista de Sessões */}
                        <div className="space-y-4">
                            {agendaData[selectedDay].sessions.map((session, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
                                // className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-l-4 ${
                                //     session.type === 'break' 
                                //         ? 'border-gray-300 opacity-75' 
                                //         : 'border-green-500 hover:transform hover:scale-[1.02]'
                                // }`}
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                            {/* Horário */}
                                            <div className="flex-shrink-0">
                                                <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg font-bold text-sm">
                                                    {session.time}
                                                </div>
                                            </div>

                                            {/* Conteúdo da Sessão */}
                                            <div className="flex-grow">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <span className="text-2xl">{getSessionIcon(session.type)}</span>
                                                    <div>
                                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                                                            {session.title}
                                                        </h3>
                                                        {session.speaker && (
                                                            <p className="text-green-600 font-medium mb-2">
                                                                {/* 👤 {session.speaker} */}
                                                                🎤 {session.speaker}
                                                            </p>
                                                        )}
                                                        {session.description && (
                                                            <p className="text-gray-600">
                                                                {session.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tag do Tipo */}
                                            <div className="flex-shrink-0">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getSessionColor(session.type)}`}>
                                                    {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 px-4 mt-16">
                    <div className="container mx-auto text-center max-w-4xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl font-bold mb-6"
                        >
                            Precisa de Mais Informações?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-xl mb-8 text-green-100"
                        >
                            Para mais detalhes sobre o evento, palestrantes ou para esclarecimentos adicionais, entre em contato connosco.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href="/contacto"
                                className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
                            >
                                Entrar em Contato
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Agenda;










