import { useState } from 'react';
import { FaCircleUser, FaTemperatureHalf } from 'react-icons/fa6';
import { MdOutlineLogout } from 'react-icons/md';

import useAuth from '../hooks/useAuth';
import useDataBase from '../hooks/useDataBase';
import { TEMPERATURE } from '../types';

const User = () => {
  const [newTemperature, setNewTemperature] = useState(null);
  const [editTemperature, setEditTemperature] = useState(false);
  const [options, setOptions] = useState(false);
  const { DataBaseContext: { 
      temperature,
      setDataBaseContextState 
    } 
  } = useDataBase();
  const { logout, AuthContext } = useAuth();
  const { userCredentials: {
    email,
    displayName,
    photoURL
  }} = AuthContext;

  const handleTemperature = (event) => {
    event.preventDefault();
    if (newTemperature && newTemperature !== '') {
      setDataBaseContextState(TEMPERATURE, newTemperature);
    }
    setEditTemperature(false);
  };
  
  return (
    <div className=''>
      { 
        options ? (
          <div className='w-full h-[100px] my-1 p-1 bg-[#202123] rounded-lg border border-[#797063]'>
            {
              editTemperature === false ? (
                <button 
                  className='flex w-full h-1/2 items-center px-3 border-radius-top-left-10'
                  onClick={() => setEditTemperature(true)}
                >
                  <FaTemperatureHalf size={'18px'}/>
                  <h1 className='text-sm mx-2'>{`Temperature: ${temperature}`}</h1>
                </button>
              ) : (
                <form 
                  className='flex w-full h-1/2 items-center px-3 border-radius-top-left-10'
                  onSubmit={handleTemperature}
                >
                  <FaTemperatureHalf size={'18px'}/>
                  <input 
                    type='number' 
                    placeholder={temperature}
                    className='w-full ml-2 bg-[#202123] focus:outline-none'
                    onInput={(event) => setNewTemperature(event.target.value)}
                  />
                </form>
              )
            }
            <button
              className='flex w-full h-1/2 items-center px-3 border-t border-[#797063]'
              onClick={logout}
            >
              <MdOutlineLogout size={'18px'}/>
              <h1 className='text-sm mx-2'>Log out</h1>
            </button>
          </div>
        ) : (<div className='flex items-center my-1 h-[100px] px-3 rounded-lg'></div>)
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