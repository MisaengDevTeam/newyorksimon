import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import SelectComp from '../../input/SelectComp';
import {
  COMPANY_NAME,
  BROKER_FEE_OPTION,
  UTILITY_OPTION,
  ROOMTYPE_OPTION,
} from '@/types/AdminTypes';
import {
  ROCKROSE_BUILDING,
  STONEHENGE_BUILDING,
  GOTHAM_BUILDING,
  METRONEST_BUILDING,
  CENTENNIAL_BUILDING,
  TFC_BUILDING,
  BILTMORE_BUILDING,
  STUYTOWN_BUILDING,
  RELATED_BUILDING,
} from '@/types/BuildingTypes';

interface AdminSpecialProps {}

const AdminSpecial: React.FC<AdminSpecialProps> = ({}) => {
  const newOffer = useRef<HTMLInputElement | null>(null);

  const [company, setCompany] = useState<string | null>(null);
  const [roomtype, setRoomtype] = useState<string>('');
  const [building, setBuilding] = useState<string>('');
  const [specialOffer, setSpecialOffer] = useState<string>('');
  const [broker, setBroker] = useState<string>('');
  const [utility, setUtility] = useState<string>('');
  const [newBroker, setNewBroker] = useState<string>('');
  const [newUtility, setNewUtility] = useState<string>('');

  const fetchSpecialOffer = async (
    company: string,
    building: string,
    roomtype: string
  ) => {
    axios.post(`/api/special`, { company, building, roomtype }).then((res) => {
      setSpecialOffer(res.data.specialOfferInfo[0].special);
      setBroker(res.data.specialOfferInfo[0].broker);
      setUtility(res.data.specialOfferInfo[0].utility);
    });
  };

  const editSpecialOffer = async (company: string, specialOffer: string) => {
    axios
      .put(`/api/special`, {
        company,
        building,
        roomtype,
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
    axios
      .put(`/api/special`, { company, building, roomtype, broker, utility })
      .then((res) => {
        console.log(res.data.message);
      });
  };

  const generateOption = useCallback((buildingName: string) => {
    switch (buildingName) {
      case 'rr':
        return ROCKROSE_BUILDING;
      case 'sh':
        return STONEHENGE_BUILDING;
      case 'gthm':
        return GOTHAM_BUILDING;
      case 'mtrn':
        return METRONEST_BUILDING;
      case 'tfc':
        return TFC_BUILDING;
      case 'ct':
        return CENTENNIAL_BUILDING;
      case 'btm':
        return BILTMORE_BUILDING;
      case 'st':
        return STUYTOWN_BUILDING;
      case 'rltd':
        return RELATED_BUILDING;
      default:
        return [{ label: '', value: '' }];
    }
  }, []);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-4 gap-4'>
      <div className='flex flex-col w-full p-4 gap-4'>
        <p className='w-full text-center text-xl font-bold italic'>
          SPECIAL OFFER MANAGEMENT
        </p>
        <div className='flex flex-col jusitfy-center items-center w-full px-10'>
          <div className='flex gap-4 w-full justify-center'>
            <div className='w-1/6'>
              <SelectComp
                placeholder={'Company'}
                options={COMPANY_NAME}
                onChange={(e) => {
                  setCompany(e);
                }}
                small
              />
            </div>
            <div className='w-1/6'>
              <SelectComp
                placeholder={'Building'}
                options={
                  company ? generateOption(company) : [{ label: '', value: '' }]
                }
                onChange={(e) => {
                  setBuilding(e);
                }}
                small
              />
            </div>
            <div className='w-1/6'>
              <SelectComp
                placeholder={'Room'}
                options={ROOMTYPE_OPTION}
                onChange={(e) => {
                  setRoomtype(e);
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
            <div className='w-1/6'>
              <SelectComp
                disabled
                defaultValue={company}
                placeholder={'Company'}
                options={COMPANY_NAME}
                onChange={() => {}}
                small
              />
            </div>
            <div className='w-1/6'>
              <SelectComp
                disabled
                defaultValue={building}
                placeholder={'Company'}
                options={
                  company ? generateOption(company) : [{ label: '', value: '' }]
                }
                onChange={(e) => {
                  console.log(e);
                }}
                small
              />
            </div>
            <div className='w-1/6'>
              <SelectComp
                disabled
                placeholder={'Room'}
                defaultValue={roomtype}
                options={ROOMTYPE_OPTION}
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
        <div className='flex flex-row justify-center gap-4'>
          <button
            onClick={() => {
              fetchSpecialOffer(company!, building, roomtype);
              // console.log(newOffer.current?.value);
            }}
            className='border border-[#EC662A] py-4 px-8 rounded-lg font-semibold text-[#EC662A] transition hover:bg-[#EC662A] hover:text-white'
          >
            SEARCH
          </button>
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
      <div className='flex flex-col w-full p-4 gap-4'>
        <p className='w-full text-center text-xl font-bold italic'>
          BROKER FEE, UTILITY
        </p>
        <div className='flex flex-col jusitfy-center items-center w-full px-10'>
          <div className='flex gap-4 w-full justify-center'>
            <div className='w-1/6'>
              <SelectComp
                placeholder={'Company'}
                defaultValue={company}
                options={COMPANY_NAME}
                onChange={(e) => {
                  setCompany(e);
                }}
                disabled
                small
              />
            </div>
            <div className='w-1/6'>
              <SelectComp
                disabled
                defaultValue={building}
                placeholder={'Company'}
                options={
                  company ? generateOption(company) : [{ label: '', value: '' }]
                }
                onChange={(e) => {
                  console.log(e);
                }}
                small
              />
            </div>
            <div className='w-1/6'>
              <SelectComp
                disabled
                placeholder={'Room'}
                defaultValue={roomtype}
                options={ROOMTYPE_OPTION}
                onChange={() => {}}
                small
              />
            </div>
            <div className='w-1/4'>
              <SelectComp
                defaultValue={utility}
                placeholder={'Utility'}
                options={UTILITY_OPTION}
                onChange={() => {}}
                disabled
                small
              />
            </div>
            <div className='w-1/4'>
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
            <div className='w-1/6'>
              <SelectComp
                placeholder={'Company'}
                defaultValue={company}
                options={COMPANY_NAME}
                onChange={(e) => {
                  setCompany(e);
                }}
                disabled
                small
              />
            </div>
            <div className='w-1/6'>
              <SelectComp
                disabled
                defaultValue={building}
                placeholder={'Company'}
                options={
                  company ? generateOption(company) : [{ label: '', value: '' }]
                }
                onChange={(e) => {
                  console.log(e);
                }}
                small
              />
            </div>
            <div className='w-1/6'>
              <SelectComp
                disabled
                placeholder={'Room'}
                defaultValue={roomtype}
                options={ROOMTYPE_OPTION}
                onChange={() => {}}
                small
              />
            </div>
            <div className='w-1/4'>
              <SelectComp
                placeholder={'Utility'}
                options={UTILITY_OPTION}
                onChange={(e) => {
                  setNewUtility(e);
                }}
                small
              />
            </div>
            <div className='w-1/4'>
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
