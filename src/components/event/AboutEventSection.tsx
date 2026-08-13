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
          <h2 className="text-3xl sm:text-4xl font-bold text-orange-700">
            Sobre o Evento
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center lg:text-left"
          >
            <p className="text-gray-700 text-xl leading-relaxed text-justify">
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
              width={450}
              height={300}
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
