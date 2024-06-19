'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from './Switch';

export function ModeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();

  const getCurrentTheme = () => {
    if (['light', 'dark'].includes(theme!)) return theme;

    return systemTheme;
  };

  const handleOnChecked = () => {
    const currentTheme = getCurrentTheme();

    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex space-x-2">
      <Switch
        checked={getCurrentTheme() === 'dark'}
        onCheckedChange={handleOnChecked}
      />
      {getCurrentTheme() === 'dark' ? <Moon /> : <Sun />}
    </div>
  );
}
