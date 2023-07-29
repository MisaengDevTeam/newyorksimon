import Image from 'next/image';
import Link from 'next/link';
import NavLinkItem from './NavLinkItem';

const Navbar = ({}) => {
  return (
    <nav className='fixed w-full flex justify-center p-4 h-[83px] shadow-lg'>
      <div className='flex justify-between items-center w-full max-w-[1440px] text-[#E5BD4C]'>
        <Link
          className='flex items-center gap-2 w-[220px] cursor-pointer'
          href={'/'}
        >
          <Image
            width={48}
            height={48}
            src={'/assets/image/logo/nysimon_logo.png'}
            alt={'logo'}
          />
          <p className='text-xl'>New York Simon</p>
        </Link>
        <div className='hidden md:flex gap-2 lg:gap-8'>
          <NavLinkItem url={'#simon'} label={'Who is Simon?'} />
          <NavLinkItem url={'#life'} label={'Life'} />
          <NavLinkItem url={'#projects'} label={'Projects'} />
          <NavLinkItem url={'#golf'} label={'Golf'} />
        </div>
        <div className='flex justify-end w-[220px]'>
          <NavLinkItem url={'/admin'} label={'Admin'} />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
