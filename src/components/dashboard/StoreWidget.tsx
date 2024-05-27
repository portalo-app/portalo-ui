import { Card } from '@core/ui/Card';
import { TypographyH4, TypographyMuted } from '@core/ui/Typography';
import { Sparkles } from 'lucide-react';

interface StoreWidgetProps {}

const StoreWidget: React.FC<StoreWidgetProps> = () => {
  return (
    <Card className="h-40 bg-muted flex flex-col justify-center items-center border-muted-foreground/20">
      <Sparkles size={48} className="text-muted-foreground mb-2" />

      <TypographyH4>Press to store</TypographyH4>

      <TypographyMuted>Store anything anywhere</TypographyMuted>
    </Card>
  );
};

export default StoreWidget;
