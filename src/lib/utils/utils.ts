import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractRouteFromPathname = (pathname: string): string => {
  if (pathname.includes('/folders')) {
    return '/folders';
  } else if (pathname.includes('/profiles')) {
    return '/profiles';
  }
  return pathname;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
