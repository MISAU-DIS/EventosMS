"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${
        scrolled
          ? "bg-[#003E7E]/95 backdrop-blur-sm shadow-lg py-2"
          : "bg-[#0056A3] py-4"
      } text-white`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-10 lg:px-16">
        
        {/* Logo e título */}
        <div className="flex items-center space-x-2">
          <Image
            src="/Emblem_of_Mozambique.svg"
            alt="Logo Moçambique"
            width={36}
            height={36}
            className="rounded-full bg-white p-1"
          />

          <Link
            href="/"
            className="text-sm md:text-base lg:text-lg font-semibold tracking-tight leading-tight hover:opacity-90 transition-opacity duration-200"
          >
            II Diálogo sobre o Financiamento da Saúde
          </Link>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 lg:space-x-8 text-sm md:text-base font-medium tracking-wide">
            
            <li>
              <Link
                href="/"
                className="relative py-2 px-1 hover:text-blue-200 transition-all duration-300 group"
              >
                Início
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
 <li>
              <Link
                href="/evento"
                className="relative py-2 px-1 hover:text-blue-200 transition-all duration-300 group"
              >
                O Evento
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/oradores"
                className="relative py-2 px-1 hover:text-blue-200 transition-all duration-300 group"
              >
                Oradores
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>


<li>
              <Link
                href="/programa"
                className="relative py-2 px-1 hover:text-blue-200 transition-all duration-300 group"
              >
                Programa
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>

            <li>
              <Link
                href="/documentos"
                className="relative py-2 px-1 hover:text-blue-200 transition-all duration-300 group"
              >
                Documentos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
 <li>
              <Link
                href="/sessoes"
                className="relative py-2 px-1 hover:text-blue-200 transition-all duration-300 group"
              >
                Sessões
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>

            <li>
              <Link
                href="/comentarios"
                className="relative py-2 px-1 hover:text-blue-200 transition-all duration-300 group"
              >
                Comentários
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>

           

          </ul>
        </nav>

        {/* Botão hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col space-y-1 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transform transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>

          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>

          <span
            className={`w-6 h-0.5 bg-white transform transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#003E7E]/95 backdrop-blur-sm shadow-lg transform transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <nav className="container mx-auto px-4">
          <ul className="py-4 space-y-2">

            <li>
              <Link
                href="/"
                className="block py-3 px-4 text-sm font-medium hover:bg-white/10 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
            </li>

            <li>
              <Link
                href="/programa"
                className="block py-3 px-4 text-sm font-medium hover:bg-white/10 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Programa
              </Link>
            </li>

            <li>
              <Link
                href="/comentarios"
                className="block py-3 px-4 text-sm font-medium hover:bg-white/10 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Comentários
              </Link>
            </li>

            <li>
              <Link
                href="/contacto"
                className="block py-3 px-4 text-sm font-medium hover:bg-white/10 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>

          </ul>
        </nav>
      </div>
    </header>
  );
}