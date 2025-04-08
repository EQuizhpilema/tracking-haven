
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { ShipmentData } from '@/data/shipmentData';
import ShipmentHeader from './card/ShipmentHeader';
import ShipmentDetails from './card/ShipmentDetails';

interface ShipmentCardProps {
  shipment: ShipmentData;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment }) => {
  if (!shipment || !shipment.id) {
    console.error('Invalid shipment data received:', shipment);
    return <div className="p-4 text-red-500">Invalid shipment data</div>;
  }
  
  console.log('ShipmentCard received shipment:', shipment);
  
  return (
    <div className="flex flex-col justify-center py-4 border rounded-lg p-4 shadow-sm">
      <ShipmentHeader shipment={shipment} />
      <ShipmentDetails shipment={shipment} />
      <Separator className="mt-2 bg-gray-200" />
    </div>
  );
};

export default ShipmentCard;
