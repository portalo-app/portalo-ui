'use client';

import ConnectWallet from '@core/components/ConnectWallet';
import { Button } from '@core/ui/Button';
import { TypographyLarge } from '@core/ui/Typography';
import { cn } from '@utils/utils';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FeatureHeaderProps {
  title: string;
}

const FeatureHeader = ({ title }: FeatureHeaderProps) => {
  const router = useRouter();

  const isHome = title === 'Home';
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.2 }}
        className="flex items-center text-left md:h-[68px]"
      >
        {!isHome && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-transparent"
          >
            <ArrowLeft />
          </Button>
        )}
        <TypographyLarge className={cn(isHome && 'p-2')}>
          {title}
        </TypographyLarge>
      </motion.div>

      <div className="mr-5">
        <ConnectWallet />
      </div>
    </>
  );
};

export default FeatureHeader;
