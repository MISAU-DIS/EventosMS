"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { eventConfig } from "@/data";

export default function AboutEventSection() {
  return (
    <section className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 bg-white">
      <div className="w-full max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-8 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-misau-medium">
            Sobre o Evento
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 flex items-center order-2 lg:order-1"
          >
            <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-justify w-full">
              {eventConfig.aboutEventText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 relative min-h-[220px] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[520px] order-1 lg:order-2"
          >
            <Image
              src="/li-ccs-group-photo.png"
              alt="Reunião do Ministério da Saúde"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="rounded-xl sm:rounded-2xl border border-misau-100 object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
