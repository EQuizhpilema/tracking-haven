
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { dateRangeOptions, serviceTypeOptions } from '../data/shipmentData';
import { Calendar as CalendarIcon, Search, Info } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [consigneeToggle, setConsigneeToggle] = useState(true);
  const [billToPartyToggle, setBillToPartyToggle] = useState(true);
  const [deliveredToggle, setDeliveredToggle] = useState(true);
  const [undeliveredToggle, setUndeliveredToggle] = useState(true);
  const [pickupsToggle, setPickupsToggle] = useState(true);

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
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
      
      <div className="mb-6">
        <div className="text-sm font-medium mb-2">View Shipments When You Are:</div>
        <TooltipProvider>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span>Shipper</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className="h-4 w-4 p-0 ml-1">
                      <Info className="h-3 w-3 text-muted-foreground" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    You are listed as the originator of the shipment — responsible for initiating the freight movement.
                  </TooltipContent>
                </Tooltip>
              </div>
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
              <div className="flex items-center">
                <span>Consignee</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className="h-4 w-4 p-0 ml-1">
                      <Info className="h-3 w-3 text-muted-foreground" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    You are the designated recipient of the shipment — responsible for receiving the goods at the destination.
                  </TooltipContent>
                </Tooltip>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={consigneeToggle} 
                  onChange={() => setConsigneeToggle(!consigneeToggle)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span>Bill To Party</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className="h-4 w-4 p-0 ml-1">
                      <Info className="h-3 w-3 text-muted-foreground" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    You are assigned as the party responsible for payment of the freight charges associated with the shipment.
                  </TooltipContent>
                </Tooltip>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={billToPartyToggle} 
                  onChange={() => setBillToPartyToggle(!billToPartyToggle)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </TooltipProvider>
      </div>
      
      <div className="mb-6">
        <div className="text-sm font-medium mb-2">View by Shipment Status</div>
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
          <div className="flex items-center justify-between">
            <span>Pickups</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={pickupsToggle} 
                onChange={() => setPickupsToggle(!pickupsToggle)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
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
