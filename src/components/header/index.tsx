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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-blue-700/95 backdrop-blur-sm shadow-lg py-2"
          : "bg-blue-700 py-5"
      } text-white`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
        {/* Logo e título */}
        <div className="flex items-center space-x-2">
          <Image
            src="Emblem_of_Mozambique.svg"
            alt="Logo Moçambique"
            width={40}
            height={40}
            className="rounded-full"
          />
          <Link
            href="/"
            className="text-base md:text-lg font-semibold tracking-tight hover:opacity-90 transition-opacity duration-200"
          >
            XVIII Reunião Nacional de Planificação (RNP)
          </Link>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 text-base font-medium">
            <li>
              <Link
                href="/"
                className="relative py-2 px-1 hover:text-blue-200 transition-all duration-300 group"
              >
                Início
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              {/* <Link
                href="/agenda"
                className="relative py-2 px-1 hover:text-blue-200 transition-all duration-300 group"
              >
                Agenda
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
              </Link> */}
            </li>
            <li>
              <Link
                href="/programa"
                className="relative py-2 px-1 hover:text-blue-200 transition-all duration-300 group"
              >
                Programa
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/comentarios"
                className="relative py-2 px-1 hover:text-blue-200 transition-all duration-300 group"
              >
                Comentários
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="relative py-2 px-1 hover:text-blue-200 transition-all duration-300 group"
              >
                Contacto
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Botão hamburger para mobile */}
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
        className={`md:hidden absolute top-full left-0 w-full bg-blue-700/95 backdrop-blur-sm shadow-lg transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="container mx-auto px-4">
          <ul className="py-4 space-y-2">
            <li>
              <Link
                href="/"
                className="block py-3 px-4 text-base font-medium hover:bg-blue-600/50 hover:text-blue-200 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
            </li>
            {/* <li>
              <Link
                href="/agenda"
                className="block py-3 px-4 text-base font-medium hover:bg-blue-600/50 hover:text-blue-200 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Agenda
              </Link>
            </li> */}
            <li>
              <Link
                href="/programa"
                className="block py-3 px-4 text-base font-medium hover:bg-blue-600/50 hover:text-blue-200 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Programa
              </Link>
            </li>
            <li>
              <Link
                href="/comentarios"
                className="block py-3 px-4 text-base font-medium hover:bg-blue-600/50 hover:text-blue-200 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Comentários
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="block py-3 px-4 text-base font-medium hover:bg-blue-600/50 hover:text-blue-200 rounded-lg transition-all duration-200"
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
