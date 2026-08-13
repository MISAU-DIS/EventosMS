"use client";

import Link from "next/link";
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
        className="text-xl sm:text-2xl font-extrabold text-orange-800 leading-tight"
      >
        República de Moçambique
      </motion.h1>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-4xl font-extrabold text-orange-800 leading-tight"
      >
        Ministério da Saúde
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-3 text-sm sm:text-base font-bold uppercase tracking-wide text-orange-600"
      >
        {eventConfig.slogan}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-xl sm:text-3xl mt-4 lg:text-4xl font-extrabold text-orange-700 leading-tight"
      >
        {eventConfig.title.toUpperCase()}
      </motion.h2>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-lg sm:text-2xl mt-4 font-extrabold text-orange-700 leading-tight"
      >
        {eventConfig.location} — {eventConfig.dateRange}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-4 text-sm sm:text-base md:text-lg max-w-3xl text-gray-700 font-bold"
      >
        Lema: <i>{eventConfig.lema}</i>
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link
          href="/programa"
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Ver Programa
        </Link>
        <Link
          href="/agenda"
          className="bg-white border border-orange-600 text-orange-700 hover:bg-orange-50 px-8 py-3 rounded-full transition"
        >
          Ver Agenda
        </Link>
      </motion.div>
    </div>
  );
}
