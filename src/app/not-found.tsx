'use client';

import Link from "next/link";
import Lottie from "lottie-react";
import animationData from "../animations/Animation1.json"; 

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square">
        <Lottie animationData={animationData} loop={true} className="w-full h-full" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 text-center mt-4">
        Oops! Página não encontrada
      </h1>
      <p className="text-gray-600 text-lg mt-2 text-center">
        A página que você procura pode ter sido removida ou nunca existiu.
      </p>
      <Link
        href="/"
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300"
      >
        Voltar para página inicial
      </Link>
    </div>
  );
}