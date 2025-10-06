'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import React from 'react';
import emailjs from '@emailjs/browser'; 
import { Link } from 'lucide-react';

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

  // const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [sending, setSending] = useState(false);

  // const toggleFAQ = (index: number): void => {
  //   setOpenFAQ(openFAQ === index ? null : index);
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    emailjs.sendForm(
      'service_ucltqqy', // Seu Service ID
      'template_q9f18ji',  // Seu Template ID (crie no EmailJS)
      e.currentTarget,
      'BiomUSw2GrN1Rk-q9' // Sua Public Key do EmailJS
    ).then(() => {
      alert('Mensagem enviada com sucesso!');
      e.currentTarget.reset();
      setSending(false);
    }).catch((err) => {
      alert('Erro ao enviar mensagem: ' + err.text);
      setSending(false);
    });
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 px-4 bg-white">
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Nome <span className="text-sm text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="user_name"
                  className="w-full border text-gray-700 border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email  <span className="text-sm text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="user_email"
                  className="w-full border text-gray-700 border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Assunto</label>
              <input
                type="text"
                name="subject"
                className="w-full border text-gray-700 border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Ex: Participação no evento"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Mensagem <span className="text-sm text-red-500">*</span>
              </label>
              <textarea
                name="message"
                className="w-full border text-gray-700 border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
                rows={5}
                placeholder="Escreva sua mensagem aqui..."
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={sending}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </div>
          </form>
        </div>
      </main>
      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16 px-4 mt-16">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-6"
          >
            Acompanhe nossas atividades
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 text-green-100"
          >
            Fique por dentro de futuros eventos e novidades do MISAU.
          </motion.p>
        </div>
      </div>
      {/* Call to Action permanece igual */}
    </>
  );
}


























// 'use client';
// //service_in7w0c9
// // import { useState } from 'react';
// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import React from 'react';

// export default function Contacto(): React.ReactElement {
//   const faqs = [
//     {
//       question: 'Como posso participar do próximo evento do MISAU?',
//       answer: 'Você pode se inscrever através do nosso site oficial ou entrar em contato diretamente conosco através do formulário abaixo.'
//     },
//     {
//       question: 'Os eventos são gratuitos?',
//       answer: 'A maioria dos nossos eventos é gratuita, mas alguns podem exigir inscrição paga. Verifique os detalhes na página do evento.'
//     },
//     {
//       question: 'Posso levar acompanhantes?',
//       answer: 'Sim, desde que todos estejam devidamente inscritos e a lotação do local permita.'
//     }
//   ];

//   // const [openFAQ, setOpenFAQ] = useState<number | null>(null);

//   // const toggleFAQ = (index: number): void => {
//   //   setOpenFAQ(openFAQ === index ? null : index);
//   // };

//   return (
//     <>
//     <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 px-4 bg-white">
//       <div className="container mx-auto max-w-4xl text-center mb-12">
//         <motion.h1
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="text-4xl font-extrabold text-green-700 mb-4"
//         >
//           Fale Connosco
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className="text-gray-700 text-lg"
//         >
//           Tem dúvidas ou sugestões? Envie-nos uma mensagem e responderemos em breve.
//         </motion.p>
//       </div>

//       <div className="container mx-auto max-w-4xl bg-white rounded-xl shadow-lg p-8 mb-16">
//         <form className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Nome <span className="text-sm text-red-500">*</span></label>
//               <input type="text" className="w-full border text-gray-700 border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Seu nome completo" required />
//             </div>




            
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Email  <span className="text-sm text-red-500">*</span></label>
//               <input type="email" className="w-full border text-gray-700 border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="email@exemplo.com" required />
//             </div>
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Assunto</label>
//             <input type="text" className="w-full border text-gray-700 border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Ex: Participação no evento" />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Mensagem <span className="text-sm text-red-500">*</span></label>
//             <textarea className="w-full border text-gray-700 border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 resize-none" rows={5} placeholder="Escreva sua mensagem aqui..." required></textarea>
//           </div>
//           <div className="text-center">
//             <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105">
//               Enviar Mensagem
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* FAQ */}
//       {/* <div className="container mx-auto max-w-3xl mb-24">
//         <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Perguntas Frequentes</h2>
//         <div className="space-y-4">
//           {faqs.map((faq, index) => (
//             <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
//               <button
//                 onClick={() => toggleFAQ(index)}
//                 className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium bg-emerald-500 hover:bg-emerald-600"
//               >
//                 {faq.question}
//                 <span className="text-2xl text-white">{openFAQ === index ? '-' : '+'}</span>
//               </button>
//               <AnimatePresence>
//                 {openFAQ === index && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: 'auto', opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.4 }}
//                     className="px-6 pb-4 text-gray-600"
//                   >
//                     {faq.answer}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div> */}
//     </main>
      
//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16 px-4 mt-16">
//         <div className="container mx-auto text-center max-w-4xl">
//           <motion.h2
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="text-3xl sm:text-4xl font-bold mb-6"
//           >
//             Acompanhe nossas atividades
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="text-xl mb-8 text-green-100"
//           >
//             Fique por dentro de futuros eventos e novidades do MISAU.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             viewport={{ once: true }}
//           >
//             <Link
//               href="/"
//               className="bg-white text-green-700 hover:bg-green-100 px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
//             >
//               Ver Eventos
//             </Link>
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// }
