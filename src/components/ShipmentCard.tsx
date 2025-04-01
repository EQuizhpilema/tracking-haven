
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { ShipmentData } from '../data/shipmentData';
import { cn } from '@/lib/utils';

interface ShipmentCardProps {
  shipment: ShipmentData;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment }) => {
  return (
    <div className="py-3">
      <div className="mb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold">{shipment.shipper}</h3>
            <div className="text-blue-600">{shipment.shipmentNumber}</div>
            <div className="text-sm text-gray-600">
              BOL/Ref# {shipment.bolRefs}
            </div>
          </div>
          <div className="font-medium text-gray-700">
            {shipment.status}
          </div>
        </div>
      </div>
      <div className="text-sm">
        <div className="mb-1">
          {shipment.shipperCity} To {shipment.consigneeCity}, {shipment.province}
        </div>
        <div className="font-medium">
          Estimated Delivery {shipment.etaDate}
        </div>
      </div>
      <Separator className="mt-3 bg-gray-200" />
    </div>
  );
};

export default ShipmentCard;
