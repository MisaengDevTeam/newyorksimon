import Link from 'next/link';

const AdminPage = ({}) => {
  return (
    <section className='flex w-full h-[100vh] justify-center items-center p-8'>
      <Link
        href={`/admin/main`}
        className='py-4 px-8 border-2 border-[#EC662A] rounded-full text-[#EC662A] hover:bg-[#EC662A] hover:text-white transition'
      >
        LOG IN
      </Link>
    </section>
  );
};
export default AdminPage;
