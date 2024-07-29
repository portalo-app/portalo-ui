'use client';

import { Card } from '@core/ui/Card';
import { TypographyH4, TypographyMuted } from '@core/ui/Typography';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface StoreWidgetProps {}

const StoreWidget: React.FC<StoreWidgetProps> = () => {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
      <Card className="h-40 bg-muted flex flex-col justify-center items-center  shadow-md shadow-primary/20">
        <Sparkles
          size={48}
          className="text-muted-foreground mb-2 animate-pulse"
        />

        <TypographyH4 className="animate-pulse">Press to store</TypographyH4>

        <TypographyMuted>Store anything anywhere</TypographyMuted>
      </Card>
    </motion.div>
  );
};

export default StoreWidget;
