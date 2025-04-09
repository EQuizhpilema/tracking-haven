
import { useState, useEffect } from 'react';
import { ShipmentData, getShipmentData } from '@/data/shipmentData';
import { toast } from "@/components/ui/use-toast";

export const useShipmentFilters = () => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter toggle states
  const [deliveredToggle, setDeliveredToggle] = useState(true);
  const [undeliveredToggle, setUndeliveredToggle] = useState(true);
  const [pickupsToggle, setPickupsToggle] = useState(true);
  const [shipperToggle, setShipperToggle] = useState(true);
  const [consigneeToggle, setConsigneeToggle] = useState(true);
  const [billToToggle, setBillToToggle] = useState(true);
  
  // Initialize with direct function call to ensure data
  const [initialData, setInitialData] = useState<ShipmentData[]>([]);
  const [filteredData, setFilteredData] = useState<ShipmentData[]>([]);

  // Initialize data on component mount
  useEffect(() => {
    const loadData = () => {
      try {
        const data = getShipmentData();
        console.log('useShipmentFilters: Initializing with data, length:', data.length);
        
        if (data && Array.isArray(data) && data.length > 0) {
          console.log('useShipmentFilters: First item:', data[0]);
          setInitialData(data);
          setFilteredData(data);
        } else {
          console.error('useShipmentFilters: Invalid data returned from getShipmentData');
          // Try one more time with a delay
          setTimeout(() => {
            const retryData = getShipmentData();
            if (retryData && Array.isArray(retryData) && retryData.length > 0) {
              setInitialData(retryData);
              setFilteredData(retryData);
            }
          }, 500);
        }
      } catch (error) {
        console.error('useShipmentFilters: Error loading data:', error);
      }
    };
    
    loadData();
  }, []);

  // Handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredData(applyFilters(initialData));
      return;
    }
    
    const searchFiltered = initialData.filter(shipment => 
      (shipment.shipmentNumber && shipment.shipmentNumber.toLowerCase().includes(query.toLowerCase())) ||
      (shipment.bolRefs && shipment.bolRefs.toLowerCase().includes(query.toLowerCase())) ||
      (shipment.shipper && shipment.shipper.toLowerCase().includes(query.toLowerCase())) ||
      (shipment.shipTo && shipment.shipTo.toLowerCase().includes(query.toLowerCase()))
    );
    
    setFilteredData(applyFilters(searchFiltered));
  };

  // Apply status filters to data
  const applyFilters = (data: ShipmentData[]) => {
    if (!data || !Array.isArray(data)) {
      console.error('applyFilters received invalid data:', data);
      return [];
    }
    
    return data.filter(shipment => {
      if (!shipment) return false;
      
      // Status filters
      const isDelivered = shipment.status && shipment.status.includes('Delivered');
      const isPickup = shipment.status && shipment.status.includes('Picked Up');
      
      if (!deliveredToggle && isDelivered) return false;
      if (!undeliveredToggle && !isDelivered && !isPickup) return false;
      if (!pickupsToggle && isPickup) return false;
      
      return true;
    });
  };

  // Handle applying all filters
  const handleApplyFilter = () => {
    if (!initialData || !Array.isArray(initialData)) {
      console.error('handleApplyFilter: initialData is invalid:', initialData);
      // Try to reload data
      const freshData = getShipmentData();
      setInitialData(freshData);
      setFilteredData(freshData);
      return;
    }
    
    const filtered = applyFilters(initialData.filter(shipment => 
      searchQuery.trim() === '' ? true : 
      (shipment.shipmentNumber && shipment.shipmentNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (shipment.bolRefs && shipment.bolRefs.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (shipment.shipper && shipment.shipper.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (shipment.shipTo && shipment.shipTo.toLowerCase().includes(searchQuery.toLowerCase()))
    ));
    
    console.log('Applying filters, filtered count:', filtered.length);
    setFilteredData(filtered);
    
    toast({
      title: "Filters Applied",
      description: `Your filter settings have been applied to ${filtered.length} shipments.`,
    });
  };

  // Reset all filters to defaults
  const handleResetFilter = () => {
    setDeliveredToggle(true);
    setUndeliveredToggle(true);
    setPickupsToggle(true);
    setShipperToggle(true);
    setConsigneeToggle(true);
    setBillToToggle(true);
    setSearchQuery('');
    
    // Refresh data in case it was empty
    const freshData = getShipmentData();
    setInitialData(freshData);
    setFilteredData(freshData);
    
    toast({
      title: "Filters Reset",
      description: `All filters have been reset to default values. Showing ${freshData.length} shipments.`,
    });
  };

  // Export all state and handlers
  return {
    // States
    searchQuery,
    filteredData,
    deliveredToggle,
    undeliveredToggle,
    pickupsToggle,
    shipperToggle,
    consigneeToggle,
    billToToggle,
    
    // Handlers
    setSearchQuery,
    handleSearch,
    handleApplyFilter,
    handleResetFilter,
    
    // Toggle handlers
    onDeliveredToggle: () => setDeliveredToggle(!deliveredToggle),
    onUndeliveredToggle: () => setUndeliveredToggle(!undeliveredToggle),
    onPickupsToggle: () => setPickupsToggle(!pickupsToggle),
    onShipperToggle: () => setShipperToggle(!shipperToggle),
    onConsigneeToggle: () => setConsigneeToggle(!consigneeToggle),
    onBillToPartyToggle: () => setBillToToggle(!billToToggle),
  };
};
