
import React, { useState } from 'react';
import DateRangeFilter from './filters/DateRangeFilter';
import ServiceTypeFilter from './filters/ServiceTypeFilter';
import ShipperRoleFilter from './filters/ShipperRoleFilter';
import ShipmentStatusFilter from './filters/ShipmentStatusFilter';
import FilterActions from './filters/FilterActions';

interface FilterSidebarProps {
  onApplyFilter: () => void;
  onResetFilter: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  onApplyFilter, 
  onResetFilter 
}) => {
  const [dateRange, setDateRange] = useState('last7');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [serviceType, setServiceType] = useState('all');
  const [shipperToggle, setShipperToggle] = useState(true);
  const [consigneeToggle, setConsigneeToggle] = useState(true);
  const [billToPartyToggle, setBillToPartyToggle] = useState(true);
  const [deliveredToggle, setDeliveredToggle] = useState(true);
  const [undeliveredToggle, setUndeliveredToggle] = useState(true);
  const [pickupsToggle, setPickupsToggle] = useState(true);

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
      <div className="text-lg font-medium mb-6">Advanced Search Fields</div>
      
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
        billToPartyToggle={billToPartyToggle}
        onShipperToggle={() => setShipperToggle(!shipperToggle)}
        onConsigneeToggle={() => setConsigneeToggle(!consigneeToggle)}
        onBillToPartyToggle={() => setBillToPartyToggle(!billToPartyToggle)}
      />
      
      <ShipmentStatusFilter 
        deliveredToggle={deliveredToggle}
        undeliveredToggle={undeliveredToggle}
        pickupsToggle={pickupsToggle}
        onDeliveredToggle={() => setDeliveredToggle(!deliveredToggle)}
        onUndeliveredToggle={() => setUndeliveredToggle(!undeliveredToggle)}
        onPickupsToggle={() => setPickupsToggle(!pickupsToggle)}
      />
      
      <FilterActions 
        onApplyFilter={onApplyFilter}
        onResetFilter={onResetFilter}
      />
    </div>
  );
};

export default FilterSidebar;
