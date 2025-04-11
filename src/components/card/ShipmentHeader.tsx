import React from 'react';
import { ShipmentData } from '@/data/shipmentData';
import { CheckCircle, Truck, Building } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ShipmentHeaderProps {
  shipment: ShipmentData;
}

const ShipmentHeader: React.FC<ShipmentHeaderProps> = ({ shipment }) => {
  // Function to extract just the status without the date
  const getStatusText = (status: string) => {
    // Common status patterns to extract
    const statusPatterns = [
      'Delivered',
      'Out For Delivery',
      'In Transit',
      'Arrived at Dest Terminal',
      'Picked Up',
      'Delayed'
    ];
    
    // Find the first status pattern that matches
    for (const pattern of statusPatterns) {
      if (status.includes(pattern)) {
        return pattern;
      }
    }
    
    // If no pattern matches, return the first part of the status (before "on" or "-")
    if (status.includes(' on ')) {
      return status.split(' on ')[0].trim();
    }
    
    if (status.includes(' - ')) {
      return status.split(' - ')[0].trim();
    }
    
    return status;
  };

  const isDelivered = shipment.status.includes('Delivered');
  const statusText = getStatusText(shipment.status);

  return (
    <div className="mb-3">
      <div className="flex justify-between items-start pr-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Consignee</div>
          <h3 className="font-bold">{shipment.shipTo}</h3>
          <div className="text-blue-600">
            <a href={`#${shipment.shipmentNumber}`} className="hover:underline">
              {shipment.shipmentNumber}
            </a>
          </div>
          <div className="text-sm text-gray-600">
            BOL/Ref# {shipment.bolRefs}
          </div>
          {shipment.puPartnerPro && (
            <div className="text-sm text-gray-600">
              PU PARTNER PRO {shipment.puPartnerPro}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end text-right">
          <span className="text-md font-semibold text-black">
            {statusText}
          </span>
          <div className="mt-1">
            {isDelivered ? (
              <CheckCircle size={24} className="text-tracking-success" />
            ) : (
              <Truck size={24} className="text-tracking-blue" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentHeader;
