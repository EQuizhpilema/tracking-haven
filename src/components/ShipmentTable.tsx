
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ShipmentData } from '../data/shipmentData';
import { cn } from '@/lib/utils';

interface ShipmentTableProps {
  data: ShipmentData[];
}

const ShipmentTable: React.FC<ShipmentTableProps> = ({ data }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const currentData = data.slice(start, end);

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-full overflow-auto animate-fade-in">
      <Table className="tracking-table border-collapse">
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="font-medium text-center border border-gray-300 p-2">Ship Date</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">Del Date</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">Del Time</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">ETA Date</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">Shipment Number</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">BOL/Ref #</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">Shipper</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">Shipper City</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">Consignee</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">Consignee City</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">State</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">Zip</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">Status</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">PU Partner Pro</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">Del Partner Pro</TableHead>
            <TableHead className="font-medium text-center border border-gray-300 p-2">On Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((shipment) => (
            <TableRow 
              key={shipment.id}
              className="even:bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <TableCell className="border border-gray-300 p-2 text-center">{shipment.shipDate}</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">{shipment.deliveryDate}</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">{shipment.deliveryTime || '-'}</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">{shipment.etaDate}</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center font-medium text-blue-600">
                <a href={`#${shipment.shipmentNumber}`} className="hover:underline">
                  {shipment.shipmentNumber}
                </a>
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">{shipment.bolRefs}</TableCell>
              <TableCell className="border border-gray-300 p-2">{shipment.shipper}</TableCell>
              <TableCell className="border border-gray-300 p-2">{shipment.shipperCity}</TableCell>
              <TableCell className="border border-gray-300 p-2">{shipment.shipTo}</TableCell>
              <TableCell className="border border-gray-300 p-2">{shipment.consigneeCity}</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">{shipment.province}</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">{shipment.zip}</TableCell>
              <TableCell className="border border-gray-300 p-2">{shipment.status}</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">{shipment.puPartnerPro || '-'}</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">{shipment.delPartnerPro || '-'}</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">{shipment.onTime || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination Controls */}
      <div className="flex items-center justify-end mt-4 p-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => setRowsPerPage(Number(value))}
          >
            <SelectTrigger className="w-16 h-8">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          
          <span className="text-sm text-gray-600 ml-4">
            {start + 1} - {Math.min(end, data.length)} of {data.length}
          </span>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevPage}
            disabled={page === 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTable;
