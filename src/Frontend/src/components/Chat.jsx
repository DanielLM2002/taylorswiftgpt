import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

import Message from './Message';
import useAuth from '../hooks/useAuth';

const Chat = () => {
  const [message, setMessage] = useState(null);
  const { AuthContext:{ currentChat }} = useAuth();

  return (
    <div className='w-full'>
      <div className='flex h-16 w-full px-5 items-center sticky top-0 bg-[#343541]'>
        <h1 className='text-lg font-bold'>TaylorSwiftGPT</h1>
      </div>
      {
        currentChat ? (
          <div className='h-[81%] overflow-auto'>
            {
              currentChat.questions.map(question => {
                return <div key={question.id}>
                  <Message type='user' content={question.content} />
                  <Message type='gpt' content={question.answer} />
                </div>
              })
            }
          </div>
        ) : (
          <div className='h-[81%] flex items-center justify-center'>
            <h1 className='text-5xl font-bold'>TaylorSwiftGPT</h1>
          </div>
        )
      }
      <div className='mt-5 px-5 2xl:px-[27%]'>
        <div className='w-full px-4 py-3 border border-[#464652] bg-[#343541] rounded-2xl'>
          <input 
            className='w-[93%] 2xl:w-[94%] bg-[#343541] focus:outline-none'
            type='text' 
            placeholder='Message TaylorSwiftGPT...'
            onInput={(event) => setMessage(event.target.value)} 
          />
          <button className={`w-[30px] h-[30px] ml-3 bg-[#494A54] rounded-lg justify-center items-center ${message !== null && message !== '' ? 'bg-[#FFFFFF]' : 'bg-[#494A54]'}`}>
            <div className='flex justify-center items-center text-[#2F303A]'>
              <FaArrowUp />
            </div>
          </button>
        </div>
        <p className='mt-3 text-xs text-bold text-center text-[#8B8B92]'>TeylorSwiftGPT can make mistakes. Consider checking important information.</p>
      </div>
    </div>
  );
};

export default Chat;