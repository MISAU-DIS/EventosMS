"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

export default function Home() {
  return (
    <>
      <title>Eventos MISAU</title>
      <meta
        name="description"
        content="II Diálogo sobre o Financiamento da Saúde – MISAU Moçambique"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <main className="relative z-10 min-h-screen bg-gradient-to-b from-white to-blue-50">
        


        {/* 🎨 BACKGROUND DECORATIVO */}{/* 🎨 BACKGROUND DECORATIVO */}
<div className="fixed inset-0 pointer-events-none z-0">

  {/* Topo esquerdo */}
  <img
    src="/bg2.png"
    className="absolute top-0 left-0 w-64 opacity-10"
  />

  {/* Topo centro */}
  <img
    src="/bg2.png"
    className="absolute top-0 left-1/2 -translate-x-1/2 w-72 opacity-10"
  />

  {/* Topo direito */}
  <img
    src="/bg3.png"
    className="absolute top-0 right-0 w-64 opacity-10"
  />

  {/* Meio esquerdo */}
  <img
    src="/bg4.png"
    className="absolute top-[40%] left-0 w-72 opacity-10"
  />

  {/* Meio direito */}
  <img
    src="/bg5.png"
    className="absolute top-[40%] right-0 w-72 opacity-10"
  />

  {/* Fundo esquerdo */}
  <img
    src="/bg5.png"
    className="absolute bottom-0 left-0 w-80 opacity-10"
  />

  {/* Fundo centro */}
  <img
    src="/bg1.png"
    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 opacity-10"
  />

  {/* Fundo direito */}
  <img
    src="/bg3.png"
    className="absolute bottom-0 right-0 w-80 opacity-10"
  />

</div>

        {/* HERO */}
        <div className="flex flex-col items-center justify-center text-center px-4 py-20 pt-32">
          
          {/* Zoom simulado */}
          <div className="scale-[0.75] origin-top">

            {/* ANIMAÇÃO DE ENTRADA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-[900px] mx-auto"
            >

              {/* IMAGEM */}
              <Image
                src="/financiamento.png"
                alt="II Diálogo sobre o Financiamento"
                width={900}
                height={900}
                className="w-full h-auto"
                priority
              />

              {/* BOTÃO REUTILIZÁVEL */}
              {[
                {
                  href: "/documentos",
                  label: "Documentos",
                  style: "top-[6%] left-1/2 -translate-x-1/2",
                  color: "blue",
                },
                {
                  href: "/#",
                  label: "Processo",
                  style: "top-[48%] left-[2%]",
                  color: "orange",
                },
                {
                  href: "/evento",
                  label: "Evento",
                  style: "top-[48%] right-[2%]",
                  color: "green",
                },
                {
                  href: "/sessoes",
                  label: "Sessões",
                  style: "bottom-[5%] left-1/2 -translate-x-1/2",
                  color: "red",
                },
              ].map((item, i) => (
                <Link key={i} href={item.href}>
                  <div
                    className={`absolute ${item.style} group cursor-pointer`}
                  >
                    {/* Área clicável */}
                    <div
                      className={`
                        w-28 h-28 rounded-full 
                        bg-${item.color}-500/0 
                        group-hover:bg-${item.color}-500/20
                        transition duration-300
                        flex items-center justify-center
                      `}
                    >
                      {/* Tooltip */}
                      <span
                        className={`
                          absolute -top-10 px-3 py-1 text-sm text-white 
                          bg-${item.color}-600 rounded-md opacity-0 
                          group-hover:opacity-100 transition
                        `}
                      >
                        {item.label}
                      </span>

                      {/* Efeito de pulso */}
                      <div
                        className={`
                          absolute w-full h-full rounded-full 
                          border-2 border-${item.color}-400 
                          opacity-0 group-hover:opacity-100 
                          animate-ping
                        `}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>

         
      </main>
    </>
  );
}