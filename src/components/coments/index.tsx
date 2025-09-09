export interface Session {
    time: string;
    title: string;
    type: string;
    speaker: string;
    description: string;
}

export interface DayAgenda {
    date: string;
    theme: string;
    sessions: Session[];
}

export interface AgendaData {
    dia1: DayAgenda;
    dia2: DayAgenda;
    dia3: DayAgenda;
    dia4: DayAgenda;
    dia5: DayAgenda;
}


const agendaData: AgendaData = {
        dia1: {
            date: '12-13 de Setembro de 2025',
            theme: 'Abertura e Visão Estratégica',
            sessions: [
                {
                    time: '08:30 - 09:00',
                    title: 'Leitura e aprovação da Síntese do 1º dia',
                    type: 'Inicio',
                    speaker: 'Secretariado',
                    description: 'Leitura e aprovação da Síntese do 1º dia'
                },
                {
                    time: '09:00 - 10:25',
                    title: 'Painel I: Desafios da Saúde Digital em Moçambique',
                    type: 'Painel',
                    speaker: 'Moderador, Facilitador, Painelistas, S. Excia o Ministro',
                    description: 'Apresentação do painel, Apresentação do tema, Intervenções (3), Moderação do debate'
                },
                {
                    time: '10:25 - 11:05',
                    title: 'Lanche da manhã',
                    type: 'Lunche',
                    speaker: '',
                    description: 'Lanche da manhã'
                },
                {
                    time: '11:05 - 12:55',
                    title: 'Painel II: Prontidão e resiliência aos eventos climáticos extremos na saúde',
                    type: 'Painel',
                    speaker: 'Moderador, Facilitador, Painelistas, S. Excia o Ministro',
                    description: 'Apresentação do painel, Apresentação do tema, Intervenções (3), Moderação do debate'
                },
                {
                    time: '12:55 - 13:10',
                    title: 'Prioridades e acções estratégicas para o PESOE 2025 ',
                    type: 'Painel',
                    speaker: 'DPC',
                    description: 'Prioridades e acções estratégicas para o PESOE 2025 '
                },
                {
                    time: '13:10 - 13:25',
                    title: 'Linhas gerais do PESS 2025-2034',
                    type: 'Linhas gerais',
                    speaker: 'DPC',
                    description: 'Linhas gerais do PESS 2025-2034'
                },
                {
                    time: '13:25 - 13:50',
                    title: 'Discussão',
                    type: 'Discussão',
                    speaker: 'S. Excia o Ministro',
                    description: 'Discussão'
                },
                {
                    time: '13:50 - 14:10',
                    title: 'Gestão de Recursos Humanos - desafios e perspectivas',
                    type: 'Apresentação',
                    speaker: 'DRH',
                    description: 'Gestão de Recursos Humanos - desafios e perspectivas'
                },
                {
                    time: '14:10 - 14:30h',
                    title: 'Discussão ',
                    type: 'Discussão',
                    speaker: 'S. Excia o Ministro',
                    description: 'Discussão'
                },
                {
                    time: '14:30 - 15:30',
                    title: 'Almoço',
                    type: 'Intervalo',
                    speaker: '',
                    description: 'Almoço'
                },
                {
                    time: '15:30 - 15:40',
                    title: 'Momento Cultural',
                    type: 'Momento Cultural',
                    speaker: 'Grupo Cultural',
                    description: 'Momento Cultural'
                },
                {
                    time: '15:40 - 15:55',
                    title: 'Leitura do Comunicado Final',
                    type: 'Apresentação',
                    speaker: 'Secretariado',
                    description: 'Leitura do Comunicado Final'
                },
                {
                    time: '15:55 - 16:05',
                    title: 'Discurso de Encerramento',
                    type: 'Discurso',
                    speaker: 'S. Excia o Ministro',
                    description: 'Discurso de Encerramento do evento'
                },
                {
                    time: '16:05',
                    title: 'Fim do Conselho Coordenador',
                    type: 'Ceremónia de enceramento',
                    speaker: '',
                    description: 'Fim do Conselho Coordenador'
                }
            ]
        },
        dia2: {
            date: '17 de Junho - Terça-feira',
            theme: 'Saúde Infantil e Nutrição',
            sessions: [
                {
                    time: '09:00 - 10:30',
                    title: 'Seminário: Desnutrição Infantil - Desafios e Soluções',
                    type: 'seminar',
                    speaker: 'Dr. João Mavie - UNICEF',
                    description: 'Estratégias para combater a desnutrição em crianças menores de 5 anos'
                },
                {
                    time: '10:30 - 11:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '11:00 - 12:30',
                    title: 'Mesa Redonda: Vacinação e Imunização',
                    type: 'roundtable',
                    speaker: 'Especialistas em Imunização',
                    description: 'Discussão sobre cobertura vacinal e novos programas'
                },
                {
                    time: '12:30 - 14:00',
                    title: 'Almoço',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '14:00 - 15:30',
                    title: 'Workshop: Cuidados Neonatais Essenciais',
                    type: 'workshop',
                    speaker: 'Equipe de Pediatria MISAU',
                    description: 'Práticas para redução da mortalidade neonatal'
                },
                {
                    time: '15:30 - 16:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '16:00 - 17:30',
                    title: 'Grupo de Trabalho: Políticas de Nutrição',
                    type: 'workgroup',
                    speaker: 'Coordenadores de Nutrição',
                    description: 'Desenvolvimento de estratégias provinciais de nutrição'
                }
            ]
        },
        dia3: {
            date: '18 de Junho - Quarta-feira',
            theme: 'Saúde Adolescente e Reprodutiva',
            sessions: [
                {
                    time: '09:00 - 10:30',
                    title: 'Conferência: Saúde Sexual e Reprodutiva dos Adolescentes',
                    type: 'conference',
                    speaker: 'Dra. Ana Macamo - UNFPA',
                    description: 'Abordagem integral da saúde reprodutiva na adolescência'
                },
                {
                    time: '10:30 - 11:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '11:00 - 12:30',
                    title: 'Painel: Prevenção de Gravidezes Precoces',
                    type: 'panel',
                    speaker: 'Especialistas em Saúde Reprodutiva',
                    description: 'Estratégias de prevenção e educação sexual'
                },
                {
                    time: '12:30 - 14:00',
                    title: 'Almoço',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '14:00 - 15:30',
                    title: 'Workshop: Serviços Amigáveis aos Adolescentes',
                    type: 'workshop',
                    speaker: 'Coordenadores de Saúde Adolescente',
                    description: 'Criação de espaços de atendimento adequados aos jovens'
                },
                {
                    time: '15:30 - 16:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '16:00 - 17:00',
                    title: 'Sessão de Networking',
                    type: 'networking',
                    speaker: '',
                    description: 'Oportunidade para estabelecer parcerias e trocar experiências'
                }
            ]
        },
        dia4: {
            date: '19 de Junho - Quinta-feira',
            theme: 'Fortalecimento do Sistema de Saúde',
            sessions: [
                {
                    time: '09:00 - 10:30',
                    title: 'Seminário: Recursos Humanos em Saúde',
                    type: 'seminar',
                    speaker: 'Direção de Recursos Humanos MISAU',
                    description: 'Estratégias para formação e retenção de profissionais de saúde'
                },
                {
                    time: '10:30 - 11:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '11:00 - 12:30',
                    title: 'Mesa Redonda: Financiamento da Saúde',
                    type: 'roundtable',
                    speaker: 'Parceiros de Desenvolvimento',
                    description: 'Mobilização de recursos e sustentabilidade financeira'
                },
                {
                    time: '12:30 - 14:00',
                    title: 'Almoço',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '14:00 - 15:30',
                    title: 'Workshop: Gestão da Cadeia de Abastecimento',
                    type: 'workshop',
                    speaker: 'CMAM - Central de Medicamentos',
                    description: 'Otimização da distribuição de medicamentos e equipamentos'
                },
                {
                    time: '15:30 - 16:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '16:00 - 17:30',
                    title: 'Grupo de Trabalho: Qualidade dos Cuidados',
                    type: 'workgroup',
                    speaker: 'Coordenadores de Qualidade',
                    description: 'Melhoria contínua da qualidade dos serviços de saúde'
                }
            ]
        },
        dia5: {
            date: '20 de Junho - Sexta-feira',
            theme: 'Compromissos e Próximos Passos',
            sessions: [
                {
                    time: '09:00 - 10:30',
                    title: 'Apresentação de Resultados dos Grupos de Trabalho',
                    type: 'presentation',
                    speaker: 'Coordenadores dos GTs',
                    description: 'Síntese das discussões e recomendações dos grupos'
                },
                {
                    time: '10:30 - 11:00',
                    title: 'Pausa para Café',
                    type: 'break',
                    speaker: '',
                    description: ''
                },
                {
                    time: '11:00 - 12:00',
                    title: 'Painel: Compromissos 2025-2030',
                    type: 'panel',
                    speaker: 'Liderança MISAU',
                    description: 'Definição de metas e indicadores para os próximos 5 anos'
                },
                {
                    time: '12:00 - 12:30',
                    title: 'Cerimónia de Encerramento',
                    type: 'ceremony',
                    speaker: 'Ministro da Saúde',
                    description: 'Discurso de encerramento e próximos passos'
                },
                {
                    time: '12:30 - 14:00',
                    title: 'Almoço de Despedida',
                    type: 'networking',
                    speaker: '',
                    description: 'Networking final e despedidas'
                }
           ]
        }
    };




















