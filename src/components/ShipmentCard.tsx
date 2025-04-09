
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { ShipmentData } from '@/data/shipmentData';
import ShipmentHeader from './card/ShipmentHeader';
import ShipmentDetails from './card/ShipmentDetails';
import { Card, CardContent } from "@/components/ui/card";

interface ShipmentCardProps {
  shipment: ShipmentData;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment }) => {
  // More robust error checking
  if (!shipment || typeof shipment !== 'object') {
    console.error('Invalid shipment data received (not an object):', shipment);
    return (
      <Card className="p-4 border rounded-lg shadow-sm">
        <CardContent className="text-red-500 p-0 pt-2">
          <p>Invalid shipment data</p>
          {shipment !== undefined && (
            <p className="text-xs mt-1">Details: {JSON.stringify(shipment)}</p>
          )}
        </CardContent>
      </Card>
    );
  }
  
  if (!shipment.id) {
    console.error('Invalid shipment data received (missing ID):', shipment);
    return (
      <Card className="p-4 border rounded-lg shadow-sm">
        <CardContent className="text-red-500 p-0 pt-2">
          <p>Invalid shipment data (missing ID)</p>
          <p className="text-xs mt-1">Details: {JSON.stringify(shipment)}</p>
        </CardContent>
      </Card>
    );
  }
  
  // Verify all required fields exist
  const requiredFields = ['shipper', 'shipmentNumber', 'status'];
  const missingFields = requiredFields.filter(field => !shipment[field as keyof ShipmentData]);
  
  if (missingFields.length > 0) {
    console.error(`Shipment missing required fields: ${missingFields.join(', ')}`, shipment);
    return (
      <Card className="p-4 border rounded-lg shadow-sm">
        <CardContent className="text-red-500 p-0 pt-2">
          <p>Incomplete shipment data (missing: {missingFields.join(', ')})</p>
          <p className="text-xs mt-1">ID: {shipment.id}</p>
        </CardContent>
      </Card>
    );
  }
  
  console.log('ShipmentCard rendering shipment ID:', shipment.id);
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <ShipmentHeader shipment={shipment} />
        <ShipmentDetails shipment={shipment} />
        <Separator className="mt-2 bg-gray-200" />
      </CardContent>
    </Card>
  );
};

export default ShipmentCard;
