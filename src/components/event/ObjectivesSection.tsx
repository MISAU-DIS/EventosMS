"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data";

export default function ObjectivesSection() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-misau-50 to-white">
      <div className="w-full max-w-[1600px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-misau-medium mb-8 sm:mb-12 text-center">
          Objectivos da Reunião
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-misau-medium text-white rounded-xl p-5 sm:p-8 mb-8 sm:mb-10"
        >
          <p className="text-base sm:text-xl md:text-2xl leading-relaxed">
            {eventConfig.generalObjective}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {eventConfig.specificObjectives.map((objective, index) => (
            <motion.div
              key={objective}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-5 sm:p-6 border border-misau-100"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 bg-misau-bright text-misau-medium rounded-lg font-bold text-sm mb-3">
                {index + 1}
              </span>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
                {objective}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
