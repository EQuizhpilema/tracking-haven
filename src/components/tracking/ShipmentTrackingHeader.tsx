
import React from 'react';
import { FilterToggleButton } from './header/FilterToggleButton';
import { SearchInput } from './header/SearchInput';
import { ExportButton } from './header/ExportButton';

interface ShipmentTrackingHeaderProps {
  searchQuery: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showFilters?: boolean;
  onToggleFilters?: () => void;
  isMobile: boolean;
}

const ShipmentTrackingHeader: React.FC<ShipmentTrackingHeaderProps> = ({
  searchQuery,
  onSearch,
  showFilters,
  onToggleFilters,
  isMobile
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
      <FilterToggleButton 
        isMobile={isMobile} 
        showFilters={showFilters} 
        onToggleFilters={onToggleFilters} 
      />
      
      <SearchInput 
        searchQuery={searchQuery} 
        onSearch={onSearch} 
      />
      
      <ExportButton isMobile={isMobile} />
    </div>
  );
};

export default ShipmentTrackingHeader;
