import { Link, Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]'>
        <Link
          to='/'
          className='flex items-center justify-center lg:justify-start gap-2 px-4 py-5 focus-visible:outline-0 sticky top-0 bg-white border-b border-gray-100'
        >
          <img src='/logo.png' alt='logo' width={32} height={32} />
          <h1 className='hidden lg:block font-bold xl:text-xl text-nowrap text-ellipsis overflow-hidden'>
            Inventory System
          </h1>
        </Link>
        <Sidebar />
      </div>
      <div className='w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] flex flex-col'>
        <Navbar />
        <div className='w-full h-[calc(100vh-72px)] overflow-auto container-scroll'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
