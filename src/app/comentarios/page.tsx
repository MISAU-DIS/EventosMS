"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { eventConfig } from "@/data";
import InstitutionalBackground from "@/components/layout/InstitutionalBackground";
import PageContainer from "@/components/layout/PageContainer";
import StarRating, { StarRatingDisplay } from "@/components/event/StarRating";
import { useDayComments } from "@/hooks/useDayComments";
import { evaluationDay, type NewCommentInput } from "@/types/comments";

const emptyComment: NewCommentInput = {
  name: "",
  role: "",
  organization: "",
  rating: 0,
  comment: "",
};

export default function ComentariosPage() {
  const { comments, addComment } = useDayComments(evaluationDay.id);
  const [newComment, setNewComment] = useState<NewCommentInput>(emptyComment);
  const [showForm, setShowForm] = useState(false);

  const averageRating = comments.length
    ? comments.reduce((acc, c) => acc + c.rating, 0) / comments.length
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.comment.trim()) {
      alert("Por favor, escreva o seu comentário.");
      return;
    }
    if (newComment.rating < 1) {
      alert("Por favor, seleccione uma classificação de 1 a 5 estrelas.");
      return;
    }
    addComment(newComment);
    setNewComment(emptyComment);
    setShowForm(false);
  };

  return (
    <>
      <title>{`Comentários do Evento - ${eventConfig.shortTitle} MISAU 2026`}</title>
      <meta
        name="description"
        content={`Comentários e avaliações sobre o ${eventConfig.title}`}
      />

      <main className="relative z-10 min-h-screen">
        <InstitutionalBackground variant="extended" />

        <div className="relative pt-24 sm:pt-28 pb-10 sm:pb-16 px-4 sm:px-6 text-misau-dark">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 leading-tight"
            >
              Avaliação Final
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-base sm:text-xl md:text-2xl mb-2 text-gray-700"
            >
              {eventConfig.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-sm sm:text-base md:text-lg text-misau-medium max-w-2xl mx-auto"
            >
              Partilhe a sua avaliação final na conclusão da reunião
            </motion.p>
          </div>
        </div>

        <PageContainer className="relative pb-12">
          <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-2">
            {evaluationDay.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl border border-misau-100 p-5 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-misau-dark">
                {comments.length}
              </div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">
                Avaliações
              </div>
            </div>
            <div className="bg-white rounded-xl border border-misau-100 p-5 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-misau-dark">
                {comments.length ? averageRating.toFixed(1) : "—"}
              </div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">
                Classificação média
              </div>
              <div className="flex justify-center mt-2">
                <StarRatingDisplay rating={Math.round(averageRating)} />
              </div>
            </div>
          </div>

          <div className="text-center mb-8 sm:mb-12">
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="bg-misau-medium hover:bg-misau-dark text-white px-5 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold transition-all duration-300 w-full sm:w-auto max-w-md mx-auto text-sm sm:text-base"
            >
              {showForm ? "Cancelar" : "Submeter avaliação"}
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-xl border border-misau-100 p-5 sm:p-8 mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-bold text-misau-dark mb-5 sm:mb-6">
                Avaliação final
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                      Nome completo (opcional)
                    </label>
                    <input
                      type="text"
                      value={newComment.name}
                      onChange={(e) =>
                        setNewComment({ ...newComment, name: e.target.value })
                      }
                      className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-misau-light"
                      placeholder="Ex: Dr. Maria Silva"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                      Cargo/função (opcional)
                    </label>
                    <input
                      type="text"
                      value={newComment.role}
                      onChange={(e) =>
                        setNewComment({ ...newComment, role: e.target.value })
                      }
                      className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-misau-light"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Organização (opcional)
                  </label>
                  <input
                    type="text"
                    value={newComment.organization}
                    onChange={(e) =>
                      setNewComment({
                        ...newComment,
                        organization: e.target.value,
                      })
                    }
                    className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-misau-light"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Classificação *
                  </label>
                  <StarRating
                    value={newComment.rating}
                    onChange={(rating) =>
                      setNewComment({ ...newComment, rating })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Comentário *
                  </label>
                  <textarea
                    value={newComment.comment}
                    onChange={(e) =>
                      setNewComment({ ...newComment, comment: e.target.value })
                    }
                    rows={4}
                    required
                    className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-misau-light resize-none"
                    placeholder="Partilhe a sua avaliação..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-misau-medium hover:bg-misau-dark text-white px-6 py-3 rounded-lg font-semibold w-full sm:w-auto"
                >
                  Enviar avaliação
                </button>
              </form>
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-misau-dark text-center mb-6 sm:mb-8">
              Avaliações registadas
            </h3>
            {comments.length === 0 ? (
              <div className="bg-white rounded-xl border border-misau-100 p-6 sm:p-8 text-center text-gray-600 text-sm sm:text-base">
                Ainda não há avaliações registadas.
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white rounded-xl border border-misau-100 p-5 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-misau-medium text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      {comment.avatar}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-base sm:text-lg font-semibold break-words">
                        {comment.name || "Participante"}
                      </h4>
                      {comment.role && (
                        <p className="text-misau-dark text-sm break-words">
                          {comment.role}
                        </p>
                      )}
                      {comment.organization && (
                        <p className="text-gray-500 text-sm break-words">
                          {comment.organization}
                        </p>
                      )}
                      <div className="flex mt-2">
                        <StarRatingDisplay rating={comment.rating} />
                      </div>
                      <p className="text-gray-700 mt-3 leading-relaxed text-sm sm:text-base break-words">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </PageContainer>
      </main>
    </>
  );
}
