"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { eventConfig } from "@/data";
import HeroBackground from "@/components/event/HeroBackground";

export default function HomeHero() {
  return (
    <HeroBackground>
      <div className="flex flex-col items-center justify-center text-center px-4 sm:px-8 py-24 sm:py-28 pt-36 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Image
            src="/Emblem_of_Mozambique.svg"
            alt="Emblema de Moçambique"
            width={100}
            height={110}
            className="sm:w-[130px] sm:h-[140px] w-[100px] h-[110px]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl font-extrabold text-misau-dark leading-tight"
        >
          República de Moçambique
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl font-extrabold text-misau-dark leading-tight mt-2"
        >
          {eventConfig.institutionName}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-4xl mt-6 lg:text-5xl font-extrabold text-misau-medium leading-tight max-w-5xl"
        >
          {eventConfig.title.toUpperCase()}
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl sm:text-3xl mt-5 font-extrabold text-misau-medium leading-tight"
        >
          {eventConfig.location} — {eventConfig.dateRange}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 sm:mt-10 max-w-5xl rounded-2xl border border-misau-gold/30 bg-white/80 backdrop-blur-sm px-6 sm:px-10 py-6 sm:py-8 shadow-lg"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-misau-gold font-bold mb-3">
            Lema do evento
          </p>
          <p className="text-lg sm:text-2xl md:text-3xl text-misau-dark font-bold leading-snug">
            <i>{eventConfig.lema}</i>
          </p>
        </motion.div>
      </div>
    </HeroBackground>
  );
}
