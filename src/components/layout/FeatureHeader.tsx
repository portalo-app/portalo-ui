'use client';

import { ROUTES } from '@constants/routes.const';
import { Button } from '@core/ui/Button';
import { TypographyLarge } from '@core/ui/Typography';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FeatureHeaderProps {
  title: string;
}

const FeatureHeader = ({ title }: FeatureHeaderProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center text-left">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(ROUTES.APP)}
        >
          <ArrowLeft />
        </Button>

        <TypographyLarge>{title}</TypographyLarge>
      </div>
    </>
  );
};

export default FeatureHeader;
