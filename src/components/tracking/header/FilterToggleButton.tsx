
import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter, Search } from 'lucide-react';
import { DrawerTrigger } from "@/components/ui/drawer";

interface FilterToggleButtonProps {
  isMobile: boolean;
  showFilters?: boolean;
  onToggleFilters?: () => void;
}

export const FilterToggleButton: React.FC<FilterToggleButtonProps> = ({
  isMobile,
  showFilters,
  onToggleFilters
}) => {
  if (isMobile) {
    return (
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full md:w-auto flex items-center bg-tracking-blue text-white hover:bg-blue-600 transition-colors"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DrawerTrigger>
    );
  }
  
  return (
    <Button
      variant="outline"
      className="w-full md:w-auto flex items-center bg-tracking-blue text-white hover:bg-blue-600 transition-colors"
      onClick={onToggleFilters}
    >
      <Search className="mr-2 h-4 w-4" />
      {showFilters ? 'Hide Filters' : 'Show Filters'}
    </Button>
  );
};
