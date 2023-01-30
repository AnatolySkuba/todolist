import { useEffect, useState } from 'react';

// Custom hook that tells you whether a given media query is active.

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(
    () => {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);
      const handler = (event: { matches: boolean | ((prevState: boolean) => boolean) }) =>
        setMatches(event.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );
  return matches;
}

// Get a set of boolean representing which breakpoint is active and which breakpoints are inactive.

function useBreakpoints() {
  const breakpoints = {
    isSm: useMediaQuery('(min-width: 320px) and (max-width: 425px)'),
    isMd: useMediaQuery('(min-width: 426px) and (max-width: 768px)'),
    isLg: useMediaQuery('(min-width: 769px) and (max-width: 2560px)'),
    active: 'xs'
  };
  if (breakpoints.isSm) breakpoints.active = 'sm';
  if (breakpoints.isMd) breakpoints.active = 'md';
  if (breakpoints.isLg) breakpoints.active = 'lg';
  return breakpoints;
}

export default function Breakpoint({ at, children }: { at: string; children: any }) {
  const { active } = useBreakpoints();
  return active === at ? children : null;
}
