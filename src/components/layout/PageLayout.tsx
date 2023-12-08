import { Button } from '@/core/ui/Button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  action?: ActionData;
  backPath?: string;
  backClick?: () => void;
}

interface ActionData {
  icon: React.ReactNode;
  onClick: () => void;
  label?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  backPath,
  backClick,
}) => {
  return (
    <div className="bg-foreground my-8 p-4 rounded-3xl shadow-sm shadow-secondary max-w-xl min-w-1/3">
      <div className="flex content-center justify-between mb-2">
        <div className="flex gap-2 content-center justify-center ">
          {backPath && (
            <Link
              href={backPath}
              onClick={() => backClick && backClick()}
              className="flex justify-center flex-col"
            >
              <ChevronLeft color="#fafafa" />
            </Link>
          )}
          {backClick && !backPath && (
            <Button onClick={backClick}>
              <ChevronLeft color="#fafafa" />
            </Button>
          )}
          <h6 className="text-2xl text-secondary flex content-center text-start justify-center flex-col pb-2 ml-2">
            {title}
          </h6>
        </div>
      </div>

      {children}
    </div>
  );
};

export default PageLayout;
