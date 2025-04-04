
import React from 'react';
import { ShipmentData } from '@/data/shipmentData';

interface ShipmentHeaderProps {
  shipment: ShipmentData;
}

const ShipmentHeader: React.FC<ShipmentHeaderProps> = ({ shipment }) => {
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
        <div className="font-medium text-gray-700">
          {shipment.status}
        </div>
      </div>
    </div>
  );
};

export default ShipmentHeader;
