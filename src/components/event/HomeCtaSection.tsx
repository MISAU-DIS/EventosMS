import Link from "next/link";
import { eventConfig } from "@/data";

export default function HomeCtaSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-orange-700 to-orange-800 text-white text-center">
      <div className="container mx-auto max-w-4xl">
        <p className="text-xl mb-8 text-orange-100">{eventConfig.lema}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/programa"
            className="bg-white text-orange-700 hover:bg-orange-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg"
          >
            Consultar Programa
          </Link>
          <Link
            href="/contacto"
            className="border-2 border-white text-white hover:bg-white hover:text-orange-700 px-8 py-4 rounded-full font-semibold transition-all duration-300"
          >
            Contactar Organização
          </Link>
        </div>
      </div>
    </section>
  );
}
