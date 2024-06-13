'use client';

import { Button } from '@core/ui/Button';
import { TypographyLarge } from '@core/ui/Typography';
import { cn } from '@utils/utils';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FeatureHeaderProps {
  title: string;
}

const FeatureHeader = ({ title }: FeatureHeaderProps) => {
  const router = useRouter();

  const isHome = title === 'Home';
  return (
    <div className="flex items-center text-left md:h-[68px]">
      {!isHome && (
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
      )}

      <TypographyLarge className={cn(isHome && 'p-2')}>{title}</TypographyLarge>
    </div>
  );
};

export default FeatureHeader;
