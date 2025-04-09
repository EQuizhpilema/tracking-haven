
import { useState, useEffect } from 'react';
import { shipmentData, ShipmentData, getShipmentData } from '@/data/shipmentData';
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
  
  // Force a hard copy of the data to ensure it's available
  const initialData = getShipmentData();
  
  // Result state - initialize with the full dataset
  const [filteredData, setFilteredData] = useState<ShipmentData[]>(initialData);

  // Initialize data on component mount
  useEffect(() => {
    console.log('useShipmentFilters: Initial dataset count:', initialData.length);
    
    if (initialData.length > 0) {
      console.log('useShipmentFilters: First item:', initialData[0]);
      setFilteredData(initialData);
    } else {
      console.error('useShipmentFilters: No shipment data available to initialize filters');
      
      // Emergency fallback - directly set hardcoded data if initialData failed somehow
      const fallbackData = [
        {
          id: '1',
          shipDate: '04/03/25',
          deliveryDateTime: 'OFD ETA 10:17 AM',
          etaDate: '04/03/25',
          shipmentNumber: '811836865',
          bolRefs: '133200',
          shipper: 'SPR PACKAGING LLC',
          shipperCity: 'ROCKWALL',
          shipTo: 'SWANSON BARK',
          consigneeCity: 'LONGVIEW',
          province: 'WA',
          zip: '98632',
          status: 'Out For Delivery on 04/04/25',
          puPartnerPro: '165962424',
          delPartnerPro: '',
          onTime: 'Yes'
        }
      ];
      
      setFilteredData(fallbackData);
    }
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
    return data.filter(shipment => {
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
    setFilteredData(initialData);
    
    toast({
      title: "Filters Reset",
      description: `All filters have been reset to default values. Showing ${initialData.length} shipments.`,
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
