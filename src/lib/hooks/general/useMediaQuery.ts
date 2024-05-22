import { useEffect, useState } from 'react';

export const MEDIAQUERY_DESKTOP = '(min-width: 768px)';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set initial matches value
    setMatches(mediaQuery.matches);

    // Add event listener for changes in the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Cleanup on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [query]);

  return matches;
}
