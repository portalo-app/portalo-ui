'use client';

import { usePortaloTheme } from '@hooks/general/usePortaloTheme';
import { Moon, Sun } from 'lucide-react';
import { Switch } from './Switch';

export function ModeToggle() {
  const { theme, setTheme } = usePortaloTheme();

  const handleOnChecked = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex space-x-2">
      <Switch checked={theme === 'dark'} onCheckedChange={handleOnChecked} />
      {theme === 'dark' ? <Moon /> : <Sun />}
    </div>
  );
}
