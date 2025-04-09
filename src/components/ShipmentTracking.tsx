
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useShipmentFilters } from '@/hooks/useShipmentFilters';
import FilterSidebar from './FilterSidebar';
import ShipmentTrackingHeader from './tracking/ShipmentTrackingHeader';
import ShipmentContent from './tracking/ShipmentContent';
import MobileFilterDrawer from './tracking/MobileFilterDrawer';
import { shipmentData, getShipmentData } from '@/data/shipmentData';

const ShipmentTracking: React.FC = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Initialize with direct reference to hardcoded data - critical for ensuring data is available
  const initialData = getShipmentData();
  
  console.log('ShipmentTracking: Initial data loaded:', initialData.length, 'items');
  console.log('ShipmentTracking: First item sample:', initialData[0]);
  
  const {
    searchQuery,
    filteredData,
    deliveredToggle,
    undeliveredToggle,
    pickupsToggle,
    shipperToggle,
    consigneeToggle,
    billToToggle,
    handleSearch,
    handleApplyFilter,
    handleResetFilter,
    onDeliveredToggle,
    onUndeliveredToggle,
    onPickupsToggle,
    onShipperToggle,
    onConsigneeToggle,
    onBillToPartyToggle
  } = useShipmentFilters();

  useEffect(() => {
    // Force log entire data array for debugging
    console.log('ShipmentTracking: initialData type:', typeof initialData);
    console.log('ShipmentTracking: initialData is array:', Array.isArray(initialData));
    console.log('ShipmentTracking: Initial data count:', initialData.length);
    console.log('ShipmentTracking: Filtered data count:', filteredData.length);
    console.log('Complete shipment data array:', JSON.stringify(initialData));
  }, [initialData, filteredData]);

  // Common filter props used in multiple places
  const filterProps = {
    onApplyFilter: () => {
      handleApplyFilter();
      if (isMobile) {
        setIsFilterDrawerOpen(false);
      }
    },
    onResetFilter: handleResetFilter,
    deliveredToggle,
    undeliveredToggle,
    pickupsToggle,
    onDeliveredToggle,
    onUndeliveredToggle,
    onPickupsToggle,
    shipperToggle,
    consigneeToggle,
    billToToggle,
    onShipperToggle,
    onConsigneeToggle,
    onBillToPartyToggle
  };

  // Guarantee that we always have data to display, even if filters remove everything
  const displayData = filteredData.length > 0 ? filteredData : initialData;

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
            <FilterSidebar {...filterProps} />
          </aside>
        )}
        
        {/* Main Content */}
        <main className="flex-1 px-4 md:px-6 pb-6 h-[calc(100vh-120px)] overflow-auto">
          {/* Top Controls */}
          <ShipmentTrackingHeader 
            searchQuery={searchQuery}
            onSearch={handleSearch}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            isMobile={isMobile}
          />
          
          {/* Mobile Filter Drawer */}
          {isMobile && (
            <MobileFilterDrawer 
              open={isFilterDrawerOpen} 
              onOpenChange={setIsFilterDrawerOpen}
              filterProps={filterProps}
            />
          )}
          
          {/* Table or Card View based on screen size */}
          <ShipmentContent 
            data={displayData}
            isMobile={isMobile} 
          />
          
          {/* Debug information - remove in production */}
          <div className="mt-4 text-xs text-gray-400 border-t pt-2">
            Filtered shipments: {filteredData.length} | Total shipments: {initialData.length}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShipmentTracking;
