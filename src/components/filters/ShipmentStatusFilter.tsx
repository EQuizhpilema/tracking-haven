
import React from 'react';

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
      <div className="text-sm font-medium mb-2">View by Shipment Status</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Delivered</span>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={deliveredToggle} 
              onChange={onDeliveredToggle} 
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span>Undelivered</span>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={undeliveredToggle} 
              onChange={onUndeliveredToggle} 
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span>Pickups</span>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={pickupsToggle} 
              onChange={onPickupsToggle} 
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShipmentStatusFilter;
