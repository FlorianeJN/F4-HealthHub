"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

interface CalendarProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  disabled?: boolean;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, value, onChange, disabled, ...props }, ref) => {
    const [currentMonth, setCurrentMonth] = React.useState(value || new Date());

    const days = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });

    const previousMonth = () => {
      setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
      setCurrentMonth(addMonths(currentMonth, 1));
    };

    const handleDayClick = (day: Date) => {
      if (disabled) return;
      onChange?.(day);
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-lg border bg-card p-3 shadow-sm", className)}
        {...props}
      >
        <div className="flex items-center justify-between pb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={previousMonth}
            disabled={disabled}
            className="h-7 w-7"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-sm font-semibold">
            {format(currentMonth, "MMMM yyyy", { locale: fr })}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextMonth}
            disabled={disabled}
            className="h-7 w-7"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
          {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            const isSelected = value && isSameDay(day, value);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isCurrentDay = isToday(day);

            return (
              <button
                key={i}
                onClick={() => handleDayClick(day)}
                disabled={disabled || !isCurrentMonth}
                className={cn(
                  "h-8 w-8 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  !isCurrentMonth && "text-muted-foreground opacity-50",
                  isSelected &&
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  isCurrentDay &&
                    !isSelected &&
                    "bg-accent text-accent-foreground"
                )}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Calendar.displayName = "Calendar";

export { Calendar };
