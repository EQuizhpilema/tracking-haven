import React from 'react';
import { Button } from "@/components/ui/button";
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ShipmentStatusFilterProps {
  deliveredToggle: boolean;
  undeliveredToggle: boolean;
  pickupsToggle: boolean;
  onDeliveredToggle: () => void;
  onUndeliveredToggle: () => void;
  onPickupsToggle: () => void;
}

const ShipmentStatusFilter: React.FC<ShipmentStatusFilterProps> = ({
  deliveredToggle,
  undeliveredToggle,
  pickupsToggle,
  onDeliveredToggle,
  onUndeliveredToggle,
  onPickupsToggle
}) => {
  return (
    <div className="mb-6">
      <div className="text-base font-medium mb-2">View by Shipment Status</div>
      <TooltipProvider>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span>Delivered</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="h-4 w-4 p-0 ml-1">
                    <Info className="h-3 w-3 text-muted-foreground" />
                    <span className="sr-only">Info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  The shipment has been delivered to the consignee. All LTL freight handling and final delivery confirmations have been completed.
                </TooltipContent>
              </Tooltip>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={deliveredToggle} 
                onChange={onDeliveredToggle} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span>Undelivered</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="h-4 w-4 p-0 ml-1">
                    <Info className="h-3 w-3 text-muted-foreground" />
                    <span className="sr-only">Info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  The shipment has not yet reached final delivery. It may be in transit, at a terminal, or pending delivery scheduling.
                </TooltipContent>
              </Tooltip>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={undeliveredToggle} 
                onChange={onUndeliveredToggle} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span>Pickups</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="h-4 w-4 p-0 ml-1">
                    <Info className="h-3 w-3 text-muted-foreground" />
                    <span className="sr-only">Info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  Shipments that are scheduled for pickup or have been recently picked up and confirmed by the carrier.
                </TooltipContent>
              </Tooltip>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={pickupsToggle} 
                onChange={onPickupsToggle} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ShipmentStatusFilter;
