import { useTheme } from 'next-themes';

type Theme = 'dark' | 'light';

export function usePortaloTheme(): {
  theme: Theme;
  setTheme: (theme: Theme) => void;
} {
  const { theme, systemTheme, setTheme } = useTheme();

  if (['light', 'dark'].includes(theme!))
    return { theme: theme as Theme, setTheme };

  return { theme: systemTheme as Theme, setTheme };
}
