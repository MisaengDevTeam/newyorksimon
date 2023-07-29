import Heading from '../../Heading';
import SelectComp from '../../input/SelectComp';

interface AdminAdvertisementProps {}

const AdminAdvertisement: React.FC<AdminAdvertisementProps> = ({}) => {
  const subtitle = `페이스북 및 헤이코리안 광고 제작`;
  return (
    <div className='flex flex-col w-full h-full'>
      <Heading title={'광고글 작성'} subtitle={subtitle} />
      <div className='flex w-full p-4 gap-4'>
        <div className='w-1/3'>
          <SelectComp
            small
            placeholder={'광고 플랫폼'}
            options={[
              { label: '헤이코리안', value: 'heykorean' },
              { label: '페이스북', value: 'facebook' },
            ]}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className='flex w-full p-4 gap-4'>
        <div className='w-1/3'>
          <SelectComp
            small
            placeholder={'광고 플랫폼'}
            options={[
              { label: '헤이코리안', value: 'heykorean' },
              { label: '페이스북', value: 'facebook' },
            ]}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
export default AdminAdvertisement;
