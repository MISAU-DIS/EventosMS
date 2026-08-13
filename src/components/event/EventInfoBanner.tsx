import { Calendar, MapPin, Users } from "lucide-react";
import { eventConfig } from "@/data";

export default function EventInfoBanner() {
  return (
    <div className="bg-gradient-to-r from-misau-medium to-misau-dark text-white py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-base sm:text-lg font-medium flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <span className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {eventConfig.dateRange}
          </span>
          <a
            href={eventConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-misau-bright transition-colors duration-200"
          >
            <MapPin className="w-5 h-5" />
            {eventConfig.location}, {eventConfig.province}
          </a>
          <span className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Sector Saúde
          </span>
        </p>
      </div>
    </div>
  );
}
