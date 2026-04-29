'use client';

import { useMemo } from "react";
import React from 'react';

interface Sessao {
  titulo: string;
  descricao: string;
  orador: string;
  data: string;
  documento?: string; // 👈 novo campo
}

export default function Sessoes(): React.ReactElement {

  const sessoes: Sessao[] = [
    {
      titulo: "Sessão Preparatória Provincial",
      descricao: "Discussão inicial com stakeholders",
      orador: "MISAU",
      data: "2026-04-10T09:00",
    },
    {
      titulo: "Reunião Técnica Nacional",
      descricao: "Alinhamento técnico antes da conferência",
      orador: "Banco Mundial",
      data: "2026-05-02T10:00",
    },
    {
      titulo: "Workshop Final",
      descricao: "Última sessão antes da conferência",
      orador: "Equipa Técnica",
      data: "2026-05-15T08:30",
    },
     {
    titulo: "Sessão Preparatória Provincial",
    descricao: "Discussão inicial com stakeholders",
    orador: "MISAU",
    data: "2026-04-10T09:00",
    documento: "/docs/sessao1.pdf", // 👈 tem documento (passada)
  },
   
  ];

  const now = new Date();

  const { passadas, futuras } = useMemo(() => {
    const past: Sessao[] = [];
    const upcoming: Sessao[] = [];

    sessoes.forEach((s) => {
      const dataSessao = new Date(s.data);

      if (dataSessao < now) {
        past.push(s);
      } else {
        upcoming.push(s);
      }
    });

    return { passadas: past, futuras: upcoming };
  }, []);

  return (
    <>
      <title>Sessões - MISAU 2025</title>
      <meta name="description" content="Sessões já realizadas e preparatórias antes da conferência" />

      <main className="relative z-10 min-h-screen bg-gradient-to-b from-white to-blue-50">

        {/* 🎨 BACKGROUND (mantido igual) */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <img src="/bg1.png" className="absolute top-0 left-0 w-64 opacity-10" />
          <img src="/bg2.png" className="absolute top-0 right-0 w-64 opacity-10" />
          <img src="/bg3.png" className="absolute top-[40%] left-0 w-72 opacity-10" />
          <img src="/bg4.png" className="absolute top-[40%] right-0 w-72 opacity-10" />
          <img src="/bg5.png" className="absolute bottom-0 left-0 w-80 opacity-10" />
          <img src="/bg6.png" className="absolute bottom-0 right-0 w-80 opacity-10" />
          <img src="/bg1.png" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 opacity-10" />
          <img src="/bg2.png" className="absolute top-0 left-1/2 -translate-x-1/2 w-72 opacity-10" />
        </div>

        {/* 🔵 Sessões Futuras */}
        <div className="mt-20 pt-12 pb-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">

            <h3 className="text-3xl font-bold text-blue-800 text-center mb-10">
              Sessões Pré-diálogo
            </h3>

            <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
              <table className="min-w-full">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left">Título</th>
                    <th className="py-4 px-6 text-left">Descrição</th>
                    <th className="py-4 px-6 text-left">Orador</th>
                    <th className="py-4 px-6 text-left">Data</th>
                  </tr>
                </thead>

                <tbody>
                  {futuras.map((s, index) => (
                    <tr key={index} className="border-b last:border-none hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium text-gray-800">{s.titulo}</td>
                      <td className="py-4 px-6 text-gray-600">{s.descricao}</td>
                      <td className="py-4 px-6 text-gray-600">{s.orador}</td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date(s.data).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>

        {/* ⚪ Sessões Passadas */}
        <div className="mt-10 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">

            <h3 className="text-3xl font-bold text-gray-700 text-center mb-10">
              Sessões Já Realizadas
            </h3>

            <div className="overflow-x-auto bg-gray-50 rounded-2xl shadow-inner border border-gray-200">
              <table className="min-w-full">
               <thead className="bg-gray-400 text-white">
  <tr>
    <th className="py-4 px-6 text-left">Título</th>
    <th className="py-4 px-6 text-left">Descrição</th>
    <th className="py-4 px-6 text-left">Orador</th>
    <th className="py-4 px-6 text-left">Data</th>
    <th className="py-4 px-6 text-left">Documento</th> {/* 👈 nova coluna */}
  </tr>
</thead>

               <tbody>
  {passadas.map((s, index) => (
    <tr key={index} className="border-b last:border-none">
      <td className="py-4 px-6 font-medium text-gray-700">{s.titulo}</td>
      <td className="py-4 px-6 text-gray-600">{s.descricao}</td>
      <td className="py-4 px-6 text-gray-600">{s.orador}</td>
      <td className="py-4 px-6 text-gray-600">
        {new Date(s.data).toLocaleString()}
      </td>

      <td className="py-4 px-6">
        {s.documento ? (
          <a
            href={s.documento}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Ver Documento
          </a>
        ) : (
          <span className="text-gray-400">Sem documento</span>
        )}
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>

          </div>
        </div>

      </main>
    </>
  );
}