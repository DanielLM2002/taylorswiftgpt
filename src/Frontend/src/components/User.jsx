import { useState } from 'react';
import { FaCircleCheck, FaCircleUser, FaTemperatureHalf } from 'react-icons/fa6';
import { MdOutlineLogout } from 'react-icons/md';

import useAuth from '../hooks/useAuth';
import useDataBase from '../hooks/useDataBase';
import { TEMPERATURE } from '../types';

const User = () => {
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
  const [newTemperature, setNewTemperature] = useState(temperature);
  const [editTemperature, setEditTemperature] = useState(false);
  const [options, setOptions] = useState(false);

  const handleTemperature = (event) => {
    event.preventDefault();
    if (newTemperature && newTemperature !== '' && newTemperature !== '0' && newTemperature !== '0.') {
      setDataBaseContextState(TEMPERATURE, newTemperature);
    } else {
      setNewTemperature(temperature);
    }
    setEditTemperature(false);
  };

  const handleInput = (event) => {
    const regex = /^(0(\.\d*)?|0\.[1-9]\d*|\.(\d*[1-9])?)?$/;
    const value = event.target.value;
    if (value.match(regex)) {
      setNewTemperature(value);
    }
  };
  
  return (
    <div className=''>
      { 
        options ? (
          <div className='w-full h-[100px] my-1 p-1 bg-[#202123] rounded-lg border border-[#797063] transition duration-50 linear'>
            {
              editTemperature === false ? (
                <button 
                  className='flex w-full h-1/2 items-center px-3 border-radius-top-left-10 transition duration-50 linear'
                  onClick={() => setEditTemperature(true)}
                >
                  <FaTemperatureHalf size={'18px'}/>
                  <h1 className='text-sm mx-2'>{`Temperature (${temperature}°)`}</h1>
                </button>
              ) : (
                <form 
                  className='flex w-full h-1/2 items-center px-3 border-radius-top-left-10 transition duration-50 linear'
                  onSubmit={handleTemperature}
                >
                  <FaTemperatureHalf size={'18px'}/>
                  <input 
                    type='text'
                    placeholder={temperature}
                    value={newTemperature}
                    className='w-[80%] mx-2 bg-[#202123] focus:outline-none'
                    onInput={handleInput}
                  />
                  <button className='hover:text-[#AE224C]'>
                    <FaCircleCheck size={'18px'} />
                  </button>
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
        ) : (<div className='flex items-center my-1 h-[100px] px-3 rounded-lg transition duration-50 linear'></div>)
      }
      <div 
        className={`flex items-center px-1.5 py-2 rounded-lg cursor-pointer hover:bg-[#202123] transition duration-50 linear ${options ? 'bg-[#202123]' : 'bg-[#000000]'}`}
        onClick={() => {
          setOptions(!options);
          if (editTemperature) {
            setEditTemperature(false);
            setNewTemperature(temperature);
          }
        }}
      >
        {
          displayName ? (
            <div className='flex items-center transition duration-50 linear'>
              <img className='w-[32px] h-[32px] rounded-full' src={photoURL} />
              <h1 className='text-sm mx-2 font-bold'>
                {displayName}
              </h1>
            </div>
          ) : (
            <div className='flex items-center transition duration-50 linear'>
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