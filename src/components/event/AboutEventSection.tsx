"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { eventConfig } from "@/data";

export default function AboutEventSection() {
  return (
    <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 xl:px-20 bg-white">
      <div className="w-full max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-misau-medium">
            Sobre o Evento
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 flex items-center"
          >
            <p className="text-gray-700 text-xl sm:text-2xl lg:text-3xl leading-relaxed text-justify w-full">
              {eventConfig.aboutEventText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]"
          >
            <Image
              src="/li-ccs-group-photo.png"
              alt="Reunião do Ministério da Saúde"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="rounded-2xl border border-misau-100 object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
