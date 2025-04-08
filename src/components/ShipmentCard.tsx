
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { ShipmentData } from '@/data/shipmentData';
import ShipmentHeader from './card/ShipmentHeader';
import ShipmentDetails from './card/ShipmentDetails';

interface ShipmentCardProps {
  shipment: ShipmentData;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment }) => {
  console.log('ShipmentCard received shipment:', shipment); // Add logging
  
  return (
    <div className="flex flex-col justify-center py-4">
      <ShipmentHeader shipment={shipment} />
      <ShipmentDetails shipment={shipment} />
      <Separator className="mt-2 bg-gray-200" />
    </div>
  );
};

export default ShipmentCard;
