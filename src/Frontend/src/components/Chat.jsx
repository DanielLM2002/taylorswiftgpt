import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import icon from '../../assets/icon.svg';

import Message from './Message';
import useDataBase from '../hooks/useDataBase';

const Chat = () => {
  const [message, setMessage] = useState('');
  const { 
    DataBaseContext: { currentChat },
    addQuestion,
    addChat
  } = useDataBase();

  const handleInput = (event) => {
    event.preventDefault();
    if (currentChat === null) {
      const chat = addChat();
      addQuestion(chat.id, message);
    } else {
      addQuestion(currentChat.id, message);
    }
    setMessage('');
    const chatContainer = document.querySelector('#chatContainer');
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
  }

  return (
    <div className='w-full bg-[#343541]'>
      <div className='flex h-16 w-full px-5 items-center sticky top-0 bg-[#343541]'>
        <h1 className='text-lg font-bold'>TaylorSwiftGPT</h1>
      </div>
      {
        currentChat && currentChat.questions.length > 0 ? (
          <div id='chatContainer' className='h-[81%] overflow-y-scroll transition duration-50 linear'>
            {
              currentChat.questions.map(question => {
                return <div key={question.id} className='transition duration-50 linear'>
                  <Message type='user' content={question.content} />
                  <Message type='gpt' content={question.answer} />
                </div>
              })
            }
          </div>
        ) : (
          <div className='h-[81%] flex items-center justify-center transition duration-50 linear'>
            <div>
              <div className='flex w-full items-center justify-center'>
                <div className='w-[72px] h-[72px] flex items-center rounded-full bg-[#FFFFFF] p-3 my-5'>
                  <img src={icon} />
                </div>
              </div>
              <h1 className='text-2xl font-bold'>How can I help you today?</h1>
            </div>
          </div>
        )
      }
      <div className='mt-5 px-5 2xl:px-[27%]'>
        <form 
          onSubmit={handleInput}
          className='w-full px-4 py-3 border border-[#464652] bg-[#343541] rounded-2xl transition duration-50 linear'
        >
          <input 
            className='w-[93%] 2xl:w-[94%] bg-[#343541] focus:outline-none'
            type='text'
            value={message} 
            placeholder='Message TaylorSwiftGPT...'
            onInput={(event) => setMessage(event.target.value)}
          />
          <button className={`w-[30px] h-[30px] ml-3 bg-[#494A54] rounded-lg justify-center items-center ${message !== null && message !== '' ? 'bg-[#FFFFFF]' : 'bg-[#494A54]'}`}>
            <div className='flex justify-center items-center text-[#2F303A]'>
              <FaArrowUp />
            </div>
          </button>
        </form>
        <p className='mt-3 text-xs text-bold text-center text-[#8B8B92]'>TeylorSwiftGPT can make mistakes. Consider checking important information.</p>
      </div>
    </div>
  );
};

export default Chat;
