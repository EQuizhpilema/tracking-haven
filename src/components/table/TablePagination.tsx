
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TablePaginationProps {
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  totalItems: number;
  currentStart: number;
  currentEnd: number;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  totalItems,
  currentStart,
  currentEnd
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const handlePrevPage = () => {
    setPage(Math.max(page - 1, 1));
  };

  const handleNextPage = () => {
    setPage(Math.min(page + 1, totalPages));
  };

  return (
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
          {currentStart} - {currentEnd} of {totalItems}
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
  );
};

export default TablePagination;
