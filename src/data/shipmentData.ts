
export interface ShipmentData {
  id: string;
  shipDate: string;
  deliveryDateTime: string;
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
  puPartnerPro: string;
  delPartnerPro: string;
  onTime: string;
}

export const shipmentData: ShipmentData[] = [
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
  },
  {
    id: '2',
    shipDate: '04/03/25',
    deliveryDateTime: '04/04/25 08:35 AM',
    etaDate: '04/03/25',
    shipmentNumber: '811836699',
    bolRefs: 'UNKNOWN',
    shipper: 'AMERICAN INFRASTRUCTURE',
    shipperCity: 'FORT WORTH',
    shipTo: 'COLUMBIA PRECAST PRO',
    consigneeCity: 'WOODLAND',
    province: 'WA',
    zip: '98674',
    status: 'Delivered on 04/04/25',
    puPartnerPro: '153753231',
    delPartnerPro: '',
    onTime: 'Yes'
  },
  {
    id: '3',
    shipDate: '04/03/25',
    deliveryDateTime: '',
    etaDate: '04/03/25',
    shipmentNumber: '811836194',
    bolRefs: 'HU2579',
    shipper: 'KINGSTON BRASS INC',
    shipperCity: 'CHINO',
    shipTo: 'GROVER ELECT & PLBG S',
    consigneeCity: 'VANCOUVER',
    province: 'WA',
    zip: '98665',
    status: 'Arrived at Dest Terminal on 04/04/25',
    puPartnerPro: '156717829',
    delPartnerPro: '',
    onTime: 'Yes'
  },
  {
    id: '4',
    shipDate: '04/03/25',
    deliveryDateTime: '',
    etaDate: '04/03/25',
    shipmentNumber: '811836384',
    bolRefs: '3817567',
    shipper: 'ALEO LIGHTING',
    shipperCity: 'SANTA FE SPRINGS',
    shipTo: 'NETZERO ENERGY LLC',
    consigneeCity: 'VANCOUVER',
    province: 'WA',
    zip: '98682',
    status: 'In Transit - ETA 04/05/25',
    puPartnerPro: '165967332',
    delPartnerPro: '',
    onTime: 'Yes'
  },
  {
    id: '5',
    shipDate: '04/03/25',
    deliveryDateTime: '',
    etaDate: '04/03/25',
    shipmentNumber: '811836156',
    bolRefs: 'UNKNOWN',
    shipper: 'EPLASTICS',
    shipperCity: 'SAN DIEGO',
    shipTo: 'CORNELL PUMP',
    consigneeCity: 'CLACKAMAS',
    province: 'OR',
    zip: '97015',
    status: 'Picked Up on 04/03/25',
    puPartnerPro: '155902182',
    delPartnerPro: '',
    onTime: 'Yes'
  },
  {
    id: '6',
    shipDate: '04/02/25',
    deliveryDateTime: '04/04/25 14:30 PM',
    etaDate: '04/03/25',
    shipmentNumber: '811836922',
    bolRefs: 'LT58942',
    shipper: 'GLOBAL LOGISTICS INC',
    shipperCity: 'PORTLAND',
    shipTo: 'WESTSIDE DISTRIBUTORS',
    consigneeCity: 'SEATTLE',
    province: 'WA',
    zip: '98101',
    status: 'Delayed - Weather',
    puPartnerPro: '165971234',
    delPartnerPro: '183456789',
    onTime: 'No'
  }
];
