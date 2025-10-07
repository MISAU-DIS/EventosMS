"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";

const AgendaTemas = () => {
  const [selectedDay, setSelectedDay] = useState<DiaKey>("dia1");
  type DiaKey = "dia1" | "dia2" | "dia3" | "dia4";

  interface Dia {
    data: string;
    tema: string;
    subtemas: string[];
  }

  {
    /* Header do dia */
  }
  // <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
  //     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
  //         <div>
  //             <h2 className="text-2xl font-bold text-gray-900 mb-2">
  //                 {agendaData[selectedDay].date}
  //             </h2>
  //             <p className="text-gray-600">{agendaData[selectedDay].theme}</p>
  //         </div>
  //         <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=XIII+Conselho+Hospitalar+e+L+Conselho+Cordenador&details=O+Ministerio+da+Saude+realiza+dois+eventos+estrategicos:+Conselho+Hospitalar+e+Conselho+Coordenador+de+Saude,+avaliando+normas,+desempenho+hospitalar+e+estrategias+para+melhorar+o+Sistema+Nacional+de+Saude+(2025-2034).&details=Evento+MISAU&location=Instituto+de+Ciências+de+Saúde+do+Infulene" target="_blank" rel="noopener noreferrer"
  //             className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-green-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg"
  //         >
  //             <Calendar className="w-4 h-4" />
  //             <span>
  //             Adicionar ao Google Calendar
  //             </span>
  //         </a>
  //         <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
  //             Dia {getDayInfo(selectedDay).number} de {getDayInfo(selectedDay).total}
  //         </div>
  //     </div>
  // </div>

  const agendaData: Record<DiaKey, Dia> = {
    dia1: {
      data: "08 de Outubro de 2025",
      tema: "XIII Conselho Hospitalar",
      subtemas: [
        "Grau de cumprimento da matriz do XII Conselho Hospitalar",
        "Análise do desempenho hospitalar (2023,2024, I Semestre 2025)",
      ],
    },
    dia2: {
      data: "09 de Outubro de 2025",
      tema: "XIII Conselho Hospitalar",
      subtemas: [
        "Aprovisionamento dos Medicamentos: Desafios e Oportunidades de Melhoria",
        "Prevenção e Controle de Infecções (PCI)",
        "Estratégias do Programa de Prevenção e Controle de Infecções",
        "Apetrechamento dos hospitais versos utilização e manutenção dos equipamentos",
        "Balanço das actividades inspectivas, fiscalização e auditorias realizadas em 2024 e 1º semestre de 2025",
      ],
    },
    dia3: {
      data: "10 de Outubro de 2025",
      tema: "L Conselho Coordenador de Saúde",
      subtemas: [
        "Grau de cumprimento das Recomendações do CCS do XLIX",
        "Balanço do desempenho do sector 2024 e Primeiro semestre 2025 (áreas programáticas)",
        "Balanço do Desempenho do Sector 2024 e Primeiro semestre 2025 (Áreas de apoio)",
        // "Regulamento do Subsistema de Planificação de Pessoal (SPP), Regulamento do Subsistema de Administração de Pessoal (SAP); e Regulamento do Subsistema de Desenvolvimento Profissional na Administração  Pública (SDPAP)",
        "Estratégia Nacional de Densenvolvimento (ENDE)",
        // "Sobrevivência materno infantil: Desafios e oportunidades",
        "Proposta do PESOE 2026: Prioridades e Linhas estratégicas",
      ],
    },
    dia4: {
      data: "11 de Outubro de 2025",
      tema: "L Conselho Coordenador de Saúde",
      subtemas: [
        "Painel: Mecanismo de aumento do Financiamento do Sector de Saúde",
        "Implementação da Agenda de Lusaka",
        "Desafios e oportunidades para a sobrevivência materno infantil",
        "Regulamento do Subsistema de Planificação de Pessoal (SPP);\n\nRegulamento do Subsistema de Administração de Pessoal (SAP) e Regulamento do Subsistema de Desenvolvimento Profissional na Administração  Pública (SDPAP)",
        "Estratégia de integração das brigadas móveis",
        "Experiência da digitalização do Hospital de Mavalane",
        // "Estrategia de Integração das brigadas Móveis",
        // "Experiência da digitalização do Hospital de Mavalane",
        // "Painel: Mecanismo de aumento do Financiamento do Sector de Saúde",
        // "Proposta do PESOE 2026: Prioridades e Linhas estratégicas",
        // "PainelII:Implementação da Agenda de Lusaka",
        // "Fim do Conselho Coordenador de Saúde",
      ],
    },
  };

  const dias = Object.keys(agendaData) as DiaKey[];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto mt-20 px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-emerald-700 mb-4">
              Agenda do Evento
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              XIII Conselho Hospitalar e L Conselho Coordenador de Saúde
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">08 - 11 Outubro de 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">Maputo, Moçambique</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Seletor de Dias */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dias.map((dia, index) => {
                const isActive = selectedDay === dia;
                const diaInfo = agendaData[dia];
                return (
                  <motion.button
                    key={dia}
                    onClick={() => setSelectedDay(dia)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl"
                        : "bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    <div className="text-xs opacity-80 mb-1 font-medium">
                      Dia
                    </div>
                    <div className="text-2xl font-bold mb-2">{index + 1}</div>
                    <div
                      className={`text-xs ${
                        isActive ? "text-emerald-100" : "text-gray-500"
                      }`}
                    >
                      {diaInfo.data.split(" ")[0]} {diaInfo.data.split(" ")[2]}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Conteúdo do Dia Selecionado */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header do Dia */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center gap-2 text-emerald-100 mb-3">
                <Calendar className="w-5 h-5" />
                <span className="text-lg font-semibold">
                  {agendaData[selectedDay].data}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {agendaData[selectedDay].tema}
              </h2>
              <a
                href="https://www.google.com/calendar/render?action=TEMPLATE&text=XIII+Conselho+Hospitalar+e+L+Conselho+Coordenador&details=O+Ministerio+da+Saude+realiza+dois+eventos+estrategicos:+Conselho+Hospitalar+e+Conselho+Coordenador+de+Saude,+avaliando+normas,+desempenho+hospitalar+e+estrategias+para+melhorar+o+Sistema+Nacional+de+Saude+(2025-2034).&location=Instituto+de+Ciências+de+Saúde+do+Infulene&dates=20251008T060000Z/20251011T150000Z"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-green-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Adicionar ao Google Calendar</span>
              </a>
            </div>

            {/* Lista de Subtemas */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-8 bg-emerald-500 rounded-full"></div>
                Temas do Dia
              </h3>

              <div className="space-y-3">
                {agendaData[selectedDay].subtemas.map(
                  (subtema: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-emerald-50 transition-all duration-300 border border-transparent hover:border-emerald-200">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 bg-emerald-100 group-hover:bg-emerald-500 text-emerald-600 group-hover:text-white rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <p className="text-gray-800 font-medium leading-relaxed group-hover:text-emerald-700 transition-colors">
                            {subtema}
                          </p>
                        </div>
                        {/* <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors flex-shrink-0 mt-1" /> */}
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </div>

            {/* Contador de Temas */}
            <div className="mt-6 text-center">
              <div className="inline-block bg-emerald-50 text-emerald-700 px-6 py-3 rounded-xl font-semibold">
                Total de {agendaData[selectedDay].subtemas.length} temas
                programados
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Lema do Evento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl shadow-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Lema do Evento</h3>
            <p className="text-xl text-emerald-50 italic">
              Por um Serviço Nacional de Saúde de Qualidade e Humanizado para
              Todos!
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/contacto"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Precisa de mais informações? Entre em contacto
          </a>
        </div>
      </div>
    </main>
  );
};

export default AgendaTemas;

// "use client";
// import { motion } from 'framer-motion';
// import { Calendar, MapPin } from 'lucide-react';

// const AgendaSimplificada = () => {
//     const agendaDias = [
//         {
//             dia: '08 de Outubro de 2025',
//             diaNumero: 'Dia 1',
//             tema: 'XIII Conselho Hospitalar',
//             subtema: 'Abertura Oficial e Análise de Desempenho Hospitalar'
//         },
//         {
//             dia: '09 de Outubro de 2025',
//             diaNumero: 'Dia 2',
//             tema: 'XIII Conselho Hospitalar',
//             subtema: 'Aprovisionamento de Medicamentos e Prevenção e Controle de Infecções'
//         },
//         {
//             dia: '10 de Outubro de 2025',
//             diaNumero: 'Dia 3',
//             tema: 'L Conselho Coordenador de Saúde',
//             subtema: 'Balanço de Desempenho do Sector 2024 e Primeiro Semestre 2025'
//         },
//         {
//             dia: '11 de Outubro de 2025',
//             diaNumero: 'Dia 4',
//             tema: 'L Conselho Coordenador de Saúde',
//             subtema: 'Mecanismos de Financiamento e Documentos Estratégicos'
//         }
//     ];

//     return (
//         <main className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
//             {/* Header */}
//             <div className="bg-white shadow-sm border-b">
//                 <div className="container mx-auto mt-20 px-4 py-8">
//                     <div className="text-center">
//                         <h1 className="text-3xl md:text-5xl font-bold text-emerald-700 mb-4">
//                             Agenda do Evento
//                         </h1>
//                         <p className="text-gray-600 text-lg mb-6">
//                             XIII Conselho Hospitalar e L Conselho Coordenador de Saúde
//                         </p>
//                         <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
//                             <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full">
//                                 <Calendar className="w-5 h-5 text-emerald-600" />
//                                 <span className="font-semibold">08 - 11 Outubro de 2025</span>
//                             </div>
//                             <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full">
//                                 <MapPin className="w-5 h-5 text-emerald-600" />
//                                 <span className="font-semibold">Maputo, Moçambique</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Agenda Cards */}
//             <div className="container mx-auto px-4 py-12">
//                 <div className="max-w-4xl mx-auto">
//                     <div className="grid gap-6">
//                         {agendaDias.map((item, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                                 className="group"
//                             >
//                                 <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-4 border-emerald-500">
//                                     <div className="p-8">
//                                         <div className="flex flex-col md:flex-row md:items-center gap-6">
//                                             {/* Número do Dia */}
//                                             <div className="flex-shrink-0">
//                                                 <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl p-6 text-center shadow-lg">
//                                                     <div className="text-sm font-semibold opacity-90 mb-1">
//                                                         {item.diaNumero.split(' ')[0]}
//                                                     </div>
//                                                     <div className="text-4xl font-bold">
//                                                         {item.diaNumero.split(' ')[1]}
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Conteúdo */}
//                                             <div className="flex-grow">
//                                                 <div className="mb-3">
//                                                     <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//                                                         <Calendar className="w-4 h-4" />
//                                                         <span>{item.dia}</span>
//                                                     </div>
//                                                     <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
//                                                         {item.tema}
//                                                     </h3>
//                                                     <p className="text-gray-600 leading-relaxed">
//                                                         {item.subtema}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Informação adicional */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.5 }}
//                     className="max-w-4xl mx-auto mt-12"
//                 >
//                     <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl shadow-xl p-8 text-center">
//                         <h3 className="text-2xl font-bold mb-3">
//                             Lema do Evento
//                         </h3>
//                         <p className="text-xl text-emerald-50 italic">
//                             "Por um Serviço Nacional de Saúde de Qualidade e Humanizado para Todos!"
//                         </p>
//                     </div>
//                 </motion.div>

//                 {/* Botão de contato */}
//                 <div className="text-center mt-12">
//                     <a
//                         href="/contacto"
//                         className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
//                     >
//                         Precisa de mais informações? Entre em contacto
//                     </a>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default AgendaSimplificada;

// 'use client';
// import { motion } from 'framer-motion';
// import { Clock, Calendar, Users, MapPin } from 'lucide-react';
// import Link from 'next/link';
// import { useState } from 'react';

// interface Session {
//     time: string;
//     title: string;
//     type: string;
//     speaker: string;
//     description: string;
//     fileUrl?: string;
// }

// interface DayData {
//     date: string;
//     theme: string;
//     sessions: Session[];
// }

// interface AgendaData {
//     [key: string]: DayData;
// }

// const Agenda = () => {
//     const [selectedDay, setSelectedDay] = useState<string>('dia1');

//     const agendaData: AgendaData = {
//     dia1: {
//         date: '08 de Outubro de 2025',
//         theme: 'XIII Conselho Hospitalar',
//         sessions: [
//             { time: '08:00 - 08:40', title: 'Registo dos participantes', type: 'Entrada', speaker: 'Protocolo', description: '' },
//             { time: '08:40', title: 'Chegada do Excelentíssimo Presidente do Município da Cidade de Maputo', type: 'Chegada', speaker: 'Protocolo', description: '' },
//             { time: '08:45', title: 'Chegada de S. Excia Secretário de Estado da Cidade de Maputo', type: 'Protocolo', speaker: 'Protocolo', description: '' },
//             { time: '08:50', title: 'Chegada de S. Excia Ministro da Saúde', type: 'Protocolo', speaker: 'Protocolo', description: '' },
//             { time: '08:55', title: 'Entrada do Presidium', type: 'Protocolo', speaker: 'Protocolo', description: '' },
//             { time: '09:05', title: 'Hino Nacional', type: 'Protocolo', speaker: 'Protocolo', description: '' },
//             { time: '09:05 - 09:15', title: 'Intervenção do Excelentíssimo Presidente do Município da Cidade de Maputo', type: 'Discurso', speaker: 'S. Excia. Presidente do Município CM', description: '' },
//             { time: '09:15 - 09:25', title: 'Intervenção do Parceiro de 1º Contacto', type: 'Discurso', speaker: 'Parceiro de 1º Contacto', description: '' },
//             { time: '09:25 - 09:35', title: 'Momento Cultural', type: 'Cultural', speaker: 'Grupo Cultural', description: '' },
//             { time: '09:35 - 09:45', title: 'Intervenção de S. Excia Secretário de Estado da Cidade de Maputo', type: 'Discurso', speaker: 'S. Excia. Secretário de Estado CM', description: '' },
//             { time: '09:45 - 10:00', title: 'Discurso de abertura por S. Excia Ministro da Saúde', type: 'Discurso', speaker: 'S. Excia Ministro', description: '' },
//             { time: '10:00 - 10:30', title: 'Pausa para a foto de Família e café', type: 'Intervalo', speaker: '', description: '' },
//             { time: '10:30 - 10:35', title: 'Adopção da Agenda e do Programa', type: 'Sessão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '10:35 - 10:40', title: 'Objectivos da reunião', type: 'Sessão', speaker: 'DNAM', description: '' },
//             { time: '10:40 - 11:00', title: 'Grau de cumprimento das recomendações matriz do XII Conselho Hospitalar', type: 'Apresentação', speaker: 'DNAM', description: '', fileUrl: 'www.google.com' },
//             { time: '11:00 - 11:30', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '11:30 - 12:00', title: 'Análise de desempenho hospitalar', type: 'Apresentação', speaker: 'DNAM', description: '1. Taxa de ocupação de camas 2. Rendimento Medio por cama 3. Tempo médio de internamento' },
//             { time: '12:00 - 13:00', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '13:00 - 14:00', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
//             { time: '14:00 - 14:30', title: 'Análise de desempenho hospitalar', type: 'Apresentação', speaker: 'DNAM', description: '4. Taxa de Mortalidade Geral Intra-Hospitalar 5. Rácio de Mortalidade Materna Intra-Hospitalar 6. Mortalidade por Serviço e Discussão de Óbitos' },
//             { time: '14:30 - 15:30', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//             { time: '15:30 - 16:00', title: 'Análise de desempenho hospitalar', type: 'Apresentação', speaker: 'DNAM', description: '7. Rendimento por Sala Operatória 8. Rendimento por Cirurgião 9. Consulta por Médico' },
//             { time: '16:00 - 17:00', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//             { time: '17:00h', title: 'Fim dos trabalhos do 1º dia', type: 'Encerramento', speaker: '', description: '' }
//         ]
//     },
//     dia2: {
//         date: '09 de Outubro de 2025',
//         theme: 'XIII Conselho Hospitalar',
//         sessions: [
//             { time: '08:30 - 09:00h', title: 'Leitura e aprovação da Síntese do 1º dia', type: 'Leitura', speaker: 'Secretariado', description: '' },
//             { time: '09:00 - 09:40h', title: 'Aprovisionamento dos Medicamentos: Desafios e Oportunidades de Melhoria', type: 'Apresentação', speaker: 'CMAM', description: '' },
//             { time: '09:40 - 10:30h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '10:30 - 10:50h', title: 'Pausa para o café', type: 'Intervalo', speaker: '', description: '' },
//             { time: '10:50 - 11:00h', title: 'Prevenção e Controle de Infecções (PCI)', type: 'Apresentação', speaker: 'Provincia de Gaza', description: 'Iniciativas de Melhoria da Qualidade' },
//             { time: '11:00 - 11:10h', title: 'Abordagem dos 5S', type: 'Apresentação', speaker: 'HCM', description: '' },
//             { time: '11:10 - 11:20h', title: 'Lixo Biomédico', type: 'Apresentação', speaker: 'Cidade de Maputo', description: '' },
//             { time: '11:20 - 11:30h', title: 'Esterilização', type: 'Apresentação', speaker: 'Provincia de Niassa', description: '' },
//             { time: '11:30 - 11:40h', title: 'Enfermaria Modelo', type: 'Apresentação', speaker: 'Provincia de Inhambane', description: '' },
//             { time: '11:40 - 11:50h', title: 'Estratégias do Programa de Prevenção e Controle de Infecções', type: 'Apresentação', speaker: 'DNAM', description: '' },
//             { time: '11:50 - 13:00h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '13:00 - 14:00h', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
//             { time: '14:00 - 14:20h', title: 'Apetrechamento dos hospitais versos utilização e manutenção dos equipamentos', type: 'Apresentação', speaker: 'DNAM', description: '' },
//             { time: '14:20 - 14:50h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '14:50 - 15:30h', title: 'Balanço das actividades inspectivas, fiscalização e auditorias realizadas em 2024', type: 'Apresentação', speaker: 'IGS', description: '' },
//             { time: '15:30 - 16:00h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '16:00 - 16:20h', title: 'Apresentação do comunicado final', type: 'Leitura', speaker: 'Secretariado', description: '' },
//             { time: '16:20 - 16:40h', title: 'Considerações Finais', type: 'Sessão', speaker: 'S. Excia o Ministro', description: '' },
//             { time: '16:40h', title: 'Fim do Conselho Hospitalar', type: 'Encerramento', speaker: '', description: '' }
//         ]
//     },
//     dia3: {
//         date: '10 de Outubro de 2025',
//         theme: 'L Conselho Coordenador de Saúde',
//         sessions: [
//             { time: '08:30 - 08:40h', title: 'Objectivos da reunião', type: 'Sessão', speaker: 'DPC', description: '' },
//             { time: '08:40 - 09:05h', title: 'Grau de cumprimento das Recomendações do XLIX CCS', type: 'Apresentação', speaker: 'DPC', description: '' },
//             { time: '09:05 - 09:35h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '09:35 - 10:15h', title: 'Balanço do desempenho do sector 2024 e Primeiro semestre 2025', type: 'Balanço', speaker: 'DPC', description: 'Áreas programáticas' },
//             { time: '10:15 - 11:10h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '11:10 - 11:30h', title: 'Pausa para o café', type: 'Intervalo', speaker: '', description: '' },
//             { time: '11:30 - 12:10h', title: 'Balanço do Desempenho do ano 2024 e Primeiro semestre 2025', type: 'Balanço', speaker: 'DAF/DNFPS', description: '' },
//             { time: '12:10 - 12:50h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '12:50 - 13:50h', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
//             { time: '13:50 - 14:30h', title: 'Balanço do Desempenho do ano 2024 e Primeiro semestre 2025', type: 'Balanço', speaker: 'ANARME/INS', description: '' },
//             { time: '14:30 - 15:10h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '15:10 - 15:30h', title: 'Balanço do Desempenho do ano 2024 e Primeiro semestre 2025', type: 'Balanço', speaker: 'DRH', description: '' },
//             { time: '15:30 - 15:50h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '15:50 - 16:20h', title: 'Regulamento do Subsistema de Planificação de Pessoal (SPP)', type: 'Apresentação', speaker: 'MAEFP', description: 'Regulamento do Subsistema de Administração de Pessoal (SAP); e Regulamento do Subsistema de Desenvolvimento Profissional na Administração Pública (SDPAP)' },
//             { time: '16:20 - 16:40h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '16:40 - 16:55h', title: 'Sobrevivência materno infantil: Desafios e oportunidades', type: 'Apresentação', speaker: 'DNSP', description: '' },
//             { time: '16:55 - 17:10h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '17:10h', title: 'Fim dos trabalhos', type: 'Encerramento', speaker: '', description: '' }
//         ]
//     },
//     dia4: {
//         date: '11 de Outubro de 2025',
//         theme: 'L Conselho Coordenador de Saúde',
//         sessions: [
//             { time: '08:30 - 09:00h', title: 'Leitura e aprovação da Síntese do 1º dia', type: 'Leitura', speaker: 'Secretariado', description: '' },
//             { time: '09:00 - 09:05h', title: 'Apresentação do painel', type: 'Sessão', speaker: 'Moderador', description: 'Painel II: Mecanismo de aumento do Financiamento do Sector de Saúde' },
//             { time: '09:05 - 09:20h', title: 'Apresentação do tema', type: 'Apresentação', speaker: 'Salomão Lourenço', description: '' },
//             { time: '09:20 - 09:40h', title: 'Intervenções (4)', type: 'Apresentação', speaker: 'Dra Maria, Dr. Jose Manuel, Dr. Mucopo, Dr. Daniel Chemane', description: '' },
//             { time: '09:40 - 10:40h', title: 'Moderação do debate', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//             { time: '10:40 - 11:00h', title: 'Pausa para o café', type: 'Intervalo', speaker: '', description: '' },
//             { time: '11:00 - 11:20h', title: 'Proposta do PESOE 2026: Prioridades e Linhas estratégicas', type: 'Apresentação', speaker: 'DPC', description: '' },
//             { time: '11:20 - 11:50h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '11:50 - 12:50h', title: 'Apresentação dos Documentos Estratégicos do sector: END, PQG, PESS e PECS', type: 'Apresentação', speaker: 'DPC', description: '' },
//             { time: '12:50 - 13:30h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '13:30 - 13:45h', title: 'Estratégia de Integração das brigadas Móveis na Província', type: 'Apresentação', speaker: 'Tete', description: '' },
//             { time: '13:45 - 14:00h', title: 'Experiência da digitalização do Hospital de Mavalane', type: 'Apresentação', speaker: 'Cidade de Maputo', description: '' },
//             { time: '14:00 - 14:20h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
//             { time: '14:20 - 15:20h', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
//             { time: '15:20 - 15:30h', title: 'Momento cultural', type: 'Cultural', speaker: 'Grupo Cultural', description: '' },
//             { time: '15:30 - 15:50h', title: 'Leitura do Comunicado final', type: 'Leitura', speaker: 'Secretariado', description: '' },
//             { time: '15:50 - 16:10h', title: 'Discurso de encerramento', type: 'Discurso', speaker: 'S. Excia o Ministro', description: '' },
//             { time: '16:10h', title: 'Fim do evento', type: 'Encerramento', speaker: '', description: '' }
//         ]
//     }
// };

//     const getSessionColor = (type: string): string => {
//         const colors: Record<string, string> = {
//             Protocolo: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
//             Discurso: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
//             Apresentação: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white',
//             Sessão: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white',
//             Discussão: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
//             Cultural: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white',
//             Intervalo: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white',
//             Encerramento: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
//             Entrada: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white',
//             Leitura: 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white',
//             Balanço: 'bg-gradient-to-r from-violet-500 to-violet-600 text-white',
//             Outro: 'bg-gradient-to-r from-slate-500 to-slate-600 text-white'
//         };
//         return colors[type] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
//     };

//     const getDayInfo = (dayKey: string) => {
//         const dayNumbers = { dia1: 1, dia2: 2, dia3: 3, dia4: 4 };
//         const dayNumber = dayNumbers[dayKey as keyof typeof dayNumbers];
//         return { number: dayNumber, total: Object.keys(agendaData).length };
//     };

//     return (
//         <>
//             <title>Agenda - Eventos MS</title>
//             <meta name="description" content="Agenda completa do Evento MISAU 2025 - Conselho Coordenador de Saúde" />
//             <meta name="viewport" content="width=device-width, initial-scale=1" />

//             <main className="min-h-screen bg-slate-50">
//                 {/* Header compacto */}
//                 <div className="bg-white shadow-sm border-b">
//                     <div className="container mx-auto mt-20 px-4 py-8">
//                         <div className="text-center">
//                             <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
//                                 Agenda
//                             </h1>
//                             <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
//                                 <div className="flex items-center gap-1">
//                                     <Calendar className="w-4 h-4" />
//                                     <span>08 - 11 Outubro de 2025</span>
//                                 </div>
//                                 <div className="flex items-center gap-1">
//                                     <MapPin className="w-4 h-4" />
//                                     <span>Maputo, Moçambique</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="container mx-auto px-4 py-8">
//                     {/* Navegação por Dias - Mais moderna */}
//                     <div className="mb-8">
//                         <div className="bg-white rounded-2xl shadow-lg p-2 max-w-2xl mx-auto">
//                             <div className="grid grid-cols-4 gap-2">
//                                 {Object.keys(agendaData).map((day, index) => {
//                                     const isActive = selectedDay === day;
//                                     return (
//                                         <motion.button
//                                             key={day}
//                                             onClick={() => setSelectedDay(day)}
//                                             whileHover={{ scale: 1.05 }}
//                                             whileTap={{ scale: 0.95 }}
//                                             className={`relative px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${isActive
//                                                     ? 'bg-emerald-600 text-white shadow-lg'
//                                                     : 'bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
//                                                 }`}
//                                         >
//                                             <div className="text-xs opacity-80 mb-1">Dia</div>
//                                             <div className="text-lg font-bold">{index + 1}</div>
//                                         </motion.button>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Timeline Design */}
//                     <motion.div
//                         key={selectedDay}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5 }}
//                         className="max-w-5xl mx-auto"
//                     >
//                         {/* Header do dia */}
//                         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                                 <a
//                                     href="https://www.google.com/calendar/render?action=TEMPLATE&text=XIII+Conselho+Hospitalar+e+L+Conselho+Cordenador&details=O+Ministerio+da+Saude+realiza+dois+eventos+estrategicos:+Conselho+Hospitalar+e+Conselho+Coordenador+de+Saude,+avaliando+normas,+desempenho+hospitalar+e+estrategias+para+melhorar+o+Sistema+Nacional+de+Saude+(2025-2034).&location=Instituto+de+Ciências+de+Saúde+do+Infulene&dates=20251008T080000Z/20251011T180000Z"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-green-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg"
//                                 >
//                                     <Calendar className="w-4 h-4" />
//                                     <span>Adicionar ao Google Calendar</span>
//                                 </a>

//                                 <div>
//                                     <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                                         {agendaData[selectedDay].date}
//                                     </h2>
//                                     <p className="text-gray-600">{agendaData[selectedDay].theme}</p>
//                                 </div>
//                                 <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
//                                     Dia {getDayInfo(selectedDay).number} de {getDayInfo(selectedDay).total}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Timeline */}
//                         <div className="relative">
//                             {/* Linha vertical */}
//                             <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-200"></div>

//                             <div className="space-y-6">
//                                 {agendaData[selectedDay].sessions.map((session, index) => (
//                                     <motion.div
//                                         key={index}
//                                         initial={{ opacity: 0, x: -20 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ duration: 0.5, delay: index * 0.1 }}
//                                         className="relative pl-20"
//                                     >
//                                         {/* Ponto na timeline */}
//                                         <div className="absolute left-6 top-6 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-lg"></div>

//                                         {/* Card da sessão */}
//                                         <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
//                                             <div className="p-6">
//                                                 <div className="flex flex-col lg:flex-row gap-4">
//                                                     {/* Horário */}
//                                                     <div className="lg:w-32 flex-shrink-0">
//                                                         <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg font-bold text-sm">
//                                                             <Clock className="w-4 h-4" />
//                                                             <span>{session.time}</span>
//                                                         </div>
//                                                     </div>

//                                                     {/* Conteúdo */}
//                                                     <div className="flex-grow">
//                                                         <div className="mb-3">
//                                                             <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
//                                                                 {session.title}
//                                                             </h3>
//                                                             {session.speaker && (
//                                                                 <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
//                                                                     <Users className="w-4 h-4" />
//                                                                     <span>{session.speaker}</span>
//                                                                 </div>
//                                                             )}
//                                                             {session.description && (
//                                                                 <p className="text-gray-600 text-sm mt-2">
//                                                                     {session.description}
//                                                                 </p>
//                                                             )}

//                                                             {/* Botão de download */}
//                                                             {session.fileUrl && (
//                                                                 <a
//                                                                     href={session.fileUrl}
//                                                                     download
//                                                                     target="_blank"
//                                                                     rel="noopener noreferrer"
//                                                                     className="inline-flex items-center gap-2 mt-3 text-sm text-emerald-600 hover:text-emerald-800 font-semibold"
//                                                                 >
//                                                                     <svg
//                                                                         xmlns="http://www.w3.org/2000/svg"
//                                                                         fill="none"
//                                                                         viewBox="0 0 24 24"
//                                                                         strokeWidth={1.5}
//                                                                         stroke="currentColor"
//                                                                         className="w-4 h-4"
//                                                                     >
//                                                                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5v-12m0 12l-3-3m3 3l3-3M3 19.5h18" />
//                                                                     </svg>
//                                                                     Baixar apresentação
//                                                                 </a>
//                                                             )}
//                                                         </div>
//                                                     </div>

//                                                     {/* Tag do tipo */}
//                                                     <div className="flex-shrink-0">
//                                                         <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getSessionColor(session.type)} shadow-sm`}>
//                                                             {session.type}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </motion.div>
//                                 ))}
//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>

//                 {/* CTA - Mais simples */}
//                 <div className="bg-emerald-700 text-white py-12 px-4 mt-16">
//                     <div className="container mx-auto text-center max-w-2xl">
//                         <h3 className="text-2xl font-bold mb-4">
//                             Precisa de mais informações?
//                         </h3>
//                         <p className="text-emerald-100 mb-6">
//                             Entre em contacto connosco para esclarecimentos adicionais sobre o evento.
//                         </p>
//                         <Link
//                             href="/contacto"
//                             className="bg-white text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-block"
//                         >
//                             Entrar em Contacto
//                         </Link>
//                     </div>
//                 </div>
//             </main>
//         </>
//     );
// }

// export default Agenda;
