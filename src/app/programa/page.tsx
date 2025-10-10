'use client';
import { motion } from 'framer-motion';
import { Clock, Calendar, Users, MapPin, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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
    const [selectedDay, setSelectedDay] = useState<string>('dia1');

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


    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [currentFileUrl, setCurrentFileUrl] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

     const PASSWORD = "CHCCO2025#";

    const handleDownloadClick = (fileUrl: string) => {
        setCurrentFileUrl(fileUrl);
        setShowPasswordModal(true);
        setPasswordInput('');
        setErrorMsg('');
    };

    const handlePasswordSubmit = () => {
        if(passwordInput === PASSWORD) {
            window.open(currentFileUrl, '_blank');
            setShowPasswordModal(false);
        } else {
            setErrorMsg('Senha incorreta. Tente novamente!');
        }
    };

    const handleCloseModal = () => {
        setShowPasswordModal(false);
        setPasswordInput('');
        setErrorMsg('');
    };

const agendaData: AgendaData = {
    dia1: {
        date: 'XIII Conselho Hospitalar',
        theme: '08 de Outubro de 2025',
        sessions: [
            { time: '08:00 - 08:40', title: 'Registo dos participantes', type: 'Entrada', speaker: 'Protocolo', description: '' },
            { time: '08:50', title: 'Chegada de S. Excia Ministro da Saúde', type: 'Protocolo', speaker: 'Protocolo', description: '' },
            { time: '08:55', title: 'Entrada do Presidium', type: 'Protocolo', speaker: 'Protocolo', description: '' },
            { time: '09:00', title: 'Hino Nacional', type: 'Protocolo', speaker: 'Protocolo', description: '' },
            { time: '09:00 - 09:10', title: 'Objectivos da reunião ', type: 'Apresentação', speaker: 'DNAM', description: '',  fileUrl: "https://drive.google.com/uc?export=download&id=1NLh69dIeeDwMyVyYc1_lQXxPjWKLPVqY" },
            { time: '09:10 - 09:30', title: 'Discurso de abertura por S. Excia Ministro da Saúde', type: 'Discurso', speaker: 'S. Excia. Ministro', description: "" },
            { time: '09:30 - 09:35', title: 'Adopção da agenda e do programa', type: 'Apresentação', speaker: 'S. Excia. Ministro', description: '' },
            { time: '09:35 - 09:55', title: 'Grau de cumprimento das recomendações matriz do XII Conselho Hospitalar', type: 'Apresentação', speaker: 'DNAM', description: '', fileUrl: 'https://drive.google.com/uc?export=download&id=1xNIiIaKBzXUa_F4Bpv3YK2GUV9DbHtKa' },            
            { time: '09:55 - 10:25', title: 'Discussão ', type: 'Apresentação', speaker: '', description: '' },
            { time: '10:25 - 10:55', title: 'Pausa para a foto de Família e café', type: 'Intervalo', speaker: '', description: '' },
            { time: '10:55 - 11:25', title: 'Análise de desempenho hospitalar: ', type: 'Sessão', speaker: 'DNAM', description: '1. Taxa de ocupação  de camas 2. Rendimento médio por cama 3. Tempo médio de internamento', fileUrl: "https://drive.google.com/uc?export=download&id=1J7NjeZ0sxfZdynRgFtGrnoTsZdTD12ZC" },
            { time: '11:25 - 12:25', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
            { time: '12:25 - 13:25', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
            { time: '13:25 - 13:55', title: 'Análise de desempenho hospitalar', type: 'Apresentação', speaker: 'DNAM', description: '4. Rendimento por Sala Operatória 5. Rendimento por Cirurgião 6. Consulta por Médico', fileUrl: "https://drive.google.com/uc?export=download&id=1J7NjeZ0sxfZdynRgFtGrnoTsZdTD12ZC" },        
            { time: '13:55 - 14:55', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
            { time: '14:55 - 15:25', title: 'Análise de desempenho hospitalar', type: 'Apresentação', speaker: 'DNAM', description: '7.Taxa de Mortalidade Geral Intra-Hospitalar 8. Rácio de Mortalidade Materna Intra-Hospitalar 9. Mortalidade por Serviço e Discussão de Óbitos', fileUrl: "https://drive.google.com/uc?export=download&id=1J7NjeZ0sxfZdynRgFtGrnoTsZdTD12ZC" },
            { time: '15:25 - 16:25', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
            { time: '16:25', title: 'Fim dos trabalhos do 1º dia', type: 'Encerramento', speaker: '', description: '' }
        ]
    },
    dia2: {
        date: 'XIII Conselho Hospitalar',
        theme: '09 de Outubro de 2025',
        sessions: [
            { time: '08:30 - 09:00h', title: 'Leitura e aprovação da Síntese do 1º dia', type: 'Leitura', speaker: 'Secretariado', description: '', fileUrl: "https://drive.google.com/uc?export=download&id=1iwrbP5m56F_MucOBe9zC0GWOUVhexAs7" },
            { time: '09:00 - 09:40h', title: 'Aprovisionamento dos Medicamentos: Desafios e Oportunidades de Melhoria', type: 'Apresentação', speaker: 'CMAM', description: '', fileUrl: "https://drive.google.com/uc?export=download&id=1N_W4Geo640FtMZs-Z1nOkq0rLB89yh4g"},
            { time: '09:40 - 10:30h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
            { time: '10:30 - 10:50h', title: 'Pausa para o café', type: 'Intervalo', speaker: '', description: '' },
            { time: '10:50 - 11:00h', title: 'Prevenção e Controle de Infecções (PCI)', type: 'Apresentação', speaker: 'Provincia de Gaza', description: 'Iniciativas de Melhoria da Qualidade', fileUrl: "https://drive.google.com/uc?export=download&id=1EFA3gBs3gdUGm5uG1rtCs5cDbavhWroQ" },
            { time: '11:00 - 11:10h', title: 'Abordagem dos 5S', type: 'Apresentação', speaker: 'HCM', description: 'Iniciativas de Melhoria da Qualidade', fileUrl: "https://drive.google.com/uc?export=download&id=1MfuiXm1uav0FmLyyenJSbbqe-xeiKD5Z" },
            { time: '11:10 - 11:20h', title: 'Lixo Biomédico', type: 'Apresentação', speaker: 'Cidade de Maputo', description: 'Iniciativas de Melhoria da Qualidade', fileUrl: "https://drive.google.com/uc?export=download&id=1kIHPX5QNtucxtPmWAkgGxnv5s1HjOFQp" },
            { time: '11:20 - 11:30h', title: 'Esterilização', type: 'Apresentação', speaker: 'Provincia de Niassa', description: 'Iniciativas de Melhoria da Qualidade', fileUrl: "https://drive.google.com/uc?export=download&id=1xL0GTifq7ZpAoT90r2vT54pjD0Kikdoo"  },
            { time: '11:30 - 11:40h', title: 'Enfermaria Modelo', type: 'Apresentação', speaker: 'Provincia de Inhambane', description: 'Iniciativas de Melhoria da Qualidade', fileUrl: 'https://drive.google.com/uc?export=download&id=1XGEspBB5EqokuPFeMPb5ID1__HuWTMTj' },
            { time: '11:40 - 11:50h', title: 'Estratégias do Programa de Prevenção e Controle de Infecções', type: 'Apresentação', speaker: 'DNAM', description: '', fileUrl: "https://drive.google.com/uc?export=download&id=1uEws-2Hs4AYC2kImCYgYc3cdJ2C_VUw3" },
            { time: '11:50 - 13:00h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
            { time: '13:00 - 14:00h', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
            { time: '14:00 - 14:20h', title: 'Apetrechamento dos hospitais versos utilização e manutenção dos equipamentos', type: 'Apresentação', speaker: 'DNAM', description: '', fileUrl: 'https://drive.google.com/uc?export=download&id=1dTHhPFsLuN0GAtz4elQvQAA0JfyE3E4Z' },
            { time: '14:20 - 14:50h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
            { time: '14:50 - 15:30h', title: 'Balanço das actividades inspectivas, fiscalização e auditorias realizadas em 2024 e 1º semestre de 2025', type: 'Apresentação', speaker: 'IGS', description: '' },
            { time: '15:30 - 16:00h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
            { time: '16:00 - 16:20h', title: 'Apresentação do comunicado final', type: 'Leitura', speaker: 'Secretariado', description: '' },
            { time: '16:20 - 16:40h', title: 'Considerações Finais', type: 'Sessão', speaker: 'S. Excia o Ministro', description: '' },
            { time: '16:40h', title: 'Fim do Conselho Hospitalar', type: 'Encerramento', speaker: '', description: '' }
        ]
    },
    dia3: {
        date: 'L Conselho Coordenador de Saúde',
        theme: '10 de Outubro de 2025',
        sessions: [
            { time: "08:00 - 08:40h", title: "Registo dos participantes", type: "Entrada", speaker: "Protocolo", description: "" },
            { time: "08:40h", title: "Chegada de S. Excia Presidente do Município da Cidade de Maputo", type: "Protocolo", "speaker": "Protocolo", "description": "" },
            { time: "08:45h", title: "Chegada de S. Excia Secretário de Estado da Cidade de Maputo", type: "Protocolo", "speaker": "Protocolo", "description": "" },
            { time: "08:50h", title: "Chegada de S. Excia Ministro da Saúde", type: "Protocolo", "speaker": "Protocolo", "description": "" },
            { time: "08:55h", title: "Entrada do Presidium", "type": "Protocolo", "speaker": "Protocolo", "description": "" },
            { time: "09:05h", title: "Hino Nacional", "type": "Protocolo", speaker: "Protocolo", description: "" },
            { time: "09:05 - 09:15h", title: "Intervenção de S. Excia Presidente do Município da Cidade de Maputo", "type": "Discurso", "speaker": "S. Excia. Presidente do Município (CM)", "description": "" },
            { time: "09:15 - 09:25h", title: "Intervenção do Parceiro de 1º Contacto", "type": "Discurso", "speaker": "Parceiro de 1º Contacto", "description": "" },
            { time: "09:25 - 09:35h", title: "Momento Cultural", "type": "Cultural", "speaker": "Grupo Cultural", "description": "" },
            { time: "09:35 - 09:45h", title: "Intervenção de S. Excia Secretário de Estado da Cidade de Maputo", "type": "Discurso", "speaker": "S. Excia. Secretário de Estado (CM)", "description": "" },
            { time: "09:45 - 10:00h", title: "Discurso de abertura por S. Excia Ministro da Saúde", "type": "Discurso", "speaker": "S. Excia Ministro", "description": "" },
            { time: "10:00 - 10:30h", title: "Pausa para a foto de Família e café", "type": "Intervalo", "speaker": "", "description": "" },
            { time: "10:30 - 10:35h", title: "Adopção da Agenda e do Programa", "type": "Sessão", "speaker": "S. Excia Ministro", "description": "" },
            { time: "10:35 - 10:40h", title: "Objectivos da reunião", "type": "Sessão", "speaker": "DPC", "description": "", fileUrl: "https://drive.google.com/uc?export=download&id=12R2IDUfx0HMG_ah2BN7AuKMZTMNwrgQv" },
            { time: "10:40 - 10:55h", title: "Grau de cumprimento das Recomendações do XLIX CCS", "type": "Apresentação", "speaker": "DPC", "description": "", fileUrl: "https://drive.google.com/uc?export=download&id=1Gf_mUhXaTqDE-Oc4Hgwb0bQoWq5kfSW-" },
            { time: "10:55 - 11:15h", title: "Discussão", "type": "Discussão", "speaker": "S. Excia Ministro", "description": "" },
            { time: "11:15 - 11:45h", title: "Balanço do desempenho do sector 2024 e Primeiro semestre 2025 (áreas programáticas)", "type": "Balanço", "speaker": "DPC", "description": "Áreas programáticas", fileUrl: "https://drive.google.com/uc?export=download&id=13EjrtJWCHzh0ddWWNLASmWogZ-QFwtYk" },
            { time: "11:45 - 12:15h", title: "Discussão", "type": "Discussão", "speaker": "S. Excia Ministro", "description": "" },
            { time: "12:15 - 12:55h", title: "Balanço do desempenho do ano 2024 e Primeiro semestre 2025", "type": "Balanço", "speaker": "DAF", "description": "", fileUrl: "https://drive.google.com/uc?export=download&id=17ckbpcoM5vuFwyEChTve4C11BJ2TiPnD" },
            { time: "12:55 - 12:55h", title: "Balanço do desempenho do ano 2024 e Primeiro semestre 2025", "type": "Balanço", "speaker": "DNFPS", "description": "", fileUrl: "https://drive.google.com/uc?export=download&id=1gc-hhcB9tOIBtx8MezJHtJWs2rgy01xM" },
            { time: "12:55 - 13:25h", title: "Discussão", "type": "Discussão", "speaker": "S. Excia Ministro", "description": "" },
            { time: "13:25 - 14:20h", title: "Pausa para o almoço", "type": "Intervalo", "speaker": "", "description": "" },
            { time: "14:20 - 14:40h", title: "Balanço do desempenho do ano 2024 e primeiro semestre 2025", "type": "Balanço", "speaker": "ANARME", "description": "", fileUrl: "https://drive.google.com/uc?export=download&id=1CtnKxAO06CPSk22qsI-Nk1sR6fpH92Kt" },
            { time: "14:40 - 15:00h", title: "Balanço do desempenho do ano 2024 e primeiro semestre 2025", "type": "Balanço", "speaker": "INS", "description": "" },
            { time: "15:00 - 15:30h", title: "Discussão", "type": "Discussão", "speaker": "S. Excia Ministro", "description": "" },
            { time: "15:30 - 15:50h", title: "Balanço do desempenho do ano 2024 e Primeiro semestre 2025", "type": "Balanço", "speaker": "DRH", "description": "", fileUrl: "https://drive.google.com/uc?export=download&id=1o-pasde3tOUdf2RstSRDl9AKozdmtBH5" },
            { time: "15:50 - 16:10h", title: "Discussão", "type": "Discussão", "speaker": "S. Excia Ministro", "description": "" },
            { time: "16:10 - 16:30h", title: "Estratégia Nacional de Desenvolvimento (ENDE)", "type": "Apresentação", "speaker": "MPD", "description": "", fileUrl: "https://drive.google.com/uc?export=download&id=1lLxMMZxYbmjJUvxTj5OLcOuGCUI0bomX" },
            { time: "16:30 - 16:50h", title: "Proposta do PESOE 2026: Prioridades e Linhas estratégicas", "type": "Apresentação", "speaker": "DPC", "description": "", fileUrl: "https://drive.google.com/uc?export=download&id=1_VOoogSmxpZ9KQGnOKjZbrPwM4Roe2Uv" },
            { time: "16:50 - 17:20h", title: "Discussão", "type": "Discussão", "speaker": "S. Excia Ministro", "description": "" },
            { time: "17:20h", title: "Fim dos trabalhos", type: "Encerramento", speaker: "", "description": "" }
        ]
    },
    dia4: {
        date: 'L Conselho Coordenador de Saúde',
        theme: '11 de Outubro de 2025',
        sessions: [
            { time: '08:30 - 09:00h', title: 'Leitura e aprovação da Síntese do 1º dia', type: 'Leitura', speaker: 'Secretariado', description: '' },
            { time: '09:00 - 09:05h', title: 'Painel I: Mecanismo de aumento do Financiamento do Sector de Saúde', type: 'Sessão', speaker: 'José Manuel', description: 'Apresentador do painel' },
            { time: '09:05 - 09:20h', title: 'Painel I: Mecanismo de aumento do Financiamento do Sector de Saúde', type: 'Apresentação', speaker: 'DPC', description: 'Apresentação do tema' },
            { time: '09:20 - 09:45h', title: 'Painel I: Mecanismo de aumento do Financiamento do Sector de Saúde', type: 'Apresentação', speaker: 'Nelida Cabral, Daniel Chemane, Salomão Lourenço e Munira Abodou', description: 'Intervenções' },
            { time: '09:45 - 10:40h', title: 'Debate', type: 'Debate', speaker: 'S. Excia o Ministro', description: '' },
            { time: '10:40 - 11:00h', title: 'Pausa para o café', type: 'Intervalo', speaker: '', description: '' },
            { time: '11:00 - 11:20h', title: 'Prioridades de Moçambique na Agenda de Lusaka', type: 'Apresentação', speaker: 'DPC', description: '', fileUrl: "https://drive.google.com/uc?export=download&id=1Q0UlGe3KDGtPLSziPtMF4hNv-BPsVH7a" },
            { time: '11:20 - 11:50h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
            { time: '11:50 - 12:10h', title: 'Desafios e oportunidades para a sobrevivência materno infantil', type: 'Apresentação', speaker: 'DNSP', description: '', fileUrl: "https://drive.google.com/uc?export=download&id=1V8kM0jUdddfgRGeXjk6Mw5xjFNBT_2vv" },
            { time: '12:10 - 13:30h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
            { time: '12:40 - 13:00h', title: 'Regulamento do Subsistema de Planificação de Pessoal (SPP), Regulamento do Subsistema de Administração de Pessoal (SAP) e Regulamento do Subsistema de Desenvolvimento Profissional na Administração  Pública (SDPAP)', type: 'Apresentação', speaker: 'MAEFP', description: '' },
            { time: '13:00 - 13:30h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
            { time: '13:00 - 13:45h', title: 'Estratégia de integração das brigadas móveis na província ', type: 'Apresentação', speaker: 'Província de Tete', description: '', fileUrl: "https://drive.google.com/uc?export=download&id=1WVhFBy5wIZBOmpji4Ecyphi83LtVpXdt" },
            { time: '13:45 - 14:00h', title: 'Experiência da digitalização do Hospital de Mavalane', type: 'Apresentação', speaker: 'Cidade de Maputo', description: '', fileUrl: "https://drive.google.com/uc?export=download&id=1uNCjxMssVE_s7naRXJHC28oy7thSC5Hb" },
            { time: '14:00 - 14:20h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia Ministro', description: '' },
            { time: '14:20 - 15:20h', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' }, 
            { time: '15:20 - 15:30h', title: 'Momento cultural', type: 'Cultural', speaker: 'Grupo Cultural', description: '' },
            { time: '15:30 - 15:50h', title: 'Leitura do Comunicado final', type: 'Leitura', speaker: 'Secretariado', description: '' },
            { time: '15:50 - 16:10h', title: 'Discurso de encerramento', type: 'Discurso', speaker: 'S. Excia o Ministro', description: '' },
            { time: '16:10', title: 'Fim do evento', type: 'Encerramento', speaker: '', description: '' }
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



            {/* Modal de senha */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-10">
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
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Digite a senha para baixar</h3>
                        <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handlePasswordSubmit();
                                }
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Senha"
                        />
                        {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}
                        <button
                            onClick={handlePasswordSubmit}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition-all duration-300"
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
                            <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
                                Programa
                            </h1>
                            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>08 - 11 Outubro de 2025</span>
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
                                                                <button
                                                                    onClick={() => handleDownloadClick(session.fileUrl!)}
                                                                    className="absolute right-6 bottom-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-2 py-1 rounded-2xl shadow-md transition-all duration-300 flex items-center gap-1 text-xs"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={1.5}
                                                                        stroke="currentColor"
                                                                        className="w-3 h-3"
                                                                    >
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5v-12m0 12l-3-3m3 3l3-3M3 19.5h18" />
                                                                    </svg>
                                                                    Baixar
                                                                </button>
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

export default Programa;
