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
            {/* Footer principal */}
            <footer className="bg-[#003E7E] text-white py-8 mt-12 border-t border-white/10">
                
                <div className="container mx-auto px-4 md:px-10 lg:px-16 text-center">
                    
                    {/* Links */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 mb-4 text-sm">
                        
                        <Link
                            href="https://misau.gov.mz"
                            target="_blank"
                            className="hover:text-blue-200 transition"
                        >
                            Política de Privacidade
                        </Link>

                        <Link
                            href="/Login"
                            className="hover:text-blue-200 transition"
                        >
                            Entrar
                        </Link>

                    </div>

                    {/* Linha divisória */}
                    <div className="w-full h-px bg-white/20 mb-4"></div>

                    {/* Copyright */}
                    <p className="text-sm text-white/80">
                        © {new Date().getFullYear()} Ministério da Saúde (MISAU). 
                        Todos os direitos reservados.
                    </p>

                </div>

            </footer>

            {/* Botão voltar ao topo */}
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-[#0056A3] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#003E7E] transition-all duration-300"
                    aria-label="Voltar ao topo"
                >
                    ↑
                </button>
            )}
        </>
    );
}