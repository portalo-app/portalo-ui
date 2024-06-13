import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractRouteFromPathname = (pathname: string): string => {
  if (pathname.includes('/vaults')) {
    return '/vaults';
  } else if (pathname.includes('/spaces')) {
    return '/spaces';
  }
  return pathname;
};
