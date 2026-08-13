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
      <footer className="bg-misau-shadow text-white py-8 sm:py-10 mt-8 sm:mt-12 border-t border-white/10">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-4 text-sm">
            <Link
              href="https://misau.gov.mz"
              target="_blank"
              className="hover:text-misau-200 transition py-2"
            >
              Política de Privacidade
            </Link>

            <Link href="/Login" className="hover:text-misau-200 transition py-2">
              Entrar
            </Link>
          </div>

          <div className="w-full h-px bg-white/20 mb-4" />

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed px-2">
            © {new Date().getFullYear()} Ministério da Saúde (MISAU). Todos os
            direitos reservados.
          </p>
        </div>
      </footer>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-misau-medium text-white w-11 h-11 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full hover:bg-misau-dark transition-all duration-300 z-40 flex items-center justify-center text-lg"
          aria-label="Voltar ao topo"
        >
          ↑
        </button>
      )}
    </>
  );
}
