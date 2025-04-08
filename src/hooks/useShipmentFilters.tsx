
import { useState, useEffect } from 'react';
import { shipmentData, ShipmentData } from '@/data/shipmentData';
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
  
  // Result state
  const [filteredData, setFilteredData] = useState<ShipmentData[]>([]);

  // Initialize data on component mount
  useEffect(() => {
    console.log('useShipmentFilters: Initializing with data count:', shipmentData.length);
    setFilteredData(shipmentData);
  }, []);

  // Handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredData(applyFilters(shipmentData));
      return;
    }
    
    const searchFiltered = shipmentData.filter(shipment => 
      shipment.shipmentNumber.toLowerCase().includes(query.toLowerCase()) ||
      shipment.bolRefs.toLowerCase().includes(query.toLowerCase()) ||
      shipment.shipper.toLowerCase().includes(query.toLowerCase()) ||
      shipment.shipTo.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredData(applyFilters(searchFiltered));
  };

  // Apply status filters to data
  const applyFilters = (data: ShipmentData[]) => {
    return data.filter(shipment => {
      // Status filters
      const isDelivered = shipment.status.includes('Delivered');
      const isPickup = shipment.status.includes('Picked Up');
      
      if (!deliveredToggle && isDelivered) return false;
      if (!undeliveredToggle && !isDelivered && !isPickup) return false;
      if (!pickupsToggle && isPickup) return false;
      
      return true;
    });
  };

  // Handle applying all filters
  const handleApplyFilter = () => {
    const filtered = applyFilters(shipmentData.filter(shipment => 
      searchQuery.trim() === '' ? true : 
      shipment.shipmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.bolRefs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.shipper.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.shipTo.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    
    console.log('Applying filters, filtered count:', filtered.length);
    setFilteredData(filtered);
    
    toast({
      title: "Filters Applied",
      description: "Your filter settings have been applied to the data.",
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
    setFilteredData(shipmentData);
    
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values.",
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
