import { useContext, useState } from 'react';
import { Button } from '../Button/Button';
import Logo from '../../assets/Logo.svg';

import { CiMenuBurger, CiSearch } from 'react-icons/ci';
import { FiPlus } from 'react-icons/fi';
import { IoMic } from 'react-icons/io5';
import { VscBell } from 'react-icons/vsc';
import { FaArrowLeft } from 'react-icons/fa6';
import { SidebarContext } from '../../context/SidebarContext';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const Header = () => {
  const [formActive, setFormActive] = useState<boolean>(false);
  const [q, setQ] = useState<string>('');
  const { toggle } = useContext(SidebarContext);

  function isScreenSmall() {
    return window.innerWidth < 640;
  }

  const load = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios
      .get(`https://www.googleapis.com/youtube/v3/search?q=${q}`, {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          type: 'video',
          key: API_KEY,
        },
      })
      .then(({ data }) => console.log(data.items));
  };

  return (
    <header className='lg:gap-20 flex w-full items-center justify-between gap-6 text-lg pr-10 pb-4'>
      <div
        className={`flex items-center gap-2 shrink-0 ${formActive && 'hidden'}`}
      >
        <Button variant='primary' icon={<CiMenuBurger />} onClick={toggle} />
        <div>
          <a href='/'>
            <img src={Logo} alt='Your SVG' />
          </a>
        </div>
      </div>
      <form
        onSubmit={load}
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
            onChange={(e: React.FormEvent<HTMLInputElement>): void => {
              setQ(e.currentTarget.value);
            }}
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

        <Button variant='primary' icon={<VscBell />} />
        <a
          href='/'
          className='bg-red-400 hover:bg-red-700 text-white-400 rounded-full p-2 w-8 h-8 flex items-center transition duration-100 ease-out hover:ease-in'
        >
          M
        </a>
      </div>
    </header>
  );
};
