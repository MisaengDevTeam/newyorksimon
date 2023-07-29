import Link from 'next/link';

interface NavLinkItemProps {
  url: string;
  label: string;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({ url, label }) => {
  return (
    <Link href={url} className='rounded-xl py-2 px-4 hover:bg-[#161A1F]'>
      {label}
    </Link>
  );
};
export default NavLinkItem;
