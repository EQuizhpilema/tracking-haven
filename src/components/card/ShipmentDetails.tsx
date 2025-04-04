
import React from 'react';
import { ShipmentData } from '@/data/shipmentData';

interface ShipmentDetailsProps {
  shipment: ShipmentData;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({ shipment }) => {
  return (
    <div className="text-sm mb-4">
      <div className="mb-1">
        {shipment.shipperCity} To {shipment.consigneeCity}, {shipment.province}
      </div>
      <div className="font-medium">
        {shipment.deliveryDateTime || shipment.etaDate}
      </div>
    </div>
  );
};

export default ShipmentDetails;
