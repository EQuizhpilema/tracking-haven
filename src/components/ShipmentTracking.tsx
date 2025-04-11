
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, Filter } from 'lucide-react';
import FilterSidebar from './FilterSidebar';
import ShipmentTable from './ShipmentTable';
import ShipmentCard from './ShipmentCard';
import { shipmentData } from '../data/shipmentData';
import { toast } from "@/components/ui/use-toast";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from '@/hooks/use-mobile';

const ShipmentTracking: React.FC = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(shipmentData);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredData(shipmentData);
      return;
    }
    
    const filtered = shipmentData.filter(shipment => 
      shipment.shipmentNumber.toLowerCase().includes(query.toLowerCase()) ||
      shipment.bolRefs.toLowerCase().includes(query.toLowerCase()) ||
      shipment.shipper.toLowerCase().includes(query.toLowerCase()) ||
      shipment.shipTo.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredData(filtered);
  };

  const handleApplyFilter = () => {
    toast({
      title: "Filters Applied",
      description: "Your filter settings have been applied to the data.",
    });
    if (isMobile) {
      setIsFilterDrawerOpen(false);
    }
    // In a real app, this would implement actual filtering logic
  };

  const handleResetFilter = () => {
    setFilteredData(shipmentData);
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values.",
    });
  };

  const handleExportToExcel = () => {
    toast({
      title: "Export Started",
      description: "Your data is being exported to Excel...",
    });
    // In a real app, this would implement actual export logic
  };

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      {/* Header */}
      <div className="bg-gray-100 border-b border-gray-200 py-4 px-6 mb-6">
        <h1 className="text-2xl font-medium text-center text-gray-800">Shipment Tracking</h1>
      </div>
      
      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && showFilters && (
          <aside className="h-[calc(100vh-120px)] overflow-auto animate-slide-in">
            <FilterSidebar 
              onApplyFilter={handleApplyFilter}
              onResetFilter={handleResetFilter}
            />
          </aside>
        )}
        
        {/* Main Content */}
        <main className="flex-1 px-4 md:px-6 pb-6 h-[calc(100vh-120px)] overflow-auto">
          {/* Top Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
            {isMobile ? (
              <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full md:w-auto flex items-center bg-tracking-blue text-white hover:bg-blue-600 transition-colors"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="px-4 py-2 h-[80vh] overflow-auto">
                    <FilterSidebar 
                      onApplyFilter={handleApplyFilter}
                      onResetFilter={handleResetFilter}
                    />
                  </div>
                </DrawerContent>
              </Drawer>
            ) : (
              <Button
                variant="outline"
                className="w-full md:w-auto flex items-center bg-tracking-blue text-white hover:bg-blue-600 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
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
                onChange={handleSearch}
              />
            </div>
            
            <Button
              variant="outline"
              className="w-full md:w-auto mt-3 md:mt-0 flex items-center bg-tracking-blue text-white hover:bg-blue-600 transition-colors"
              onClick={handleExportToExcel}
            >
              <FileText className="mr-2 h-4 w-4" />
              Export To Excel
            </Button>
          </div>
          
          {/* Table or Card View based on screen size */}
          {isMobile ? (
            <div className="space-y-4">
              {filteredData.map((shipment) => (
                <ShipmentCard key={shipment.id} shipment={shipment} />
              ))}
            </div>
          ) : (
            <ShipmentTable data={filteredData} />
          )}
        </main>
      </div>
    </div>
  );
};

export default ShipmentTracking;
