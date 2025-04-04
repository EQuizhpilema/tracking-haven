
import { useState } from 'react';
import { ShipmentData } from '../data/shipmentData';

export type SortField = keyof ShipmentData | null;
export type SortDirection = 'asc' | 'desc';

export const useSortableData = (data: ShipmentData[]) => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
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

  return {
    sortedData,
    sortField,
    sortDirection,
    handleSort
  };
};
