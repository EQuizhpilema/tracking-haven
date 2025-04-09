
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShipmentData, getShipmentData } from '@/data/shipmentData';
import { CheckCircle, XCircle } from 'lucide-react';
import ShipmentTable from '@/components/ShipmentTable';

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
            <TableHead>Route & ETA</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.map((shipment) => {
            // Determine if the shipment has been delivered
            const isDelivered = shipment.status.includes('Delivered');
            
            // Format delivery information based on status
            const deliveryInfo = isDelivered 
              ? `Actual Delivery ${formatDeliveryDate(shipment.deliveryDateTime)}` 
              : `Estimated Delivery ${formatEstimatedDate(shipment.etaDate)}`;
            
            // Format route information (From City, State to City, State)
            const routeInfo = `${shipment.shipperCity}, ${shipment.province} to ${shipment.consigneeCity}, ${shipment.province}`;
            
            return (
              <TableRow key={shipment.id}>
                <TableCell className="font-medium">
                  <div>{shipment.shipmentNumber}</div>
                  <div className="text-xs text-gray-500">{shipment.bolRefs}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{routeInfo}</div>
                  <div className="text-xs text-gray-500">{deliveryInfo}</div>
                </TableCell>
                <TableCell className="text-right">
                  <div>{formatStatus(shipment.status)}</div>
                  {shipment.onTime === 'Yes' ? (
                    <CheckCircle className="h-4 w-4 text-tracking-success inline-block ml-1" />
                  ) : shipment.onTime === 'No' ? (
                    <XCircle className="h-4 w-4 text-tracking-danger inline-block ml-1" />
                  ) : null}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  // Helper function to format the delivery date nicely
  const formatDeliveryDate = (dateTimeString?: string): string => {
    if (!dateTimeString) return 'Date Unknown';
    
    const parts = dateTimeString.split(' ');
    if (parts.length < 2) return dateTimeString;
    
    const datePart = parts[0];
    const timePart = parts[1];
    
    // Convert date to day of week and month/day
    const date = new Date(datePart);
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    const day = date.getDate();
    
    // Format time (assuming HH:MM format)
    const timeFormatted = formatTime(timePart);
    
    return `${dayOfWeek} ${month} ${day} ${timeFormatted}`;
  };
  
  // Helper function to format estimated date
  const formatEstimatedDate = (dateString?: string): string => {
    if (!dateString) return 'Date Unknown';
    
    // Convert date to day of week and month/day
    const date = new Date(dateString);
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    const day = date.getDate();
    
    return `${dayOfWeek} ${month} ${day}`;
  };
  
  // Helper function to format time (converts 24h to 12h with am/pm)
  const formatTime = (timeString: string): string => {
    const timeParts = timeString.split(':');
    if (timeParts.length < 2) return timeString;
    
    const hour = parseInt(timeParts[0], 10);
    const minute = timeParts[1];
    
    const period = hour >= 12 ? 'pm' : 'am';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:${minute} ${period}`;
  };
  
  // Helper function to clean up status text
  const formatStatus = (status: string): string => {
    // Remove date information from the status
    return status.replace(/ on \d{2}\/\d{2}\/\d{2}/, '');
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
