
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="border-t-4 border-t-tracking-blue shadow-sm">
      <CardContent className="p-4">
        <div className="border-b pb-2 mb-2">
          <h3 className="font-bold">{shipment.shipper}</h3>
          <div className="text-blue-600">{shipment.shipmentNumber}</div>
          <div className="text-sm text-gray-600">
            BOL/Ref# {shipment.bolRefs}
          </div>
        </div>
        <div className="text-sm">
          <div className="mb-1">
            {shipment.shipperCity} To {shipment.consigneeCity}, {shipment.province}
          </div>
          <div className="font-medium">
            Estimated Delivery {shipment.etaDate}
          </div>
          <div className={cn("mt-2 font-medium", getStatusClassName(shipment.status))}>
            {shipment.status}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentCard;
