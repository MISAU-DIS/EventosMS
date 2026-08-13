"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { eventConfig } from "@/data";
import HeroBackground from "@/components/event/HeroBackground";

export default function HomeHero() {
  return (
    <HeroBackground>
      <div className="flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-24 sm:py-32 pt-36 w-full max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <Image
            src="/Emblem_of_Mozambique.svg"
            alt="Emblema de Moçambique"
            width={120}
            height={130}
            className="sm:w-[150px] sm:h-[160px] w-[120px] h-[130px]"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-misau-medium leading-tight max-w-6xl"
        >
          {eventConfig.title.toUpperCase()}
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-4xl lg:text-5xl mt-6 font-extrabold text-misau-medium leading-tight"
        >
          {eventConfig.location} — {eventConfig.dateRange}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-10 sm:mt-12 w-full max-w-6xl rounded-2xl border border-misau-gold/30 bg-white/85 backdrop-blur-sm px-8 sm:px-12 py-8 sm:py-10"
        >
          <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-misau-gold font-bold mb-4">
            Lema do evento
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-misau-dark font-bold leading-snug">
            <i>{eventConfig.lema}</i>
          </p>
        </motion.div>
      </div>
    </HeroBackground>
  );
}