// 'use client';

// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion";

// export default function Home() {
//   return (
//     <>
//       <title>Eventos MISAU</title>
//       <meta name="description" content="Evento oficial do Ministério da Saúde: Countdown to 2030 - 2025 Country Annual Meeting" />
//       <meta name="viewport" content="width=device-width, initial-scale=1" />

//       <main className="min-h-screen bg-gradient-to-b from-white to-green-50">
//         {/* Hero Section */}
//         <div className="flex flex-col items-center justify-center text-center px-4 py-20 pt-32">
//           <motion.div
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="mb-6"
//           >
//             <Image
//               src="/Emblem_of_Mozambique.svg"
//               alt="Logo do Evento"
//               width={110}
//               height={120}
//             />
//           </motion.div>
//           {/* <motion.h1
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-700 leading-tight"
//           >
//             REPÚBLICA DE MOÇAMBIQUE <br/>
//             MINISTÉRIO DA SAÚDE<br/>
//             DIRECÇÃO NACIONAL DE PLANIFICAÇÃO E COOPERAÇÃO<br/>   
//             XLIX Conselho Coordenador de Saúde<br/>
//             8  - 10  de Maio de 2024<br/>
//           </motion.h1> */}
//           <motion.h1
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-green-700 leading-tight"
//           >
//             REPÚBLICA DE MOÇAMBIQUE
//           </motion.h1>

