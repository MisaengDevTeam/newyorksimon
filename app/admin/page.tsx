'use client';

import Link from 'next/link';
import { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = ({}) => {
  const idref = useRef<HTMLInputElement>(null);
  const pwref = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const touchLogin = useCallback(() => {
    if (
      idref.current?.value == process.env.NEXT_PUBLIC_ADMIN_ID &&
      pwref.current?.value == process.env.NEXT_PUBLIC_ADMIN_PW
    ) {
      router.push('/admin/main');
    } else {
      console.log('nono');
    }
  }, [router]);

  return (
    <section className='flex w-full flex-col h-[90vh] justify-center items-center p-8 gap-4'>
      <input
        ref={idref}
        className='border border-neutral-300 rounded-full py-2 px-6 text-lg'
        type='text'
      />
      <input
        ref={pwref}
        className='border border-neutral-300 rounded-full py-2 px-6 text-lg'
        type='password'
      />
      <button
        onClick={touchLogin}
        className='py-4 px-6 border-2 border-[#EC662A] rounded-full text-[#EC662A] hover:bg-[#EC662A] hover:text-white transition'
      >
        LOG IN
      </button>
    </section>
  );
};
export default AdminPage;
