import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FaGuitar } from 'react-icons/fa';
import { IoLogoGoogle } from 'react-icons/io5';

import useAuth from '../hooks/useAuth';
import Notification from '../components/Notification';

const Signup = () => {
  // States that control the auth values
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // States that control nofification
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ type: null, message: null });

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await signup(email, password);
      setNotification({ type: 'success', message: 'User created successfully'});
      setShowNotification(true);
      setTimeout(() => navigate('/home'), 2000);
    } catch (error) {
      const { code } = error;
      const message = code === 'auth/weak-password' ? 'Invalid password' : 'Email is already in use';
      setShowNotification(true);
      setNotification({ type: 'error', message}); 
    }
  };

  return (
    <form className='flex items-center justify-center h-full' onSubmit={handleSubmit}>
      <div className="flex-wrap w-[500px] p-6 border border-[#464652] rounded-2xl">
        <div className="flex items-center justify-center">
          <FaGuitar className='my-4' size={"50px"} />
        </div>
        <h1 className="text-center text-3xl font-bold mb-5">TaylorSwiftGPT</h1>
        <Notification type={notification.type} message={notification.message} isVisible={showNotification} />
        <h1 className='text-lg font-bold mt-2 mb-1'>Email</h1>
        <input
          className='bg-[#343541] w-full my-1 px-4 py-3 border border-[#464652] rounded-2xl focus:outline-none'
          type='email' 
          onInput={(event) => setEmail(event.target.value)} 
        />
        <h1 className='text-lg font-bold mt-2 mb-1'>Password</h1>
        <input
          className='bg-[#343541] w-full my-1 px-4 py-3 border border-[#464652] rounded-2xl focus:outline-none'
          type='password' 
          onInput={(event) => setPassword(event.target.value)} 
        />
        <Link to='/login'>
          <p className='mt-3 text-center hover:font-bold hover:text-[#8C1631]'>Already have an account? Log in</p>
        </Link>
        <button 
          type='submit'
          className='w-full my-4 px-4 py-3 rounded-2xl bg-[#AE224C] hover:bg-[#8C1631]'
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Signup;
