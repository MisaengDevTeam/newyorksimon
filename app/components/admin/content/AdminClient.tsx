import { useState } from 'react';
import AdminClientRegister from './AdminClientRegister';
import AdminClientCheck from './AdminClientCheck';

interface AdminClientProps {}

const AdminClient: React.FC<AdminClientProps> = ({}) => {
  const [clientMenu, setClientMenu] = useState<string | null>(null);
  const secondMenu = (
    <>
      <button
        onClick={() => {
          setClientMenu('register');
        }}
        className='py-2 px-4 border-dashed border-2 border-[#EC662A] rounded-full text-lg text-[#EC662A] font-semibold'
      >
        Register Client
      </button>
      <button
        onClick={() => {
          setClientMenu('check');
        }}
        className='py-2 px-4 border-dashed border-2 border-[#EC662A] rounded-full text-lg text-[#EC662A] font-semibold'
      >
        Check Current Clients
      </button>
    </>
  );
  return (
    <div className='flex flex-col w-full gap-4'>
      {clientMenu == 'register' ? (
        <AdminClientRegister setClientMenu={setClientMenu} />
      ) : clientMenu == 'check' ? (
        <AdminClientCheck setClientMenu={setClientMenu} />
      ) : (
        secondMenu
      )}
    </div>
  );
};
export default AdminClient;
