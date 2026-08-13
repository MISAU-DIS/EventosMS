"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-misau-shadow text-white py-8 mt-12 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-10 lg:px-16 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 mb-4 text-sm">
            <Link
              href="https://misau.gov.mz"
              target="_blank"
              className="hover:text-misau-200 transition"
            >
              Política de Privacidade
            </Link>

            <Link href="/Login" className="hover:text-misau-200 transition">
              Entrar
            </Link>
          </div>

          <div className="w-full h-px bg-white/20 mb-4" />

          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} Ministério da Saúde (MISAU). Todos os
            direitos reservados.
          </p>
        </div>
      </footer>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-misau-medium text-white px-4 py-2 rounded-full shadow-lg hover:bg-misau-dark transition-all duration-300"
          aria-label="Voltar ao topo"
        >
          ↑
        </button>
      )}
    </>
  );
}
