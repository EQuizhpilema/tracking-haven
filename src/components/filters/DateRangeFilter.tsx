
import React from 'react';
import { Button } from "@/components/ui/button";
import { CalendarDays } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface DateRangeFilterProps {
  dateRange: string;
  startDate?: Date;
  endDate?: Date;
  onDateRangeChange: (value: string) => void;
  onStartDateChange: (date?: Date) => void;
  onEndDateChange: (date?: Date) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  dateRange,
  startDate,
  endDate,
  onDateRangeChange,
  onStartDateChange,
  onEndDateChange
}) => {
  // Function to get the displayed text based on the current dateRange
  const getDateRangeDisplayText = () => {
    switch (dateRange) {
      case 'last7':
        return 'Last 7 Days';
      case 'last14':
        return 'Last 14 Days';
      case 'last30':
        return 'Last 30 Days';
      default:
        return 'Select Date Range';
    }
  };

  return (
    <div className="mb-6">
      <div className="text-base font-medium mb-2">Date Range</div>
      
      <div className="space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between"
            >
              {getDateRangeDisplayText()}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => onDateRangeChange('last7')}>
              Last 7 Days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDateRangeChange('last14')}>
              Last 14 Days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDateRangeChange('last30')}>
              Last 30 Days
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={
                  "w-full justify-start text-left font-normal" +
                  (startDate && endDate ? " !text-foreground" : " text-muted-foreground")
                }
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {startDate && endDate ? (
                  <span>
                    {format(startDate, "MMM dd, yyyy")} - {format(endDate, "MMM dd, yyyy")}
                  </span>
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={startDate ? startDate : new Date()}
                selected={{
                  from: startDate,
                  to: endDate,
                }}
                onSelect={(range) => {
                  if (range?.from) {
                    onStartDateChange(range.from);
                  }
                  if (range?.to) {
                    onEndDateChange(range.to);
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
