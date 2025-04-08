
import React from 'react';
import ToggleItem from './ToggleItem';

interface ShipmentStatusFilterProps {
  deliveredToggle: boolean;
  undeliveredToggle: boolean;
  pickupsToggle: boolean;
  onDeliveredToggle: () => void;
  onUndeliveredToggle: () => void;
  onPickupsToggle: () => void;
}

const ShipmentStatusFilter: React.FC<ShipmentStatusFilterProps> = ({
  deliveredToggle,
  undeliveredToggle,
  pickupsToggle,
  onDeliveredToggle,
  onUndeliveredToggle,
  onPickupsToggle
}) => {
  return (
    <div className="mb-6">
      <div className="text-base font-medium mb-2">View by Shipment Status</div>
      <div className="space-y-3">
        <ToggleItem
          label="Delivered"
          tooltipContent="The shipment has been delivered to the consignee."
          isToggled={deliveredToggle}
          onToggle={onDeliveredToggle}
        />
        <ToggleItem
          label="Undelivered"
          tooltipContent="The shipment has not yet reached final delivery."
          isToggled={undeliveredToggle}
          onToggle={onUndeliveredToggle}
        />
        <ToggleItem
          label="Pickups"
          tooltipContent="Shipments that are scheduled for pickup or have been recently picked up and confirmed by the carrier."
          isToggled={pickupsToggle}
          onToggle={onPickupsToggle}
        />
      </div>
    </div>
  );
};

export default ShipmentStatusFilter;
