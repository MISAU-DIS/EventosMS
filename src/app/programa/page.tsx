"use client";
import { motion } from "framer-motion";
import { Clock, Calendar, Users, MapPin, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

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

const Programa = () => {
  const [selectedDay, setSelectedDay] = useState<string>("dia1");

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    // Mapeamento das datas do programa - RNP 2025
    const dayMapping: Record<string, string> = {
      "31-05": "dia1",
      "01-06": "dia2",
      "02-06": "dia3",
    };

    const key = `${day}-${month}`;
    const targetDay = dayMapping[key];

    if (targetDay) {
      setSelectedDay(targetDay);
    }
  }, []);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [currentFileUrl, setCurrentFileUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const PASSWORD = "RNP2025#";

  const handleDownloadClick = (fileUrl: string) => {
    setCurrentFileUrl(fileUrl);
    setShowPasswordModal(true);
    setPasswordInput("");
    setErrorMsg("");
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === PASSWORD) {
      window.open(currentFileUrl, "_blank");
      setShowPasswordModal(false);
    } else {
      setErrorMsg("Senha incorreta. Tente novamente!");
    }
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setPasswordInput("");
    setErrorMsg("");
  };

  const agendaData: AgendaData = {
    dia1: {
      date: "A Transição do Financiamento em Moçambique",
      theme: "31 de Maio de 2026",
      sessions: [
        {
          time: "08:30 - 09:00",
          title: "Chegada e Registo dos Participantes",
          description: "Acolhimento e credenciação dos participantes",
          type: "Protocolo",
          speaker: "Protocolo",
        },
         
        {
           time: "09:00 - 09:30",
    title: "Sessão de Abertura",
    description: "Discursos e intervenções de alto nível",
    type: "Discurso",
    speaker: "Altas Individualidades",
        },
        

        /*
        
        {
          time: "09:30 - 09:50",
          title: "Apresentação do CFMP 2026-2028 Nacional",
          type: "Apresentação",
          speaker: "DPC/DPES - Egidio/Atija",
          description: "",
          fileUrl:
            "https://docs.google.com/presentation/d/1RwdzTG-cQV9PfCvNBVTshPLQK-xJLGbz/export/pptx",
        },*/
        {
    time: "09:30 - 09:45",
    title: "Enquadramento e Contextualização",
    description:
      "Apresentação do processo de diálogo e estrutura deste evento de alto nível",
    type: "Apresentação",
    speaker: "",
  },
  {
    time: "09:45 - 10:00",
    title:
      "Ponto de Situação no Alcance dos Compromissos do 1º Diálogo (2023)",
    description:
      "Balanço da implementação dos compromissos assumidos em 2023 e lições aprendidas",
    type: "Apresentação",
    speaker: "",
  },
  {
    time: "10:00 - 10:10",
    title: "Fotografia Oficial",
    description: "",
    type: "Protocolo",
    speaker: "",
  },
  {
    time: "10:10 - 10:30",
    title: "Pausa para Café",
    description: "",
    type: "Intervalo",
    speaker: "Todos",
  },
  {
    time: "10:30 - 11:00",
    title: "O Estado do Financiamento da Saúde em Moçambique",
    description:
      "Situação actual, desafios, impactos da redução do financiamento externo e oportunidades",
    type: "Apresentação",
    speaker: "",
  },
  {
    time: "11:00 - 12:00",
    title: "Partilha de Experiências Internacionais",
    description:
      "Aprendendo como outros países estão a enfrentar a transição do financiamento",
    type: "Apresentação",
    speaker: "",
  },
  {
    time: "12:00 - 13:00",
    title: "Diálogo e Debate em Sessão Plenária",
    description: "Reflexão e discussão sobre os temas apresentados",
    type: "Discussão",
    speaker: "Todos",
  },
  {
    time: "13:00 - 13:15",
    title: "Síntese do Dia e Nota de Encerramento",
    description:
      "Principais mensagens do dia, orientações para o dia seguinte e nota de encerramento",
    type: "Encerramento",
    speaker: "",
  },
  {
    time: "13:15",
    title: "Almoço",
    description: "",
    type: "Intervalo",
    speaker: "Todos",
  },
        
      ],
    },
    dia2: {
      date: "A Transição do Financiamento em Moçambique",
      theme: "01 de Junho de 2026",
      sessions: [
  {
    time: "08:30 - 09:00",
    title: "Chegada e Registo dos Participantes",
    description: "Acolhimento e credenciação dos participantes",
    type: "Protocolo",
    speaker: "Protocolo",
  },
  {
    time: "09:00 - 09:15",
    title: "Sessão de Abertura do Dia",
    description:
      "Enquadramento do dia, apresentação dos grupos, seus facilitadores e instruções para o trabalho em grupo",
    type: "Discurso",
    speaker: "",
  },
  {
    time: "09:15 - 10:15",
    title: "Partilha de Experiências Internacionais",
    description:
      "Aprendendo como outros países estão a enfrentar a transição do financiamento",
    type: "Apresentação",
    speaker: "",
  },
  {
    time: "10:15 - 10:45",
    title: "Pausa para Café",
    description: "",
    type: "Intervalo",
    speaker: "Todos",
  },

  // 🔵 BLOCO DE TRABALHO EM GRUPOS
  {
    time: "10:45 - 12:30",
    title: "Metodologia de Trabalho em Grupos de Partes Interessadas",
    description:
      "Explicação dos objectivos e dinâmica das sessões por grupos de partes interessadas",
    type: "Apresentação",
    speaker: "",
  },
  {
    time: "10:45 - 12:30",
    title: "Trabalhos em Grupos – Clarificação de Evidência e Entendimento Comum",
    description:
      "Recapitulação do diagnóstico do financiamento do sector conforme sumarizado no Dia I, reorientada para o papel e responsabilidades específicas do grupo",
    type: "Exercício",
    speaker: "Grupos de trabalho",
  },
  {
    time: "10:45 - 12:30",
    title:
      "Diálogo por Grupos – Formulação de Propostas de Mudança e Compromissos",
    description:
      "Diálogo com formulação de compromissos a serem assumidos por cada grupo",
    type: "Discussão",
    speaker: "Grupos de trabalho",
  },

  {
    time: "12:30 - 13:00",
    title: "Diálogo em Sessão Plenária",
    description:
      "Apresentação e diálogo sobre as propostas de compromissos a serem assumidos por cada grupo",
    type: "Discussão",
    speaker: "Todos",
  },
  {
    time: "13:00 - 13:15",
    title: "Síntese do Dia e Nota de Encerramento",
    description:
      "Principais mensagens do dia, orientações para o dia seguinte e nota de encerramento",
    type: "Encerramento",
    speaker: "",
  },
  {
    time: "13:15",
    title: "Almoço",
    description: "",
    type: "Intervalo",
    speaker: "Todos",
  },
      ],
    },
    dia3: {
      date: "A Transição do Financiamento em Moçambique",
      theme: "02 de Junho de 2026",
      sessions: [
        
  {
    time: "08:30 - 09:00",
    title: "Chegada e Registo dos Participantes",
    description: "Acolhimento e credenciação dos participantes",
    type: "Protocolo",
    speaker: "Protocolo",
  },
  {
    time: "08:45 - 09:00",
    title: "Momento Cultural",
    description: "",
    type: "Cultural",
    speaker: "",
  },
  {
    time: "09:00 - 09:30",
    title: "Sessão de Abertura do Diálogo de Alto Nível e Político",
    description:
      "Boas-vindas, enquadramento e discursos de alto nível",
    type: "Discurso",
    speaker: "Altas Individualidades",
  },
  {
    time: "09:30 - 10:00",
    title: "Apresentação sobre o Tema de Atenção Especial",
    description:
      "Saúde Sexual e Reprodutiva – Planeamento Familiar",
    type: "Apresentação",
    speaker: "",
  },
  {
    time: "10:00 - 10:30",
    title: "Apresentação das Propostas de Compromissos",
    description:
      "Intervenções dos representantes dos grupos de partes interessadas",
    type: "Apresentação",
    speaker: "",
  },
  {
    time: "10:30 - 11:00",
    title: "Pausa para Café",
    description: "",
    type: "Intervalo",
    speaker: "Todos",
  },
  {
    time: "11:00 - 12:00",
    title: "Partilha de Experiências Internacionais",
    description:
      "Aprendendo como outros países estão a enfrentar a transição do financiamento",
    type: "Apresentação",
    speaker: "",
  },
  {
    time: "12:00 - 12:30",
    title: "Declaração de Compromissos",
    description: "Leitura, validação e assinatura oficial",
    type: "Encerramento",
    speaker: "",
  },
  {
    time: "12:30 - 13:00",
    title: "Sessão de Encerramento",
    description: "Considerações finais e encerramento",
    type: "Encerramento",
    speaker: "",
  },
  {
    time: "13:00",
    title: "Almoço",
    description: "",
    type: "Intervalo",
    speaker: "Todos",
  },
      ],
    },
  };

  const getSessionColor = (type: string): string => {
    const colors: Record<string, string> = {
      Protocolo: "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
      Discurso: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      Apresentação: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      Sessão: "bg-gradient-to-r from-teal-500 to-teal-600 text-white",
      Discussão: "bg-gradient-to-r from-orange-500 to-orange-600 text-white",
      Cultural: "bg-gradient-to-r from-pink-500 to-pink-600 text-white",
      Intervalo: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
      Encerramento: "bg-gradient-to-r from-red-500 to-red-600 text-white",
      Entrada: "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white",
      Leitura: "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white",
      Balanço: "bg-gradient-to-r from-violet-500 to-violet-600 text-white",
      Exercício: "bg-gradient-to-r from-green-500 to-green-600 text-white",
      Outro: "bg-gradient-to-r from-slate-500 to-slate-600 text-white",
    };
    return (
      colors[type] || "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    );
  };

  const getDayInfo = (dayKey: string) => {
    const dayNumbers = { dia1: 1, dia2: 2, dia3: 3 };
    const dayNumber = dayNumbers[dayKey as keyof typeof dayNumbers];
    return { number: dayNumber, total: Object.keys(agendaData).length };
  };

  // Função para obter a data formatada para cada dia
  const getDayDate = (dayKey: string) => {
    const dates: Record<string, string> = {
      dia1: "31",
      dia2: "01",
      dia3: "02",
    };
    return dates[dayKey] || "";
  };

  return (
    <>
      <title>Programa - XVIII RNP MISAU</title>
      <meta
        name="description"
        content="Programa completo da A Transição do Financiamento em Moçambique - MISAU 2025"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Modal de senha */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-80 shadow-lg relative"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Digite a senha para baixar
            </h3>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlePasswordSubmit();
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Senha"
            />
            {errorMsg && (
              <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
            )}
            <button
              onClick={handlePasswordSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Confirmar
            </button>
          </motion.div>
        </div>
      )}

          <main className="relative z-10 min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
        


        {/* 🎨 BACKGROUND DECORATIVO */}
<div className="fixed inset-0 pointer-events-none z-0">


 {/* Fundo centro */}
  <img
    src="/bg1.png"
    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 opacity-10"
  />
    {/* Topo centro */}
  <img
    src="/bg2.png"
    className="absolute top-0 left-1/2 -translate-x-1/2 w-72 opacity-10"
  />
  {/* Topo esquerdo */}
  <img
    src="/bg1.png"
    className="absolute top-0 left-0 w-64 opacity-10"
  />

  {/* Topo direito */}
  <img
    src="/bg2.png"
    className="absolute top-0 right-0 w-64 opacity-10"
  />

  {/* Meio esquerdo */}
  <img
    src="/bg3.png"
    className="absolute top-[40%] left-0 w-72 opacity-10"
  />

  {/* Meio direito */}
  <img
    src="/bg4.png"
    className="absolute top-[40%] right-0 w-72 opacity-10"
  />

  {/* Fundo esquerdo */}
  <img
    src="/bg5.png"
    className="absolute bottom-0 left-0 w-80 opacity-10"
  />

  {/* Fundo direito */}
  <img
    src="/bg6.png"
    className="absolute bottom-0 right-0 w-80 opacity-10"
  />

</div>
        {/* Header compacto */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto mt-20 px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
                Programa
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>31 de Maio, 01, 02 de Junho de 2026</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Centro de Conferências Joaquim Chissano</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Navegação por Dias - Atualizada com datas reais */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-2 max-w-3xl mx-auto">
              <div
                className="gap-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${Object.keys(agendaData).length}, minmax(0, 1fr))`,
                }}
              >
                {Object.keys(agendaData).map((day, index) => {
                  const isActive = selectedDay === day;
                  const dayDate = getDayDate(day);
                  return (
                    <motion.button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-3 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                     <div className="text-xs opacity-80 mb-1">  {day === "dia1" ? "Maio" : "Junho"}
                      </div>
                      <div className="text-lg font-bold">{dayDate}</div>
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
                  <p className="text-gray-600">
                    {agendaData[selectedDay].theme}
                  </p>
                </div>
                <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
                  Dia {getDayInfo(selectedDay).number} de{" "}
                  {getDayInfo(selectedDay).total}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Linha vertical */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>

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
                    <div className="absolute left-6 top-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>

                    {/* Card da sessão */}
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                          {/* Horário */}
                          <div className="lg:w-32 flex-shrink-0">
                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg font-bold text-sm">
                              <Clock className="w-4 h-4" />
                              <span>{session.time}</span>
                            </div>
                          </div>

                          {/* Conteúdo */}
                          <div className="flex-grow">
                            <div className="mb-3">
  <h3 className="text-lg font-semibold tracking-tight text-blue-900 mb-1 leading-snug">
  {session.title}
</h3>



 {session.description && (
  <p className="text-gray-600 text-sm mb-2 leading-relaxed italic">
    {session.description}
  </p>
)}
{session.speaker && (
  <div className="flex items-center gap-2 text-blue-700 text-sm font-medium">
    <Users className="w-4 h-4" />
    <span>{session.speaker}</span>
  </div>
)}

                              {/* Botão de download */}
                              {session.fileUrl && (
                                <button
                                  onClick={() =>
                                    handleDownloadClick(session.fileUrl!)
                                  }
                                  className="absolute right-6 bottom-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2 py-1 rounded-2xl shadow-md transition-all duration-300 flex items-center gap-1 text-xs"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3 h-3"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 16.5v-12m0 12l-3-3m3 3l3-3M3 19.5h18"
                                    />
                                  </svg>
                                  Baixar
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Tag do tipo */}
                          <div className="flex-shrink-0">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getSessionColor(
                                session.type,
                              )} shadow-sm`}
                            >
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

       
      </main>
    </>
  );
};

export default Programa;
