'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface Speaker {
  name: string;
  role: string;
  description: string;
  image: string;
  link: string;
}

const speakers: Speaker[] = [
  {
    name: 'Dr. João Silva',
    role: 'Diretor Nacional de Saúde Pública',
    description: 'Especialista em políticas de saúde com mais de 15 anos de experiência.',
    image: 'https://i.pravatar.cc/150?img=1',
    link: '#'
  },
  {
    name: 'Dra. Maria Fernandes',
    role: 'Coordenadora de Vacinação',
    description: 'Lidera campanhas nacionais de imunização.',
    image: 'https://i.pravatar.cc/150?img=5', 
    link: '#'
  },
  {
    name: 'Dr. Carlos Mabote',
    role: 'Consultor em Saúde Comunitária',
    description: 'Trabalha com soluções sustentáveis em zonas rurais.',
    image: 'https://i.pravatar.cc/150?img=8',
    link: '#'
  },
  {
    name: 'Dra. Ana Joaquim',
    role: 'Especialista em Epidemiologia',
    description: 'Focada na prevenção e controlo de surtos.',
    image: 'https://i.pravatar.cc/150?img=12',
    link: '#'
  },
  {
    name: 'Dr. Paulo Chissano',
    role: 'Investigador em Saúde Global',
    description: 'Desenvolve estudos sobre doenças infecciosas.',
    image: 'https://i.pravatar.cc/150?img=15',
    link: '#'
  },
  {
    name: 'Dra. Elisa Matavele',
    role: 'Gestora Hospitalar',
    description: 'Experiência em administração e gestão hospitalar.',
    image: 'https://i.pravatar.cc/150?img=20',
    link: '#'
  }
];

export default function Oradores(): React.ReactElement {
  return (
   
       <main className="relative z-10 min-h-screen bg-gradient-to-b from-white to-blue-50">
        


        {/* 🎨 BACKGROUND DECORATIVO */}
<div className="fixed inset-0 pointer-events-none z-0">

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

 <div className="container mx-auto max-w-6xl text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-blue-700 mb-4"
        >
          Nossos Oradores
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-700 text-lg"
        >
          Conheça os especialistas que irão partilhar conhecimento nos nossos eventos.
        </motion.p>
      </div>

      <div className="container mx-auto max-w-6xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition border border-blue-100"
          >
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-blue-200"
            />
            <h3 className="text-xl font-bold text-blue-700 mb-1">
              {speaker.name}
            </h3>
            <p className="text-sm text-blue-500 mb-3">{speaker.role}</p>
            <p className="text-gray-700 text-sm mb-4">
              {speaker.description}
            </p>
            <a
              href={speaker.link}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
            >
              Ver Perfil
            </a>
          </motion.div>
        ))}
      </div>

      
    </main>
  );
}
