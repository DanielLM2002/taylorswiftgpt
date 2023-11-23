import { VscError } from 'react-icons/vsc';
import { FaCircleCheck } from 'react-icons/fa6';

const Notification = (props) => {
  const { type, message, isVisible } = props;
  return (
    <>
      {
        isVisible && (
          <div>
            {
              type === 'success' ? (
                <div className='flex bg-[#0D8266] items-center justify-center  rounded-xl px-4 py-3'>
                  <FaCircleCheck className='mx-2'  size={'30px'}/>
                  <p>{message}</p>
                </div>
              ) : (
                <div className='flex bg-[#8C1631] items-center justify-center  rounded-xl px-4 py-3'>
                  <VscError className='mx-2'  size={'30px'}/>
                  <p>{message}</p>
                </div>
              )
            }  
          </div>
        )
      }
    </>
  );
};

export default Notification;
