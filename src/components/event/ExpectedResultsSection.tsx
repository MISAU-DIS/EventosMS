"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data";

export default function ExpectedResultsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-700 mb-12 text-center">
          Resultados Esperados
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {eventConfig.expectedResults.map((result, index) => (
            <motion.div
              key={result}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded-r-lg"
            >
              <p className="text-gray-700">{result}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
