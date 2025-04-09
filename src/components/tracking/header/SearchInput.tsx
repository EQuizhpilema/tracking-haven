
import React from 'react';
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  searchQuery: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  onSearch
}) => {
  return (
    <div className="flex-1 w-full md:w-auto md:mx-4">
      <Input
        placeholder="Search by Shipment Number, BOL, Shipper, or Ship-To"
        className="w-full"
        value={searchQuery}
        onChange={onSearch}
      />
    </div>
  );
};
