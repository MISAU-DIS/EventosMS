"use client"; // se estiver usando Next.js App Router (app/)

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
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto text-center">
                    <p className="text-sm">
                        Copyright &copy; {new Date().getFullYear()} MISAU. Todos os direitos reservados.
                    </p>
                    <Link
                        href="https://misau.gov.mz"
                        className="text-blue-400 hover:underline mt-2 block"
                    >
                        Política de Privacidade
                    </Link>
                </div>
            </footer>

            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-emerald-600 transition" 
                    aria-label="Voltar ao topo"
                >
                    ↑
                </button>
            )}
        </>
    );
}



















// import Link from "next/link";

// export default function Footer() {
//     return (
//         <footer className="bg-gray-800 text-white py-6">
//         <div className="container mx-auto text-center">
//             <p className="text-sm">
//             Copyright &copy; {new Date().getFullYear()} MISAU. Todos os direitos reservados.
//             </p>
//             <Link
//              href="https://misau.gov.mz" className="text-blue-400 hover:underline mt-2 block">
//             Política de Privacidade
//             </Link>
//         </div>
//         </footer>
//     );
// }