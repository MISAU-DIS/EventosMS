"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data";

export default function ObjectivesSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-12 text-center">
          Objectivos da Reunião
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-emerald-700 text-white rounded-xl p-6 sm:p-8 shadow-lg mb-10"
        >
          <p className="text-lg leading-relaxed">{eventConfig.generalObjective}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {eventConfig.specificObjectives.map((objective, index) => (
            <motion.div
              key={objective}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg font-bold text-sm mb-3">
                {index + 1}
              </span>
              <p className="text-gray-600 leading-relaxed">{objective}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
