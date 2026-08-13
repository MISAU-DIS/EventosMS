"use client";

import { useEffect, useState } from "react";

const DAY_MAPPING: Record<string, string> = {
  "9-9": "dia1",
  "10-9": "dia2",
  "11-9": "dia3",
};

export function useSelectedEventDay(defaultDay = "dia1") {
  const [selectedDay, setSelectedDay] = useState(defaultDay);

  useEffect(() => {
    const today = new Date();
    const key = `${today.getDate()}-${today.getMonth() + 1}`;
    const targetDay = DAY_MAPPING[key];
    if (targetDay) {
      setSelectedDay(targetDay);
    }
  }, []);

  return { selectedDay, setSelectedDay };
}
