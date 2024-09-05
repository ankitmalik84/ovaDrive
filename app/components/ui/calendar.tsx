"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/app/libs/utils";
import { buttonVariants } from "@/app/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 justify-center flex", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-between pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 lg:w-[2.75em] sxl:w-8 xl:w-[39px] xxl:w-11 2xl:w-[48px] 3xl:w-14 font-normal text-[0.7rem]",
        row: "flex w-full mt-2",
        cell: "h-7 xl:h-8 2xl:h-10 w-8 lg:w-[2.1em] sxl:w-8 xl:w-[39px] xxl:w-11 2xl:w-[48px] 3xl:w-14 text-center text-[0.9rem] p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 2xl:h-10 w-8 2xl:w-10 p-0 rounded-full font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Caption: ({ displayMonth }) => (
          <div className="flex justify-between items-center p-1">
            <span className="text-xs xl:text-sm font-medium pl-2">
              Chat History
            </span>
            <span className="text-xs xl:text-sm font-medium pr-2">
              {displayMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
