import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractRouteFromPathname = (pathname: string): string => {
  if (pathname.includes('/folders')) {
    return '/folders';
  } else if (pathname.includes('/spaces')) {
    return '/spaces';
  }
  return pathname;
};
