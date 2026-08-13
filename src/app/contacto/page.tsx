"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import toast from "react-hot-toast";
import { Calendar, MapPin } from "lucide-react";
import { eventConfig } from "@/data";
import { sendContactEmail } from "@/lib/emailjs";
import InstitutionalBackground from "@/components/layout/InstitutionalBackground";
import PageContainer from "@/components/layout/PageContainer";

export default function Contacto(): React.ReactElement {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      await sendContactEmail(e.currentTarget);
      toast.success("Mensagem enviada com sucesso!");
      e.currentTarget.reset();
    } catch (err) {
      console.log("Erro ao enviar mensagem: ", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <main className="relative min-h-screen bg-gradient-to-b from-white to-misau-50">
        <InstitutionalBackground />

        <PageContainer className="relative z-10 max-w-4xl text-center mb-8 sm:mb-12 pt-24 sm:pt-28">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-4xl font-extrabold text-misau-medium mb-3 sm:mb-4"
          >
            Fale Connosco
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-700 text-base sm:text-lg mb-5 sm:mb-6 px-2"
          >
            Tem dúvidas ou sugestões sobre o {eventConfig.title}? Envie-nos uma
            mensagem e responderemos em breve.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 text-sm text-gray-600"
          >
            <span className="inline-flex items-center justify-center gap-2 bg-misau-50 px-4 py-2.5 rounded-full">
              <Calendar className="w-4 h-4 text-misau-gold shrink-0" />
              {eventConfig.dateRange}
            </span>
            <span className="inline-flex items-center justify-center gap-2 bg-misau-50 px-4 py-2.5 rounded-full">
              <MapPin className="w-4 h-4 text-misau-gold shrink-0" />
              {eventConfig.location}, {eventConfig.province}
            </span>
          </motion.div>
        </PageContainer>

        <PageContainer className="relative z-10 max-w-4xl bg-white rounded-xl border border-misau-100 p-5 sm:p-8 mb-12 sm:mb-16">
          <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                  Nome <span className="text-sm text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="user_name"
                  className="w-full border text-gray-700 border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-misau-light"
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                  Email <span className="text-sm text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="user_email"
                  className="w-full border text-gray-700 border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-misau-light"
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                Assunto
              </label>
              <input
                type="text"
                name="subject"
                className="w-full border text-gray-700 border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-misau-light"
                placeholder="Ex: Participação no evento"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                Mensagem <span className="text-sm text-red-500">*</span>
              </label>
              <textarea
                name="message"
                className="w-full border text-gray-700 border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-misau-light resize-none"
                rows={5}
                placeholder="Escreva sua mensagem aqui..."
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={sending}
                className="bg-misau-gold hover:bg-misau-medium text-white px-8 py-3 rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {sending ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </div>
          </form>
        </PageContainer>
      </main>

      <div className="bg-gradient-to-r from-misau-gold to-misau-medium text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
          >
            Acompanhe nossas atividades
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-xl text-misau-bright"
          >
            Fique por dentro de futuros eventos e novidades do MISAU.
          </motion.p>
        </div>
      </div>
    </>
  );
}
