"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users } from "lucide-react";

export default function Home() {
  return (
    <>
      <title>Eventos MISAU</title>
      <meta
        name="description"
        content="XVIII Reunião Nacional de Planificação (RNP) – MISAU Moçambique"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center px-4 py-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Image
              src="Emblem_of_Mozambique.svg"
              alt="Logo do Evento"
              width={80}
              height={90}
              className="sm:w-[110px] sm:h-[120px] w-[80px] h-[90px]"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-2xl lg:text-2xl font-extrabold text-blue-700 leading-tight"
          >
            República de Moçambique
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-4xl lg:text-3xl font-extrabold text-blue-700 leading-tight"
          >
            Ministério da Saúde
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-3xl mt-4 lg:text-4xl font-extrabold text-blue-700 leading-tight"
          >
            XVIII REUNIÃO NACIONAL DE PLANIFICAÇÃO (RNP)
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-1xl lg:text-2xl mt-4 font-extrabold text-blue-700 leading-tight"
          >
            Macaneta, Marracuene - 24 a 28 de Novembro de 2025
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-sm sm:text-base md:text-lg max-w-3xl text-gray-700 font-bold text-centerd"
          >
            Lema:
            <i>
              {" "}
              Um Plano Único, Um Orçamento Único e Uma Monitoria e Avaliação
              Única
            </i>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* <Link
              href="/agenda"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver Agenda
            </Link> */}
            <Link
              href="/programa"
              className="bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-full transition"
            >
              Agenda e apresentações
            </Link>
            {/* <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLScp4lP7ToBXEzY1yAayCr4Vt2lUe1A1OEy1KEN2KnlWOlPSRA/viewform?usp=dialog"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Avaliar o Evento
            </Link> */}
          </motion.div>
        </div>

        {/* Banner informativo */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-base sm:text-lg font-medium flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              {/* Data */}
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                24 - 28 Novembro de 2025
              </span>

              {/* Local */}
              <a
                href="https://maps.google.com/maps?q=Macaneta,+Marracuene,+Maputo,+Moçambique"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-200 cursor-pointer"
              >
                <MapPin className="w-5 h-5" />
                Macaneta, Marracuene - Província de Maputo
              </a>

              {/* Participantes */}
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Participantes do Sector Saúde
              </span>
            </p>
          </div>
        </div>

        {/* Sobre o evento */}
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
                <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6">
                  Sobre o Evento
                </h2>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed text-justify">
                  O Ministério da Saúde (MISAU), através da Direcção de
                  Planificação e Cooperação (DPC), realiza a XVIII Reunião
                  Nacional de Planificação (RNP), visando discutir, harmonizar e
                  encontrar consensos sobre os principais desafios do Sector nas
                  áreas de Planificação. Este evento antecede o Conselho
                  Coordenador da Saúde, órgão competente para a tomada de
                  decisão sobre os temas discutidos. Estando o sector no
                  primeiro ano de implementação do Programa Quinquenal do
                  Governo (PQG) 2025-2029, torna-se crucial garantir o
                  alinhamento das intervenções do sector e a unicidade do
                  Serviço Nacional de Saúde.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Image
                  src="isc.svg"
                  alt="Profissionais de saúde em reunião de planificação"
                  width={500}
                  height={350}
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Objetivos */}
        <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto max-w-6xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-blue-700 mb-12"
            >
              Objectivos da Reunião
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Harmonização de Prioridades",
                  description:
                    "Harmonizar as prioridades, acções estratégicas, metas e indicadores do sector.",
                },
                {
                  title: "Instrumentos Orientadores",
                  description:
                    "Socializar os principais instrumentos orientadores (ENDE, PQG, PESS, PESOE 2026).",
                },
                {
                  title: "Alinhamento Estratégico",
                  description:
                    "Orientar o alinhamento das prioridades e acções estratégicas do sector 2026.",
                },
                {
                  title: "Priorização de Actividades",
                  description:
                    "Obter consensos técnicos sobre a priorização face à escassez de recursos para 2026.",
                },
                {
                  title: "Financiamento do Sector",
                  description:
                    "Partilhar acções para aumentar o financiamento do sector de saúde.",
                },
                {
                  title: "Infraestruturas",
                  description:
                    "Partilhar o ponto de situação das infraestruturas do sector.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Resultados Esperados */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-blue-700 mb-12 text-center"
            >
              Resultados Esperados
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Socializados os principais instrumentos orientadores (ENDE, PESS, PESOE 2026)",
                "Alinhadas as prioridades e acções estratégicas do sector 2026, nos níveis distrital, provincial e central",
                "Obtidos consensos técnicos sobre a priorização de actividades face a escassez de recursos",
                "Partilhados os resultados do CFMP 2026-2028 Nacional",
                "Partilhada a avaliação da redução da ajuda externa e do seu impacto na provisão dos serviços de saúde",
                "Partilhadas as acções estratégicas para aumentar o financiamento do sector de saúde",
                "Partilhado o ponto de situação das infraestruturas do sector",
                "Partilhadas as prioridades da Agenda Lusaka",
              ].map((resultado, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg"
                >
                  <p className="text-gray-700">{resultado}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Localização do Evento */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center mb-8">
                <div className="bg-blue-100 rounded-full p-4">
                  <MapPin className="w-12 h-12 text-blue-600" />
                </div>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-2xl font-black text-blue-700 mb-4"
              >
                Local do evento
              </motion.h2>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Macaneta, Marracuene
              </h3>
              <p className="text-xl text-gray-600 font-semibold mb-6">
                Província de Maputo, Moçambique
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <a
                  href="https://maps.google.com/maps?q=Macaneta,+Marracuene,+Maputo,+Moçambique"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <MapPin className="w-8 h-8" />
                  <span>Ver no Google Maps</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white text-center">
          <div className="container mx-auto max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-8 text-blue-100"
            >
              Um Plano Único, Um Orçamento Único e Uma Monitoria e Avaliação
              Única
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
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Consultar Programa
              </Link>
              <Link
                href="/contacto"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
