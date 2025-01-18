import { useState } from 'react';
import { Button } from '../Button/Button';
import Logo from '../../assets/Logo.svg';

import { CiMenuBurger, CiSearch } from 'react-icons/ci';
import { FiPlus } from 'react-icons/fi';
import { IoMic } from 'react-icons/io5';
import { VscBell } from 'react-icons/vsc';
import { FaArrowLeft } from 'react-icons/fa6';

export const Header = () => {
  const [formActive, setFormActive] = useState<boolean>(false);

  function isScreenSmall() {
    return window.innerWidth < 640;
  }

  return (
    <div className='lg:gap-20 flex w-full items-center justify-between gap-6 text-lg'>
      <div
        className={`flex items-center gap-2 shrink-0 ${formActive && 'hidden'}`}
      >
        <Button variant='primary' icon={<CiMenuBurger />} />
        <div>
          <a href='/'>
            <img src={Logo} alt='Your SVG' />
          </a>
        </div>
      </div>
      <form
        className={`flex-grow justify-center rounded-full gap-2 ${
          formActive ? 'flex' : 'hidden sm:flex'
        }`}
      >
        {formActive && (
          <Button
            variant='primary'
            onClick={() => setFormActive(false)}
            icon={<FaArrowLeft />}
          />
        )}
        <div className='flex flex-grow max-w-[600px] '>
          <input
            type='text'
            placeholder='Введите запрос'
            className=' w-full rounded-l-full pl-4 text-lg border border-r-1 focus:border-blue-500 border-gray-300 outline-none shadow-inner '
          />
          <Button
            variant='secondary'
            type='button'
            icon={<CiSearch />}
            className='rounded-l-none '
          />
        </div>
        <Button variant='secondary' type='button' icon={<IoMic />} />
      </form>
      <div
        className={`${
          formActive ? 'hidden ' : 'flex'
        } items-center gap-2 shrink-0`}
      >
        <Button
          variant='primary'
          type='button'
          onClick={() => setFormActive(true)}
          icon={<CiSearch />}
          className='flex sm:hidden'
        />
        <Button
          variant='secondary'
          icon={<FiPlus />}
          text={!isScreenSmall() ? 'Создать' : ''}
        />
        {/* TODO: hide text in small screen */}
        <Button variant='primary' icon={<VscBell />} />
        <a
          href='/'
          className='bg-red-400 hover:bg-red-700 text-white-400 rounded-full p-2 w-8 h-8 flex items-center transition duration-100 ease-out hover:ease-in'
        >
          M
        </a>
      </div>
    </div>
  );
};
