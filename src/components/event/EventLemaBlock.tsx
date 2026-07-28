"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data";

export default function EventLemaBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="max-w-4xl mx-auto mt-16"
    >
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl shadow-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-3">Lema do Evento</h3>
        <p className="text-xl text-emerald-50 italic">{eventConfig.lema}</p>
      </div>
    </motion.div>
  );
}
