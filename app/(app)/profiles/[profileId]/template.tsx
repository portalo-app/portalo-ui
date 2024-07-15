'use client';

import TemplateLayout from '@core/ui/TemplateLayout';

export default function Template({ children }: { children: React.ReactNode }) {
  return <TemplateLayout>{children}</TemplateLayout>;
}
