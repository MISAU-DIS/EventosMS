"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { eventConfig } from "@/data";
import { officialPhotos } from "@/data/photos";
import PageContainer from "@/components/layout/PageContainer";
import { PageHero } from "@/components/layout/PageContainer";

export default function FotografiasPage() {
  return (
    <>
      <title>{`Fotografias - ${eventConfig.shortTitle} MISAU 2026`}</title>
      <meta
        name="description"
        content={`Fotografias oficiais do ${eventConfig.title}`}
      />

      <main className="min-h-screen bg-gradient-to-b from-misau-50 via-white to-misau-50">
        <PageHero
          title="Fotografias Oficiais"
          description="Registo fotográfico da reunião, a publicar pelo Departamento de Comunicação e Imagem"
        />

        <PageContainer className="py-8 sm:py-12">
          {officialPhotos.length === 0 ? (
            <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center border border-misau-100">
              <Camera className="w-12 h-12 sm:w-16 sm:h-16 text-misau-gold mx-auto mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl font-bold text-misau-medium mb-3 sm:mb-4">
                Galeria em preparação
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                As fotografias oficiais serão publicadas aqui assim que forem
                disponibilizadas pelo DCI. Volte a consultar durante ou após o
                evento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {officialPhotos.map((photo, index) => (
                <motion.figure
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden border border-misau-100"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={400}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                  <figcaption className="p-3 sm:p-4 text-sm font-medium text-misau-dark">
                    {photo.title}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          )}
        </PageContainer>
      </main>
    </>
  );
}
