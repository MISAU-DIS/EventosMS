"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data";

export default function ExpectedResultsSection() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
      <div className="w-full max-w-[1600px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-misau-medium mb-8 sm:mb-12 text-center">
          Resultados Esperados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {eventConfig.expectedResults.map((result, index) => (
            <motion.div
              key={result}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-misau-50 border-l-4 border-misau-gold p-4 sm:p-5 rounded-r-lg"
            >
              <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
                {result}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
