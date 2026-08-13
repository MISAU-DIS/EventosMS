"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { eventConfig } from "@/data";
import InstitutionalBackground from "@/components/layout/InstitutionalBackground";
import EvaluationDayTabs from "@/components/event/EvaluationDayTabs";
import { useDayComments } from "@/hooks/useDayComments";
import {
  evaluationDays,
  type EvaluationDayId,
  type NewCommentInput,
} from "@/types/comments";

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
    >
      ⭐
    </span>
  ));
}

const emptyComment: NewCommentInput = {
  name: "",
  role: "",
  organization: "",
  rating: 5,
  comment: "",
};

export default function ComentariosPage() {
  const [selectedDay, setSelectedDay] = useState<EvaluationDayId>("dia1");
  const { comments, addComment } = useDayComments(selectedDay);
  const [newComment, setNewComment] = useState<NewCommentInput>(emptyComment);
  const [showForm, setShowForm] = useState(false);

  const activeDay = evaluationDays.find((day) => day.id === selectedDay)!;
  const averageRating = comments.length
    ? comments.reduce((acc, c) => acc + c.rating, 0) / comments.length
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.comment.trim()) {
      alert("Por favor, escreva o seu comentário.");
      return;
    }
    addComment(newComment);
    setNewComment(emptyComment);
    setShowForm(false);
  };

  return (
    <>
      <title>Comentários do Evento - {eventConfig.shortTitle} MISAU 2026</title>
      <meta
        name="description"
        content={`Comentários e avaliações sobre o ${eventConfig.title}`}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <main className="relative z-10 min-h-screen">
        <InstitutionalBackground variant="extended" />

        <div className="relative pt-24 pb-16 px-4 text-misau-dark">
          <div className="container mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4"
            >
              Avaliações da Reunião
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl sm:text-2xl mb-2 text-gray-700"
            >
              {eventConfig.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-misau-medium max-w-2xl mx-auto"
            >
              Partilhe a sua avaliação por dia ou registe a avaliação geral do
              evento
            </motion.p>
          </div>
        </div>

        <div className="relative container mx-auto px-4 py-12 max-w-6xl">
          <EvaluationDayTabs
            selectedDay={selectedDay}
            onSelect={setSelectedDay}
          />

          <p className="text-center text-gray-600 mb-8">{activeDay.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-misau-dark">
                {comments.length}
              </div>
              <div className="text-gray-600 font-medium">Avaliações</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-misau-dark">
                {comments.length ? averageRating.toFixed(1) : "—"}
              </div>
              <div className="text-gray-600 font-medium">Média — {activeDay.label}</div>
              <div className="flex justify-center mt-2">
                {renderStars(Math.round(averageRating))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-misau-dark">4</div>
              <div className="text-gray-600 font-medium">Secções de avaliação</div>
            </div>
          </div>

          <div className="text-center mb-12">
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="bg-misau-medium hover:bg-misau-dark text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {showForm ? "Cancelar" : `Avaliar — ${activeDay.label}`}
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-misau-dark mb-6">
                Avaliação — {activeDay.label}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
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
                    <label className="block text-gray-700 font-medium mb-2">
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
                  <label className="block text-gray-700 font-medium mb-2">
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
                  <label className="block text-gray-700 font-medium mb-2">
                    Classificação
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setNewComment({ ...newComment, rating: star })
                        }
                        className={`text-2xl ${
                          star <= newComment.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
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
                  className="bg-misau-medium hover:bg-misau-dark text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Enviar avaliação
                </button>
              </form>
            </div>
          )}

          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-misau-dark text-center mb-8">
              Avaliações — {activeDay.label}
            </h3>
            {comments.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-600">
                Ainda não há avaliações para {activeDay.label.toLowerCase()}.
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-misau-medium text-white rounded-full flex items-center justify-center font-bold">
                      {comment.avatar}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold">
                        {comment.name || "Participante"}
                      </h4>
                      {comment.role && (
                        <p className="text-misau-dark text-sm">{comment.role}</p>
                      )}
                      {comment.organization && (
                        <p className="text-gray-500 text-sm">
                          {comment.organization}
                        </p>
                      )}
                      <div className="flex mt-2">{renderStars(comment.rating)}</div>
                      <p className="text-gray-700 mt-3 leading-relaxed">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
