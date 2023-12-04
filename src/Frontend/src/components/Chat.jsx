import { useState, useRef, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import icon from '../../assets/icon.svg';
import whiteIcon from '../../assets/white-icon.svg';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import Message from './Message';
import useDataBase from '../hooks/useDataBase';

const Chat = () => {
  const bottomRef = useRef(null);
  const [message, setMessage] = useState('');
  const {
    DataBaseContext: { loading, currentChat },
    addQuestion,
    addChat
  } = useDataBase();

  const handleInput = (event) => {
    event.preventDefault();
    if (message !== '') {
      if (currentChat === null) {
        const chat = addChat();
        addQuestion(chat.id, message);
      } else {
        addQuestion(currentChat.id, message);
      }
      setMessage('');
    }
  }

  const insertMessageContainer = () => {
    const messages = currentChat.questions.map(question => {
      return <div key={question.id} className='transition duration-50 linear'>
        <Message type='user' content={question.content} />
        <Message type='gpt' content={question.answer} />
      </div>
    });
    return messages;
  };

  const showChatMessages = () => {
    let chatContainer;
    if (currentChat) {
      if (currentChat.questions.length > 0) {
        if (loading) {
          chatContainer = (
            <div className='h-[81%] items-center justify-center overflow-y-scroll'>
              {insertMessageContainer()}
              <div ref={bottomRef} />
              <div className='flex w-full my-4 px-10 2xl:px-[27%]'>
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24, color: '#AE224C' }} spin />}
                />
                <h1 className='mx-3 font-bold'>TaylorSwiftGPT</h1>
              </div>
            </div>
          );
        } else {
          chatContainer = (
            <div className='h-[81%] items-center justify-center overflow-y-scroll'>
              {insertMessageContainer()}
              <div ref={bottomRef} />
            </div>
          );
        }
      } else {
        if (loading) {
          chatContainer = (
            <div className='h-[81%] items-center justify-center overflow-y-scroll'>
              <div className='flex w-full my-4 px-10 2xl:px-[27%]'>
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24, color: '#AE224C' }} spin />}
                />
                <h1 className='mx-3 font-bold'>TaylorSwiftGPT</h1>
              </div>
              <div ref={bottomRef} />
            </div>
          );
        } else {
          chatContainer = (
            <div className='h-[81%] flex items-center justify-center'>
              <div>
                <div className='flex w-full items-center justify-center'>
                  <div className='w-[72px] h-[72px] flex items-center rounded-full bg-[#FFFFFF] p-3 my-5'>
                    <img src={icon} />
                  </div>
                </div>
                <h1 className='text-2xl font-bold'>How can I help you today?</h1>
              </div>
            </div>
          );
        }
      }
    } else {
      chatContainer = (
        <div className='h-[81%] flex items-center justify-center'>
          <div>
            <div className='flex w-full items-center justify-center'>
              <div className='w-[72px] h-[72px] flex items-center rounded-full bg-[#FFFFFF] p-3 my-5'>
                <img src={icon} />
              </div>
            </div>
            <h1 className='text-2xl font-bold'>How can I help you today?</h1>
          </div>
        </div>
      );
    }
    return chatContainer;
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className='w-full bg-[#343541]'>
      <div className='flex h-16 w-full px-5 items-center sticky top-0 bg-[#343541]'>
        <h1 className='text-lg font-bold'>TaylorSwiftGPT</h1>
      </div>
      {showChatMessages()}
      <div className='mt-5 px-5 2xl:px-[27%]'>
        <form
          onSubmit={handleInput}
          className='w-full px-4 py-3 border-[1.5px] border-[#8d8d9f] bg-[#343541] rounded-2xl transition duration-50 linear'
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
        <p className='mt-3 text-xs text-bold text-center text-[#8B8B92]'>TaylorSwiftGPT can make mistakes. Consider checking important information.</p>
      </div>
    </div>
  );
};

export default Chat;