//           <motion.h1
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl sm:text-5xl lg:text-4xl font-extrabold text-green-700 leading-tight"
//           >
//             DIRECÇÃO NACIONAL DE PLANIFICAÇÃO E COOPERAÇÃO<br/>   
//           </motion.h1>

//           <motion.h2
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl sm:text-5xl lg:text-4xl font-extrabold text-green-700 leading-tight"
//           > 
//             XLIX Conselho Coordenador de Saúde<br/>
//             8  - 10  de Maio de 2024<br/>
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//             className="mt-4 text-lg md:text-xl max-w-3xl text-gray-700 font-bold"
//           >
//            Lema: Por um Serviço Nacional de Saúde de Qualidade e Humanizado para Todos  
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 1 }}
//             className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
//           >
//             <Link
//               href="/agenda"
//               className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
//             >
//               Ver Agenda
//             </Link>
//             <Link
//               href="/comentarios"
//               className="bg-white border border-green-600 text-green-700 hover:bg-green-50 px-6 py-3 rounded-full transition"
//             >
//               Ver Comentários
//             </Link>
//           </motion.div>
//         </div>

//         {/* Banner informativo */}
//         {/* <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-6">
//           <div className="container mx-auto px-4 text-center">
//             <p className="text-base sm:text-lg font-medium flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
//               <span className="flex items-center gap-2">📍 Nairobi, Quénia</span>
//               <span className="flex items-center gap-2">🗓 16–20 de Junho de 2025</span>
//               <span className="flex items-center gap-2">👥 +500 Participantes</span>
//             </p>
//           </div>
//         </div> */}

//         {/* Sobre o evento com imagem */}
//         <section className="py-16 px-4 bg-white">
//           <div className="container mx-auto max-w-6xl">
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//                 viewport={{ once: true }}
//                 className="text-center lg:text-left"
//               >
//                 <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-6">Sobre o Evento</h2>
//                 <p className="text-gray-700 text-lg mb-6 leading-relaxed">
//                   Reunindo decisores e especialistas para debater os desafios da saúde digital e a prontidão do 
//                   setor diante de eventos climáticos extremos. O encontro visa alinhar prioridades estratégicas 
//                   e fortalecer o sistema nacional de saúde rumo ao PESS 2025-2034.
//                 </p>
//                 {/* <div className="flex flex-col sm:flex-row gap-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-3 h-3 bg-green-600 rounded-full"></div>
//                     <span className="text-gray-600">Saúde Materna e Infantil</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-3 h-3 bg-green-600 rounded-full"></div>
//                     <span className="text-gray-600">Nutrição e Adolescentes</span>
//                   </div>
//                 </div> */}
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, x: 50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//                 viewport={{ once: true }}
//                 className="relative"
//               >
//                 <div className="">
//                   <Image
//                     src="/MISAU.jpg"
//                     alt="Profissionais de saúde em reunião"
//                     width={500}
//                     height={350}
//                     className="rounded-xl shadow-lg w-full h-auto" 
//                     // bg-gradient-to-br rounded-2xl p-8 shadow-xl
//                   />
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Objetivos do MISAU */}
//         <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-white">
//           <div className="container mx-auto max-w-6xl text-center">
//             <motion.h2
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="text-3xl sm:text-4xl font-bold text-green-700 mb-12"
//             >
//               Objetivos Estratégicos
//             </motion.h2>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[
//                 {
//                   icon: "",
//                   title: "Fortalecimento do SNS",
//                   description: "Melhorar a qualidade e cobertura dos serviços de saúde em todo o território nacional."
//                 },
//                 {
//                   icon: "",
//                   title: "Saúde Materno-Infantil",
//                   description: "Reduzir a mortalidade materna, neonatal e infantil através de intervenções baseadas em evidências."
//                 },
//                 {
//                   icon: "",
//                   title: "Nutrição e Alimentação",
//                   description: "Combater a desnutrição e promover hábitos alimentares saudáveis em todas as faixas etárias."
//                 },
//                 {
//                   icon: "",
//                   title: "Sistemas de Informação",
//                   description: "Fortalecer os sistemas de informação em saúde para tomada de decisões baseada em dados."
//                 },
//                 {
//                   icon: "",
//                   title: "Agenda 2030",
//                   description: "Alinhar as ações nacionais com os Objetivos de Desenvolvimento Sustentável em saúde."
//                 },
//                 {
//                   icon: "",
//                   title: "Parcerias Estratégicas",
//                   description: "Fortalecer a colaboração com parceiros nacionais e internacionais no sector da saúde."
//                 }
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//                 >
//                   <div className="text-4xl mb-4">{item.icon}</div>
//                   <h3 className="text-xl font-semibold text-green-700 mb-3">{item.title}</h3>
//                   <p className="text-gray-600 leading-relaxed">{item.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Dados e Estatísticas */}
//         <section className="py-16 px-4 bg-green-700 text-white">
//           <div className="container mx-auto max-w-6xl text-center">
//             <motion.h2
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="text-3xl sm:text-4xl font-bold mb-12"
//             >
//               Impacto do MISAU
//             </motion.h2>

