import { ReactNode, useContext } from 'react';
import { SidebarContext } from '../../context/SidebarContext';
import { useWindowSize } from '../../utils/useWindowSize';

import { BiSolidHome } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { PiMonitorPlay } from 'react-icons/pi';
import { SiYoutubeshorts } from 'react-icons/si';

export const Sidebar = () => {
  const { isSmallOpen, isLargeOpen } = useContext(SidebarContext);
  const { windoWidth } = useWindowSize();

  console.log('🚀 ~ Sidebar ~ width:', windoWidth);

  return (
    <>
      {isSmallOpen && (
        <aside
          className={`sticky top-0 pt-2 overflow-y-auto no-scrollba flex flex-col  ${
            isLargeOpen ? 'lg:hidden' : 'lg:flex'
          }`}
        >
          <SidebarItem icon={<BiSolidHome />} title='Главная' />
          <SidebarItem icon={<SiYoutubeshorts />} title='shorts' />
          <SidebarItem icon={<PiMonitorPlay />} title='Подписки' />
          <SidebarItem icon={<CgProfile />} title='Вы' />
        </aside>
      )}
      {isLargeOpen && (
        <aside className='sticky top-0 pt-2 flex flex-col gap-1 overflow-y-auto no-scrollbar'>
          <LargeSidebarItem icon={<BiSolidHome />} title='Главная' />
          <LargeSidebarItem icon={<BiSolidHome />} title='Главная' />
          <LargeSidebarItem icon={<BiSolidHome />} title='Главная' />
          <LargeSidebarItem icon={<BiSolidHome />} title='Главная' />
          <LargeSidebarItem icon={<BiSolidHome />} title='Главная' />
          <LargeSidebarItem icon={<BiSolidHome />} title='Главная' />
          <LargeSidebarItem icon={<BiSolidHome />} title='Главная' />
          <LargeSidebarItem icon={<BiSolidHome />} title='Главная' />
          <LargeSidebarItem icon={<BiSolidHome />} title='Главная' />
          <LargeSidebarItem icon={<BiSolidHome />} title='Главная' />
          <LargeSidebarItem icon={<BiSolidHome />} title='Главная' />
        </aside>
      )}
    </>
  );
};

type SidebarItemType = {
  icon: ReactNode;
  title: string;
};

const SidebarItem = ({ icon, title }: SidebarItemType) => {
  return (
    <a
      href='#'
      className='py-4 px-[1px] flex flex-col items-center rounded-lg gap-1 hover:bg-gray-100'
    >
      <span className='text-2xl'>{icon}</span>
      <span className='text-xs'> {title}</span>
    </a>
  );
};

const LargeSidebarItem = ({ icon, title }: SidebarItemType) => {
  return (
    <a
      href='#'
      className='py-4 px-4 flex items-center rounded-lg gap-4 hover:bg-gray-100'
    >
      <span className='text-2xl'>{icon}</span>
      <span className='text-sm'>{title}</span>
    </a>
  );
};
