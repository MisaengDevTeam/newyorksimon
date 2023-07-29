import { useCallback } from 'react';
import AdminAdvertisement from './AdminAdvertisement';
import AdminListing from './AdminListing';
import AdminSpecial from './AdminSpecial';
import AdminClient from './AdminClient';
import AdminBlog from './AdminBlog';
import AdminEditBlog from './AdminEditBlog';

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
      case 'special':
        return <AdminSpecial />;
      case 'client':
        return <AdminClient />;
      case 'blog':
        return <AdminBlog />;
      case 'editblog':
        return <AdminEditBlog />;

      default:
        return <div>Something wrong</div>;
    }
  }, []);
  return <div className='p-6 w-full h-full'>{generateContent(currentTab)}</div>;
};
export default AdminContent;
