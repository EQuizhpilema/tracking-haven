
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { dateRangeOptions, serviceTypeOptions } from '../data/shipmentData';
import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  onApplyFilter: () => void;
  onResetFilter: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  onApplyFilter, 
  onResetFilter 
}) => {
  const [dateRange, setDateRange] = useState('last7');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [serviceType, setServiceType] = useState('all');
  const [shipperToggle, setShipperToggle] = useState(true);
  const [shipToToggle, setShipToToggle] = useState(true);
  const [billerToggle, setBillerToggle] = useState(true);
  const [deliveredToggle, setDeliveredToggle] = useState(true);
  const [undeliveredToggle, setUndeliveredToggle] = useState(true);

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    // Logic to set date range based on selection
    const today = new Date();
    
    if (value === 'last7') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      setStartDate(sevenDaysAgo);
      setEndDate(today);
    } else if (value === 'last14') {
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(today.getDate() - 14);
      setStartDate(fourteenDaysAgo);
      setEndDate(today);
    } else if (value === 'last30') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      setStartDate(thirtyDaysAgo);
      setEndDate(today);
    }
  };

  return (
    <div className="bg-white w-64 border-r border-gray-200 p-4 h-full animate-fade-in">
      <div className="text-lg font-medium mb-6">Advanced Search Fields</div>
      
      {/* Date Range Section */}
      <div className="mb-6">
        <div className="text-sm font-medium mb-2">Date Range</div>
        <Select value={dateRange} onValueChange={handleDateRangeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            {dateRangeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Custom Date Range */}
        {dateRange === 'custom' && (
          <div className="mt-2 space-y-2">
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "MM/dd/yy") : "Start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "MM/dd/yy") : "End date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </div>
      
      {/* Service Type Section */}
      <div className="mb-6">
        <div className="text-sm font-medium mb-2">Service Type</div>
        <Select value={serviceType} onValueChange={setServiceType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select service type" />
          </SelectTrigger>
          <SelectContent>
            {serviceTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* View Shipments When You Are Section (Previously Billing Type) */}
      <div className="mb-6">
        <div className="text-sm font-medium mb-2">View Shipments When You Are:</div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Shipper</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={shipperToggle} 
                onChange={() => setShipperToggle(!shipperToggle)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>Ship-To</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={shipToToggle} 
                onChange={() => setShipToToggle(!shipToToggle)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>Biller</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={billerToggle} 
                onChange={() => setBillerToggle(!billerToggle)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Delivery Type Section */}
      <div className="mb-6">
        <div className="text-sm font-medium mb-2">Delivery Type</div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Delivered</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={deliveredToggle} 
                onChange={() => setDeliveredToggle(!deliveredToggle)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>Undelivered</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={undeliveredToggle} 
                onChange={() => setUndeliveredToggle(!undeliveredToggle)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Filter Action Buttons */}
      <div className="space-y-2">
        <Button 
          className="w-full bg-tracking-blue hover:bg-blue-600 transition-colors"
          onClick={onApplyFilter}
        >
          <Search className="mr-2 h-4 w-4" />
          Apply Filter
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onResetFilter}
        >
          Reset Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
