
import React from 'react';
import { ShipmentData } from '@/data/shipmentData';
import { CheckCircle, Truck } from 'lucide-react';

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
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{shipment.shipper}</h3>
          <div className="text-blue-600">
            <a href={`#${shipment.shipmentNumber}`} className="hover:underline">
              {shipment.shipmentNumber}
            </a>
          </div>
          <div className="text-sm text-gray-600">
            BOL/Ref# {shipment.bolRefs}
          </div>
        </div>
        <div className="flex items-center">
          {isDelivered ? (
            <CheckCircle size={16} className="text-tracking-success mr-1" />
          ) : (
            <Truck size={16} className="text-tracking-blue mr-1" />
          )}
          <span className={`text-sm ${isDelivered ? 'text-tracking-success' : 'text-tracking-blue'}`}>
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShipmentHeader;
