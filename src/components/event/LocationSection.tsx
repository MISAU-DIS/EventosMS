import { MapPin } from "lucide-react";
import { eventConfig } from "@/data";

export default function LocationSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-orange-100 rounded-full p-4">
              <MapPin className="w-12 h-12 text-orange-600" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-orange-700 mb-4">
            Local do evento
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {eventConfig.location}
          </h3>
          <p className="text-xl text-gray-600 font-semibold mb-6">
            {eventConfig.province}, {eventConfig.country}
          </p>
          <a
            href={eventConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <MapPin className="w-8 h-8" />
            <span>Ver no Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
}
