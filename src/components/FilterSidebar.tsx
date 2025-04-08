
import React, { useState } from 'react';
import DateRangeFilter from './filters/DateRangeFilter';
import ServiceTypeFilter from './filters/ServiceTypeFilter';
import ShipperRoleFilter from './filters/ShipperRoleFilter';
import ShipmentStatusFilter from './filters/ShipmentStatusFilter';
import FilterActions from './filters/FilterActions';

interface FilterSidebarProps {
  onApplyFilter: () => void;
  onResetFilter: () => void;
  // Status filter props
  deliveredToggle?: boolean;
  undeliveredToggle?: boolean;
  pickupsToggle?: boolean;
  onDeliveredToggle?: () => void;
  onUndeliveredToggle?: () => void;
  onPickupsToggle?: () => void;
  // Role filter props
  shipperToggle?: boolean;
  consigneeToggle?: boolean;
  billToToggle?: boolean;
  onShipperToggle?: () => void;
  onConsigneeToggle?: () => void;
  onBillToPartyToggle?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  onApplyFilter, 
  onResetFilter,
  // Status filter props with defaults
  deliveredToggle = true,
  undeliveredToggle = true,
  pickupsToggle = true,
  onDeliveredToggle = () => {},
  onUndeliveredToggle = () => {},
  onPickupsToggle = () => {},
  // Role filter props with defaults
  shipperToggle = true,
  consigneeToggle = true,
  billToToggle = true,
  onShipperToggle = () => {},
  onConsigneeToggle = () => {},
  onBillToPartyToggle = () => {}
}) => {
  const [dateRange, setDateRange] = useState('last7');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [serviceType, setServiceType] = useState('all');

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    const today = new Date();
    
    if (value === 'last7') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      setStartDate(sevenDaysAgo);
      setEndDate(today);
    } else if (value === 'last14') {
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(today.getDate() - 14);
      setStartDate(fourteenDaysAgo);
      setEndDate(today);
    } else if (value === 'last30') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      setStartDate(thirtyDaysAgo);
      setEndDate(today);
    }
  };

  return (
    <div className="bg-white w-64 border-r border-gray-200 p-4 h-full animate-fade-in">
      <div className="text-xl font-semibold mb-6">Shipment Filters</div>
      
      <DateRangeFilter 
        dateRange={dateRange}
        startDate={startDate}
        endDate={endDate}
        onDateRangeChange={handleDateRangeChange}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      
      <ServiceTypeFilter 
        serviceType={serviceType}
        onServiceTypeChange={setServiceType}
      />
      
      <ShipperRoleFilter 
        shipperToggle={shipperToggle}
        consigneeToggle={consigneeToggle}
        billToPartyToggle={billToToggle}
        onShipperToggle={onShipperToggle}
        onConsigneeToggle={onConsigneeToggle}
        onBillToPartyToggle={onBillToPartyToggle}
      />
      
      <ShipmentStatusFilter 
        deliveredToggle={deliveredToggle}
        undeliveredToggle={undeliveredToggle}
        pickupsToggle={pickupsToggle}
        onDeliveredToggle={onDeliveredToggle}
        onUndeliveredToggle={onUndeliveredToggle}
        onPickupsToggle={onPickupsToggle}
      />
      
      <FilterActions 
        onApplyFilter={onApplyFilter}
        onResetFilter={onResetFilter}
      />
    </div>
  );
};

export default FilterSidebar;
