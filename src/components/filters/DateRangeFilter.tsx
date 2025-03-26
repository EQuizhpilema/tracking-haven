
import React from 'react';
import { Button } from "@/components/ui/button";
import { CalendarDays } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

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
  return (
    <div className="mb-6">
      <div className="text-base font-medium mb-2">Date Range</div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Button
            variant={dateRange === 'last7' ? "default" : "outline"}
            size="sm"
            onClick={() => onDateRangeChange('last7')}
            className={dateRange === 'last7' ? 'bg-primary text-primary-foreground' : ''}
          >
            Last 7 Days
          </Button>
          <Button
            variant={dateRange === 'last14' ? "default" : "outline"}
            size="sm"
            onClick={() => onDateRangeChange('last14')}
            className={dateRange === 'last14' ? 'bg-primary text-primary-foreground' : ''}
          >
            Last 14 Days
          </Button>
          <Button
            variant={dateRange === 'last30' ? "default" : "outline"}
            size="sm"
            onClick={() => onDateRangeChange('last30')}
            className={dateRange === 'last30' ? 'bg-primary text-primary-foreground' : ''}
          >
            Last 30 Days
          </Button>
        </div>

        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={
                  "w-[300px] justify-start text-left font-normal" +
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
