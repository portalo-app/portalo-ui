import { Button } from '@core/ui/Button';
import { TypographyH3 } from '@core/ui/Typography';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  backPath?: string;
  backClick?: () => void;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  backPath,
  backClick,
}) => {
  return (
    <div className="my-8 max-w-xs w-full">
      <div className="flex content-center justify-between mb-2">
        <div className="flex gap-2 content-center justify-center ">
          {backPath && (
            <Link
              href={backPath}
              onClick={() => backClick && backClick()}
              className="flex justify-center flex-col"
            >
              <ChevronLeft />
            </Link>
          )}
          {backClick && !backPath && (
            <Button onClick={backClick}>
              <ChevronLeft />
            </Button>
          )}
          <TypographyH3 className={` font-bold text-2xl flex content-center text-start justify-center flex-col pb-2 ml-2 ${!backPath && 'ml-10'}`}>
            {title}
          </TypographyH3>
        </div>
      </div>

      {children}
    </div>
  );
};

export default PageLayout;
