import { Calendar, MapPin } from "lucide-react";
import { eventConfig } from "@/data";

type EventDateLocationBadgesProps = {
  variant?: "pill" | "inline";
};

export default function EventDateLocationBadges({
  variant = "pill",
}: EventDateLocationBadgesProps) {
  if (variant === "inline") {
    return (
      <div className="flex flex-col sm:flex-row flex-wrap justify-start sm:justify-center items-start sm:items-center gap-3 sm:gap-4 text-sm sm:text-base text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 shrink-0" />
          <span>{eventConfig.dateRange}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 shrink-0" />
          <span>
            {eventConfig.location}, {eventConfig.province}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-start sm:justify-center items-stretch sm:items-center gap-3 sm:gap-6 text-sm sm:text-base text-gray-600">
      <div className="flex items-center gap-2 bg-misau-50 px-4 py-2.5 rounded-full justify-center sm:justify-start">
        <Calendar className="w-5 h-5 text-misau-gold shrink-0" />
        <span className="font-semibold">{eventConfig.dateRange}</span>
      </div>
      <div className="flex items-center gap-2 bg-misau-50 px-4 py-2.5 rounded-full justify-center sm:justify-start">
        <MapPin className="w-5 h-5 text-misau-gold shrink-0" />
        <span className="font-semibold text-center sm:text-left">
          {eventConfig.location}, {eventConfig.province}
        </span>
      </div>
    </div>
  );
}
