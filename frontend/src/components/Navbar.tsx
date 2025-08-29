import {
  IconBell,
  IconLogout,
  IconMessages,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';
import ComingSoon from './ComingSoon';
import Loading from './Loading';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [openModal, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(true);
  };

  if (status === 'loading') {
    return (
      <div className='fixed inset-0 bg-black/20 cursor-not-allowed'>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className='flex items-center justify-end p-4'>
        <div className='flex gap-2 lg:gap-3 items-center'>
          <div
            className='p-2 flex items-center justify-center cursor-pointer hover:bg-blue-200 rounded-md'
            onClick={handleModal}
          >
            <IconMessages stroke={1} width={24} height={24} />
          </div>
          <div
            className='p-2 flex items-center justify-center cursor-pointer relative hover:bg-blue-200 rounded-md'
            onClick={handleModal}
          >
            <IconBell stroke={1} width={24} height={24} />
            <div className='absolute top-0.5 right-1 w-4 h-4 flex items-center justify-center rounded-full px-1 text-xs bg-red-500 text-white'>
              1
            </div>
          </div>
          <div
            className='cursor-pointer relative'
            onClick={() => setActiveMenu((prev) => !prev)}
          >
            <div className='hover:bg-blue-200 p-[6.5px] rounded-md flex items-center gap-2'>
              <div className='flex flex-col'>
                <div className='font-medium text-xs leading-3'>Arun Kumar</div>
                <div className='text-gray-500 text-[10px] text-right capitalize'>
                  Admin
                </div>
              </div>
              <div className='text-white rounded-full relative w-7 h-6 flex items-center justify-center'>
                <img
                  src='/noAvatar.png'
                  alt='no avatar'
                  width={100}
                  height={100}
                />
              </div>
            </div>
            {activeMenu && (
              <div className='absolute bg-blue-200 p-2 top-full right-0 rounded-md flex flex-col gap-2 mt-2 min-w-36'>
                <div className='flex gap-2 text-sm py-2 px-1 hover:bg-blue-100 rounded-md cursor-not-allowed'>
                  <IconUser width={16} height={16} />
                  MyProfile
                </div>
                <div className='flex gap-2 text-sm py-2 px-1 hover:bg-blue-100 rounded-md cursor-not-allowed'>
                  <IconSettings width={16} height={16} />
                  Setting
                </div>
                <div className='flex gap-2 text-sm py-2 px-1 hover:bg-blue-100 rounded-md'>
                  <IconLogout width={16} height={16} />
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {openModal && <ComingSoon setModalOpen={setModalOpen} />}
    </>
  );
};

export default Navbar;
