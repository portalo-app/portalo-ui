import { ALERT_MESSAGE } from '@constants/constants.const';
import { TypographySmall } from '@core/ui/Typography';
import { Info } from 'lucide-react';

const AlertMessage = () => {
  return (
    <div className="flex bg-primary/5 p-1 justify-center items-center gap-1">
      <Info size={20} />
      <TypographySmall>{ALERT_MESSAGE}</TypographySmall>
    </div>
  );
};

export default AlertMessage;
