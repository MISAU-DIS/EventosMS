"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import { ccs2026Event } from "@/data";

export default function Home() {
  return (
    <>
      <title>Eventos MISAU - {ccs2026Event.shortTitle}</title>
      <meta name="description" content={ccs2026Event.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <main className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
        <div className="flex flex-col items-center justify-center text-center px-4 py-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Image
              src="/Emblem_of_Mozambique.svg"
              alt="Emblema de Moçambique"
              width={80}
              height={90}
              className="sm:w-[110px] sm:h-[120px] w-[80px] h-[90px]"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-2xl font-extrabold text-emerald-800 leading-tight"
          >
            República de Moçambique
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-4xl font-extrabold text-emerald-800 leading-tight"
          >
            Ministério da Saúde
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-3xl mt-4 lg:text-4xl font-extrabold text-emerald-700 leading-tight"
          >
            {ccs2026Event.title.toUpperCase()}
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg sm:text-2xl mt-4 font-extrabold text-emerald-700 leading-tight"
          >
            {ccs2026Event.location} — {ccs2026Event.dateRange}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-sm sm:text-base md:text-lg max-w-3xl text-gray-700 font-bold"
          >
            Lema: <i>{ccs2026Event.lema}</i>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/programa"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Ver Programa
            </Link>
            <Link
              href="/agenda"
              className="bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-full transition"
            >
              Ver Agenda
            </Link>
          </motion.div>
        </div>

        <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-base sm:text-lg font-medium flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {ccs2026Event.dateRange}
              </span>
              <a
                href={ccs2026Event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-100 transition-colors duration-200"
              >
                <MapPin className="w-5 h-5" />
                {ccs2026Event.location}, {ccs2026Event.province}
              </a>
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Sector Saúde
              </span>
            </p>
          </div>
        </div>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-emerald-700">
                Sobre o Evento
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-center lg:text-left"
              >
                <p className="text-gray-700 text-xl mb-6 leading-relaxed text-justify">
                  O Ministério da Saúde (MISAU), através da{" "}
                  {ccs2026Event.organizer}, convoca o{" "}
                  <strong>{ccs2026Event.title}</strong>, reunião de alto nível
                  do sector destinada a avaliar o cumprimento das recomendações
                  anteriores, analisar o desempenho do sector em 2025 e alinhar
                  as prioridades estratégicas para os próximos anos.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative"
              >
                <Image
                  src="/RNP_1.svg"
                  alt="Reunião do sector saúde"
                  width={450}
                  height={300}
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative order-2 lg:order-1"
              >
                <Image
                  src="/RNP_2.svg"
                  alt="Profissionais de saúde em reunião"
                  width={450}
                  height={300}
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-center lg:text-left order-1 lg:order-2"
              >
                <p className="text-gray-700 text-xl mb-6 leading-relaxed text-justify">
                  O Conselho Coordenador de Saúde reúne representantes das
                  áreas programáticas, provinciais e de apoio do MISAU, bem como
                  parceiros do sector, para debater desafios de planificação,
                  execução orçamental, vigilância, formação e infraestruturas, com
                  vista a fortalecer o{" "}
                  <strong>Serviço Nacional de Saúde</strong>.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-b from-emerald-50 to-white">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-12">
              Objectivos da Reunião
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ccs2026Event.objectives.map((objective, index) => (
                <motion.div
                  key={objective}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <p className="text-gray-600 leading-relaxed">{objective}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-12 text-center">
              Resultados Esperados
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {ccs2026Event.expectedResults.map((result, index) => (
                <motion.div
                  key={result}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-lg"
                >
                  <p className="text-gray-700">{result}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="bg-emerald-100 rounded-full p-4">
                  <MapPin className="w-12 h-12 text-emerald-600" />
                </div>
              </div>
              <h2 className="text-4xl font-black text-emerald-700 mb-4">
                Local do evento
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {ccs2026Event.location}
              </h3>
              <p className="text-xl text-gray-600 font-semibold mb-6">
                {ccs2026Event.province}, {ccs2026Event.country}
              </p>
              <a
                href={ccs2026Event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <MapPin className="w-8 h-8" />
                <span>Ver no Google Maps</span>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white text-center">
          <div className="container mx-auto max-w-4xl">
            <p className="text-xl mb-8 text-emerald-100">{ccs2026Event.lema}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programa"
                className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg"
              >
                Consultar Programa
              </Link>
              <Link
                href="/contacto"
                className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                Contactar Organização
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
