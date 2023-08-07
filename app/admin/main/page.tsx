'use client';

import AdminContent from '@/app/components/admin/content/AdminContent';
import AdminMenu from '@/app/components/admin/menu/AdminMenu';
import { useCallback, useState } from 'react';

const AdminMainpage = ({}) => {
  const [currentTab, setCurrentTab] = useState<string>('ad');
  const [menu, setMenu] = useState(true);

  return (
    <section className='flex flex-col sm:flex-row w-full sm:h-[90vh] justify-center items-center p-8 gap-1'>
      <div className='w-full sm:w-1/5 bg-white h-full rounded-2xl p-4 border-2 border-r border-[#EC662A]'>
        <AdminMenu
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          menu={menu}
          setMenu={setMenu}
        />
      </div>
      <div className='w-full sm:w-4/5 bg-white h-full rounded-2xl p-4 border-2 border-l border-[#EC662A] overflow-y-scroll'>
        <AdminContent currentTab={currentTab} />
      </div>
    </section>
  );
};
export default AdminMainpage;
