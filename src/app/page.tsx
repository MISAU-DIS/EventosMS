'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <title>Eventos MISAU</title>
      <meta name="description" content="Evento oficial do Ministério da Saúde: Countdown to 2030 - 2025 Country Annual Meeting" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <main className="min-h-screen bg-gradient-to-b from-white to-green-50">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center px-4 py-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Image
              src="/Emblem_of_Mozambique.svg"
              alt="Logo do Evento"
              width={110}
              height={120}
            />
          </motion.div>
          {/* <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-700 leading-tight"
          >
            REPÚBLICA DE MOÇAMBIQUE <br/>
            MINISTÉRIO DA SAÚDE<br/>
            DIRECÇÃO NACIONAL DE PLANIFICAÇÃO E COOPERAÇÃO<br/>   
            XLIX Conselho Coordenador de Saúde<br/>
            8  - 10  de Maio de 2024<br/>
          </motion.h1> */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-green-700 leading-tight"
          >
            REPÚBLICA DE MOÇAMBIQUE
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-4xl font-extrabold text-green-700 leading-tight"
          >
            DIRECÇÃO NACIONAL DE PLANIFICAÇÃO E COOPERAÇÃO<br/>   
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-4xl font-extrabold text-green-700 leading-tight"
          > 
            XLIX Conselho Coordenador de Saúde<br/>
            8  - 10  de Maio de 2024<br/>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-lg md:text-xl max-w-3xl text-gray-700 font-bold"
          >
           Lema: Por um Serviço Nacional de Saúde de Qualidade e Humanizado para Todos  
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/agenda"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver Agenda
            </Link>
            <Link
              href="/comentarios"
              className="bg-white border border-green-600 text-green-700 hover:bg-green-50 px-6 py-3 rounded-full transition"
            >
              Ver Comentários
            </Link>
          </motion.div>
        </div>

        {/* Banner informativo */}
        {/* <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-base sm:text-lg font-medium flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
              <span className="flex items-center gap-2">📍 Nairobi, Quénia</span>
              <span className="flex items-center gap-2">🗓 16–20 de Junho de 2025</span>
              <span className="flex items-center gap-2">👥 +500 Participantes</span>
            </p>
          </div>
        </div> */}

        {/* Sobre o evento com imagem */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-6">Sobre o Evento</h2>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  Reunindo decisores e especialistas para debater os desafios da saúde digital e a prontidão do 
                  setor diante de eventos climáticos extremos. O encontro visa alinhar prioridades estratégicas 
                  e fortalecer o sistema nacional de saúde rumo ao PESS 2025-2034.
                </p>
                {/* <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="text-gray-600">Saúde Materna e Infantil</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="text-gray-600">Nutrição e Adolescentes</span>
                  </div>
                </div> */}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="">
                  <Image
                    src="/MISAU.jpg"
                    alt="Profissionais de saúde em reunião"
                    width={500}
                    height={350}
                    className="rounded-xl shadow-lg w-full h-auto" 
                    // bg-gradient-to-br rounded-2xl p-8 shadow-xl
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Objetivos do MISAU */}
        <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto max-w-6xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-green-700 mb-12"
            >
              Objetivos Estratégicos
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "",
                  title: "Fortalecimento do SNS",
                  description: "Melhorar a qualidade e cobertura dos serviços de saúde em todo o território nacional."
                },
                {
                  icon: "",
                  title: "Saúde Materno-Infantil",
                  description: "Reduzir a mortalidade materna, neonatal e infantil através de intervenções baseadas em evidências."
                },
                {
                  icon: "",
                  title: "Nutrição e Alimentação",
                  description: "Combater a desnutrição e promover hábitos alimentares saudáveis em todas as faixas etárias."
                },
                {
                  icon: "",
                  title: "Sistemas de Informação",
                  description: "Fortalecer os sistemas de informação em saúde para tomada de decisões baseada em dados."
                },
                {
                  icon: "",
                  title: "Agenda 2030",
                  description: "Alinhar as ações nacionais com os Objetivos de Desenvolvimento Sustentável em saúde."
                },
                {
                  icon: "",
                  title: "Parcerias Estratégicas",
                  description: "Fortalecer a colaboração com parceiros nacionais e internacionais no sector da saúde."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-green-700 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dados e Estatísticas */}
        <section className="py-16 px-4 bg-green-700 text-white">
          <div className="container mx-auto max-w-6xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold mb-12"
            >
              Impacto do MISAU
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "1.856+", label: "Unidades Sanitárias", icon: "" },
                { number: "32,4M+", label: "População Coberta", icon: "" },
                { number: "11", label: "Províncias Atendidas", icon: "" },
                { number: "2034", label: "Meta do PESOE", icon: "" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-green-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white text-center">
          <div className="container mx-auto max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold mb-6"
            >
              Junte-se ao Movimento
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-8 text-green-100"
            >
              Seja parte da transformação da saúde em Moçambique. Acompanhe as discussões e contribua para um futuro mais saudável.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/agenda"
                className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Consultar Programa
              </Link>
              <Link
                href="/contacto"
                className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Contactar Organização
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
















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

