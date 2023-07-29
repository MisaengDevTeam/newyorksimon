import { ADMIN_MENU } from '@/types/AdminTypes';
import Image from 'next/image';

interface AdminMenuProps {
  currentTab: string;
  setCurrentTab: (cat: string) => void;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ currentTab, setCurrentTab }) => {
  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex flex-col items-center gap-2 pt-8'>
        <Image
          width={100}
          height={150}
          src={'/assets/image/logo/kor_logo_vert.png'}
          alt={'logo'}
        />
        <h3>Life abroad starts from here</h3>
      </div>
      {ADMIN_MENU.map((item) => (
        <button
          key={item.cat}
          onClick={() => {
            setCurrentTab(item.cat);
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
