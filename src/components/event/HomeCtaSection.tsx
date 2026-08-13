import Link from "next/link";
import { eventConfig } from "@/data";

export default function HomeCtaSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-misau-medium to-misau-dark text-white text-center">
      <div className="container mx-auto max-w-4xl">
        <p className="text-xl mb-8 text-misau-bright">{eventConfig.lema}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/programa"
            className="bg-white text-misau-medium hover:bg-misau-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg"
          >
            Consultar Programa
          </Link>
          <Link
            href="/contacto"
            className="border-2 border-white text-white hover:bg-white hover:text-misau-medium px-8 py-4 rounded-full font-semibold transition-all duration-300"
          >
            Contactar Organização
          </Link>
        </div>
      </div>
    </section>
  );
}
