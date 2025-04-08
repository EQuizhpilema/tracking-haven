
import React from 'react';
import ShipmentTable from '../ShipmentTable';
import ShipmentCard from '../ShipmentCard';
import { ShipmentData } from '@/data/shipmentData';

interface ShipmentContentProps {
  data: ShipmentData[];
  isMobile: boolean;
}

const ShipmentContent: React.FC<ShipmentContentProps> = ({ data, isMobile }) => {
  return (
    <>
      {isMobile ? (
        <div className="space-y-4">
          {data.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))}
        </div>
      ) : (
        <ShipmentTable data={data} />
      )}
    </>
  );
};

export default ShipmentContent;
