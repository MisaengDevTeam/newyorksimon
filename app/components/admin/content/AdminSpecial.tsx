import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import SelectComp from '../../input/SelectComp';
import {
  COMPANY_NAME,
  BROKER_FEE_OPTION,
  UTILITY_OPTION,
} from '@/types/AdminTypes';

interface AdminSpecialProps {}

const AdminSpecial: React.FC<AdminSpecialProps> = ({}) => {
  const newOffer = useRef<HTMLInputElement | null>(null);

  const [company, setCompany] = useState<string | null>(null);
  const [specialOffer, setSpecialOffer] = useState<string>('');
  const [broker, setBroker] = useState<string>('');
  const [utility, setUtility] = useState<string>('');
  const [newBroker, setNewBroker] = useState<string>('');
  const [newUtility, setNewUtility] = useState<string>('');

  const fetchSpecialOffer = async (company: string) => {
    axios.post(`/api/special`, { company }).then((res) => {
      setSpecialOffer(res.data.specialOfferInfo[0].special);
      setBroker(res.data.specialOfferInfo[0].broker);
      setUtility(res.data.specialOfferInfo[0].utility);
    });
  };

  const editSpecialOffer = async (company: string, specialOffer: string) => {
    axios
      .put(`/api/special`, {
        company,
        specialOffer,
      })
      .then((res) => {
        console.log(res.data.message);
      });
  };

  const editNewBrokerUtility = async (
    company: string,
    broker: string,
    utility: string
  ) => {
    axios.put(`/api/special`, { company, broker, utility }).then((res) => {
      console.log(res.data.message);
    });
  };

  return (
    <div className='flex flex-col w-full p-10 gap-10'>
      <div className='flex flex-col w-full p-10 gap-10'>
        <p className='w-full text-center text-xl font-bold italic'>
          SPECIAL OFFER MANAGEMENT
        </p>
        <div className='flex flex-col jusitfy-center items-center w-full px-10'>
          <div className='flex gap-4 w-full justify-center'>
            <div className='w-[150px]'>
              <SelectComp
                placeholder={'Company'}
                options={COMPANY_NAME}
                onChange={(e) => {
                  setCompany(e);
                  fetchSpecialOffer(e);
                }}
                small
              />
            </div>
            <input
              className='border-2 border-neutral-300 rounded-lg px-2 w-1/2'
              value={specialOffer}
              disabled
            />
          </div>
        </div>
        <div className='flex flex-col jusitfy-center items-center w-full px-10'>
          <div className='flex gap-4 w-full justify-center'>
            <div className='w-[150px]'>
              <SelectComp
                defaultValue={company}
                placeholder={'Company'}
                options={COMPANY_NAME}
                onChange={() => {}}
                small
              />
            </div>
            <input
              ref={newOffer}
              className='border-2 border-neutral-300 rounded-lg px-2 w-1/2'
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            onClick={() => {
              editSpecialOffer(company!, newOffer.current?.value!);
              // console.log(newOffer.current?.value);
            }}
            className='border border-[#EC662A] py-4 px-8 rounded-lg font-semibold text-[#EC662A] transition hover:bg-[#EC662A] hover:text-white'
          >
            SUBMIT
          </button>
        </div>
      </div>
      <div className='flex flex-col w-full p-10 gap-10'>
        <p className='w-full text-center text-xl font-bold italic'>
          BROKER FEE, UTILITY
        </p>
        <div className='flex flex-col jusitfy-center items-center w-full px-10'>
          <div className='flex gap-4 w-full justify-center'>
            <div className='w-[150px]'>
              <SelectComp
                placeholder={'Company'}
                defaultValue={company}
                options={COMPANY_NAME}
                onChange={(e) => {
                  setCompany(e);
                }}
                small
              />
            </div>
            <div className='w-[150px]'>
              <SelectComp
                defaultValue={utility}
                placeholder={'Utility'}
                options={UTILITY_OPTION}
                onChange={() => {}}
                disabled
                small
              />
            </div>
            <div className='w-[150px]'>
              <SelectComp
                defaultValue={broker}
                placeholder={'Broker Fee'}
                options={BROKER_FEE_OPTION}
                onChange={() => {}}
                disabled
                small
              />
            </div>
          </div>
        </div>

        <div className='flex flex-col jusitfy-center items-center w-full px-10'>
          <div className='flex gap-4 w-full justify-center'>
            <div className='w-[150px]'>
              <SelectComp
                placeholder={'Company'}
                defaultValue={company}
                options={COMPANY_NAME}
                onChange={(e) => {
                  setCompany(e);
                }}
                small
              />
            </div>
            <div className='w-[150px]'>
              <SelectComp
                placeholder={'Utility'}
                options={UTILITY_OPTION}
                onChange={(e) => {
                  setNewUtility(e);
                }}
                small
              />
            </div>
            <div className='w-[150px]'>
              <SelectComp
                placeholder={'Broker Fee'}
                options={BROKER_FEE_OPTION}
                onChange={(e) => {
                  setNewBroker(e);
                }}
                small
              />
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            onClick={() => {
              editNewBrokerUtility(company!, newBroker, newUtility);
              // editSpecialOffer(company!, newOffer.current?.value!);
              // console.log(newOffer.current?.value);
            }}
            className='border border-[#EC662A] py-4 px-8 rounded-lg font-semibold text-[#EC662A] transition hover:bg-[#EC662A] hover:text-white'
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminSpecial;
