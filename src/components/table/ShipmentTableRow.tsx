
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { ShipmentData } from '@/data/shipmentData';
import { CheckCircle, XCircle } from 'lucide-react';

interface ShipmentTableRowProps {
  shipment: ShipmentData;
}

const ShipmentTableRow: React.FC<ShipmentTableRowProps> = ({ shipment }) => {
  // Format the status to display "Delivery Exception" if it includes "Delayed"
  let displayStatus = shipment.status.includes("Delayed") 
    ? "Delivery Exception" 
    : shipment.status;
  
  // Remove date information from the status
  displayStatus = displayStatus.replace(/ on \d{2}\/\d{2}\/\d{2}/, '');

  // Format delivery date and time to show date on first line and time on second line
  const formatDeliveryDateTime = () => {
    if (!shipment.deliveryDateTime) return '-';
    
    // Check if the delivery date time contains both date and time components
    if (shipment.deliveryDateTime.includes(' ')) {
      const [date, time] = shipment.deliveryDateTime.split(' ');
      return (
        <>
          <div>{date}</div>
          <div>{time}</div>
        </>
      );
    }
    
    return shipment.deliveryDateTime;
  };

  return (
    <TableRow key={shipment.id} className="h-[36px] text-xs">
      <TableCell className="p-2 whitespace-nowrap">{shipment.shipDate}</TableCell>
      <TableCell className="p-2">{formatDeliveryDateTime()}</TableCell>
      <TableCell className="p-2 whitespace-nowrap">{shipment.etaDate}</TableCell>
      <TableCell className="p-2 whitespace-nowrap font-medium text-blue-600">
        <a href={`#${shipment.shipmentNumber}`} className="hover:underline">
          {shipment.shipmentNumber}
        </a>
      </TableCell>
      <TableCell className="p-2 whitespace-nowrap">{shipment.bolRefs}</TableCell>
      <TableCell className="p-2 whitespace-nowrap">{shipment.shipper}</TableCell>
      <TableCell className="p-2 whitespace-nowrap">{shipment.shipperCity}</TableCell>
      <TableCell className="p-2 whitespace-nowrap">{shipment.shipTo}</TableCell>
      <TableCell className="p-2 whitespace-nowrap">{shipment.consigneeCity}</TableCell>
      <TableCell className="p-2 whitespace-nowrap">{shipment.province}</TableCell>
      <TableCell className="p-2 whitespace-nowrap">{shipment.zip}</TableCell>
      <TableCell className="p-2 whitespace-nowrap">{displayStatus}</TableCell>
      <TableCell className="p-2 whitespace-nowrap">{shipment.puPartnerPro || '-'}</TableCell>
      <TableCell className="p-2 whitespace-nowrap">{shipment.delPartnerPro || '-'}</TableCell>
      <TableCell className="p-2 whitespace-nowrap text-center">
        {shipment.onTime === 'Yes' ? (
          <CheckCircle className="h-4 w-4 text-tracking-success inline-block" />
        ) : shipment.onTime === 'No' ? (
          <XCircle className="h-4 w-4 text-tracking-danger inline-block" />
        ) : (
          '-'
        )}
      </TableCell>
    </TableRow>
  );
};

export default ShipmentTableRow;
