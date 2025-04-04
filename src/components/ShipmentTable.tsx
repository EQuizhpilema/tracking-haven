
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ShipmentData } from '../data/shipmentData';
import SortableHeader from './table/SortableHeader';
import TablePagination from './table/TablePagination';
import ShipmentTableRow from './table/ShipmentTableRow';
import { useSortableData, SortField } from '@/hooks/useSortableData';

interface ShipmentTableProps {
  data: ShipmentData[];
}

const ShipmentTable: React.FC<ShipmentTableProps> = ({ data }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const { sortedData, sortField, sortDirection, handleSort } = useSortableData(data);
  
  // Calculate pagination
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const currentData = sortedData.slice(start, end);

  return (
    <div className="w-full overflow-auto animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader field="shipDate" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Ship Date</SortableHeader>
            <SortableHeader field="deliveryDate" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Del Date</SortableHeader>
            <SortableHeader field="deliveryTime" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Del Time</SortableHeader>
            <SortableHeader field="etaDate" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>ETA Date</SortableHeader>
            <SortableHeader field="shipmentNumber" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Shipment Number</SortableHeader>
            <SortableHeader field="bolRefs" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>BOL/Ref #</SortableHeader>
            <SortableHeader field="shipper" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Shipper</SortableHeader>
            <SortableHeader field="shipperCity" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Shipper City</SortableHeader>
            <SortableHeader field="shipTo" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Consignee</SortableHeader>
            <SortableHeader field="consigneeCity" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Consignee City</SortableHeader>
            <SortableHeader field="province" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>State</SortableHeader>
            <SortableHeader field="zip" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Zip</SortableHeader>
            <SortableHeader field="status" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Status</SortableHeader>
            <SortableHeader field="puPartnerPro" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>PU Partner Pro</SortableHeader>
            <SortableHeader field="delPartnerPro" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>Del Partner Pro</SortableHeader>
            <SortableHeader field="onTime" currentSortField={sortField} sortDirection={sortDirection} onSort={handleSort}>On Time</SortableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((shipment) => (
            <ShipmentTableRow key={shipment.id} shipment={shipment} />
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination Controls */}
      <TablePagination
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalItems={data.length}
        currentStart={start + 1}
        currentEnd={Math.min(end, data.length)}
      />
    </div>
  );
};

export default ShipmentTable;
