import { Card } from '@core/ui/Card';

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return <Card className="px-4 py-2 md:px-10 md:py-5">{children}</Card>;
}
