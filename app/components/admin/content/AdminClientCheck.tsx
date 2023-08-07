import axios from 'axios';
import { useEffect, useState } from 'react';

interface AdminClientCheckProps {
  setClientMenu: (cat: null) => void;
}

const AdminClientCheck: React.FC<AdminClientCheckProps> = ({
  setClientMenu,
}) => {
  const [list, setList] = useState<any[] | null>(null);
  useEffect(() => {
    const fetchClientList = async () => {
      axios.get(`/api/client`).then((res) => {
        setList(res.data.clients);
      });
    };
    fetchClientList();
  }, []);

  return (
    <div className='flex flex-col w-full gap-1'>
      <div className='flex flex-col w-full text-[12px] gap-1'>
        {list &&
          list.map((client) => (
            <div
              key={list.indexOf(client)}
              className='grid grid-cols-2 border-dashed border border-neutral-600 rounded-lg'
            >
              <div className='text-center'>{client.name}</div>
              <div className='text-center'>{client.gender}</div>
              <div className='text-center'>{client.budget}</div>
              <div className='text-center'>{client.movein}</div>
              <div className='text-center'>{client.area}</div>
              <div className='text-center'>{client.phone}</div>
            </div>
          ))}
      </div>
      <button
        onClick={() => {
          setClientMenu(null);
        }}
        className='w-full bg-[#EC662A] py-2 rounded-full text-white'
      >
        Back
      </button>
    </div>
  );
};
export default AdminClientCheck;
