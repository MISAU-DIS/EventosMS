"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { eventConfig } from "@/data";
import { useEventPhotos } from "@/hooks/useEventPhotos";
import { useActiveEventStatus } from "@/hooks/useActiveEventStatus";
import PageContainer from "@/components/layout/PageContainer";
import { PageHero } from "@/components/layout/PageContainer";
import PhotoLightboxModal from "@/components/event/PhotoLightboxModal";
import NoActiveEventNotice from "@/components/event/NoActiveEventNotice";

export default function FotografiasPage() {
  const { photos, loading } = useEventPhotos();
  const { loading: eventLoading, hasActiveEvent } = useActiveEventStatus();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const showEmpty = !eventLoading && !hasActiveEvent;
  const showGallery = hasActiveEvent && !loading && photos.length > 0;

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
          description="Registo fotográfico oficial da reunião do LI Conselho Coordenador de Saúde"
        />

        <PageContainer className="py-8 sm:py-12">
          {eventLoading || loading ? (
            <p className="text-center text-gray-600">A carregar fotografias...</p>
          ) : showEmpty ? (
            <NoActiveEventNotice />
          ) : photos.length === 0 ? (
            <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center border border-misau-100">
              <Camera className="w-12 h-12 sm:w-16 sm:h-16 text-misau-gold mx-auto mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl font-bold text-misau-medium mb-3 sm:mb-4">
                Galeria em preparação
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                As fotografias oficiais serão publicadas aqui assim que forem
                disponibilizadas.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {photos.map((photo, index) => (
                <motion.figure
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden border border-misau-100 group"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="block w-full text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-misau-gold"
                    aria-label={`Ampliar ${photo.title}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={600}
                      height={400}
                      className="w-full h-52 sm:h-64 md:h-72 object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </button>
                  <figcaption className="p-3 sm:p-4 text-sm font-medium text-misau-dark">
                    {photo.title}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          )}
        </PageContainer>
      </main>

      {showGallery && lightboxIndex !== null && (
        <PhotoLightboxModal
          photos={photos}
          index={lightboxIndex}
          open={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </>
  );
}
