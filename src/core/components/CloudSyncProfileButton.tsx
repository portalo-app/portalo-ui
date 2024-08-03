import { Button } from '@core/ui/Button';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@core/ui/Tooltip';
import { TypographyP } from '@core/ui/Typography';
import { CloudUpload } from 'lucide-react';
import { FC } from 'react';

interface CloudSyncProfileButtonProps {}

const CloudSyncProfileButton: FC<CloudSyncProfileButtonProps> = () => {
  return (
    <ResponsiveDialog
      title="Cloud Sync"
      trigger={
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <Button
                variant="outline"
                className="flex gap-2 rounded-xl w-full"
              >
                <CloudUpload size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-wrap max-w-[100ch]">
              esto es un tooltip
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    >
      <div className="text-center space-y-2 grid place-items-center">
        <div className="flex justify-center items-center rounded w-full">
          <TypographyP className="text-left">
            Sync your data with the cloud
          </TypographyP>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default CloudSyncProfileButton;
