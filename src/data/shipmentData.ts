
export interface ShipmentData {
  id: string;
  shipDate: string;
  deliveryDate: string;
  deliveryTime?: string;
  etaDate: string;
  shipmentNumber: string;
  bolRefs: string;
  shipper: string;
  shipperCity: string;
  shipTo: string;
  consigneeCity: string;
  province: string;
  zip: string;
  status: string;
  puPartnerPro?: string;
  delPartnerPro?: string;
  onTime?: string;
}

export const shipmentData: ShipmentData[] = [
  {
    id: '1',
    shipDate: '04/03/2025',
    deliveryDate: '04/04/2025',
    deliveryTime: 'OFD ETA 10:17 AM',
    etaDate: '04/04/2025',
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
  },
  {
    id: '2',
    shipDate: '04/03/2025',
    deliveryDate: '04/04/2025',
    deliveryTime: 'OFD ETA 09:47 AM',
    etaDate: '04/04/2025',
    shipmentNumber: '811836699',
    bolRefs: 'UNKNOWN',
    shipper: 'AMERICAN INFRASTRUCTURE',
    shipperCity: 'FORT WORTH',
    shipTo: 'COLUMBIA PRECAST PRO',
    consigneeCity: 'WOODLAND',
    province: 'WA',
    zip: '98674',
    status: 'Out For Delivery on 04/04/25',
    puPartnerPro: '153753231',
    delPartnerPro: '',
    onTime: 'Yes'
  },
  {
    id: '3',
    shipDate: '04/03/2025',
    deliveryDate: '04/04/2025',
    deliveryTime: 'OFD ETA 08:13 AM',
    etaDate: '04/04/2025',
    shipmentNumber: '811836194',
    bolRefs: 'HU2579',
    shipper: 'KINGSTON BRASS INC',
    shipperCity: 'CHINO',
    shipTo: 'GROVER ELECT & PLBG S',
    consigneeCity: 'VANCOUVER',
    province: 'WA',
    zip: '98665',
    status: 'Out For Delivery on 04/04/25',
    puPartnerPro: '156717829',
    delPartnerPro: '',
    onTime: 'Yes'
  },
  {
    id: '4',
    shipDate: '04/03/2025',
    deliveryDate: '04/04/2025',
    deliveryTime: 'OFD ETA 07:50 AM',
    etaDate: '04/04/2025',
    shipmentNumber: '811836384',
    bolRefs: '3817567',
    shipper: 'ALEO LIGHTING',
    shipperCity: 'SANTA FE SPRINGS',
    shipTo: 'NETZERO ENERGY LLC',
    consigneeCity: 'VANCOUVER',
    province: 'WA',
    zip: '98682',
    status: 'Out For Delivery on 04/04/25',
    puPartnerPro: '165967332',
    delPartnerPro: '',
    onTime: 'Yes'
  },
  {
    id: '5',
    shipDate: '04/03/2025',
    deliveryDate: '04/04/2025',
    deliveryTime: 'OFD ETA 07:49 AM',
    etaDate: '04/04/2025',
    shipmentNumber: '811836156',
    bolRefs: 'UNKNOWN',
    shipper: 'EPLASTICS',
    shipperCity: 'SAN DIEGO',
    shipTo: 'CORNELL PUMP',
    consigneeCity: 'CLACKAMAS',
    province: 'OR',
    zip: '97015',
    status: 'Out For Delivery on 04/04/25',
    puPartnerPro: '155902182',
    delPartnerPro: '',
    onTime: 'Yes'
  }
];

export interface DateRangeOption {
  value: string;
  label: string;
}

export const dateRangeOptions: DateRangeOption[] = [
  { value: 'last7', label: 'Last 7 Days' },
  { value: 'last14', label: 'Last 14 Days' },
  { value: 'last30', label: 'Last 30 Days' },
  { value: 'custom', label: 'Custom Date Range' }
];

export interface ServiceTypeOption {
  value: string;
  label: string;
}

export const serviceTypeOptions: ServiceTypeOption[] = [
  { value: 'all', label: 'All' },
  { value: 'standard', label: 'Standard' },
  { value: 'express', label: 'Express' },
  { value: 'priority', label: 'Priority' },
  { value: 'economy', label: 'Economy' }
];
