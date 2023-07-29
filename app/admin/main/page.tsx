'use client';

import AdminContent from '@/app/components/admin/content/AdminContent';
import AdminMenu from '@/app/components/admin/menu/AdminMenu';
import { useState } from 'react';

const AdminMainpage = ({}) => {
  const [currentTab, setCurrentTab] = useState<string>('ad');
  return (
    <section className='flex w-full h-[90vh] justify-center items-center p-8'>
      <div className='w-1/5 bg-white h-full rounded-l-2xl p-4 border-2 border-r border-[#EC662A]'>
        <AdminMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
      <div className='w-4/5 bg-white h-full rounded-r-2xl p-4 border-2 border-l border-[#EC662A]'>
        <AdminContent currentTab={currentTab} />
      </div>
    </section>
  );
};
export default AdminMainpage;
