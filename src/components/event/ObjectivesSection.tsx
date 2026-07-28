"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data";

export default function ObjectivesSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-12">
          Objectivos da Reunião
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventConfig.objectives.map((objective, index) => (
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
  );
}
