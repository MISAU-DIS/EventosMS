"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const AgendaTemas = () => {
  const [selectedDay, setSelectedDay] = useState<string>("dia1");
  // type DiaKey = "dia1" | "dia2" | "dia3" | "dia4";
  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // meses começam em 0
  
    // Mapeamento das datas do programa
    const dayMapping: Record<string, string> = {
      "8-10": "dia1", // 8 de outubro → Dia 1
      "9-10": "dia2", // 9 de outubro → Dia 2
      "10-10": "dia3", // 10 de outubro → Dia 3
      "11-10": "dia4", // 11 de outubro → Dia 4
    };
  
    const key = `${day}-${month}`;
    const targetDay = dayMapping[key];
  
    if (targetDay) {
      setSelectedDay(targetDay);
    }
  }, []);

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

  const agendaData: Record<string, Dia> = {
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

  const dias = Object.keys(agendaData) as string[];

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

