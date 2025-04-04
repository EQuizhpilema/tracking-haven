
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { ShipmentData } from '@/data/shipmentData';

interface ShipmentTableRowProps {
  shipment: ShipmentData;
}

const ShipmentTableRow: React.FC<ShipmentTableRowProps> = ({ shipment }) => {
  return (
    <TableRow key={shipment.id}>
      <TableCell>{shipment.shipDate}</TableCell>
      <TableCell>{shipment.deliveryDateTime || '-'}</TableCell>
      <TableCell>{shipment.etaDate}</TableCell>
      <TableCell className="font-medium text-blue-600">
        <a href={`#${shipment.shipmentNumber}`} className="hover:underline">
          {shipment.shipmentNumber}
        </a>
      </TableCell>
      <TableCell>{shipment.bolRefs}</TableCell>
      <TableCell>{shipment.shipper}</TableCell>
      <TableCell>{shipment.shipperCity}</TableCell>
      <TableCell>{shipment.shipTo}</TableCell>
      <TableCell>{shipment.consigneeCity}</TableCell>
      <TableCell>{shipment.province}</TableCell>
      <TableCell>{shipment.zip}</TableCell>
      <TableCell>{shipment.status}</TableCell>
      <TableCell>{shipment.puPartnerPro || '-'}</TableCell>
      <TableCell>{shipment.delPartnerPro || '-'}</TableCell>
      <TableCell>{shipment.onTime || '-'}</TableCell>
    </TableRow>
  );
};

export default ShipmentTableRow;
