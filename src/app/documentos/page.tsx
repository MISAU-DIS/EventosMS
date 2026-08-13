"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data";
import { meetingDocuments } from "@/data/documents";
import DocumentList from "@/components/event/DocumentList";

export default function DocumentosPage() {
  return (
    <>
      <title>Documentos da Reunião - {eventConfig.shortTitle} MISAU 2026</title>
      <meta
        name="description"
        content={`Documentos oficiais do ${eventConfig.title}`}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <main className="min-h-screen bg-gradient-to-b from-misau-50 via-white to-misau-50">
        <div className="pt-28 pb-12 px-4 sm:px-8 bg-gradient-to-r from-misau-medium to-misau-dark text-white text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-extrabold mb-4"
          >
            Documentos da Reunião
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-lg sm:text-xl text-misau-bright max-w-3xl mx-auto"
          >
            Apresentações e materiais organizados por dia
          </motion.p>
        </div>

        <div className="container mx-auto max-w-5xl px-4 sm:px-8 py-12 space-y-12">
          {meetingDocuments.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-misau-100"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-misau-medium mb-2">
                {section.title}
              </h2>
              {section.description && (
                <p className="text-gray-600 mb-6">{section.description}</p>
              )}
              <DocumentList documents={section.documents} />
            </motion.section>
          ))}
        </div>
      </main>
    </>
  );
}
