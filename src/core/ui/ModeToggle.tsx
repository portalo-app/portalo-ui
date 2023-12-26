'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from './Switch';

export function ModeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const { setTheme } = useTheme();

  const handleOnChecked = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    darkMode ? setTheme('dark') : setTheme('light')
  }, [darkMode, setTheme])

  return (

    <div className='flex space-x-2'>
      <Switch checked={darkMode} onCheckedChange={handleOnChecked} />
      {darkMode ? (
        <Moon />
      ) : (
        <Sun />
      )}
    </div>
  );
}
