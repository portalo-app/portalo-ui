import { TypographySmall } from '@core/ui/Typography';
import { Info } from 'lucide-react';
import React from 'react';

interface AlertMessageProps {
  text: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ text }) => {
  return (
    <div className="flex bg-primary/80 text-foreground p-1 justify-center items-center gap-1">
      <Info size={20} />
      <TypographySmall>{text}</TypographySmall>
    </div>
  );
};

export default AlertMessage;
