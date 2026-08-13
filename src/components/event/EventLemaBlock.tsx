"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data";

export default function EventLemaBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full mt-10 sm:mt-16"
    >
      <div className="bg-gradient-to-r from-misau-gold to-misau-medium text-white rounded-xl sm:rounded-2xl p-5 sm:p-8 text-center">
        <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3">Lema do Evento</h3>
        <p className="text-base sm:text-lg md:text-xl text-misau-50 italic leading-relaxed">
          {eventConfig.lema}
        </p>
      </div>
    </motion.div>
  );
}
