import { ADMIN_MENU } from '@/types/AdminTypes';
import Image from 'next/image';

interface AdminMenuProps {
  setCurrentTab: (cat: string) => void;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ setCurrentTab }) => {
  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex flex-col items-center gap-2 pt-8'>
        <Image
          width={100}
          height={150}
          src={'/assets/image/logo/logo_vert.png'}
          alt={'logo'}
        />
        <h3>Life abroad starts from here</h3>
      </div>
      {ADMIN_MENU.map((item) => (
        <button
          key={ADMIN_MENU.indexOf(item)}
          onClick={() => {
            setCurrentTab(item.cat);
          }}
          className='text-lg font-light'
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
export default AdminMenu;