//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//               {[
//                 { number: "1.856+", label: "Unidades Sanitárias", icon: "" },
//                 { number: "32,4M+", label: "População Coberta", icon: "" },
//                 { number: "11", label: "Províncias Atendidas", icon: "" },
//                 { number: "2034", label: "Meta do PESOE", icon: "" }
//               ].map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.8, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
//                 >
//                   <div className="text-3xl mb-2">{stat.icon}</div>
//                   <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.number}</div>
//                   <div className="text-green-100">{stat.label}</div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white text-center">
//           <div className="container mx-auto max-w-4xl">
//             <motion.h2
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="text-3xl sm:text-4xl font-bold mb-6"
//             >
//               Junte-se ao Movimento
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="text-xl mb-8 text-green-100"
//             >
//               Seja parte da transformação da saúde em Moçambique. Acompanhe as discussões e contribua para um futuro mais saudável.
//             </motion.p>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               viewport={{ once: true }}
//               className="flex flex-col sm:flex-row gap-4 justify-center"
//             >
//               <Link
//                 href="/agenda"
//                 className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
//               >
//                 Consultar Programa
//               </Link>
//               <Link
//                 href="/contacto"
//                 className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
//               >
//                 Contactar Organização
//               </Link>
//             </motion.div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }
















// 'use client';

// import Link from "next/link";
// import { motion } from "framer-motion";

// export default function Home() {
//   return (
//     <>
//       <title>Eventos MS</title>
//       <meta name="description" content="Evento oficial do Ministério da Saúde: Countdown to 2030 - 2025 Country Annual Meeting" />
//       <meta name="viewport" content="width=device-width, initial-scale=1" />

//       <main className="min-h-screen bg-gradient-to-b from-white to-green-100 text-gray-800">
//         {/* Hero Section */}
//         <div className="flex flex-col items-center justify-center text-center px-4 py-20">
//           <motion.h1
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-5xl md:text-6xl font-extrabold text-green-700"
//           >
//             Evento MISAU 2025
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//             className="mt-4 text-lg md:text-xl max-w-2xl text-gray-700"
//           >
//             2025 Country Annual Meeting · Ministério da Saúde
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 1 }}
//             className="mt-6 flex flex-wrap gap-4 justify-center"
//           >
//             <Link
//               href="/agenda"
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition"
//             >
//               Ver Agenda
//             </Link>
            // <Link
            //   href="/comentarios"
            //   className="bg-white border border-green-600 text-green-700 hover:bg-green-50 px-6 py-3 rounded-full transition"
            // >
            //   Ver Comentários
            // </Link>
//           </motion.div>
//         </div>

//         {/* Banner informativo */}
//         {/* <div className="bg-green-600 text-white py-4 text-center">
//           <p className="text-lg font-medium">📍 Nairobi, Quénia · 🗓 16–20 de Junho de 2025</p>
//         </div> */}

//         {/* Sobre o evento */}
//         <section className="py-16 px-6 bg-white text-center">
//           <h2 className="text-3xl font-bold text-green-700 mb-4">Sobre o Evento</h2>
//           <p className="max-w-3xl mx-auto text-gray-700 text-lg">
//             Produzindo estatísticas nacionais e subnacionais confiáveis sobre saúde materna, neonatal, infantil e adolescente, com foco também em nutrição. 
//             Um encontro para alinhar ações e compromissos rumo à Agenda 2030.
//           </p>
//         </section>
//       </main>
//     </>
//   );
// }







































// 'use client';

// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { MapPin, Calendar, Users, Sparkles } from "lucide-react";

// export default function Home() {
//   return (
//     <>
//       <title>Eventos MISAU</title>
//       <meta
//         name="description"
//         content="XIII Conselho Hospitalar & L Conselho Coordenador de Saúde – MISAU Moçambique"
//       />
//       <meta name="viewport" content="width=device-width, initial-scale=1" />

//       <main className="min-h-screen bg-gradient-to-b from-white via-green-25 to-green-50">
//         {/* Hero Section */}
//         <div className="relative flex flex-col items-center justify-center text-center px-4 py-20 pt-32 overflow-hidden">
//           {/* Decorative elements */}
//           <div className="absolute inset-0 opacity-5">
//             <div className="absolute top-20 left-10 w-32 h-32 bg-green-600 rounded-full blur-3xl"></div>
//             <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-400 rounded-full blur-3xl"></div>
//             <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-500 rounded-full blur-2xl"></div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: -30, scale: 0.8 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="mb-6 relative"
//           >
//             <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-30 animate-pulse"></div>
//             <Image
//               src="/Emblem_of_Mozambique.svg"
//               alt="Logo do Evento"
//               width={110}
//               height={120}
//               className="relative z-10"
//             />
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-green-700 leading-tight"
//           >
//             REPÚBLICA DE MOÇAMBIQUE
//           </motion.h1>

//           <motion.h1
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.1 }}
//             className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-green-700 leading-tight mt-2"
//           >
//             MINISTÉRIO DA SAÚDE
//           </motion.h1>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="mt-6 mb-4 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 shadow-2xl border border-green-200"
//           >
//             <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
//               XIII Conselho Hospitalar & L Conselho Coordenador de Saúde (CCS)
//             </h2>
//             <div className="flex items-center justify-center mt-3 gap-2">
//               <Sparkles className="w-5 h-5 text-yellow-300" />
//               <span className="text-base sm:text-xl font-bold text-yellow-100">
//                 10 a 13 de Setembro de 2025
//               </span>
//               <Sparkles className="w-5 h-5 text-yellow-300" />
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//             className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100 shadow-lg"
//           >
//             <p className="text-sm sm:text-lg md:text-xl max-w-3xl text-gray-700 font-bold">
//               Lema: Por um Serviço Nacional de Saúde de Qualidade e Humanizado para Todos
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 1 }}
//             className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
//           >
//             <Link
//               href="/agenda"
//               className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
//             >
//               Ver Agenda
//             </Link>
//             <Link
//               href="/comentarios"
//               className="bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold"
//             >
//               Ver Comentários
//             </Link>
//           </motion.div>

