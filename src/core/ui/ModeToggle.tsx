'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from './Switch';

export function ModeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const { setTheme } = useTheme();

  const handleOnChecked = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      setTheme(newDarkMode ? 'dark' : 'light');
      localStorage.setItem('darkMode', newDarkMode.toString());
      return newDarkMode;
    });
  };

  useEffect(() => {
    setTheme(darkMode ? 'dark' : 'light');
  }, [darkMode, setTheme]);

  return (
    <div className="flex space-x-2">
      <Switch checked={darkMode} onCheckedChange={handleOnChecked} />
      {darkMode ? <Moon /> : <Sun />}
    </div>
  );
}
