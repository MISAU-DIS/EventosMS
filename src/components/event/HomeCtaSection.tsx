import Link from "next/link";
import { eventConfig } from "@/data";

export default function HomeCtaSection() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-misau-medium to-misau-dark text-white text-center">
      <div className="w-full max-w-4xl mx-auto">
        <p className="text-lg sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-misau-bright uppercase tracking-wide leading-snug">
          {eventConfig.slogan}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/agenda"
            className="bg-white text-misau-medium hover:bg-misau-50 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold transition-all duration-300 w-full sm:w-auto"
          >
            Consultar Agenda
          </Link>
          <Link
            href="/contacto"
            className="border-2 border-white text-white hover:bg-white hover:text-misau-medium px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold transition-all duration-300 w-full sm:w-auto"
          >
            Contactar Organização
          </Link>
        </div>
      </div>
    </section>
  );
}
