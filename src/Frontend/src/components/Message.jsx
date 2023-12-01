import { FaCircleUser } from 'react-icons/fa6';
import whiteIcon from '../../assets/white-icon.svg';

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
            <div className='w-[24px] h-[24px] flex items-center rounded-full bg-[#AE224C] p-1'>
              <img src={whiteIcon} />
            </div>
              <h1 className='mx-3 font-bold'>TaylorSwiftGPT</h1>
            </div>
            <div className='py-2 text-justify'>
              {
                content.map((element) => <p className='ml-9'>{element}</p>)
              }
            </div>
          </div>
        )
      }
    </div>
  )
};

export default Message;
