import { FaCircleUser, FaGuitar } from 'react-icons/fa6';

import useAuth from '../hooks/useAuth';

const Message = (props) => {
  const { type, content } = props;
  const { AuthContext: { userCredentials: { photoURL } } } = useAuth();

  return (
    <div className='w-full my-4 px-10 2xl:px-[27%]'>
      {
        type === 'user' ? (
          <div>
            {
              photoURL ? (
                <div className='flex'>
                  <img className='w-[24px] h-[24px] rounded-full' src={photoURL} />
                  <h1 className='mx-3 font-bold'>You</h1>
                </div>
              ) : (
                <div className='flex'>
                  <FaCircleUser size={'24px'} />
                  <h1 className='mx-3 font-bold'>You</h1>
                </div>
              )
            }
            <div className='py-2 text-justify'>
              <p className='ml-9'>{content}</p>
            </div>
          </div>
        ) : (
          <div>
            <div className='flex'>
              <FaGuitar className='text-[#AE224C]' size={'24px'} />
              <h1 className='mx-3 font-bold'>TylorSwiftGPT</h1>
            </div>
            <div className='py-2 text-justify'>
              <p className='ml-9'>{content}</p>
            </div>
          </div>
        )
      }
    </div>
  )
};

export default Message;
