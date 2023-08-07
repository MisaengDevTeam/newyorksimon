import { ADMIN_MENU } from '@/types/AdminTypes';
import Image from 'next/image';
import { useCallback, useState } from 'react';

interface AdminMenuProps {
  currentTab: string;
  menu: boolean;
  setCurrentTab: (cat: string) => void;
  setMenu: (isMenu: boolean) => void;
}

const AdminMenu: React.FC<AdminMenuProps> = ({
  currentTab,
  setCurrentTab,
  menu,
  setMenu,
}) => {
  const tabCategory = useCallback(
    (cat: string) => {
      setCurrentTab(cat);
      setMenu(!menu);
    },
    [menu, setCurrentTab, setMenu]
  );

  return (
    <div className='flex flex-col items-center gap-6'>
      <button
        onClick={() => {
          setMenu(!menu);
        }}
        className={`w-full h-[40px] bg-[#EC662A] rounded-full w-full text-white sm:hidden`}
      >
        Menu
      </button>
      <div className='hidden sm:flex flex-col items-center gap-2 pt-8'>
        <Image
          width={100}
          height={150}
          src={'/assets/image/logo/kor_logo_vert.png'}
          alt={'logo'}
        />
        <h3>Life abroad starts from here</h3>
      </div>
      {menu &&
        ADMIN_MENU.map((item) => (
          <button
            key={item.cat}
            onClick={() => {
              tabCategory(item.cat);
            }}
            className={`text-lg hover:text-[#EC662A] hover:font-bold
          ${
            currentTab == item.cat
              ? ' text-[#EC662A] font-bold'
              : ' text-[#000] font-light'
          }
          `}
          >
            {item.label}
          </button>
        ))}
    </div>
  );
};
export default AdminMenu;