//           {/* Floating stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8, duration: 0.8 }}
//             className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl"
//           >
//             <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-green-100 shadow-md">
//               <div className="flex items-center justify-center gap-2 text-green-700">
//                 <Calendar className="w-4 h-4" />
//                 <span className="text-xs sm:text-sm font-semibold">4 Dias de Evento</span>
//               </div>
//             </div>
//             <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-green-100 shadow-md">
//               <div className="flex items-center justify-center gap-2 text-green-700">
//                 <Users className="w-4 h-4" />
//                 <span className="text-xs sm:text-sm font-semibold">+160 Participantes</span>
//               </div>
//             </div>
//             <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-green-100 shadow-md">
//               <div className="flex items-center justify-center gap-2 text-green-700">
//                 <MapPin className="w-4 h-4" />
//                 <span className="text-xs sm:text-sm font-semibold">Maputo, ICS</span>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Banner informativo */}
//         <div className="bg-gradient-to-r from-green-700 to-green-700 text-white py-9">
//           <div className="container mx-auto px-4 text-center">
//             <p className="text-base sm:text-lg font-medium flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">

//               {/* Data */}
//               <span className="flex items-center gap-2">
//                 <Calendar className="w-5 h-5" />
//                 10 - 13 de Setembro de 2025
//               </span>

//               {/* Local */}
//               <span className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5" />
//                 Cidade de Maputo - Instituto de Ciências de Saúde do Infulene
//               </span>

//               {/* Participantes */}
//               <span className="flex items-center gap-2">
//                 <Users className="w-5 h-5" />
//                 +160 Participantes
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* Sobre o evento */}
//         <section className="py-16 px-4 bg-white">
//           <div className="container mx-auto max-w-6xl">
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//                 viewport={{ once: true }}
//                 className="text-center lg:text-left"
//               >
//                 <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-6">
//                   Sobre o Evento
//                 </h2>
//                 <p className="text-gray-700 text-lg mb-6 leading-relaxed">
//                   O Ministério da Saúde (MISAU) realiza dois eventos estratégicos: o Conselho Hospitalar,
//                   que avalia normas, protocolos clínicos e desempenho hospitalar,
//                   e o Conselho Coordenador de Saúde, que articula órgãos centrais e locais,
//                   analisando planos e estratégias para melhorar o Sistema Nacional de Saúde no âmbito
//                   do Programa Quinquenal do Governo e da Estratégia Sectorial 2025 - 2034.
//                 </p>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, x: 50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//                 viewport={{ once: true }}
//                 className="relative"
//               >
//                 <Image
//                   src="/MISAU.jpg"
//                   alt="Profissionais de saúde em reunião"
//                   width={500}
//                   height={350}
//                   className="rounded-xl shadow-lg w-full h-auto"
//                 />
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Objetivos */}
//         <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-white">
//           <div className="container mx-auto max-w-6xl text-center">
//             <motion.h2
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="text-3xl sm:text-4xl font-bold text-green-700 mb-12"
//             >
//               Objetivos do Encontro
//             </motion.h2>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[
//                 {
//                   title: "Desempenho do Sector",
//                   description: "Analisar o desempenho e desafios do sector de saúde."
//                 },
//                 {
//                   title: "Gestão Hospitalar",
//                   description: "Avaliar a gestão e o desempenho dos hospitais."
//                 },
//                 {
//                   title: "Instrumentos Orientadores",
//                   description: "Partilhar ENDE, PQG, PESS e PESOE."
//                 },
//                 {
//                   title: "Prioridades 2026",
//                   description: "Aprovar as prioridades e linhas estratégicas do PESOE 2026."
//                 },
//                 {
//                   title: "Harmonização",
//                   description: "Harmonizar intervenções para garantir eficiência e sustentabilidade."
//                 },
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//                 >
//                   <h3 className="text-xl font-semibold text-green-700 mb-3">{item.title}</h3>
//                   <p className="text-gray-600 leading-relaxed">{item.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="py-16 px-4 bg-gradient-to-r from-green-700 to-green-700 text-white text-center">
//           <div className="container mx-auto max-w-4xl">
//             <motion.h2
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="text-3xl sm:text-4xl font-bold mb-6"
//             >
//               Junte-se ao Movimento
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="text-xl mb-8 text-green-100"
//             >
//               Participe no XIII Conselho Hospitalar & L Conselho Coordenador de Saúde
//               e contribua para um Sistema Nacional de Saúde mais forte e humanizado.
//             </motion.p>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               viewport={{ once: true }}
//               className="flex flex-col sm:flex-row gap-4 justify-center"
//             >
//               <Link
//                 href="/agenda"
//                 className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
//               >
//                 Consultar Programa
//               </Link>
//               <Link
//                 href="/contacto"
//                 className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
//               >
//                 Contactar Organização
//               </Link>
//             </motion.div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }




//******************************************************************************************************************


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












//************************************************AGENDA *********************************/




// 'use client';
// import { motion } from 'framer-motion';
// import { Mic } from 'lucide';
// import Link from 'next/link';
// import { useState } from 'react';

