"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { eventConfig } from "@/data";

export default function AboutEventSection() {
  return (
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
              O Ministério da Saúde (MISAU), através da {eventConfig.organizer},
              convoca o <strong>{eventConfig.title}</strong>, reunião de alto
              nível do sector destinada a avaliar o cumprimento das recomendações
              anteriores, analisar o desempenho do sector em 2025 e alinhar as
              prioridades estratégicas para os próximos anos.
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
              O Conselho Coordenador de Saúde reúne representantes das áreas
              programáticas, provinciais e de apoio do MISAU, bem como parceiros
              do sector, para debater desafios de planificação, execução
              orçamental, vigilância, formação e infraestruturas, com vista a
              fortalecer o <strong>Serviço Nacional de Saúde</strong>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
