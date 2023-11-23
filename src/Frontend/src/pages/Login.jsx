import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaGuitar } from 'react-icons/fa';
import { IoLogoGoogle } from 'react-icons/io5';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <form className='flex items-center justify-center h-full'>
      <div className="flex-wrap w-[500px] p-6 border border-[#464652] rounded-2xl">
        <div className="flex items-center justify-center">
          <FaGuitar className='my-4' size={"50px"} />
        </div>
        <h1 className="text-center text-3xl font-bold mb-5">TaylorSwiftGPT</h1>
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
        <Link to='/signup'>
          <p className='mt-3 text-center hover:font-bold hover:text-[#8C1631]'>Don't have an account? Sign up</p>
        </Link>
        <button className='w-full my-4 px-4 py-3 rounded-2xl bg-[#AE224C] hover:bg-[#8C1631]'>Log in</button>
        <div className='bg-[#464652] h-[1px] rounded-2xl'></div>
        <button className='flex w-full my-4 px-4 py-3 rounded-2xl bg-[#AE224C] justify-center hover:bg-[#8C1631]'>
          <IoLogoGoogle size={'25px'}/>
          <p className='mx-2'>Continue with Google</p>
        </button>
      </div>
    </form>
  );
};

export default Login;
