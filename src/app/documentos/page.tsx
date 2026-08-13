"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data";
import { meetingDocuments } from "@/data/documents";
import DocumentList from "@/components/event/DocumentList";
import PageContainer from "@/components/layout/PageContainer";
import { PageHero } from "@/components/layout/PageContainer";

export default function DocumentosPage() {
  return (
    <>
      <title>{`Documentos da Reunião - ${eventConfig.shortTitle} MISAU 2026`}</title>
      <meta
        name="description"
        content={`Documentos oficiais do ${eventConfig.title}`}
      />

      <main className="min-h-screen bg-gradient-to-b from-misau-50 via-white to-misau-50">
        <PageHero
          title="Documentos da Reunião"
          description="Apresentações e materiais organizados por dia"
        />

        <PageContainer className="py-8 sm:py-12 space-y-6 sm:space-y-10">
          {meetingDocuments.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-misau-100"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-misau-medium mb-2">
                {section.title}
              </h2>
              {section.description && (
                <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
                  {section.description}
                </p>
              )}
              <DocumentList documents={section.documents} />
            </motion.section>
          ))}
        </PageContainer>
      </main>
    </>
  );
}
