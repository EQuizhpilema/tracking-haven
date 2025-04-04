
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
      {/* Reordered for mobile view: Shipper, Shipment Number, BOL/Reference, PU Partner Pro, Delivery Partner Pro */}
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">Shipper:</span>
        <span className="text-right">{shipment.shipper}</span>
      </div>
      
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">Shipment #:</span>
        <span className="text-right font-medium text-blue-600">
          <a href={`#${shipment.shipmentNumber}`} className="hover:underline">
            {shipment.shipmentNumber}
          </a>
        </span>
      </div>
      
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">BOL / Reference #:</span>
        <span className="text-right">{shipment.bolRefs}</span>
      </div>
      
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">PU Partner Pro:</span>
        <span className="text-right">{shipment.puPartnerPro || '-'}</span>
      </div>
      
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">Del Partner Pro:</span>
        <span className="text-right">{shipment.delPartnerPro || '-'}</span>
      </div>
      
      {/* Additional details below the key information */}
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">Ship Date:</span>
        <span className="text-right">{shipment.shipDate}</span>
      </div>
      
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">Delivery Date & Time:</span>
        <span className="text-right">{formatDeliveryDateTime()}</span>
      </div>
      
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">ETA Date:</span>
        <span className="text-right">{shipment.etaDate}</span>
      </div>
      
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">Ship To:</span>
        <span className="text-right">{shipment.shipTo}</span>
      </div>
      
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">Shipper City:</span>
        <span className="text-right">{shipment.shipperCity}</span>
      </div>
      
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">Consignee City:</span>
        <span className="text-right">{shipment.consigneeCity}</span>
      </div>
      
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">State:</span>
        <span className="text-right">{shipment.province}</span>
      </div>
      
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">Zip:</span>
        <span className="text-right">{shipment.zip}</span>
      </div>
      
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">Status:</span>
        <span className="text-right">{displayStatus}</span>
      </div>
      
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600">On Time:</span>
        <span className="text-right">
          {shipment.onTime === 'Yes' ? (
            <CheckCircle className="h-4 w-4 text-tracking-success inline-block" />
          ) : shipment.onTime === 'No' ? (
            <XCircle className="h-4 w-4 text-tracking-danger inline-block" />
          ) : (
            '-'
          )}
        </span>
      </div>
    </div>
  );
};

export default ShipmentDetails;
