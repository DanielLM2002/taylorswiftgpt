import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className='bg-[#343541] font-sans text-white h-screen'>
      <Outlet />
    </main>
  );
};

export default Layout;
