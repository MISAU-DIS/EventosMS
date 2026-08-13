"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { eventConfig } from "@/data";

export default function HomeHero() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-20 pt-32">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6"
      >
        <Image
          src="/Emblem_of_Mozambique.svg"
          alt="Emblema de Moçambique"
          width={80}
          height={90}
          className="sm:w-[110px] sm:h-[120px] w-[80px] h-[90px]"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-xl sm:text-2xl font-extrabold text-misau-dark leading-tight"
      >
        República de Moçambique
      </motion.h1>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-4xl font-extrabold text-misau-dark leading-tight"
      >
        {eventConfig.institutionName}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-xl sm:text-3xl mt-4 lg:text-4xl font-extrabold text-misau-medium leading-tight"
      >
        {eventConfig.title.toUpperCase()}
      </motion.h2>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-lg sm:text-2xl mt-4 font-extrabold text-misau-medium leading-tight"
      >
        {eventConfig.location} — {eventConfig.dateRange}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-6 text-base sm:text-lg md:text-xl max-w-4xl text-misau-dark font-bold"
      >
        Lema: <i className="text-misau-medium">{eventConfig.lema}</i>
      </motion.p>
    </div>
  );
}
