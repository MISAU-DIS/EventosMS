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
      "24-11": "dia1", // 24 de novembro → Dia 1
      "25-11": "dia2", // 25 de novembro → Dia 2
      "26-11": "dia3", // 26 de novembro → Dia 3
      "27-11": "dia4", // 27 de novembro → Dia 4
      "28-11": "dia5", // 28 de novembro → Dia 5
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
      date: "XVIII Reunião Nacional de Planificação",
      theme: "24 de Novembro de 2025 - Encontro Técnico",
      sessions: [
        {
          time: "08:30 - 09:00",
          title: "Registo dos participantes",
          type: "Protocolo",
          speaker: "Protocolo",
          description: "",
        },
        {
          time: "09:00 - 09:15",
          title: "Apresentação dos participantes",
          type: "Apresentação",
          speaker: "Todos",
          description: "",
        },
        {
          time: "09:15 - 09:20",
          title: "Notas de boas vindas",
          type: "Discurso",
          speaker: "DPC - Mestre de Cerimónias",
          description: "",
        },
        {
          time: "09:20 - 09:30",
          title: "Sessão de abertura",
          type: "Discurso",
          speaker: "Director da DPC",
          description: "",
        },
        {
          time: "09:30 - 09:50",
          title: "Apresentação do CFMP 2026-2028 Nacional",
          type: "Apresentação",
          speaker: "DPC/DPES - Egidio/Atija",
          description: "",
          fileUrl:
            "https://docs.google.com/presentation/d/1RwdzTG-cQV9PfCvNBVTshPLQK-xJLGbz/export/pptx",
        },
        {
          time: "09:50 - 10:05",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "10:05 - 10:35",
          title: "Pausa para café",
          type: "Intervalo",
          speaker: "Todos",
          description: "",
        },
        {
          time: "10:35 - 10:50",
          title:
            "Agenda Lusaka - Acções estratégicas das três prioridades do País",
          type: "Apresentação",
          speaker: "DPC/DPES - Amândio",
          description: "",
          fileUrl:
            "https://drive.google.com/uc?export=download&id=16PLNPBdhg4NH9a7qNTEl2TeG6A8-XxiA",
        },
        {
          time: "10:50 - 11:05",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "11:05 - 11:20",
          title:
            "Abordagem de Único Plano, Único Orçamento, Única Monitoria e Avaliação",
          type: "Apresentação",
          speaker: "DPC/DPES - Sitão",
          description: "Prioridades nacionais - Nova matriz do PESOE Interno",
          fileUrl:
            "https://docs.google.com/presentation/d/1hrLOqts3FUrJTITeWhW4aChwk8_0Vg4l/export/pptx",
        },
        {
          time: "11:20 - 11:35",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "11:35 - 11:50",
          title: "Nova matriz de elaboração do PESOE Interno",
          type: "Apresentação",
          speaker: "DPC/DPES - Luís",
          description: "",
          fileUrl:
            "https://docs.google.com/presentation/d/1hrLOqts3FUrJTITeWhW4aChwk8_0Vg4l/export/pptx",
        },
        {
          time: "11:50 - 12:05",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "12:05 - 13:00",
          title:
            "Exercício prático para identificação de acções de impacto e lacuna por prioridade e programa",
          type: "Exercício",
          speaker: "DPC/DPES - Amândio",
          description:
            "Análise de duplicação e harmonização das actividades de planificação e orçamento",
          fileUrl:
            "https://docs.google.com/presentation/d/1YRA3Bvjk_81wSu9ctbLi-ny3Db7KNqZ7/export/pptx",
        },
        {
          time: "13:00 - 14:00",
          title: "Pausa para almoço",
          type: "Intervalo",
          speaker: "Todos",
          description: "",
        },
        {
          time: "14:00 - 15:35",
          title: "Continuação dos exercícios práticos",
          type: "Exercício",
          speaker: "Grupos de trabalho",
          description: "",
        },
        {
          time: "15:35",
          title: "Fim dos trabalhos do primeiro dia",
          type: "Encerramento",
          speaker: "",
          description: "",
        },
      ],
    },
    dia2: {
      date: "XVIII Reunião Nacional de Planificação",
      theme: "25 de Novembro de 2025 - Encontro Técnico",
      sessions: [
        {
          time: "08:30 - 08:45",
          title: "Leitura da Síntese do primeiro dia",
          type: "Leitura",
          speaker: "Secretariado",
          description: "",
        },
        {
          time: "08:45 - 09:00",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "09:00 - 10:00",
          title: "Continuação dos exercícios práticos",
          type: "Exercício",
          speaker: "Grupos de trabalho",
          description: "",
        },
        {
          time: "10:00 - 10:30",
          title: "Pausa para café",
          type: "Intervalo",
          speaker: "Todos",
          description: "",
        },
        {
          time: "10:30 - 11:00",
          title:
            "Apresentação dos trabalhos em grupo sobre duplicação e harmonização das actividades",
          type: "Apresentação",
          speaker: "DPC/DPES",
          description: "",
        },
        {
          time: "10:30 - 11:00",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "11:00 - 11:15",
          title:
            "Apresentação da proposta de critérios de alocação de recursos financeiros no sector",
          type: "Apresentação",
          speaker: "DPC/DPES - Narguice",
          description: "",
          fileUrl:
            "https://docs.google.com/presentation/d/1CNgWLf_LuAryKU641PPqvGrrT2Z82tZD/export/pptx",
        },
        {
          time: "11:15 - 11:30",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "11:30 - 13:00",
          title:
            "Exercício Prático para colher subsídios para definição dos critérios de alocação de recursos financeiros",
          type: "Exercício",
          speaker: "DPC/DPES - Narguice",
          description: "",
        },
        {
          time: "11:30 - 13:00",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "13:00 - 14:00",
          title: "Pausa para almoço",
          type: "Intervalo",
          speaker: "Todos",
          description: "",
        },
        {
          time: "14:00 - 14:30",
          title:
            "Apresentação de Indicadores e Critérios para avaliação de desempenho",
          type: "Apresentação",
          speaker: "DPC/M&A - Chadreque",
          description:
            "Metas e indicadores de desempenho - Métricas - harmonização de indicadores",
          fileUrl:
            "https://docs.google.com/presentation/d/1nHVreImq6KqJnBI6sLEus9mXNIbnQvYJ/export/pptx",
        },
        {
          time: "14:30 - 15:00",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "15:00 - 15:15",
          title: "Apresentação do Plano de melhoria de qualidade de dados",
          type: "Apresentação",
          speaker: "DPC/DIS - Edson",
          description: "",
          fileUrl:
            "https://docs.google.com/presentation/d/1nqJEB62K417OYl_cvdK0sWWmGQ022e79/export/pptx",
        },
        {
          time: "15:15 - 15:30",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "15:30",
          title: "Fim dos trabalhos técnicos",
          type: "Encerramento",
          speaker: "",
          description: "",
        },
      ],
    },
    dia3: {
      date: "XVIII Reunião Nacional de Planificação",
      theme: "26 de Novembro de 2025 - Sessão Plenária",
      sessions: [
        {
          time: "08:30 - 08:45",
          title: "Registo dos participantes",
          type: "Protocolo",
          speaker: "Protocolo",
          description: "",
        },
        {
          time: "08:45 - 09:00",
          title: "Apresentação dos participantes",
          type: "Apresentação",
          speaker: "Todos",
          description: "",
        },
        {
          time: "09:00 - 09:15",
          title: "Notas de boas vindas e contextualização da reunião",
          type: "Discurso",
          speaker: "Director da DPC",
          description: "",
        },
        {
          time: "09:15 - 09:30",
          title: "Sessão de abertura",
          type: "Discurso",
          speaker: "Excelentíssimo Sr. Secretário Permanente da Saúde",
          description: "",
        },
        {
          time: "09:30 - 09:45",
          title:
            "Apresentação das Recomendações do L Conselho Coordenador de Saúde",
          type: "Apresentação",
          speaker: "DPC/M&A - Chadreque",
          description: "",
          fileUrl:
            "https://docs.google.com/presentation/d/1S5mZmznFxjnWmu5-NL0uKZ3cmRMynsIW/export/pptx",
        },
        {
          time: "09:45 - 10:00",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "10:00 - 10:30",
          title: "Pausa para Café",
          type: "Intervalo",
          speaker: "Todos",
          description: "",
        },
        {
          time: "10:30 - 11:30",
          title: "Apresentação dos resultados do CFMP 2026-2028 Nacional",
          type: "Apresentação",
          speaker: "DPC/DPES - Egidio/Atija",
          description: "",
          fileUrl:
            "https://docs.google.com/presentation/d/1XhUFx8Xpefa14lsW5_xvXLNS_cS5LMZU/export/pptx",
        },
        {
          time: "11:30 - 11:45",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "11:45 - 12:15",
          title: "Acções para aumentar o financiamento do sector de saúde",
          type: "Apresentação",
          speaker: "DPC/DPES - Amândio",
          description: "",
          fileUrl:
            "https://docs.google.com/presentation/d/1cNBOMfVJV2nfHvDEli4SPQw8XyrFy5wn/export/pptx",
        },
        {
          time: "12:15 - 12:45",
          title:
            "Apresentação de Indicadores e Critérios para avaliação de desempenho",
          type: "Apresentação",
          speaker: "DPC/M&A - Chadreque",
          description:
            "Metas e indicadores de desempenho - Métricas - harmonização de indicadores",
          fileUrl:
            "https://docs.google.com/presentation/d/19W9C8WEXQmRz2cSWRtwuY4xYst8fAkOQ/export/pptx",
        },
        {
          time: "12:45 - 13:15",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "13:15 - 14:15",
          title: "Pausa para almoço",
          type: "Intervalo",
          speaker: "Todos",
          description: "",
        },
        {
          time: "14:15 - 14:30",
          title:
            "Plano de expansão da Estratégia do Subsistema Comunitário no âmbito de fortalecimento dos cuidados de saúde primários",
          type: "Apresentação",
          speaker: "DNSP/CSP - Olinda",
          description: "",
          fileUrl:
            "https://docs.google.com/presentation/d/1xynSgkIpbZsaGoa4vJDJxJcLh0jpFW4C/export/pptx",
        },
        {
          time: "14:30 - 14:45",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "14:45 - 15:30",
          title: "Plano de Reforço de Sistema de Saúde",
          type: "Apresentação",
          speaker: "Consultor - Elias Mangujo",
          description: "",
          fileUrl:
            "https://docs.google.com/presentation/d/1xKvEY1s3WsIAcVcG3p8QIx7sFFrHZ9hf/export/pptx",
        },
        {
          time: "15:30 - 15:45",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "15:45",
          title: "Fim dos trabalhos do terceiro dia",
          type: "Encerramento",
          speaker: "",
          description: "",
        },
      ],
    },
    dia4: {
      date: "XVIII Reunião Nacional de Planificação",
      theme: "27 de Novembro de 2025 - Sessão Plenária",
      sessions: [
        {
          time: "08:30 - 08:45",
          title: "Leitura da Síntese do primeiro dia",
          type: "Leitura",
          speaker: "Secretariado",
          description: "",
        },
        {
          time: "08:45 - 09:00",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "09:00 - 09:15",
          title: "Apresentação do PECS",
          type: "Apresentação",
          speaker: "DPC/DM&A - Chadreque",
          description: "",
        },
        {
          time: "09:15 - 09:30",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "09:30 - 09:45",
          title:
            "Abordagem de Único Plano, Único Orçamento, Única Monitoria e Avaliação",
          type: "Apresentação",
          speaker: "DPC/DPES - Sitão",
          description: "",
        },
        {
          time: "09:45 - 10:00",
          title: "Debate",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "10:00 - 10:15",
          title:
            "Apresentação de metodologia prática para a desduplicação e harmonização das actividades e orçamento",
          type: "Apresentação",
          speaker: "DPC/DPES - Amândio",
          description: "",
        },
        {
          time: "10:15 - 10:45",
          title: "Pausa para Café",
          type: "Intervalo",
          speaker: "Todos",
          description: "",
        },
        {
          time: "10:45 - 13:05",
          title:
            "Esclarecimentos e apresentação dos resultados do exercício prático da desduplicação e harmonização das actividades e orçamento",
          type: "Apresentação",
          speaker: "DPC/DPES - Amândio",
          description: "",
        },
        {
          time: "10:45 - 13:05",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "13:05 - 14:05",
          title: "Pausa para almoço",
          type: "Intervalo",
          speaker: "Todos",
          description: "",
        },
        {
          time: "14:05 - 16:05",
          title: "Apresentação do ponto de situação das obras do sector",
          type: "Apresentação",
          speaker: "DIEH - Mendonça",
          description: "",
        },
        {
          time: "14:05 - 16:05",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "16:05",
          title: "Fim dos trabalhos do quarto dia",
          type: "Encerramento",
          speaker: "",
          description: "",
        },
      ],
    },
    dia5: {
      date: "XVIII Reunião Nacional de Planificação",
      theme: "28 de Novembro de 2025 - Sessão de Encerramento",
      sessions: [
        {
          time: "08:30 - 08:45",
          title: "Leitura da Síntese do segundo dia",
          type: "Leitura",
          speaker: "Secretariado",
          description: "",
        },
        {
          time: "08:45 - 09:00",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "09:00 - 09:20",
          title: "Apresentação das áreas com lacunas de financiamento",
          type: "Apresentação",
          speaker: "DPC/DPES",
          description: "",
        },
        {
          time: "09:20 - 09:35",
          title: "Prioridades e acções estratégicas da Agenda Lusaka (IMS)",
          type: "Apresentação",
          speaker: "DPC/DPES - Amandio",
          description:
            "Fortalecimento da resiliência da cadeia de abastecimento da Central de Medicamentos e Artigos Médicos, Planificação e financiamento integrado a nível distrital, Fortalecimento da gestão e eficiência das finanças públicas",
        },
        {
          time: "09:35 - 09:50",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "09:50 - 10:05",
          title: "Plano de melhoria de qualidade de dados",
          type: "Apresentação",
          speaker: "DPC/DIS - Edson",
          description: "",
        },
        {
          time: "10:05 - 10:20",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "10:20 - 10:40",
          title: "Estratégia de Saúde Digital",
          type: "Apresentação",
          speaker: "DPC/DIS - Edson",
          description: "",
        },
        {
          time: "10:40 - 11:00",
          title: "Pausa para Café",
          type: "Intervalo",
          speaker: "Todos",
          description: "",
        },
        {
          time: "11:00 - 11:20",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "11:20 - 12:15",
          title:
            "Níveis de Execução dos fundos de projectos sob gestão no MISAU",
          type: "Apresentação",
          speaker: "DPC - DCP",
          description:
            "Unidade de Gestão do Fundo Global, Unidade de Gestão do Banco Mundial, Unidade de Gestão do GAVI, Unidade de Gestão do CDC",
        },
        {
          time: "11:20 - 12:15",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "12:15 - 12:45",
          title:
            "Apresentação das acções priorizadas no âmbito do novo acordo de apoio de Governo dos Estados Unidos para Governo Moçambique (G2G)",
          type: "Apresentação",
          speaker: "DPC/DPES - Dr. Candrinho",
          description: "",
        },
        {
          time: "12:15 - 12:45",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "12:45 - 13:15",
          title: "Apresentação do GC8 do Fundo Global",
          type: "Apresentação",
          speaker: "DPC - Dr. Candrinho",
          description: "",
        },
        {
          time: "13:15 - 13:30",
          title: "Discussão",
          type: "Discussão",
          speaker: "Todos",
          description: "",
        },
        {
          time: "13:30 - 14:00",
          title: "Leitura do comunicado final",
          type: "Leitura",
          speaker: "Secretariado",
          description: "",
        },
        {
          time: "14:00 - 14:30",
          title: "Notas de encerramento",
          type: "Discurso",
          speaker: "Excelentíssimo Sr. Secretário Permanente da Saúde",
          description: "",
        },
        {
          time: "14:30 - 15:30",
          title: "Almoço e fecho do evento",
          type: "Intervalo",
          speaker: "Todos",
          description: "",
        },
        {
          time: "15:30",
          title: "Fim dos trabalhos do quinto dia e do evento",
          type: "Encerramento",
          speaker: "",
          description: "",
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
    const dayNumbers = { dia1: 1, dia2: 2, dia3: 3, dia4: 4, dia5: 5 };
    const dayNumber = dayNumbers[dayKey as keyof typeof dayNumbers];
    return { number: dayNumber, total: Object.keys(agendaData).length };
  };

  // Função para obter a data formatada para cada dia
  const getDayDate = (dayKey: string) => {
    const dates: Record<string, string> = {
      dia1: "24",
      dia2: "25",
      dia3: "26",
      dia4: "27",
      dia5: "28",
    };
    return dates[dayKey] || "";
  };

  return (
    <>
      <title>Programa - XVIII RNP MISAU</title>
      <meta
        name="description"
        content="Programa completo da XVIII Reunião Nacional de Planificação - MISAU 2025"
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

      <main className="min-h-screen bg-slate-50">
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
                  <span>24 - 28 Novembro de 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Macaneta, Marracuene - Maputo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Navegação por Dias - Atualizada com datas reais */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-2 max-w-3xl mx-auto">
              <div className="grid grid-cols-5 gap-2">
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
                      <div className="text-xs opacity-80 mb-1">Nov</div>
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
                              <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                                {session.title}
                              </h3>
                              {session.speaker && (
                                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
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
                                session.type
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

        {/* CTA */}
        <div className="bg-blue-700 text-white py-12 px-4 mt-16">
          <div className="container mx-auto text-center max-w-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Precisa de mais informações?
            </h3>
            <p className="text-blue-100 mb-6">
              Entre em contacto connosco para esclarecimentos adicionais sobre o
              evento.
            </p>
            <Link
              href="/contacto"
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-block"
            >
              Entrar em Contacto
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Programa;
