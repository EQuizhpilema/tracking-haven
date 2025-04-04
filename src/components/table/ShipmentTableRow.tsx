
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

  return (
    <TableRow key={shipment.id} className="h-[90%]">
      <TableCell className="py-2 px-4">{shipment.shipDate}</TableCell>
      <TableCell className="py-2 px-4">{shipment.deliveryDateTime || '-'}</TableCell>
      <TableCell className="py-2 px-4">{shipment.etaDate}</TableCell>
      <TableCell className="py-2 px-4 font-medium text-blue-600">
        <a href={`#${shipment.shipmentNumber}`} className="hover:underline">
          {shipment.shipmentNumber}
        </a>
      </TableCell>
      <TableCell className="py-2 px-4">{shipment.bolRefs}</TableCell>
      <TableCell className="py-2 px-4">{shipment.shipper}</TableCell>
      <TableCell className="py-2 px-4">{shipment.shipperCity}</TableCell>
      <TableCell className="py-2 px-4">{shipment.shipTo}</TableCell>
      <TableCell className="py-2 px-4">{shipment.consigneeCity}</TableCell>
      <TableCell className="py-2 px-4">{shipment.province}</TableCell>
      <TableCell className="py-2 px-4">{shipment.zip}</TableCell>
      <TableCell className="py-2 px-4">{displayStatus}</TableCell>
      <TableCell className="py-2 px-4">{shipment.puPartnerPro || '-'}</TableCell>
      <TableCell className="py-2 px-4">{shipment.delPartnerPro || '-'}</TableCell>
      <TableCell className="py-2 px-4">
        {shipment.onTime === 'Yes' ? (
          <CheckCircle className="h-5 w-5 text-tracking-success" />
        ) : shipment.onTime === 'No' ? (
          <XCircle className="h-5 w-5 text-tracking-danger" />
        ) : (
          '-'
        )}
      </TableCell>
    </TableRow>
  );
};

export default ShipmentTableRow;