// interface Session {
//     time: string;
//     title: string;
//     type: string;
//     speaker: string;
//     description: string;
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
//         dia1: {
//             date: '10 de Setembro de 2025',
//             theme: 'Sessões do XIII Conselho Hospitalar',
//             sessions: [
//                 { time: '08:00 - 08:40h', title: 'Registo dos participantes/entrada para sala de reuniões', type: 'Entrada', speaker: 'Protocolo', description: '' },
//                 { time: '08:40', title: 'Chegada do Excelentíssimo Presidente do Município da Cidade de Maputo', type: 'Protocolo', speaker: 'Protocolo', description: '' },
//                 { time: '08:45', title: 'Chegada de S. Excia Secretário de Estado da Cidade de Maputo', type: 'Protocolo', speaker: 'Protocolo', description: '' },
//                 { time: '08:50', title: 'Chegada de S. Excia Ministro da Saúde', type: 'Protocolo', speaker: 'Protocolo', description: '' },
//                 { time: '08:55', title: 'Entrada do Presidium', type: 'Protocolo', speaker: 'Protocolo', description: '' },
//                 { time: '09:05', title: 'Hino Nacional', type: 'Protocolo', speaker: 'Protocolo', description: '' },
//                 { time: '09:05 - 09:15', title: 'Intervenção do Excelentíssimo Presidente do Município da Cidade de Maputo', type: 'Discurso', speaker: 'Presidente do Município', description: '' },
//                 { time: '09:15 - 09:25', title: 'Intervenção do Parceiro de 1º Contacto', type: 'Discurso', speaker: 'Parceiro de 1º Contacto', description: '' },
//                 { time: '09:25 - 09:35', title: 'Momento Cultural', type: 'Cultural', speaker: 'Grupo Cultural', description: '' },
//                 { time: '09:35 - 09:45', title: 'Intervenção de S. Excia Secretário de Estado da Província de Inhambane', type: 'Discurso', speaker: 'Secretário de Estado', description: '' },
//                 { time: '09:45 - 10:00', title: 'Discurso de Abertura por S. Excia Ministro da Saúde', type: 'Discurso', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '10:00 - 10:30', title: 'Pausa para a foto de Família e café', type: 'Intervalo', speaker: '', description: '' },
//                 { time: '10:30 - 10:35', title: 'Adopção da Agenda e do Programa', type: 'Sessão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '10:35 - 10:40', title: 'Objectivos da reunião', type: 'Sessão', speaker: 'DNAM', description: '' },
//                 { time: '10:40 - 11:40', title: 'Ponto de situação dos indicadores de desempenho hospitalar 2023 e 2024', type: 'Apresentação', speaker: 'DNAM', description: '' },
//                 { time: '11:40 - 12:40', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '12:40 - 13:40', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
//                 { time: '13:40 - 14:10', title: 'PCI (Situação actual, desafios e próximos passos)', type: 'Apresentação', speaker: 'DNAM', description: '' },
//                 { time: '14:10 - 14:40', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '14:40 - 15:00', title: 'Abordagem 5S (situação actual, desafios e próximos passos)', type: 'Apresentação', speaker: 'DNAM', description: '' },
//                 { time: '15:00 - 16:00', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '16:05h', title: 'Fim dos trabalhos do 1º dia', type: 'Encerramento', speaker: '', description: '' }
//             ]
//         },
//         dia2: {
//             date: '11 de Setembro - Quinta-feira',
//             theme: 'Sessões do XIII Conselho Hospitalar',
//             sessions: [
//                 { time: '08:30 - 09:00', title: 'Leitura e aprovação da Síntese do 1º dia', type: 'Leitura', speaker: 'Secretariado', description: '' },
//                 { time: '09:00 - 09:30', title: 'Ponto de situação dos especialistas', type: 'Apresentação', speaker: 'DNAM', description: 'situação actual,  desafios e próximos passos; apresentação conjuta entre DNAM, DNFPS  e DRH' },
//                 { time: '09:30 - 10:00', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '10:00 - 10:20', title: 'Incluir Tema', type: 'Outro', speaker: '', description: '' },
//                 { time: '10:20 - 10:35', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '10:35 - 10:50', title: 'Pausa para o café', type: 'Intervalo', speaker: '', description: '' },
//                 { time: '11:05 - 11:20', title: 'Apetrechamento dos hospitais versus utilização e manutenção dos equipamentos', type: 'Apresentação', speaker: 'DNAM', description: '' },
//                 { time: '11:20 - 11:35', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '11:35 - 11:50', title: 'Incluir Tema', type: 'Outro', speaker: '', description: '' },
//                 { time: '11:50 - 12:05', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '13:05 - 14:05', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
//                 { time: '14:05 - 14:25', title: 'Fontes alternativas ao Financiamento dos Hospitais', type: 'Apresentação', speaker: 'DNAM', description: '' },
//                 { time: '14:25 - 14:55', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '14:55 - 15:25', title: 'Incluir Tema', type: 'Outro', speaker: '', description: '' },
//                 { time: '15:25 - 16:00', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '16:00 - 16:30', title: 'Apresentação do Comunicado final', type: 'Leitura', speaker: 'Secretariado', description: '' },
//                 { time: '16:35h', title: 'Fim dos trabalhos do 2º dia', type: 'Encerramento', speaker: '', description: '' }
//             ]
//         },
//         dia3: {
//             date: '12 de Setembro  - Sexta-feira',
//             theme: 'Sessões do XIII Conselho Hospitalar',
//             sessions: [
//                 { time: '08:30 - 09:00h', title: 'Adopção da Agenda e do Programa', type: 'Sessão', speaker: 'DPC', description: '' },
//                 { time: '09:00 - 09:30h', title: 'Objectivos da reunião', type: 'Sessão', speaker: 'DPC', description: '' },
//                 { time: '09:30 - 10:00h', title: 'Matriz das Recomendações do CCS do XL', type: 'Sessão', speaker: 'DPC', description: '' },
//                 { time: '10:00 - 10:20h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '10:20 - 10:35h', title: 'Balanço do desempenho do sector 2024 e Primeiro semestre 2025', type: 'Balanço', speaker: 'Área de Saúde Pública', description: '' },
//                 { time: '10:35 - 10:50h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '10:50 - 11:05h', title: 'Pausa para a foto em família e café', type: 'Intervalo', speaker: '', description: '' },
//                 { time: '11:05 - 11:20h', title: 'Balanço do desempenho do sector 2024 e Primeiro semestre 2025', type: 'Balanço', speaker: 'Área de apoio', description: '' },
//                 { time: '11:20 - 11:35h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '11:35 - 11:50h', title: 'Incluir Tema', type: 'Outro', speaker: '', description: '' },
//                 { time: '11:50 - 12:05h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '13:05 - 14:05h', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
//                 { time: '14:05 - 15:05h', title: 'Socialização dos instrumentos orientadores do sector (ENDE, PQG, PESS, PESOE, EFSS)', type: 'Sessão', speaker: 'DPC', description: '' },
//                 { time: '15:05 - 16:05h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '16:05h', title: 'Fim dos trabalhos', type: 'Encerramento', speaker: '', description: '' }
//             ]
//         },
//         dia4: {
//             date: '13 de Setembro - Sábado',
//             theme: 'Sessões do XIII Conselho Hospitalar',
//             sessions: [
//                 { time: '08:30 - 09:00h', title: 'Leitura e aprovação da Síntese do 1º dia', type: 'Leitura', speaker: 'Secretariado', description: '' },
//                 { time: '09:00 - 09:30h', title: 'Proposta do PESOE 2026: Prioridades e Linhas estratégicas', type: 'Sessão', speaker: 'DPC', description: '' },
//                 { time: '09:30 - 10:00h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '10:00 - 10:20h', title: 'Partilha das inovações da Lei do Sistema Nacional de Saúde', type: 'Apresentação', speaker: 'URESS', description: '' },
//                 { time: '10:20 - 10:35h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '10:35 - 10:55h', title: 'Pausa para o café', type: 'Intervalo', speaker: '', description: '' },
//                 { time: '10:55 - 11:15h', title: 'Partilha de boas práticas nas províncias', type: 'Apresentação', speaker: 'Províncias', description: '' },
//                 { time: '11:15 - 11:30h', title: 'RH/DAF/DNSP', type: 'Apresentação', speaker: 'RH/DAF/DNSP', description: '' },
//                 { time: '11:30 - 11:45h', title: 'Discussão', type: 'Discussão', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '11:45 - 12:00h', title: 'CMAM/ANARME/IGS/INS', type: 'Apresentação', speaker: 'CMAM/ANARME/IGS/INS', description: '' },
//                 { time: '12:15 - 12:30h', title: 'Discussão', type: 'Discussão', speaker: '', description: '' },
//                 { time: '12:30 - 13:30h', title: 'Pausa para o almoço', type: 'Intervalo', speaker: '', description: '' },
//                 { time: '13:30 - 13:40h', title: 'Momento cultural', type: 'Cultural', speaker: 'Grupo Cultural', description: '' },
//                 { time: '13:40 - 14:00h', title: 'Leitura do Comunicado final', type: 'Leitura', speaker: 'Secretariado', description: '' },
//                 { time: '14:00 - 14:15h', title: 'Discurso de encerramento', type: 'Discurso', speaker: 'S. Excia o Ministro', description: '' },
//                 { time: '14:30h', title: 'Fim do evento', type: 'Encerramento', speaker: '', description: '' }
//             ]
//         }
//     };

