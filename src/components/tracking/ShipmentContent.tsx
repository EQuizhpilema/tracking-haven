
import React, { useEffect, useState } from 'react';
import ShipmentTable from '../ShipmentTable';
import ShipmentCard from '../ShipmentCard';
import { ShipmentData, getShipmentData } from '@/data/shipmentData';

interface ShipmentContentProps {
  data: ShipmentData[];
  isMobile: boolean;
}

const ShipmentContent: React.FC<ShipmentContentProps> = ({ data, isMobile }) => {
  // Defensive fallback state in case data prop is null/undefined
  const [displayData, setDisplayData] = useState<ShipmentData[]>([]);
  
  useEffect(() => {
    console.log('ShipmentContent mounting with data:', data);
    console.log('ShipmentContent data type:', typeof data);
    console.log('ShipmentContent isArray:', Array.isArray(data));
    console.log('ShipmentContent data length:', data?.length);
    
    // Handle data prop validation and fallback
    if (Array.isArray(data) && data.length > 0) {
      console.log('ShipmentContent: Valid data received, using it');
      setDisplayData(data);
    } else {
      console.warn('ShipmentContent: Invalid or empty data received, using fallback data');
      // Use fallback data directly from source
      const fallbackData = getShipmentData();
      console.log('ShipmentContent: Fallback data length:', fallbackData.length);
      setDisplayData(fallbackData);
    }
  }, [data]);
  
  // Ensure we have data to display
  const hasData = displayData && Array.isArray(displayData) && displayData.length > 0;
  
  return (
    <>
      {isMobile ? (
        <div className="space-y-4">
          {hasData ? (
            displayData.map((shipment) => (
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
        <ShipmentTable data={hasData ? displayData : []} />
      )}
    </>
  );
};

export default ShipmentContent;
