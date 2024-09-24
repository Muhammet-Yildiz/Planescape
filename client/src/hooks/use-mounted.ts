import { useEffect, useRef } from 'react';

export const useMounted = (): React.MutableRefObject<boolean> => {
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};