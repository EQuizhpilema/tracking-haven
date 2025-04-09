
import React, { useEffect, useState } from 'react';
import ShipmentTable from '../ShipmentTable';
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
        <div className="space-y-0 text-sm">
          {/* Mobile header row */}
          <div className="grid grid-cols-4 gap-1 bg-gray-100 py-2 px-1 font-semibold text-xs sticky top-0 z-10">
            <div>Ship Date</div>
            <div>Shipment #</div>
            <div>Status</div>
            <div>On Time</div>
          </div>
          
          {hasData ? (
            displayData.map((shipment) => (
              <React.Fragment key={shipment.id}>
                {/* Mobile data row */}
                <div className="grid grid-cols-4 gap-1 py-2 px-1 text-xs hover:bg-gray-50">
                  <div>{shipment.shipDate}</div>
                  <div className="text-blue-600">
                    <a href={`#${shipment.shipmentNumber}`} className="hover:underline">
                      {shipment.shipmentNumber.substring(0, 8)}
                    </a>
                  </div>
                  <div>{shipment.status.replace(/ on \d{2}\/\d{2}\/\d{2}/, '')}</div>
                  <div className="text-center">
                    {shipment.onTime === 'Yes' ? (
                      <span className="text-tracking-success">✓</span>
                    ) : shipment.onTime === 'No' ? (
                      <span className="text-tracking-danger">✗</span>
                    ) : (
                      '-'
                    )}
                  </div>
                </div>
                
                {/* Detail row that expands on tap (optional) */}
                <div className="grid grid-cols-2 gap-x-2 px-1 pb-2 text-xs text-gray-700">
                  <div>
                    <span className="font-medium">Shipper:</span> {shipment.shipper}
                  </div>
                  <div>
                    <span className="font-medium">Consignee:</span> {shipment.shipTo}
                  </div>
                  <div>
                    <span className="font-medium">ETA:</span> {shipment.etaDate}
                  </div>
                  <div>
                    <span className="font-medium">Del:</span> {shipment.deliveryDateTime || 'TBD'}
                  </div>
                </div>
                
                <Separator className="my-0 bg-gray-200" />
              </React.Fragment>
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
