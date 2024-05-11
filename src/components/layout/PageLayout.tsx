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
    <div className="pb-20">
      <div className="mb-4">
        <div className="flex gap-2 items-center justify-start">
          {backPath && (
            <Link href={backPath} onClick={() => backClick && backClick()}>
              <ChevronLeft aria-label="go back" />
            </Link>
          )}

          {backClick && !backPath && (
            <Button
              onClick={backClick}
              className="bg-transparent hover:border-none w-8 p-0"
            >
              <ChevronLeft />
            </Button>
          )}
          <TypographyH3 className="ml-2">{title}</TypographyH3>
        </div>
      </div>

      {children}
    </div>
  );
};

export default PageLayout;
