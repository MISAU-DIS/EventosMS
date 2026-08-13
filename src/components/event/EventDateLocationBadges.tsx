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
      <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{eventConfig.dateRange}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>
            {eventConfig.location}, {eventConfig.province}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
      <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full">
        <Calendar className="w-5 h-5 text-orange-600" />
        <span className="font-semibold">{eventConfig.dateRange}</span>
      </div>
      <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full">
        <MapPin className="w-5 h-5 text-orange-600" />
        <span className="font-semibold">
          {eventConfig.location}, {eventConfig.province}
        </span>
      </div>
    </div>
  );
}
