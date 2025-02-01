import { useState, useEffect } from 'react';

interface WindowSize {
  windoWidth: number;
  height: number;
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windoWidth: Number.POSITIVE_INFINITY,
    height: Number.POSITIVE_INFINITY,
  });

  const handleResize = () => {
    setWindowSize({
      windoWidth: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};
