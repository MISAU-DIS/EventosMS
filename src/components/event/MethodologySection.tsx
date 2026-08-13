"use client";

import { motion } from "framer-motion";
import { ClipboardList, Presentation, Users } from "lucide-react";
import { eventConfig } from "@/data";

export default function MethodologySection() {
  const { methodology } = eventConfig;

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-misau-50">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-misau-medium mb-12 text-center">
          Metodologia
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-misau-gold" />
              <h3 className="text-xl font-bold text-misau-medium">
                Formato da reunião
              </h3>
            </div>
            <p className="text-gray-700 capitalize">{methodology.format}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Presentation className="w-6 h-6 text-misau-gold" />
              <h3 className="text-xl font-bold text-misau-medium">Dinâmica</h3>
            </div>
            <ul className="space-y-2">
              {methodology.dynamics.map((item) => (
                <li key={item} className="text-gray-700 leading-relaxed">
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
            className="bg-white rounded-xl p-6 shadow-lg md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <ClipboardList className="w-6 h-6 text-misau-gold" />
              <h3 className="text-xl font-bold text-misau-medium">
                Discussão em Plenária
              </h3>
            </div>
            <ul className="space-y-2">
              {methodology.plenaryTopics.map((item) => (
                <li
                  key={item}
                  className="text-gray-700 leading-relaxed flex items-start gap-2"
                >
                  <span className="text-misau-gold mt-1">•</span>
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
