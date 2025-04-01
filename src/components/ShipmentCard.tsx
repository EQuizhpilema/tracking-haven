
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { ShipmentData } from '../data/shipmentData';
import { cn } from '@/lib/utils';

interface ShipmentCardProps {
  shipment: ShipmentData;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment }) => {
  const getStatusClassName = (status: string) => {
    switch(status) {
      case 'Routed':
        return 'text-blue-600';
      case 'Shipment Created':
        return 'text-tracking-warning';
      case 'In Transit':
        return 'text-purple-600';
      case 'Delivered':
        return 'text-tracking-success';
      case 'Exception':
        return 'text-tracking-danger';
      default:
        return '';
    }
  };

  return (
    <div className="py-4">
      <div className="mb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold">{shipment.shipper}</h3>
            <div className="text-blue-600">{shipment.shipmentNumber}</div>
            <div className="text-sm text-gray-600">
              BOL/Ref# {shipment.bolRefs}
            </div>
          </div>
          <div className={cn("font-medium", getStatusClassName(shipment.status))}>
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
      <Separator className="mt-4 bg-gray-200" />
    </div>
  );
};

export default ShipmentCard;
