import React from 'react';
import { Button } from "@/components/ui/button";
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ShipperRoleFilterProps {
  shipperToggle: boolean;
  consigneeToggle: boolean;
  billToPartyToggle: boolean;
  onShipperToggle: () => void;
  onConsigneeToggle: () => void;
  onBillToPartyToggle: () => void;
}

const ShipperRoleFilter: React.FC<ShipperRoleFilterProps> = ({
  shipperToggle,
  consigneeToggle,
  billToPartyToggle,
  onShipperToggle,
  onConsigneeToggle,
  onBillToPartyToggle
}) => {
  return (
    <div className="mb-6">
      <div className="text-base font-medium mb-2">View Shipments Where You Are the:</div>
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
                onChange={onShipperToggle} 
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
                onChange={onConsigneeToggle} 
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
                onChange={onBillToPartyToggle} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ShipperRoleFilter;
