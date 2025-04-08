
import React, { useEffect } from 'react';
import ShipmentTable from '../ShipmentTable';
import ShipmentCard from '../ShipmentCard';
import { ShipmentData } from '@/data/shipmentData';

interface ShipmentContentProps {
  data: ShipmentData[];
  isMobile: boolean;
}

const ShipmentContent: React.FC<ShipmentContentProps> = ({ data, isMobile }) => {
  useEffect(() => {
    console.log('ShipmentContent data on mount:', data);
    console.log('Data type:', typeof data);
    console.log('Is Array:', Array.isArray(data));
    console.log('Data length:', data?.length);
  }, [data]);
  
  // Ensure data is an array and not empty
  const validData = Array.isArray(data) && data.length > 0 ? data : [];
  
  return (
    <>
      {isMobile ? (
        <div className="space-y-4">
          {validData.length > 0 ? (
            validData.map((shipment) => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))
          ) : (
            <div className="text-center py-8">No shipment data available</div>
          )}
        </div>
      ) : (
        <ShipmentTable data={validData} />
      )}
    </>
  );
};

export default ShipmentContent;
