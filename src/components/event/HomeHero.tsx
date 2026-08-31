"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { eventConfig } from "@/data";
import HeroBackground from "@/components/event/HeroBackground";

export default function HomeHero() {
  return (
    <HeroBackground>
      <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-28 pt-28 sm:pt-32 md:pt-36 w-full max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-10"
        >
          <Image
            src="/Emblem_of_Mozambique.svg"
            alt="Emblema de Moçambique"
            width={100}
            height={110}
            className="w-20 h-auto sm:w-[120px] sm:h-[130px] md:w-[150px] md:h-[160px]"
            priority
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-misau-medium leading-tight max-w-6xl px-1"
        >
          {eventConfig.title.toUpperCase()}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-misau-medium leading-snug px-2"
        >
          <span>{eventConfig.location}</span>
          <span className="hidden sm:inline">—</span>
          <span className="text-base sm:text-2xl md:text-3xl">{eventConfig.dateRange}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mt-6 sm:mt-8 w-full max-w-5xl"
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-misau-gold/30 shadow-lg">
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
          className="mt-6 sm:mt-10 md:mt-12 w-full max-w-6xl rounded-xl sm:rounded-2xl border border-misau-gold/30 bg-white/85 backdrop-blur-sm px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-misau-gold font-bold mb-3">
            Lema do evento
          </p>
          <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-misau-dark font-bold leading-snug">
            <i>{eventConfig.lema}</i>
          </p>
        </motion.div>
      </div>
    </HeroBackground>
  );
}
