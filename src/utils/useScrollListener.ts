import { useCallback, useEffect } from 'react';

export function useScrollListener(onScroll: (e: Event) => void, deps: any[]) {
  const listenToScroll = useCallback(
    (e: Event) => {
      requestAnimationFrame(() => onScroll(e));
    },
    [onScroll, ...deps],
  );

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => {
      window?.removeEventListener('scroll', listenToScroll);
    };
  }, []);
}
