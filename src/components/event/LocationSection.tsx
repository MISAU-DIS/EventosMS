import { MapPin } from "lucide-react";
import { eventConfig } from "@/data";

export default function LocationSection() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="bg-misau-bright rounded-full p-3 sm:p-4">
              <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-misau-gold" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-misau-medium mb-4">
            Local do evento
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {eventConfig.location}
          </h3>
          <p className="text-base sm:text-xl text-gray-600 font-semibold mb-6">
            {eventConfig.province}, {eventConfig.country}
          </p>
          <a
            href={eventConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-misau-gold hover:bg-misau-medium text-white px-6 sm:px-8 py-3 rounded-full transition-all duration-300 text-sm sm:text-base w-full sm:w-auto max-w-sm mx-auto"
          >
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" />
            <span>Ver no Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
}
