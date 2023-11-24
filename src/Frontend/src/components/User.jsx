import { useState } from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import { MdOutlineLogout } from 'react-icons/md';

import useAuth from '../hooks/useAuth';

const User = () => {
  const [options, setOptions] = useState(false);
  const { logout, AuthContext } = useAuth();
  const { userCredentials: {
    email,
    displayName,
    photoURL
  }} = AuthContext;
  
  return (
    <div>
      { 
        options ? (
          <button
            className='flex w-full items-center my-1 h-[48px] px-3 rounded-lg bg-[#202123] border border-[#797063]'
            onClick={logout}
          >
            <MdOutlineLogout size={'18px'}/>
            <h1 className='text-sm mx-2'>Log out</h1>
          </button>
        ) : (<div className='flex items-center my-1 h-[48px] px-3 rounded-lg'></div>)
      }
      <div 
        className={`flex items-center px-1.5 py-2 rounded-lg cursor-pointer hover:bg-[#202123] ${options ? 'bg-[#202123]' : 'bg-[#000000]'}`}
        onClick={() => setOptions(!options)}
      >
        {
          displayName ? (
            <div className='flex items-center'>
              <img className='w-[32px] h-[32px] rounded-full' src={photoURL} />
              <h1 className='text-sm mx-2 font-bold'>
                {displayName}
              </h1>
            </div>
          ) : (
            <div className='flex items-center'>
              <FaCircleUser size={'32px'}/>
              <h1 className='text-sm mx-2 font-bold'>
                {email.split('@')[0]}
              </h1>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default User;