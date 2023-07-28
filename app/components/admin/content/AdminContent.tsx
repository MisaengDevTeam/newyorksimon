import { useCallback } from 'react';
import AdminAdvertisement from './AdminAdvertisement';
import AdminListing from './AdminListing';
import AdminPhoto from './AdminPhoto';
import AdminSpecial from './AdminSpecial';
import AdminClient from './AdminClient';
import AdminBlog from './AdminBlog';

interface AdminContentProps {
  currentTab: string;
}

const AdminContent: React.FC<AdminContentProps> = ({ currentTab }) => {
  const generateContent = useCallback((cat: string) => {
    switch (cat) {
      case 'ad':
        return <AdminAdvertisement />;
      case 'listing':
        return <AdminListing />;
      case 'photo':
        return <AdminPhoto />;
      case 'special':
        return <AdminSpecial />;
      case 'client':
        return <AdminClient />;
      case 'blog':
        return <AdminBlog />;

      default:
        return <div>Something wrong</div>;
    }
  }, []);
  return <div className='p-6'>{generateContent(currentTab)}</div>;
};
export default AdminContent;
