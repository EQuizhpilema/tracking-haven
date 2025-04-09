
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface ExportButtonProps {
  isMobile: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  isMobile
}) => {
  const handleExportToExcel = () => {
    toast({
      title: "Export Started",
      description: "Your data is being exported to Excel...",
    });
    // In a real app, this would implement actual export logic
  };

  return (
    <Button
      variant="outline"
      className="w-full md:w-auto mt-3 md:mt-0 flex items-center justify-center bg-tracking-blue text-white hover:bg-blue-600 transition-colors"
      onClick={handleExportToExcel}
    >
      {isMobile ? 'Export To Excel' : (
        <>
          <FileText className="mr-2 h-4 w-4" />
          Export To Excel
        </>
      )}
    </Button>
  );
};
