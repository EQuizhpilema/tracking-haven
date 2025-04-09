
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
  
  // Extract time from delivery date/time if it exists
  const deliveryTime = shipment.deliveryDateTime?.includes(' ') 
    ? shipment.deliveryDateTime.split(' ').slice(1).join(' ')
    : '';
    
  // Format for display with special handling for "Completed" status
  const formattedStatus = displayStatus.includes('Completed')
    ? displayStatus.toUpperCase()
    : displayStatus;

  return (
    <TableRow className="h-[36px]">
      <TableCell className="p-2 whitespace-nowrap">{shipment.shipDate}</TableCell>
      <TableCell className="p-2 whitespace-nowrap">{shipment.deliveryDateTime?.split(' ')[0] || '-'}</TableCell>
      <TableCell className="p-2 whitespace-nowrap">{deliveryTime || '-'}</TableCell>
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
      <TableCell className="p-2 whitespace-nowrap">{formattedStatus}</TableCell>
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
