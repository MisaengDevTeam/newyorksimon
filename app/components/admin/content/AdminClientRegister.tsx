import axios from 'axios';
import { useCallback, useRef } from 'react';

interface AdminClientRegisterProps {
  setClientMenu: (cat: null) => void;
}

const AdminClientRegister: React.FC<AdminClientRegisterProps> = ({
  setClientMenu,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const moveinRef = useRef<HTMLInputElement>(null);
  const budgetRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);
  const agentRef = useRef<HTMLInputElement>(null);

  const createdAt = new Date().toLocaleString();

  const createClient = useCallback(() => {
    axios
      .post(`/api/client`, {
        name: nameRef.current?.value,
        gender: genderRef.current?.value,
        phone: phoneRef.current?.value,
        email: emailRef.current?.value,
        movein: moveinRef.current?.value,
        budget: budgetRef.current?.value,
        area: areaRef.current?.value,
        agent: agentRef.current?.value,
        createdAt,
      })
      .then((res) => {
        console.log(res.data);
      });
  }, [createdAt]);

  return (
    <div className='flex flex-col w-full gap-4'>
      <div className='text-[12px]'>
        <label htmlFor='name'>Name</label>
        <input
          ref={nameRef}
          id='name'
          className='w-full border border-neutral-300 rounded-full py-2 px-4'
        />
      </div>
      <div className='text-[12px]'>
        <label htmlFor='gender'>Gender</label>
        <input
          ref={genderRef}
          id='gender'
          className='w-full border border-neutral-300 rounded-full py-2 px-4'
        />
      </div>
      <div className='text-[12px]'>
        <label htmlFor='phone'>Phone</label>
        <input
          ref={phoneRef}
          id='phone'
          className='w-full border border-neutral-300 rounded-full py-2 px-4'
        />
      </div>
      <div className='text-[12px]'>
        <label htmlFor='email'>Email</label>
        <input
          ref={emailRef}
          id='email'
          className='w-full border border-neutral-300 rounded-full py-2 px-4'
        />
      </div>
      <div className='text-[12px]'>
        <label htmlFor='movein'>MoveIn</label>
        <input
          ref={moveinRef}
          id='movein'
          className='w-full border border-neutral-300 rounded-full py-2 px-4'
        />
      </div>
      <div className='text-[12px]'>
        <label htmlFor='budget'>Budget</label>
        <input
          ref={budgetRef}
          id='budget'
          className='w-full border border-neutral-300 rounded-full py-2 px-4'
        />
      </div>
      <div className='text-[12px]'>
        <label htmlFor='area'>Area</label>
        <input
          ref={areaRef}
          id='area'
          className='w-full border border-neutral-300 rounded-full py-2 px-4'
        />
      </div>
      <div className='text-[12px]'>
        <label htmlFor='agent'>Agent</label>
        <input
          ref={agentRef}
          id='agent'
          className='w-full border border-neutral-300 rounded-full py-2 px-4'
        />
      </div>
      <button
        onClick={() => {
          createClient();
          setClientMenu(null);
        }}
        className='w-full bg-[#EC662A] py-2 rounded-full text-white'
      >
        Register
      </button>
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
export default AdminClientRegister;
