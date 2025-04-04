
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
import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { ShipmentData } from '../data/shipmentData';
import { cn } from '@/lib/utils';

interface ShipmentTableProps {
  data: ShipmentData[];
}

type SortField = keyof ShipmentData | null;
type SortDirection = 'asc' | 'desc';

const ShipmentTable: React.FC<ShipmentTableProps> = ({ data }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // If already sorting by this field, toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New sort field
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort the data
  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    
    const valueA = a[sortField];
    const valueB = b[sortField];
    
    if (valueA === valueB) return 0;
    
    // Handle string comparison
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    
    // Handle undefined/null values
    if (valueA === undefined || valueA === null) return sortDirection === 'asc' ? -1 : 1;
    if (valueB === undefined || valueB === null) return sortDirection === 'asc' ? 1 : -1;
    
    // Default comparison for other types
    return sortDirection === 'asc'
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  const currentData = sortedData.slice(start, end);

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  // Function to render sort icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="ml-1 h-4 w-4" /> 
      : <ArrowDown className="ml-1 h-4 w-4" />;
  };

  // Create a sortable header cell
  const SortableHeader = ({ field, children }: { field: SortField, children: React.ReactNode }) => (
    <TableHead 
      className="font-medium cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center">
        {children}
        {getSortIcon(field)}
      </div>
    </TableHead>
  );

  return (
    <div className="w-full overflow-auto animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader field="shipDate">Ship Date</SortableHeader>
            <SortableHeader field="deliveryDate">Del Date</SortableHeader>
            <SortableHeader field="deliveryTime">Del Time</SortableHeader>
            <SortableHeader field="etaDate">ETA Date</SortableHeader>
            <SortableHeader field="shipmentNumber">Shipment Number</SortableHeader>
            <SortableHeader field="bolRefs">BOL/Ref #</SortableHeader>
            <SortableHeader field="shipper">Shipper</SortableHeader>
            <SortableHeader field="shipperCity">Shipper City</SortableHeader>
            <SortableHeader field="shipTo">Consignee</SortableHeader>
            <SortableHeader field="consigneeCity">Consignee City</SortableHeader>
            <SortableHeader field="province">State</SortableHeader>
            <SortableHeader field="zip">Zip</SortableHeader>
            <SortableHeader field="status">Status</SortableHeader>
            <SortableHeader field="puPartnerPro">PU Partner Pro</SortableHeader>
            <SortableHeader field="delPartnerPro">Del Partner Pro</SortableHeader>
            <SortableHeader field="onTime">On Time</SortableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((shipment) => (
            <TableRow 
              key={shipment.id}
            >
              <TableCell>{shipment.shipDate}</TableCell>
              <TableCell>{shipment.deliveryDate}</TableCell>
              <TableCell>{shipment.deliveryTime || '-'}</TableCell>
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
