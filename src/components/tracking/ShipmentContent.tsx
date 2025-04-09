
import React, { useEffect, useState } from 'react';
import ShipmentTable from '../ShipmentTable';
import ShipmentCard from '../ShipmentCard';
import { ShipmentData, getShipmentData } from '@/data/shipmentData';
import { Separator } from "@/components/ui/separator";

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
        <div className="space-y-2">
          {hasData ? (
            displayData.map((shipment) => (
              <div key={shipment.id} className="py-3">
                <div className="font-medium text-blue-600">
                  <a href={`#${shipment.shipmentNumber}`} className="hover:underline">
                    {shipment.shipmentNumber}
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-x-2 text-sm mt-1">
                  <div>
                    <span className="text-gray-500">Shipper:</span> {shipment.shipper}
                  </div>
                  <div>
                    <span className="text-gray-500">Consignee:</span> {shipment.shipTo}
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span> {shipment.status.replace(/ on \d{2}\/\d{2}\/\d{2}/, '')}
                  </div>
                  <div>
                    <span className="text-gray-500">Delivery:</span> {shipment.deliveryDateTime || 'TBD'}
                  </div>
                </div>
                <Separator className="mt-3 bg-gray-200" />
              </div>
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
