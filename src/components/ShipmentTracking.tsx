
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useShipmentFilters } from '@/hooks/useShipmentFilters';
import FilterSidebar from './FilterSidebar';
import ShipmentTrackingHeader from './tracking/ShipmentTrackingHeader';
import ShipmentContent from './tracking/ShipmentContent';
import MobileFilterDrawer from './tracking/MobileFilterDrawer';

const ShipmentTracking: React.FC = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  
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
          <ShipmentContent data={filteredData} isMobile={isMobile} />
        </main>
      </div>
    </div>
  );
};

export default ShipmentTracking;
