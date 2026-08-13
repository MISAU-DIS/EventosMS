import { Calendar, MapPin, Users } from "lucide-react";
import { eventConfig } from "@/data";

export default function EventInfoBanner() {
  return (
    <div className="bg-gradient-to-r from-misau-medium to-misau-dark text-white py-8 sm:py-10">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base md:text-lg font-medium">
          <span className="flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5 shrink-0" />
            {eventConfig.dateRange}
          </span>
          <a
            href={eventConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 hover:text-misau-bright transition-colors duration-200 text-center"
          >
            <MapPin className="w-5 h-5 shrink-0" />
            {eventConfig.location}, {eventConfig.province}
          </a>
          <span className="flex items-center justify-center gap-2">
            <Users className="w-5 h-5 shrink-0" />
            Sector Saúde
          </span>
        </div>
      </div>
    </div>
  );
}
