"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { eventConfig } from "@/data";
import HeroBackground from "@/components/event/HeroBackground";

export default function HomeHero() {
  return (
    <HeroBackground>
      <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 w-full max-w-[1600px] mx-auto pt-24 sm:pt-28 pb-8 sm:pb-10 lg:flex-1 lg:min-h-0 lg:pt-[5.75rem] lg:pb-4 gap-2 lg:gap-2.5">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="shrink-0 mb-3 sm:mb-4 lg:mb-1"
        >
          <Image
            src="/Emblem_of_Mozambique.svg"
            alt="Emblema de Moçambique"
            width={100}
            height={110}
            className="w-16 h-auto sm:w-20 md:w-24 lg:w-[88px] xl:w-24 mx-auto"
            priority
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="shrink-0 text-lg sm:text-2xl md:text-3xl lg:text-[1.65rem] xl:text-4xl 2xl:text-[2.35rem] font-extrabold text-misau-medium leading-tight max-w-5xl px-1"
        >
          {eventConfig.title.toUpperCase()}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="shrink-0 mt-2 sm:mt-3 lg:mt-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-base sm:text-xl md:text-2xl lg:text-lg xl:text-xl font-extrabold text-misau-medium leading-snug px-2"
        >
          <span>{eventConfig.location}</span>
          <span className="hidden sm:inline">—</span>
          <span className="text-sm sm:text-xl lg:text-base xl:text-lg">{eventConfig.dateRange}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mt-4 sm:mt-6 lg:mt-2 w-full max-w-4xl xl:max-w-5xl flex-1 min-h-[140px] lg:min-h-0 flex flex-col"
        >
          <div className="relative w-full flex-1 min-h-[140px] max-h-[42vh] lg:max-h-none overflow-hidden rounded-xl sm:rounded-2xl border border-misau-gold/30 shadow-lg">
            <Image
              src={eventConfig.heroImage}
              alt={eventConfig.heroImageAlt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1024px"
              className="object-cover object-center"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="shrink-0 mt-4 sm:mt-6 lg:mt-2 w-full max-w-3xl xl:max-w-4xl px-2"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-misau-gold font-semibold mb-1 lg:mb-1.5">
            Lema do evento
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-misau-dark font-medium leading-snug lg:leading-relaxed italic">
            {eventConfig.lema}
          </p>
        </motion.div>
      </div>
    </HeroBackground>
  );
}
