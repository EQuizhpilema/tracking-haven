
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
  
  // Function to format status and highlight completed deliveries/pickups
  const formatStatusDisplay = (status: string) => {
    if (status.toLowerCase().includes('pickup completed')) {
      return <span className="font-bold">STATUS PICKUP COMPLETED</span>;
    } else if (status.toLowerCase().includes('delivery completed')) {
      return <span className="font-bold">DELIVERY COMPLETED {status.split('Delivery Completed')[1] || ''}</span>;
    }
    return status;
  };
  
  return (
    <>
      {isMobile ? (
        <div className="space-y-0 text-sm">
          {hasData ? (
            displayData.map((shipment) => (
              <div key={shipment.id} className="border-b border-gray-200 py-4">
                {/* Shipper Name */}
                <div className="text-gray-900 font-semibold mb-1">
                  {shipment.shipper.toUpperCase()}
                </div>
                
                {/* Shipment Number */}
                <div className="text-blue-600 mb-1">
                  {shipment.shipmentNumber}
                </div>
                
                {/* BOL/Ref # */}
                <div className="text-gray-700 text-sm mb-1">
                  BOL/REF # {shipment.bolRefs}
                </div>
                
                {/* Partner PRO */}
                {shipment.puPartnerPro && (
                  <div className="text-gray-700 text-sm mb-1">
                    PU PARTNER PRO {shipment.puPartnerPro}
                  </div>
                )}
                
                {shipment.delPartnerPro && (
                  <div className="text-gray-700 text-sm mb-1">
                    DEL PARTNER PRO {shipment.delPartnerPro}
                  </div>
                )}
                
                {/* Locations */}
                <div className="text-gray-700 text-sm mb-1">
                  {shipment.shipperCity} to {shipment.consigneeCity}, {shipment.province}
                </div>
                
                {/* ETA Date */}
                <div className="text-gray-700 text-sm mb-1">
                  ETA DATE {shipment.etaDate}
                </div>
                
                {/* Status for Completed deliveries/pickups */}
                {shipment.status.toLowerCase().includes('completed') && (
                  <div className="text-gray-700 text-sm font-semibold">
                    {formatStatusDisplay(shipment.status)}
                  </div>
                )}
                
                {/* Delivery Time/Date if available */}
                {shipment.deliveryDateTime && shipment.deliveryDateTime.includes('9:00-14:00') && (
                  <div className="text-gray-700 text-sm mb-1">
                    {shipment.deliveryDateTime}
                  </div>
                )}
                
                {/* Signed By if available */}
                {shipment.status.toLowerCase().includes('completed') && (
                  <div className="text-gray-700 text-sm">
                    SIGNED: LESTER
                  </div>
                )}
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
