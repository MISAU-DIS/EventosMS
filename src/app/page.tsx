'use client';

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
        content="XIII Conselho Hospitalar & L Conselho Coordenador de Saúde – MISAU Moçambique"
      />
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
              width={80}
              height={90}
              className="sm:w-[110px] sm:h-[120px] w-[80px] h-[90px]" 
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-4xl lg:text-4xl font-extrabold text-green-700 leading-tight"
          >
            REPÚBLICA DE MOÇAMBIQUE
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-4xl lg:text-4xl font-extrabold text-green-700 leading-tight"
          >
            MINISTÉRIO DA SAÚDE
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-3xl lg:text-3xl font-extrabold text-green-700 leading-tight"
          >
            XIII Conselho Hospitalar <br />&<br /> L Conselho Coordenador de Saúde
            <br />
            08 - 11 Outubro de 2025
          </motion.h2>

            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-sm sm:text-base md:text-lg max-w-3xl text-gray-700 font-bold text-centerd"
            >
            Lema:<i> Por um Serviço Nacional de Saúde de Qualidade e Humanizado para Todos</i>
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
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-700 text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-base sm:text-lg font-medium flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">

              {/* Data */}
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                08 - 11 Outubro de 2025
              </span>

              {/* Local */}
              {/* <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Cidade de Maputo - Instituto de Ciências de Saúde do Infulene
              </span> */}

              {/* Local */}
              <a 
                href="https://maps.google.com/maps?q=Instituto+de+Ciências+de+Saúde+do+Infulene,+Maputo,+Moçambique"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-200 transition-colors duration-200 cursor-pointer"
              >
                <MapPin className="w-5 h-5" />
                Cidade de Maputo - Instituto de Ciências de Saúde do Infulene
              </a>

              {/* Participantes */}
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                +160 Participantes
              </span>
            </p>
          </div>
        </div>

        {/* Banner informativo
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-base sm:text-lg font-medium flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
              <span className="flex items-center gap-2">Cidade de Maputo - Instituto de Ciências de Saúde do Infulene</span>
              <span className="flex items-center gap-2">10 - 13 de Setembro de 2025</span>
              <span className="flex items-center gap-2">+160 Participantes</span>
            </p>
          </div>
        </div> */}

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
                <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-6">
                  Sobre o Evento
                </h2>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  O Ministério da Saúde (MISAU) realiza dois eventos estratégicos: o Conselho Hospitalar,
                  que avalia normas, protocolos clínicos e desempenho hospitalar,
                  e o Conselho Coordenador de Saúde, que articula órgãos centrais e locais,
                  analisando planos e estratégias para melhorar o Sistema Nacional de Saúde no âmbito
                  do Programa Quinquenal do Governo e da Estratégia Sectorial 2025 - 2034.
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
                  src="/iscisa2.jpg"
                  alt="Profissionais de saúde em reunião"
                  width={500}
                  height={350}
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>

        
        {/* Objetivos */}
        <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto max-w-6xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-green-700 mb-12"
            >
              Objetivos do Encontro
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Desempenho do Sector",
                  description: "Analisar o desempenho e desafios do sector de saúde."
                },
                {
                  title: "Gestão Hospitalar",
                  description: "Avaliar a gestão e o desempenho dos hospitais."
                },
                {
                  title: "Instrumentos Orientadores",
                  description: "Partilhar ENDE, PQG, PESS e PESOE."
                },
                {
                  title: "Prioridades 2026",
                  description: "Aprovar as prioridades e linhas estratégicas do PESOE 2026."
                },
                {
                  title: "Harmonização",
                  description: "Harmonizar intervenções para garantir eficiência e sustentabilidade."
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
                  <h3 className="text-xl font-semibold text-green-700 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
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
              {/* Ícone */}
              <div className="flex justify-center mb-8">
                <div className="bg-emerald-100 rounded-full p-4">
                  <MapPin className="w-12 h-12 text-emerald-600" />
                </div>
              </div>

              {/* Título */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-2xl font-black text-green-700 mb-4"
              >
                Local do evento
              </motion.h2>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Instituto de Ciências de Saúde do Infulene
              </h3>
              <p className="text-xl text-gray-600 font-semibold mb-6">
                Cidade de Maputo, Moçambique
              </p>

              {/* Botão */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <a
                  href="https://maps.google.com/maps?q=Instituto+de+Ciências+de+Saúde+do+Infulene,+Maputo,+Moçambique"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <MapPin className="w-8 h-8" />
                  <span>Ver no Google Maps</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-gradient-to-r from-emerald-700 to-emerald-700 text-white text-center">
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
              Contribua para um Sistema Nacional de Saúde mais forte e humanizado.
              {/* Participe no XIII Conselho Hospitalar & L Conselho Coordenador de Saúde */}
              {/* e contribua para um Sistema Nacional de Saúde mais forte e humanizado. */}
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
