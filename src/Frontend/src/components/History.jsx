import { LuPenSquare } from 'react-icons/lu';
import { FaCircleUser, FaGuitar } from 'react-icons/fa6';

import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const History = () => {
  const [userModal, setUserModal] = useState(false);
  const { AuthContext:{userCredentials} } = useAuth();
  console.log(userCredentials);
  return (
    <div className='h-screen w-full max-w-[260px] bg-[#000000] px-3 py-3.5'>
      <div className='flex items-center rounded-lg px-1.5 py-2 cursor-pointer hover:bg-[#202123]'>
        <FaGuitar size={'30px'}/>
        <h1 className='text-sm mx-2'>New chat</h1>
        <LuPenSquare className='ml-[100px]' size={'15px'} />
      </div>
      <div className='h-[89%]'>

      </div>
      <div 
        className='flex items-center rounded-lg px-1.5 py-2 cursor-pointer hover:bg-[#202123] inner bottom-0'
        onClick={() => {}}
      >
        <FaCircleUser size={'30px'}/>
        <h1 className='text-sm mx-2'>
          {userCredentials ? userCredentials.email.split('@')[0] : ''}
        </h1>
      </div>
    </div>
  );
};

export default History;