"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { eventConfig } from "@/data";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/programa", label: "Programa" },
  { href: "/agenda", label: "Agenda" },
  { href: "/comentarios", label: "Comentários" },
  { href: "/contacto", label: "Contacto" },
];

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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${
        scrolled
          ? "bg-misau-dark/95 backdrop-blur-sm shadow-lg py-2"
          : "bg-misau-medium py-4"
      } text-white`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-10 lg:px-16">
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
            {eventConfig.title}
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-6 lg:space-x-8 text-sm md:text-base font-medium tracking-wide">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative py-2 px-1 hover:text-misau-bright transition-all duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col space-y-1 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transform transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transform transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-misau-dark/95 backdrop-blur-sm shadow-lg transform transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <nav className="container mx-auto px-4">
          <ul className="py-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 px-4 text-sm font-medium hover:bg-white/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
