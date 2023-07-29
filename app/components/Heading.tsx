'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className='text-lg font-semibold'>{title}</div>
      <div className='text-sm font-light text-neutral-500 mt-1'>{subtitle}</div>
    </div>
  );
};
export default Heading;
