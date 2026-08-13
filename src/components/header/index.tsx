"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { eventConfig } from "@/data";
import { navLinks } from "@/config/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${
        scrolled
          ? "bg-misau-dark/95 backdrop-blur-sm py-2"
          : "bg-misau-medium py-3 sm:py-4"
      } text-white`}
    >
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="flex items-center gap-2 min-w-0">
          <Image
            src="/Emblem_of_Mozambique.svg"
            alt="Logo Moçambique"
            width={36}
            height={36}
            className="rounded-full bg-white p-1 shrink-0 w-8 h-8 sm:w-9 sm:h-9"
          />

          <Link
            href="/"
            className="text-xs sm:text-sm md:text-base font-semibold tracking-tight leading-tight hover:opacity-90 transition-opacity duration-200 truncate"
          >
            {eventConfig.institutionName}
          </Link>
        </div>

        <nav className="hidden xl:block">
          <ul className="flex flex-wrap justify-end gap-x-4 2xl:gap-x-6 text-sm 2xl:text-base font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative py-2 px-1 hover:text-misau-bright transition-all duration-300 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="xl:hidden flex flex-col justify-center space-y-1.5 p-2 shrink-0 min-w-[44px] min-h-[44px]"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          <span
            className={`w-6 h-0.5 bg-white transform transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transform transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`xl:hidden absolute top-full left-0 w-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto bg-misau-dark/98 backdrop-blur-sm shadow-lg transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="h-full overflow-y-auto px-4 py-4 pb-8">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-3.5 px-4 text-base font-medium rounded-lg transition-all duration-200 min-h-[44px] ${
                      isActive
                        ? "bg-white/15 text-misau-bright"
                        : "hover:bg-white/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.mobileLabel ?? link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
