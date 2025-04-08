
import React from 'react';
import { Button } from "@/components/ui/button";
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

interface ToggleItemProps {
  label: string;
  tooltipContent: string;
  isToggled: boolean;
  onToggle: () => void;
}

const ToggleItem: React.FC<ToggleItemProps> = ({
  label,
  tooltipContent,
  isToggled,
  onToggle
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <span>{label}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="h-4 w-4 p-0 ml-1">
                <Info className="h-3 w-3 text-muted-foreground" />
                <span className="sr-only">Info</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              {tooltipContent}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center">
        <Switch 
          checked={isToggled} 
          onCheckedChange={onToggle}
        />
      </div>
    </div>
  );
};

export default ToggleItem;
