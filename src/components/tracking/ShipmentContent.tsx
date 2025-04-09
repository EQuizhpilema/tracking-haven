import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShipmentData, getShipmentData } from '@/data/shipmentData';
import { CheckCircle, XCircle } from 'lucide-react';

interface ShipmentContentProps {
  data: ShipmentData[];
  isMobile: boolean;
}

const ShipmentContent: React.FC<ShipmentContentProps> = ({ data, isMobile }) => {
  const [displayData, setDisplayData] = useState<ShipmentData[]>([]);
  
  useEffect(() => {
    console.log('ShipmentContent mounting with data:', data);
    
    if (Array.isArray(data) && data.length > 0) {
      console.log('ShipmentContent: Valid data received, using it');
      setDisplayData(data);
    } else {
      console.warn('ShipmentContent: Invalid or empty data received, using fallback data');
      const fallbackData = getShipmentData();
      console.log('ShipmentContent: Fallback data length:', fallbackData.length);
      setDisplayData(fallbackData);
    }
  }, [data]);
  
  const hasData = displayData && Array.isArray(displayData) && displayData.length > 0;
  
  // Mobile view rendering
  const renderMobileTable = () => {
    if (!hasData) {
      return (
        <div className="text-center py-8 border rounded-lg">
          <p className="font-medium text-gray-500">No shipment data available</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search criteria</p>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Shipment</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.map((shipment) => (
            <TableRow key={shipment.id}>
              <TableCell className="font-medium">
                <div>{shipment.shipmentNumber}</div>
                <div className="text-xs text-gray-500">{shipment.shipper}</div>
              </TableCell>
              <TableCell>
                <div>{shipment.shipperCity} to {shipment.consigneeCity}</div>
                <div className="text-xs text-gray-500">ETA: {shipment.etaDate}</div>
              </TableCell>
              <TableCell>
                <div>{shipment.status}</div>
                {shipment.onTime === 'Yes' ? (
                  <CheckCircle className="h-4 w-4 text-tracking-success inline-block" />
                ) : shipment.onTime === 'No' ? (
                  <XCircle className="h-4 w-4 text-tracking-danger inline-block" />
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <>
      {isMobile ? (
        <div className="space-y-0 text-sm">
          {renderMobileTable()}
        </div>
      ) : (
        <ShipmentTable data={hasData ? displayData : []} />
      )}
    </>
  );
};

export default ShipmentContent;
