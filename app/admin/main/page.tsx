'use client';

import AdminContent from '@/app/components/admin/content/AdminContent';
import AdminMenu from '@/app/components/admin/menu/AdminMenu';
import { useState } from 'react';

const AdminMainpage = ({}) => {
  const [currentTab, setCurrentTab] = useState<string>('ad');
  return (
    <section className='flex w-full h-[100vh] justify-center items-center p-8 bg-neutral-700'>
      <div className='w-1/5 bg-white h-full rounded-l-2xl p-4 border border-r border-neutral-300'>
        <AdminMenu setCurrentTab={setCurrentTab} />
      </div>
      <div className='w-4/5 bg-white h-full rounded-r-2xl p-4 border border-l border-neutral-300'>
        <AdminContent currentTab={currentTab} />
      </div>
    </section>
  );
};
export default AdminMainpage;
