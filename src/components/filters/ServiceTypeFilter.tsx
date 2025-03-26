import React from 'react';

interface ServiceTypeFilterProps {
  serviceType: string;
  onServiceTypeChange: (value: string) => void;
}

const ServiceTypeFilter: React.FC<ServiceTypeFilterProps> = ({
  serviceType,
  onServiceTypeChange
}) => {
  return (
    <div className="mb-6">
      <div className="text-base font-medium mb-2">Service Type</div>
      <Select value={serviceType} onValueChange={onServiceTypeChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select service type" />
        </SelectTrigger>
        <SelectContent>
          {serviceTypeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ServiceTypeFilter;
