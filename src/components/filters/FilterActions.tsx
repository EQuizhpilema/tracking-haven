
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

interface FilterActionsProps {
  onApplyFilter: () => void;
  onResetFilter: () => void;
}

const FilterActions: React.FC<FilterActionsProps> = ({
  onApplyFilter,
  onResetFilter
}) => {
  return (
    <div className="space-y-2">
      <Button 
        className="w-full bg-tracking-blue hover:bg-blue-600 transition-colors"
        onClick={onApplyFilter}
      >
        <Search className="mr-2 h-4 w-4" />
        Apply Filter
      </Button>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={onResetFilter}
      >
        Reset Filter
      </Button>
    </div>
  );
};

export default FilterActions;
