"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { eventConfig } from "@/data";
import { officialPhotos } from "@/data/photos";

export default function FotografiasPage() {
  return (
    <>
      <title>Fotografias - {eventConfig.shortTitle} MISAU 2026</title>
      <meta
        name="description"
        content={`Fotografias oficiais do ${eventConfig.title}`}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <main className="min-h-screen bg-gradient-to-b from-misau-50 via-white to-misau-50">
        <div className="pt-28 pb-12 px-4 sm:px-8 bg-gradient-to-r from-misau-medium to-misau-dark text-white text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-extrabold mb-4"
          >
            Fotografias Oficiais
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg sm:text-xl text-misau-bright max-w-3xl mx-auto"
          >
            Registo fotográfico da reunião, a publicar pelo Departamento de
            Comunicação e Imagem
          </motion.p>
        </div>

        <div className="container mx-auto max-w-6xl px-4 sm:px-8 py-12">
          {officialPhotos.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-misau-100">
              <Camera className="w-16 h-16 text-misau-gold mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-misau-medium mb-4">
                Galeria em preparação
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                As fotografias oficiais serão publicadas aqui assim que forem
                disponibilizadas pelo DCI. Volte a consultar durante ou após o
                evento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {officialPhotos.map((photo, index) => (
                <motion.figure
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={400}
                    className="w-full h-56 object-cover"
                  />
                  <figcaption className="p-4 text-sm font-medium text-misau-dark">
                    {photo.title}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