//     const getSessionIcon = (type: string): string => {
//         const icons = {
//             keynote: '',
//             panel: '',
//             workshop: '',
//             seminar: '',
//             Apresentação: '',
//             ceremony: '',
//             networking: '',
//             Intervalo: '',
//             conference: '',
//             Encerramento: '',
//             workgroup: '',
//             Entrada: ''

//             // keynote: '🎯',
//             // panel: '💬',
//             // workshop: '🛠️',
//             // seminar: '📚',
//             // presentation: '📊',
//             // ceremony: '🎭',
//             // networking: '🤝',
//             // break: '☕',
//             // conference: '🎤',
//             // roundtable: '⭕',
//             // workgroup: '👥'
//         };
//         //return icons[type as keyof typeof icons] || '📋';
//         return icons[type as keyof typeof icons] || '';

//     };

//     const getSessionColor = (type: string): string => {
//         const colors: Record<string, string> = {
//             keynote: 'bg-purple-100 border-purple-300 text-purple-800',
//             panel: 'bg-blue-100 border-blue-300 text-blue-800',
//             workshop: 'bg-green-100 border-green-300 text-green-800',
//             seminar: 'bg-orange-100 border-orange-300 text-orange-800',
//             Apresentação: 'bg-gray-100 border-gray-300 text-gray-800',
//             ceremony: 'bg-red-100 border-red-300 text-red-800',
//             networking: 'bg-yellow-100 border-yellow-300 text-yellow-800',
//             Intervalo: 'bg-gray-100 border-cyan-300 text-cyan-600',
//             conference: 'bg-pink-100 border-pink-300 text-pink-800',
//             Encerramento: 'bg-gray-100 border-red-300 text-red-600',
//             workgroup: 'bg-cyan-100 border-cyan-300 text-cyan-800',
//             // Entrada: 'bg-teal-100 border-teal-300 text-teal-800' 
//             Entrada: 'bg-gray-100 border-gray-300 text-gray-800'
//         };
//         return colors[type] || 'bg-gray-100 border-gray-300 text-gray-800';
//     };

