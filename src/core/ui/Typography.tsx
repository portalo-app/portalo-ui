import { cn } from '@utils/utils';
import React from 'react';

interface TypographyProps extends React.HTMLProps<HTMLElement> {
  // Add any additional props specific to your components
}

export const TypographyH1: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <h1
    className={cn(
      className,
      'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
    )}
  >
    {children}
  </h1>
);

export const TypographyH2: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <h2
    className={cn(
      className,
      'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'
    )}
  >
    {children}
  </h2>
);

export const TypographyH3: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <h3
    className={cn(
      className,
      'scroll-m-20 text-2xl font-semibold tracking-tight'
    )}
  >
    {children}
  </h3>
);

export const TypographyH4: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <h4
    className={cn(
      className,
      'scroll-m-20 text-xl font-semibold tracking-tight'
    )}
  >
    {children}
  </h4>
);

export const TypographyH5: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <h5
    className={cn(
      className,
      'scroll-m-20 text-lg font-semibold tracking-tight'
    )}
  >
    {children}
  </h5>
);

export const TypographyP: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <p className={cn(className, 'leading-7 [&:not(:first-child)]:mt-6')}>
    {children}
  </p>
);

export const TypographyBlockquote: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <blockquote className={cn(className, 'mt-6 border-l-2 pl-6 italic')}>
    {children}
  </blockquote>
);

export const TypographyInlineCode: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <code
    className={cn(
      className,
      'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
    )}
  >
    {children}
  </code>
);

export const TypographyLead: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <p className={cn(className, 'text-xl text-muted-foreground')}>{children}</p>
);

export const TypographyLarge: React.FC<TypographyProps> = ({
  className,
  children,
}) => <div className={cn(className, 'text-lg font-semibold')}>{children}</div>;

export const TypographySmall: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <small className={cn(className, 'text-sm font-medium leading-none')}>
    {children}
  </small>
);

export const TypographyXS: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <p className={cn(className, 'text-xs leading-none md:text-sm')}>{children}</p>
);

export const TypographyXXS: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <p className={cn(className, 'text-xxs leading-none md:text-sm')}>
    {children}
  </p>
);

export const TypographyMutedXS: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <p className={cn(className, 'text-xs text-muted-foreground md:text-sm')}>
    {children}
  </p>
);

export const TypographyMuted: React.FC<TypographyProps> = ({
  className,
  children,
}) => (
  <p className={cn(className, 'text-sm text-muted-foreground')}>{children}</p>
);
