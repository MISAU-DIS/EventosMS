"use client";

import { motion } from "framer-motion";
import { ClipboardList, Presentation, Users } from "lucide-react";
import { eventConfig } from "@/data";

export default function MethodologySection() {
  const { methodology } = eventConfig;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-misau-50">
      <div className="w-full max-w-[1600px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-misau-medium mb-8 sm:mb-12 text-center">
          Metodologia
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-5 sm:p-6 border border-misau-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-misau-gold shrink-0" />
              <h3 className="text-lg sm:text-xl font-bold text-misau-medium">
                Formato da reunião
              </h3>
            </div>
            <p className="text-gray-700 capitalize text-base sm:text-lg">
              {methodology.format}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-5 sm:p-6 border border-misau-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <Presentation className="w-6 h-6 text-misau-gold shrink-0" />
              <h3 className="text-lg sm:text-xl font-bold text-misau-medium">Dinâmica</h3>
            </div>
            <ul className="space-y-2">
              {methodology.dynamics.map((item) => (
                <li key={item} className="text-gray-700 leading-relaxed text-base sm:text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-5 sm:p-6 border border-misau-100 md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <ClipboardList className="w-6 h-6 text-misau-gold shrink-0" />
              <h3 className="text-lg sm:text-xl font-bold text-misau-medium">
                Discussão em Plenária
              </h3>
            </div>
            <ul className="space-y-2">
              {methodology.plenaryTopics.map((item) => (
                <li
                  key={item}
                  className="text-gray-700 leading-relaxed flex items-start gap-2 text-base sm:text-lg"
                >
                  <span className="text-misau-gold mt-1 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
