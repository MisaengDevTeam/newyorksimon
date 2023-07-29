import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex w-[100vw] h-[90vh] justify-center items-center'>
      <Link
        href={`/admin`}
        className='py-4 px-6 bg-[#EC662A] text-white rounded-full border-2 border-[#EC662A] hover:bg-white hover:text-[#EC662A] transition'
      >
        HELLO WORLD, THIS IS NEW YOK SIMON.
      </Link>
    </main>
  );
}
