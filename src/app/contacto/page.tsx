'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

export default function Contacto(): React.ReactElement {
  const faqs = [
    {
      question: 'Como posso participar do próximo evento do MISAU?',
      answer: 'Você pode se inscrever através do nosso site oficial ou entrar em contato diretamente conosco através do formulário abaixo.'
    },
    {
      question: 'Os eventos são gratuitos?',
      answer: 'A maioria dos nossos eventos é gratuita, mas alguns podem exigir inscrição paga. Verifique os detalhes na página do evento.'
    },
    {
      question: 'Posso levar acompanhantes?',
      answer: 'Sim, desde que todos estejam devidamente inscritos e a lotação do local permita.'
    }
  ];

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number): void => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 px-4">
      <div className="container mx-auto max-w-4xl text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-green-700 mb-4"
        >
          Fale Connosco
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-700 text-lg"
        >
          Tem dúvidas ou sugestões? Envie-nos uma mensagem e responderemos em breve.
        </motion.p>
      </div>

      <div className="container mx-auto max-w-4xl bg-white rounded-xl shadow-lg p-8 mb-16">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nome *</label>
              <input type="text" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-700" placeholder="Seu nome completo" required />
            </div>




            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email *</label>
              <input type="email" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-700" placeholder="email@exemplo.com" required />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Assunto</label>
            <input type="text" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-700" placeholder="Ex: Participação no evento" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Mensagem *</label>
            <textarea className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-700 resize-none" rows={5} placeholder="Escreva sua mensagem aqui..." required></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105">
              Enviar Mensagem
            </button>
          </div>
        </form>
      </div>

      {/* FAQ */}
      <div className="container mx-auto max-w-3xl mb-24">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden border-l-4 border-green-500">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium hover:bg-green-50"
              >
                {faq.question}
                <span className="text-2xl text-green-600">{openFAQ === index ? '-' : '+'}</span>
              </button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-4 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center bg-green-600 text-white py-12 px-6 rounded-2xl">
        <h3 className="text-2xl font-bold mb-4">Acompanhe nossas atividades</h3>
        <p className="text-green-100 mb-6">Fique por dentro de futuros eventos e novidades do MISAU.</p>
        <Link
          href="/agenda"
          className="bg-white text-green-700 hover:bg-green-100 px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Ver Eventos
        </Link>
      </div>
    </main>
  );
}
