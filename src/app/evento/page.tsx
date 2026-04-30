"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users } from "lucide-react";

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

</div>
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center px-4 py-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Image
              src="Emblem_of_Mozambique.svg"
              alt="Logo do Evento"
              width={80}
              height={90}
              className="sm:w-[110px] sm:h-[120px] w-[80px] h-[90px]"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-2xl lg:text-2xl font-extrabold text-blue-600 leading-tight"
          >
            República de Moçambique
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-4xl lg:text-3xl font-extrabold text-blue-600 leading-tight"
          >
            Ministério da Saúde
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            /*className="text-xl sm:text-3xl mt-4 lg:text-4xl font-extrabold text-blue-700 leading-tight"*/
			className="text-xl sm:text-3xl mt-4 lg:text-4xl font-extrabold text-blue-800 leading-tight"
          >
            II Diálogo sobre o Financiamento da Saúde:
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-3xl mt-4 lg:text-4xl font-extrabold text-blue-800 leading-tight"
          >
            A Transição do Financiamento em Moçambique
          </motion.h2>
 

        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.8 }}
  className="mt-6 px-6 py-4 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-l-4 border-blue-800 rounded-xl shadow-lg max-w-3xl"
>
  <p className="text-sm sm:text-base md:text-lg text-blue-900 font-semibold text-center">
    <span className="uppercase tracking-wide text-blue-700 font-bold">
      Lema:
    </span>
    <span className="italic font-extrabold ml-2 text-blue-800">
      Sustentar a Transição do Sistema de Saúde: Financiar, Integrar e Reformar
    </span>
  </p>
</motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/programa"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Agenda e apresentações
            </Link>
            
            {/* <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLScp4lP7ToBXEzY1yAayCr4Vt2lUe1A1OEy1KEN2KnlWOlPSRA/viewform?usp=dialog"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Avaliar o Evento
            </Link> */}
          </motion.div>
        </div>

        {/* Banner informativo */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-base sm:text-lg font-medium flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              {/* Data */}
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                31 de Maio, 01, 02 de Junho de 2026
              </span>

              {/* Local */}
              <a
                href="https://maps.google.com/maps?q=Macaneta,+Marracuene,+Maputo,+Moçambique"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-200 cursor-pointer"
              >
                <MapPin className="w-5 h-5" />
                Centro de Conferências Joaquim Chissano - Cidade de Maputo
              </a>
 
            </p>
          </div>
        </div>

        {/* Sobre o evento */}
        <section className="py-16 px-4 bg-white">
  <div className="container mx-auto max-w-6xl">
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.2 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-blue-900">
        Sobre o Evento
      </h2>
    </motion.div>

    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-left"
      >
        <p className="text-gray-700 text-lg mb-6 leading-relaxed text-justify hyphens-auto max-w-prose">
          O sector da saúde em Moçambique enfrenta desafios crescentes relacionados com a sustentabilidade do financiamento. A elevada dependência histórica do financiamento externo, combinada com pressões macroeconómicas internas e mudanças no panorama internacional da ajuda ao desenvolvimento, tem vindo a criar desafios à continuidade da prestação de serviços essenciais de saúde. Nos últimos anos, vários parceiros internacionais anunciaram reduções ou reconfigurações da sua ajuda ao desenvolvimento no sector da saúde em Moçambique. Estas mudanças ocorrem num contexto caracterizado por restrições fiscais internas, pressão das obrigações do serviço da dívida pública e necessidade de maior mobilização de recursos internos.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative"
      >
        <Image
          src="RNP_1.svg"
          alt="Profissionais de saúde em reunião de planificação"
          width={450}
          height={300}
          className="rounded-xl shadow-lg w-full h-auto"
        />
      </motion.div>
    </div>

    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative order-2 lg:order-1"
      >
        <Image
          src="RNP_2.svg"
          alt="Imagem do evento"
          width={450}
          height={300}
          className="rounded-xl shadow-lg w-full h-auto"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-left order-1 lg:order-2"
      >
        <p className="text-gray-700 text-lg mb-6 leading-relaxed text-justify hyphens-auto max-w-prose">
          Em resposta a estes desafios, o Governo de Moçambique aprovou, em 2023, a Estratégia de Financiamento do Sector da Saúde 2025–2034, que estabelece um quadro estratégico para orientar reformas destinadas a reforçar a sustentabilidade, a eficiência e a equidade do financiamento do sistema nacional de saúde. Nesse mesmo ano realizou-se o Primeiro Diálogo sobre o Financiamento da Saúde, que permitiu reunir os principais atores institucionais e parceiros para discutir os desafios estruturais do financiamento da saúde e identificar caminhos para reforçar o financiamento interno.
        </p>
      </motion.div>
    </div>
  </div>
</section>

        {/* Objetivos */}
        <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
  <div className="container mx-auto max-w-6xl text-center">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-3xl sm:text-4xl font-bold text-blue-900 mb-12"
    >
      Objectivos do evento
    </motion.h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Objectivo geral",
          description:
            "Face às mudanças recentes no contexto do financiamento da saúde, torna-se necessário aprofundar o engajamento, o entendimento e o diálogo entre os diferentes atores e partes interessadas do sector, bem como promover uma reflexão estratégica sobre as opções disponíveis para garantir a sustentabilidade do sistema de saúde a curto e médio prazo. Neste contexto, o Ministério da Saúde organiza o evento de alto nível para maio de 2026, intitulado Segundo Diálogo sobre o Financiamento da Saúde, com o objetivo de analisar o novo contexto de financiamento, avaliar os impactos da redução da ajuda externa e identificar opções de política para reforçar o financiamento interno do sector.",
        },
        {
          title: "Objectivo específico 1",
          description:
            "Analisar o panorama actual do financiamento da saúde em Moçambique, incluindo os impactos recentes decorrentes da redução ou suspensão da ajuda externa.",
        },
        {
          title: "Objectivo específico 2",
          description:
            "Promover o alinhamento interinstitucional entre os Ministérios da Saúde, da Economia, das Finanças, da Planificação e Desenvolvimento, bem como com a Assembleia da República e demais intervenientes da sociedade em geral, como parceiros de cooperação, sociedade civil, sector privado e qualquer outra parte interessada.",
        },
        {
          title: "Objectivo específico 3",
          description:
            "Discutir opções de acção, de reforma ou de política para reforçar a mobilização de recursos internos para o sector da saúde em Moçambique.",
        },
        {
          title: "Objectivo específico 4",
          description:
            "Identificar oportunidades para aprimorar a eficiência no uso dos recursos do Sistema Nacional de Saúde.",
        },
        {
          title: "Objectivo específico 5",
          description:
            "Promover compromissos institucionais concretos que apoiem a implementação da Estratégia de Financiamento do Sector da Saúde 2025–2034.",
        },
        {
          title: "Objectivo específico 6",
          description:
            "Estabelecimento de bases para o acompanhamento do processo de diálogo, incluindo mecanismos de fiscalização dos compromissos assumidos.",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
            index === 0 ? "lg:col-span-3" : ""
          }`}
        >
          <h3 className="text-xl font-semibold text-blue-900 mb-3">
            {item.title}
          </h3>

          <p className="text-gray-700 text-sm leading-relaxed text-justify hyphens-auto">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

        {/* Resultados Esperados */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-blue-900 mb-12 text-center"
            >
              Resultados Esperados
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Compreensão partilhada dos desafios atuais do financiamento da saúde em Moçambique.",
                "Identificação de opções de acção, de reformas ou de políticas prioritárias para reforçar a mobilização de recursos internos.",
                "Maior alinhamento entre o Governo e as demais partes interessadas da Sociedade.",
                "Adoção de uma Declaração de Compromissos com ações concretas para reforçar a sustentabilidade do financiamento da saúde.",
              ].map((resultado, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg"
                >
                  <p className="text-gray-700">{resultado}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Localização do Evento */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center mb-8">
                <div className="bg-blue-100 rounded-full p-4">
                  <MapPin className="w-12 h-12 text-blue-600" />
                </div>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-2xl font-black text-blue-900 mb-4"
              >
                Local do evento
              </motion.h2>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Centro de Conferências Joaquim Chissano
              </h3>
              <p className="text-xl text-gray-600 font-semibold mb-6">
                Cidade de Maputo, Moçambique
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <a
                  href="https://maps.app.goo.gl/76LdGryNaPRmrjPC7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-blue-600 hover:bg-blue-900 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <MapPin className="w-8 h-8" />
                  <span>Ver no Google Maps</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

       
      </main>
    </>
  );
}
