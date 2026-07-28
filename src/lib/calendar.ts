import type { EventConfig } from "@/types/event";

export function buildGoogleCalendarUrl(event: EventConfig): string {
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.calendarTitle,
  )}&details=${encodeURIComponent(event.calendarDetails)}&location=${encodeURIComponent(
    event.calendarLocation,
  )}&dates=${event.calendarDates}`;
}
