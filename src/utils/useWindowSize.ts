import { useState, useEffect } from 'react';

interface WindowSize {
  windoWidth: number | undefined;
  height: number | undefined;
}

// Создаем кастомный хук useWindowSize
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windoWidth: undefined,
    height: undefined,
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
