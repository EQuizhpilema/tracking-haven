
import React from 'react';
import { ShipmentData } from '@/data/shipmentData';
import { format, parse } from 'date-fns';
import { Truck, CheckCircle } from 'lucide-react';

interface ShipmentDetailsProps {
  shipment: ShipmentData;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({ shipment }) => {
  // Format the bottom line based on status
  const getDeliveryInfo = () => {
    const inTransitStatuses = [
      'In Transit', 
      'Arrived at Dest Terminal', 
      'Picked Up', 
      'Out For Delivery'
    ];
    
    // Check if the status contains any of the inTransitStatuses
    const isInTransit = inTransitStatuses.some(status => 
      shipment.status.includes(status)
    );
    
    if (shipment.status.includes('Delivered')) {
      // For delivered shipments, show actual delivery time in green
      try {
        if (shipment.deliveryDateTime) {
          // Extract date and time from the format "04/04/25 08:35 AM"
          const parts = shipment.deliveryDateTime.split(' ');
          if (parts.length >= 2) {
            const datePart = parts[0]; // "04/04/25"
            const dateObj = parse(datePart, 'MM/dd/yy', new Date());
            
            // Format the date as "Fri Apr 4"
            const formattedDate = format(dateObj, 'EEE MMM d');
            
            // Get the time part (and possibly AM/PM)
            const timePart = parts.slice(1).join(' '); // "08:35 AM"
            
            return (
              <div className="font-medium text-tracking-success">
                Actual Delivery {formattedDate} {timePart}
              </div>
            );
          }
        }
        return (
          <div className="font-medium text-tracking-success">
            Actual Delivery {shipment.deliveryDateTime || 'Date unavailable'}
          </div>
        );
      } catch (error) {
        console.error('Error parsing date:', error);
        return (
          <div className="font-medium text-tracking-success">
            Actual Delivery {shipment.deliveryDateTime || 'Date unavailable'}
          </div>
        );
      }
    } else if (isInTransit && shipment.etaDate) {
      // For in-transit shipments, show estimated delivery in bold black
      try {
        // Parse the date string in format "04/03/25"
        const dateObj = parse(shipment.etaDate, 'MM/dd/yy', new Date());
        
        // Format the date as "Tue May 19"
        const formattedDate = format(dateObj, 'EEE MMM d');
        
        return (
          <div className="font-bold text-black">
            Estimated Delivery {formattedDate}
          </div>
        );
      } catch (error) {
        console.error('Error parsing date:', error);
        return (
          <div className="font-bold text-black">
            Estimated Delivery {shipment.etaDate}
          </div>
        );
      }
    } else {
      // Default case
      return (
        <div className="font-medium">
          {shipment.deliveryDateTime || shipment.etaDate || 'Date unavailable'}
        </div>
      );
    }
  };

  return (
    <div className="text-sm mb-4">
      <div className="flex justify-between">
        <div>
          <div className="mb-1">
            {shipment.shipperCity} To {shipment.consigneeCity}, {shipment.province}
          </div>
          {getDeliveryInfo()}
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
