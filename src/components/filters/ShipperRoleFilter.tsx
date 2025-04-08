
import React from 'react';
import ToggleItem from './ToggleItem';

interface ShipperRoleFilterProps {
  shipperToggle: boolean;
  consigneeToggle: boolean;
  billToPartyToggle: boolean;
  onShipperToggle: () => void;
  onConsigneeToggle: () => void;
  onBillToPartyToggle: () => void;
}

const ShipperRoleFilter: React.FC<ShipperRoleFilterProps> = ({
  shipperToggle,
  consigneeToggle,
  billToPartyToggle,
  onShipperToggle,
  onConsigneeToggle,
  onBillToPartyToggle
}) => {
  return (
    <div className="mb-6">
      <div className="text-base font-medium mb-2">View Shipments Where You Are the:</div>
      <div className="space-y-2">
        <ToggleItem
          label="Shipper"
          tooltipContent="You are listed as the shipper — the shipment was or will be picked up from your location."
          isToggled={shipperToggle}
          onToggle={onShipperToggle}
        />
        <ToggleItem
          label="Consignee"
          tooltipContent="You are listed as the receiving party for the final delivery of the shipment."
          isToggled={consigneeToggle}
          onToggle={onConsigneeToggle}
        />
        <ToggleItem
          label="Bill To Party"
          tooltipContent="You are listed as the party responsible for paying the freight charges."
          isToggled={billToPartyToggle}
          onToggle={onBillToPartyToggle}
        />
      </div>
    </div>
  );
};

export default ShipperRoleFilter;
