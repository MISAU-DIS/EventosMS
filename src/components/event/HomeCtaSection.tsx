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
            className="bg-white text-misau-dark hover:bg-misau-50 active:bg-misau-100 active:text-misau-shadow px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold transition-colors duration-200 w-full sm:w-auto touch-manipulation [@media(hover:hover)]:hover:bg-misau-50"
          >
            Consultar Agenda
          </Link>
          <Link
            href="/contacto"
            className="border-2 border-white text-white bg-transparent active:bg-misau-bright active:text-misau-dark active:border-misau-bright px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold transition-colors duration-200 w-full sm:w-auto touch-manipulation [@media(hover:hover)]:hover:bg-white [@media(hover:hover)]:hover:text-misau-dark"
          >
            Contactar Organização
          </Link>
        </div>
      </div>
    </section>
  );
}
