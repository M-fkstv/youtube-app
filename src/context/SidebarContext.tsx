import { ReactElement, createContext, useEffect, useState } from 'react';
import { useWindowSize } from '../utils/useWindowSize';

type SidebarProviderProps = {
  children: ReactElement;
};

export type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle?: () => void;
};

export const SidebarContext = createContext<SidebarContextType>({
  isLargeOpen: true,
  isSmallOpen: false,
});

// export function useSidebarContext() {
//   const value = useContext(SidebarContext);
//   if (value == null) throw Error('Cannot use outside of SidebarProvider');

//   return value;
// }

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(true);

  const { windoWidth } = useWindowSize();

  useEffect(() => {
    if (windoWidth < 768) {
      setIsSmallOpen(true);
      setIsLargeOpen(false);
    } else {
      setIsSmallOpen(false);
      setIsLargeOpen(true);
    }
  }, [windoWidth]);

  function toggle() {
    setIsSmallOpen((open) => !open);
    setIsLargeOpen((open) => !open);
  }

  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
