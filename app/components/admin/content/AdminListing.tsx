'use client';

import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import Heading from '../../Heading';

interface Information {
  Amenity: string[];
  Bathroom: string;
  Bedroom: string;
  Broker: string;
  CreatedTime: string;
  Feature: string[];
  Unit: string;
  MoveInDate: string;
  Price: number;
  Special: string;
  Utility: string;
  Address: string;
  Company: string;
  [key: string]: any;
}

const AdminListing = ({}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [information, setInformation] = useState<Information | null>(null);

  const mergeObjects = useCallback((obj1: any, obj2: any) => {
    return {
      Company: obj1.cp,
      Address: obj2.address,
      Unit: obj1.unit,
      Price: obj1.price,
      Bedroom: obj1.bedCount,
      Bathroom: obj1.bathCount,
      MoveInDate: obj1.moveDate,
      Broker: obj1.broker,
      Utility: obj1.utility,
      Amenity: obj1.amenity,
      Feature: obj1.feature,
      Special: obj1.special,
      CreatedTime: obj1.createdAt,
    };
  }, []);

  const fetchData = async (url: string) => {
    axios
      .post(`/api/rentlisting`, { rentId: url.split('=')[1] })
      .then((res) => {
        const organizeInfo = mergeObjects(
          res.data.listingInfo[0],
          res.data.buildingInfo[0]
        );
        setInformation(organizeInfo);
      });
  };

  const subtitle = `hihihi`;

  return (
    <div className='flex flex-col w-full gap-10'>
      <Heading
        title={'리스팅 정보 검색'}
        subtitle={`URL 주소를 그대로 복사해서 붙여넣기`}
      />
      <div className='flex w-full justify-start gap-4'>
        <input
          ref={inputRef}
          type='text'
          className='border-2 border-dashed border-[#EC662A] py-2 px-4 outline-none focus:bg-orange-100 rounded-xl w-full max-w-[720px] h-[40px]'
        />
        <button
          onClick={() => {
            fetchData(inputRef.current?.value!);
          }}
          className='w-[100px] h-[40px] bg-[#EC662A] text-white rounded-xl'
        >
          Search
        </button>
      </div>
      <div className='flex flex-col'>
        {information &&
          Object.keys(information).map((key) => (
            <div key={key} className='flex gap-4'>
              <p>{key}: </p>
              <p>{information[key].toString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
export default AdminListing;
