
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

  const getStatusClassName = (status: string) => {
    switch(status) {
      case 'Routed':
        return 'text-blue-600';
      case 'Shipment Created':
        return 'text-tracking-warning';
      case 'In Transit':
        return 'text-purple-600';
      case 'Delivered':
        return 'text-tracking-success';
      case 'Exception':
        return 'text-tracking-danger';
      default:
        return '';
    }
  };

  return (
    <div className="w-full overflow-hidden animate-fade-in">
      <Table className="tracking-table">
        <TableHeader>
          <TableRow className="bg-tracking-headerBg">
            <TableHead className="font-medium">Ship Date</TableHead>
            <TableHead className="font-medium">Delivery Date/Time</TableHead>
            <TableHead className="font-medium">ETA Date</TableHead>
            <TableHead className="font-medium">Shipment Number</TableHead>
            <TableHead className="font-medium">BOL/Refs</TableHead>
            <TableHead className="font-medium">Shipper</TableHead>
            <TableHead className="font-medium">Shipper City</TableHead>
            <TableHead className="font-medium">Ship-To</TableHead>
            <TableHead className="font-medium">Consignee City</TableHead>
            <TableHead className="font-medium">Province</TableHead>
            <TableHead className="font-medium">Zip</TableHead>
            <TableHead className="font-medium">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((shipment) => (
            <TableRow 
              key={shipment.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <TableCell>{shipment.shipDate}</TableCell>
              <TableCell>{shipment.deliveryDate}</TableCell>
              <TableCell>{shipment.etaDate}</TableCell>
              <TableCell className="font-medium">{shipment.shipmentNumber}</TableCell>
              <TableCell>{shipment.bolRefs}</TableCell>
              <TableCell>{shipment.shipper}</TableCell>
              <TableCell>{shipment.shipperCity}</TableCell>
              <TableCell>{shipment.shipTo}</TableCell>
              <TableCell>{shipment.consigneeCity}</TableCell>
              <TableCell>{shipment.province}</TableCell>
              <TableCell>{shipment.zip}</TableCell>
              <TableCell className={cn("font-medium", getStatusClassName(shipment.status))}>
                {shipment.status}
              </TableCell>
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
