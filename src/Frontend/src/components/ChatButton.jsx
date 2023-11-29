import { useState } from 'react';
import { SlOptions } from 'react-icons/sl';
import { FaCircleCheck } from 'react-icons/fa6';
import { MdDelete, MdEdit } from 'react-icons/md';
import useDataBase from '../hooks/useDataBase';

const ChatButton = (props) => {
  const { chat, title } = props;
  const { 
    DataBaseContext: { currentChat }, 
    changeCurrentChat,
    renameChat,
    deleteChat 
  } = useDataBase();
  const [options, setOptions] = useState(false);
  const [rename, setRename] = useState(false);
  const [newChatName, setNewChatName] = useState(chat.name);

  const handleRename = (event) => {
    renameChat(chat.id, newChatName);
    setRename(false);
    setOptions(false);
    if (newChatName === '') {
      setNewChatName(chat.name);
    }
  };

  return (
    options ? (
      <div>
        {
          rename ? (
            <form 
              className='flex my-1 items-center px-3 py-2 rounded-lg cursor-pointer bg-[#202123] text-white'
              onSubmit={handleRename}
            >
              <input 
                type='text' 
                placeholder={chat.name}
                value={newChatName}
                className='w-full mr-2 bg-[#202123] focus:outline-none text-sm'
                onInput={(event) => setNewChatName(event.target.value)}
              />
              <button 
                className='hover:text-[#AE224C]'
                onClick={handleRename}
              >
                <FaCircleCheck size={'18px'} />
              </button>
            </form>
          ) : (
            <div>
              <div>
                <div className='flex my-1 items-center px-3 py-2 rounded-lg cursor-pointer bg-[#202123] text-white'>
                  <div className='w-full' onClick={() => changeCurrentChat(chat)}>
                    <h1 className='text-sm'>{title}</h1>
                  </div>
                  <button 
                    className='text-[#AE224C]'
                    onClick={() => setOptions(false)}
                  >
                    <SlOptions size={'18px'} />
                  </button>
                </div>
                <div className='h-[72px] my-1 items-center px-1 bg-[#202123] rounded-lg border border-[#797063]'>
                  <button 
                    className='flex h-1/2 w-full items-center'
                    onClick={() => setRename(true)}
                  >
                    <MdEdit className='mx-2' size={'18px'}/>
                    <h1 className='text-sm'>Rename</h1>
                  </button>
                  <button
                    className='flex h-1/2 w-full items-center border-t border-[#797063]'
                    onClick={() => deleteChat(chat.id)}
                  >
                    <MdDelete className='mx-2' size={'18px'}/>
                    <h1 className='text-sm'>Delete</h1> 
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    ) : (
      <div className={`flex my-1 items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-[#202123] text-white ${chat && currentChat && currentChat.id === chat.id && 'bg-[#202123]'}`}>
        <div className='w-full' onClick={() => changeCurrentChat(chat)}>
          <h1 className='text-sm'>{title}</h1>
        </div>
        <button 
          className='hover:text-[#AE224C]'
          onClick={() => setOptions(true)}
        >
          <SlOptions size={'18px'} />
        </button>
      </div>
    )
  );
};

export default ChatButton;
