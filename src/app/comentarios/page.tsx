'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import React from 'react';

interface Comment {
  id: number;
  name: string;
  role: string;
  organization: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

interface NewComment {
  name: string;
  role: string;
  organization: string;
  rating: number;
  comment: string;
}

export default function Comentarios(): React.ReactElement {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Dra. Maria Fernandes",
      role: "Diretora Provincial de Saúde",
      organization: "MISAU - Maputo",
      rating: 5,
      comment: "Evento extremamente bem organizado! As discussões sobre saúde materna foram muito enriquecedoras. Esperamos implementar as estratégias discutidas em nossa província.",
      date: "2025-06-21",
      avatar: "MF"
    },
    {
      id: 2,
      name: "Dr. João Macamo",
      role: "Coordenador de Nutrição",
      organization: "UNICEF Moçambique",
      rating: 5,
      comment: "Excelente iniciativa do MISAU! Os workshops práticos sobre desnutrição infantil foram muito úteis. Parabéns pela organização impecável.",
      date: "2025-06-20",
      avatar: "JM"
    },
    {
      id: 3,
      name: "Enfª. Ana Santos",
      role: "Coordenadora de SMI",
      organization: "Hospital Central de Maputo",
      rating: 4,
      comment: "Muito bom evento! Gostei especialmente das sessões sobre cuidados neonatais. Sugiro mais tempo para networking entre os participantes.",
      date: "2025-06-19",
      avatar: "AS"
    },
    {
      id: 4,
      name: "Dr. Carlos Muthemba",
      role: "Especialista em Saúde Pública",
      organization: "Universidade Eduardo Mondlane",
      rating: 5,
      comment: "Evento de alta qualidade técnica! As apresentações foram muito informativas e os palestrantes demonstraram grande conhecimento. Recomendo para todos os profissionais de saúde.",
      date: "2025-06-18",
      avatar: "CM"
    }
  ]);

  const [newComment, setNewComment] = useState<NewComment>({
    name: "",
    role: "",
    organization: "",
    rating: 5,
    comment: ""
  });

  const [showForm, setShowForm] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (!newComment.name || !newComment.comment) {
      alert("Por favor, preencha pelo menos o nome e o comentário.");
      return;
    }

    const comment: Comment = {
      id: comments.length + 1,
      ...newComment,
      date: new Date().toISOString().split('T')[0],
      avatar: newComment.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    };

    setComments([comment, ...comments]);
    setNewComment({
      name: "",
      role: "",
      organization: "",
      rating: 5,
      comment: ""
    });
    setShowForm(false);
  };

  const renderStars = (rating: number): React.ReactElement[] => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ⭐
      </span>
    ));
  };

  const averageRating = comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;

  return (
    <>
      <title>Comentários do Evento - MISAU 2025</title>
      <meta name="description" content="Comentários e feedback sobre o Evento MISAU 2025" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <div className="pt-24 pb-16 px-4 bg-gradient-to-r text-green-700">
          <div className="container mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4"
            >
              Comentários do Evento
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl sm:text-2xl mb-2 text-gray-700"
            >
              XIII Conselho Hospitalar e L Conselho Coordenador <br/>de Saúde (CCS)- Feedback dos Participantes
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-green-700"
            >
              Compartilhe sua experiência e leia os comentários de outros participantes
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Estatísticas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600">{comments.length}</div>
              <div className="text-gray-600 font-medium">Comentários</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600">{averageRating.toFixed(1)}</div>
              <div className="text-gray-600 font-medium">Avaliação Média</div>
              <div className="flex justify-center mt-2">
                {renderStars(Math.round(averageRating))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-gray-600 font-medium">Satisfação</div>
            </div>
          </motion.div>

          {/* Botão para adicionar comentário */}
          <div className="text-center mb-12">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {showForm ? 'Cancelar' : 'Deixar Comentário'}
            </motion.button>
          </div>

          {/* Formulário de comentário */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h3 className="text-2xl font-bold text-green-700 mb-6">Deixe seu Comentário</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Nome Completo <span className="text-red-500 text-sm">*</span>
                    </label>
                    <input
                      type="text"
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                      className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Ex: Dr. Maria Silva"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Cargo/Função
                    </label>
                    <input
                      type="text"
                      value={newComment.role}
                      onChange={(e) => setNewComment({ ...newComment, role: e.target.value })}
                      className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Ex: Diretor de Saúde"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Organização/Instituição
                  </label>
                  <input
                    type="text"
                    value={newComment.organization}
                    onChange={(e) => setNewComment({ ...newComment, organization: e.target.value })}
                    className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Ex: MISAU - Província de Maputo"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Avaliação do Evento
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewComment({ ...newComment, rating: star })}
                        className={`text-2xl transition-all hover:scale-110 ${
                          star <= newComment.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Comentário <span className="text-red-500 text-sm">*</span>
                  </label>
                  <textarea
                    value={newComment.comment}
                    onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                    rows={4}
                    className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    placeholder="Compartilhe sua experiência sobre o evento..."
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Enviar Comentário
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Lista de comentários */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-green-700 text-center mb-8">
              Comentários dos Participantes
            </h3>
            
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {comment.avatar}
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800">{comment.name}</h4>
                        <p className="text-green-600 font-medium">{comment.role}</p>
                        <p className="text-gray-500 text-sm">{comment.organization}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end mt-2 sm:mt-0">
                        <div className="flex">{renderStars(comment.rating)}</div>
                        <span className="text-gray-400 text-sm mt-1">
                          {new Date(comment.date).toLocaleDateString('pt-PT')}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action
          <div className="text-center mt-16 bg-gradient-to-r from-green-600 to-green-700 text-white py-12 px-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Quer saber mais sobre o evento?</h3>
            <p className="text-lg mb-6 text-green-100">
              Para mais informações sobre o MISAU 2025 e futuros eventos, entre em contato connosco.
            </p>
            <Link
              href="/contacto"
              className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
            >
              Entrar em Contato
            </Link>
          </div> */}
        </div>

        {/* Call to Action */}
                <div className="bg-gradient-to-r from-emerald-700 to-emerald-700 text-white py-16 px-4 mt-16">
                    <div className="container mx-auto text-center max-w-4xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl font-bold mb-6"
                        >
                            Precisa de Mais Informações?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-xl mb-8 text-green-100"
                        >
                            Para mais informações sobre o MISAU e futuros eventos, entre em contato connosco.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href="/contacto"
                                className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
                            >
                                Entrar em Contato
                            </Link>
                        </motion.div>
                    </div>
                </div>
      </main>
    </>
  );
}

