'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import React from 'react';

 

interface Documento {
  titulo: string;
  descricao: string;
  autoria: string;
  link: string;
}

export default function Comentarios(): React.ReactElement {
   

  const documentos: Documento[] = [
  {
    titulo: "Plano Estratégico de Saúde",
    descricao: "Diretrizes nacionais para o sector da saúde",
    autoria: "MISAU",
    link: "/docs/plano.pdf",
  },
  {
    titulo: "Relatório de Financiamento",
    descricao: "Análise do financiamento da saúde em Moçambique",
    autoria: "Banco Mundial",
    link: "/docs/financiamento.pdf",
  },
  {
    titulo: "Guia de Implementação",
    descricao: "Manual prático para execução das políticas",
    autoria: "Equipa Técnica",
    link: "/docs/guia.pdf",
  },
];

 
  return (
    <>
      <title>Comentários do Evento - MISAU 2025</title>
      <meta name="description" content="Comentários e feedback sobre o II Diálogo de Financiamento da Saúde" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

<main className="relative z-10 min-h-screen bg-gradient-to-b from-white to-blue-50">
        


        {/* 🎨 BACKGROUND DECORATIVO */}
<div className="fixed inset-0 pointer-events-none z-0">

  {/* Topo esquerdo */}
  <img
    src="/bg1.png"
    className="absolute top-0 left-0 w-64 opacity-10"
  />

  {/* Topo direito */}
  <img
    src="/bg2.png"
    className="absolute top-0 right-0 w-64 opacity-10"
  />

  {/* Meio esquerdo */}
  <img
    src="/bg3.png"
    className="absolute top-[40%] left-0 w-72 opacity-10"
  />

  {/* Meio direito */}
  <img
    src="/bg4.png"
    className="absolute top-[40%] right-0 w-72 opacity-10"
  />

  {/* Fundo esquerdo */}
  <img
    src="/bg5.png"
    className="absolute bottom-0 left-0 w-80 opacity-10"
  />

  {/* Fundo direito */}
  <img
    src="/bg6.png"
    className="absolute bottom-0 right-0 w-80 opacity-10"
  />

   {/* Fundo centro */}
  <img
    src="/bg1.png"
    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 opacity-10"
  />
    {/* Topo centro */}
  <img
    src="/bg2.png"
    className="absolute top-0 left-1/2 -translate-x-1/2 w-72 opacity-10"
  />

</div>

    

  {/* 📄 Tabela de Documentos */}
<div className="mt-20 pt-12 pb-4 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">
    
    <h3 className="text-3xl font-bold text-blue-800 text-center mb-10">
      Documentos do Evento
    </h3>

    <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
      <table className="min-w-full">
        
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="py-4 px-6 text-left">Título</th>
            <th className="py-4 px-6 text-left">Descrição</th>
            <th className="py-4 px-6 text-left">Autoria</th>
            <th className="py-4 px-6 text-left">Acesso</th>
          </tr>
        </thead>

        <tbody>
          {documentos.map((doc, index) => (
            <tr
              key={index}
              className="border-b last:border-none hover:bg-gray-50 transition"
            >
              <td className="py-4 px-6 font-medium text-gray-800">
                {doc.titulo}
              </td>

              <td className="py-4 px-6 text-gray-600">
                {doc.descricao}
              </td>

              <td className="py-4 px-6 text-gray-600">
                {doc.autoria}
              </td>

              <td className="py-4 px-6">
                <a
                  href={doc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Ver
                </a>
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

