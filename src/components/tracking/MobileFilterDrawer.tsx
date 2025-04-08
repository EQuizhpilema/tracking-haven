
import React from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import FilterSidebar from '../FilterSidebar';

interface MobileFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterProps: {
    onApplyFilter: () => void;
    onResetFilter: () => void;
    deliveredToggle: boolean;
    undeliveredToggle: boolean;
    pickupsToggle: boolean;
    onDeliveredToggle: () => void;
    onUndeliveredToggle: () => void;
    onPickupsToggle: () => void;
    shipperToggle: boolean;
    consigneeToggle: boolean;
    billToToggle: boolean;
    onShipperToggle: () => void;
    onConsigneeToggle: () => void;
    onBillToPartyToggle: () => void;
  };
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({ 
  open, 
  onOpenChange,
  filterProps
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="px-4 py-2 h-[80vh] overflow-auto">
          <FilterSidebar {...filterProps} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilterDrawer;
