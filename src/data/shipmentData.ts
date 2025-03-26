
export interface ShipmentData {
  id: string;
  shipDate: string;
  deliveryDate: string;
  etaDate: string;
  shipmentNumber: string;
  bolRefs: string;
  shipper: string;
  shipperCity: string;
  shipTo: string;
  consigneeCity: string;
  province: string;
  zip: string;
  status: 'Routed' | 'Shipment Created' | 'In Transit' | 'Delivered' | 'Exception';
}

export const shipmentData: ShipmentData[] = [
  {
    id: '1',
    shipDate: '03/21/25',
    deliveryDate: '-',
    etaDate: '-',
    shipmentNumber: 'PU12716',
    bolRefs: 'PU12716',
    shipper: 'restricted',
    shipperCity: '-',
    shipTo: '-',
    consigneeCity: '-',
    province: '-',
    zip: '-',
    status: 'Routed'
  },
  {
    id: '2',
    shipDate: '03/21/25',
    deliveryDate: '-',
    etaDate: '03/24/25',
    shipmentNumber: '629528',
    bolRefs: '629528',
    shipper: 'HOTSIDE CROSSFIT',
    shipperCity: 'ORLAND PARK',
    shipTo: 'STARBUCKS ORLAND PARK',
    consigneeCity: 'ORLAND PARK',
    province: 'IL',
    zip: '60462',
    status: 'Shipment Created'
  },
  {
    id: '3',
    shipDate: '03/22/25',
    deliveryDate: '03/25/25',
    etaDate: '03/25/25',
    shipmentNumber: '629530',
    bolRefs: '629530',
    shipper: 'APEX LOGISTICS',
    shipperCity: 'CHICAGO',
    shipTo: 'TARGET DISTRIBUTION',
    consigneeCity: 'JOLIET',
    province: 'IL',
    zip: '60436',
    status: 'In Transit'
  },
  {
    id: '4',
    shipDate: '03/19/25',
    deliveryDate: '03/22/25',
    etaDate: '03/23/25',
    shipmentNumber: '629510',
    bolRefs: '629510',
    shipper: 'ACME SUPPLIES',
    shipperCity: 'NAPERVILLE',
    shipTo: 'WALMART SUPERCENTER',
    consigneeCity: 'AURORA',
    province: 'IL',
    zip: '60504',
    status: 'Delivered'
  },
  {
    id: '5',
    shipDate: '03/20/25',
    deliveryDate: '-',
    etaDate: '03/24/25',
    shipmentNumber: '629515',
    bolRefs: '629515',
    shipper: 'GLOBAL SHIPPING CO',
    shipperCity: 'EVANSTON',
    shipTo: 'NORTHBROOK MALL',
    consigneeCity: 'NORTHBROOK',
    province: 'IL',
    zip: '60062',
    status: 'Exception'
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
