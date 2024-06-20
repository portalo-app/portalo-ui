import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyP,
} from '@core/ui/Typography';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <TypographyH1 className="mb-2 mt-6">{children}</TypographyH1>
    ),
    h2: ({ children }) => (
      <TypographyH2 className="mb-2 mt-6">{children}</TypographyH2>
    ),
    h3: ({ children }) => (
      <TypographyH3 className="mb-2 mt-6">{children}</TypographyH3>
    ),
    h4: ({ children }) => (
      <TypographyH4 className="mb-2 mt-6">{children}</TypographyH4>
    ),
    h5: ({ children }) => (
      <TypographyH5 className="mb-2 mt-6">{children}</TypographyH5>
    ),
    p: ({ children }) => <TypographyP>{children}</TypographyP>,
    ul: ({ children }) => (
      <ul style={{ listStyleType: 'disc', listStylePosition: 'inside' }}>
        {children}
      </ul>
    ),
    ...components,
  };
}