//     return (
//         <>
//             <title>Agenda - Eventos MS</title>
//             <meta name="description" content="Agenda completa do Evento MISAU 2025 - Conselho Coordenador de Saúde" />
//             <meta name="viewport" content="width=device-width, initial-scale=1" />

//             <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
//                 {/* Hero Section */}
//                 <div className="pt-24 pb-16 px-4 bg-gradient-to-r text-green-700">
//                     <div className="container mx-auto text-center">
//                         <motion.h1
//                             initial={{ opacity: 0, y: -50 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8 }}
//                             className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4"
//                         >
//                             Agenda do Evento
//                         </motion.h1>

//                         <motion.p
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.2, duration: 0.8 }}
//                             className="text-xl sm:text-2xl mb-2 text-gray-700"
//                         >
//                             Ministério da Saúde - 2025
//                         </motion.p>

//                         <motion.p
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.4, duration: 0.8 }}
//                             className="text-lg text-green-800"
//                         >
//                             10 a 13 de Setembro de 2025 • Maputo, Moçambique
//                         </motion.p>
//                     </div>
//                 </div>

//                 {/* Navegação por Dias */}
//                 <div className="container mx-auto px-4 py-8">
//                     <div className="flex flex-wrap justify-center gap-2 mb-8">
//                         {Object.keys(agendaData).map((day, index) => (
//                             <button
//                                 key={day}
//                                 onClick={() => setSelectedDay(day)}
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedDay === day
//                                         ? 'bg-green-600 text-white shadow-lg transform scale-105'
//                                         : 'bg-white text-green-600 border border-green-600 hover:bg-green-50'
//                                     }`}
//                             >
//                                 Dia {index + 1}
//                             </button>
//                         ))}
//                     </div>

//                     {/* Conteúdo da Agenda */}
//                     <motion.div
//                         key={selectedDay}
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5 }}
//                         className="max-w-4xl mx-auto"
//                     >
//                         {/* Cabeçalho do Dia  border-l-4 border-green-500*/}
//                         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//                             <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">
//                                 {agendaData[selectedDay].date}
//                             </h2>
//                             <p className="text-lg text-gray-600 font-medium">
//                                 Tema: {agendaData[selectedDay].theme}
//                             </p>
//                         </div>

//                         {/* Lista de Sessões */}
//                         <div className="space-y-4">
//                             {agendaData[selectedDay].sessions.map((session, index) => (
//                                 <motion.div
//                                     key={index}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                                     className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
//                                 // className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-l-4 ${
//                                 //     session.type === 'break' 
//                                 //         ? 'border-gray-300 opacity-75' 
//                                 //         : 'border-green-500 hover:transform hover:scale-[1.02]'
//                                 // }`}
//                                 >
//                                     <div className="p-6">
//                                         <div className="flex flex-col sm:flex-row sm:items-start gap-4">
//                                             {/* Horário */}
//                                             <div className="flex-shrink-0">
//                                                 <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg font-bold text-sm">
//                                                     {session.time}
//                                                 </div>
//                                             </div>

//                                             {/* Conteúdo da Sessão */}
//                                             <div className="flex-grow">
//                                                 <div className="flex items-start gap-3 mb-3">
//                                                     <span className="text-2xl">{getSessionIcon(session.type)}</span>
//                                                     <div>
//                                                         <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
//                                                             {session.title}
//                                                         </h3>
//                                                         {session.speaker && (
//                                                             <p className="text-green-600 font-medium mb-2">
//                                                                 {/* 👤 {session.speaker} */}
//                                                                 🎤 {session.speaker}
//                                                             </p>
//                                                         )}
//                                                         {session.description && (
//                                                             <p className="text-gray-600">
//                                                                 {session.description}
//                                                             </p>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Tag do Tipo */}
//                                             <div className="flex-shrink-0">
//                                                 <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getSessionColor(session.type)}`}>
//                                                     {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </motion.div>
//                 </div>

//                 {/* Call to Action */}
//                 <div className="bg-gradient-to-r from-green-700 to-green-700 text-white py-16 px-4 mt-16">
//                     <div className="container mx-auto text-center max-w-4xl">
//                         <motion.h2
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8 }}
//                             viewport={{ once: true }}
//                             className="text-3xl sm:text-4xl font-bold mb-6"
//                         >
//                             Precisa de Mais Informações?
//                         </motion.h2>
//                         <motion.p
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8, delay: 0.2 }}
//                             viewport={{ once: true }}
//                             className="text-xl mb-8 text-green-100"
//                         >
//                             Para mais detalhes sobre o evento, palestrantes ou para esclarecimentos adicionais, entre em contato connosco.
//                         </motion.p>
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8, delay: 0.4 }}
//                             viewport={{ once: true }}
//                         >
//                             <Link
//                                 href="/contacto"
//                                 className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
//                             >
//                                 Entrar em Contato
//                             </Link>
//                         </motion.div>
//                     </div>
//                 </div>
//             </main>
//         </>
//     );
// }

// export default Agenda;










