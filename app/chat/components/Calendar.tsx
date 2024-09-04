// app/chat/components/Calendar.tsx
"use client";

import React, { useState } from "react";
import { Calendar } from "@/app/components/ui/calendar";

export function CalendarComp() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md bg-customBlack2 text-foreground"
    />
  );
}
