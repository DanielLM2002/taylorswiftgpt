import { MdDelete } from 'react-icons/md';
import useDataBase from '../hooks/useDataBase';

const ChatButton = (props) => {
  const { chat, title } = props;
  const { DataBaseContext: {
    currentChat,
    setCurrentChat
  } } = useDataBase();

  return (
    <div className={`flex my-1 items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-[#202123] text-white ${chat && currentChat && currentChat.id === chat.id && 'bg-[#202123]'}`}>
      <div className='w-full' onClick={() => setCurrentChat(chat)}>
        <h1 className='text-sm'>{title}</h1>
      </div>
      <button 
        className='hover:text-[#AE224C]'
        onClick={() => {}}
      >
        <MdDelete size={'18px'} />
      </button>
    </div>
  );
};

export default ChatButton;
