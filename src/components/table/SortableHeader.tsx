
import React from 'react';
import { TableHead } from "@/components/ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { SortField, SortDirection } from '@/hooks/useSortableData';

interface SortableHeaderProps {
  field: SortField;
  children: React.ReactNode;
  currentSortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ 
  field, 
  children, 
  currentSortField, 
  sortDirection, 
  onSort 
}) => {
  // Function to render sort icon
  const getSortIcon = () => {
    if (currentSortField !== field) return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="ml-1 h-4 w-4" /> 
      : <ArrowDown className="ml-1 h-4 w-4" />;
  };

  return (
    <TableHead 
      className="font-medium cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center">
        {children}
        {getSortIcon()}
      </div>
    </TableHead>
  );
};

export default SortableHeader;
