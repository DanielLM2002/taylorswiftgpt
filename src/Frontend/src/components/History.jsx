import { useState } from 'react';
import { LuPenSquare } from 'react-icons/lu';
import icon from '../../assets/icon.svg';

import User from './User';
import ChatButton from './ChatButton';
import useDataBase from '../hooks/useDataBase';

const History = () => {
  const { 
    DataBaseContext: { chats },
    addChat
  } = useDataBase();
  return (
    <div className='w-full h-full max-w-[260px] bg-[#000000] px-3 py-3.5'>
      <div 
        className='flex items-center rounded-lg px-1.5 py-2 cursor-pointer hover:bg-[#202123]'
        onClick={addChat}
      >
        <div className='w-[28px] h-[28px] flex items-center rounded-full bg-[#FFFFFF] p-1'>
          <img src={icon} />
        </div>
        <h1 className='text-sm mx-2'>New chat</h1>
        <LuPenSquare className='ml-[100px]' size={'16px'} />
      </div>
      <div className='h-[79%] py-8'>
        { 
          chats && chats.map((chat, index) => <ChatButton chat={chat} key={chat.id} title={chat.name} />)
        }
      </div>
      <User />
    </div>
  );
};

export default History;