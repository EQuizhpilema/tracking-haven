
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
    
    if (Array.isArray(data) && data.length > 0) {
      console.log('First item in ShipmentContent:', data[0]);
    } else {
      console.warn('ShipmentContent received empty or invalid data');
    }
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
            <div className="text-center py-8 border rounded-lg">
              <p className="font-medium text-gray-500">No shipment data available</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      ) : (
        <ShipmentTable data={validData} />
      )}
    </>
  );
};

export default ShipmentContent;
