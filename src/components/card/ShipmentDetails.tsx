
import React from 'react';
import { ShipmentData } from '@/data/shipmentData';
import { CheckCircle, XCircle } from 'lucide-react';

interface ShipmentDetailsProps {
  shipment: ShipmentData;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({ shipment }) => {
  // Format delivery date and time to show date on first line and time on second line
  const formatDeliveryDateTime = () => {
    if (!shipment.deliveryDateTime) return '-';
    
    // Check if the delivery date time contains both date and time components
    if (shipment.deliveryDateTime.includes(' ')) {
      const [date, time] = shipment.deliveryDateTime.split(' ');
      return (
        <>
          <div>{date}</div>
          <div>{time}</div>
        </>
      );
    }
    
    return shipment.deliveryDateTime;
  };

  // Format the status to display "Delivery Exception" if it includes "Delayed"
  let displayStatus = shipment.status.includes("Delayed") 
    ? "Delivery Exception" 
    : shipment.status;
  
  // Remove date information from the status
  displayStatus = displayStatus.replace(/ on \d{2}\/\d{2}\/\d{2}/, '');

  return (
    <div className="space-y-2 text-sm">
      <div>{shipment.shipper}</div>
      
      <div className="font-medium text-blue-600">
        <a href={`#${shipment.shipmentNumber}`} className="hover:underline">
          {shipment.shipmentNumber}
        </a>
      </div>
      
      <div>{shipment.bolRefs}</div>
      
      <div>{shipment.puPartnerPro || '-'}</div>
      
      <div>{shipment.delPartnerPro || '-'}</div>
      
      <div>{shipment.shipDate}</div>
      
      <div>{formatDeliveryDateTime()}</div>
      
      <div>{shipment.etaDate}</div>
      
      <div>{shipment.shipTo}</div>
      
      <div>{shipment.shipperCity}</div>
      
      <div>{shipment.consigneeCity}</div>
      
      <div>{shipment.province}</div>
      
      <div>{shipment.zip}</div>
      
      <div>{displayStatus}</div>
      
      <div>
        {shipment.onTime === 'Yes' ? (
          <CheckCircle className="h-4 w-4 text-tracking-success inline-block" />
        ) : shipment.onTime === 'No' ? (
          <XCircle className="h-4 w-4 text-tracking-danger inline-block" />
        ) : (
          '-'
        )}
      </div>
    </div>
  );
};

export default ShipmentDetails;

