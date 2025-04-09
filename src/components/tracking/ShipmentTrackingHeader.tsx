
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { DrawerTrigger } from "@/components/ui/drawer";

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
  const handleExportToExcel = () => {
    toast({
      title: "Export Started",
      description: "Your data is being exported to Excel...",
    });
    // In a real app, this would implement actual export logic
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
      {isMobile ? (
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-auto flex items-center bg-tracking-blue text-white hover:bg-blue-600 transition-colors"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </DrawerTrigger>
      ) : (
        <Button
          variant="outline"
          className="w-full md:w-auto flex items-center bg-tracking-blue text-white hover:bg-blue-600 transition-colors"
          onClick={onToggleFilters}
        >
          <Search className="mr-2 h-4 w-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      )}
      
      <div className="flex-1 w-full md:w-auto md:mx-4">
        <Input
          placeholder="Search by Shipment Number, BOL, Shipper, or Ship-To"
          className="w-full"
          value={searchQuery}
          onChange={onSearch}
        />
      </div>
      
      <Button
        variant="outline"
        className="w-full md:w-auto mt-3 md:mt-0 flex items-center justify-center bg-tracking-blue text-white hover:bg-blue-600 transition-colors"
        onClick={handleExportToExcel}
      >
        {isMobile ? 'Export To Excel' : (
          <>
            <FileText className="mr-2 h-4 w-4" />
            Export To Excel
          </>
        )}
      </Button>
    </div>
  );
};

export default ShipmentTrackingHeader;
