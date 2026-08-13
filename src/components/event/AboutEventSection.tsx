"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { eventConfig } from "@/data";

export default function AboutEventSection() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-misau-medium">
            Sobre o Evento
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center lg:text-left"
          >
            <p className="text-gray-700 text-xl sm:text-2xl leading-relaxed text-justify">
              {eventConfig.aboutEventText}
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
              src="/li-ccs-group-photo.png"
              alt="Reunião do Ministério da Saúde"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl w-full h-auto object-cover min-h-[280px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
