
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { ShipmentData } from '../data/shipmentData';
import { cn } from '@/lib/utils';

interface ShipmentCardProps {
  shipment: ShipmentData;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment }) => {
  return (
    <div className="flex flex-col justify-center py-4">
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
      <div className="text-sm mb-4">
        <div className="mb-1">
          {shipment.shipperCity} To {shipment.consigneeCity}, {shipment.province}
        </div>
        <div className="font-medium">
          {shipment.deliveryTime} {shipment.etaDate}
        </div>
      </div>
      <Separator className="mt-2 bg-gray-200" />
    </div>
  );
};

export default ShipmentCard;
