import { IconX } from '@tabler/icons-react';
import { type Dispatch, type SetStateAction } from 'react';

const ComingSoon = ({
  setModalOpen,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className='fixed inset-0 bg-black/50'>
        <div className='bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 z-50 shadow-2xl rounded-md'>
          <div className='flex flex-col gap-3 group'>
            <div className='flex justify-between items-center'>
              <h1 className='text-xl font-semibold capitalize'>Coming Soon</h1>
              <div
                className='hover:text-red-600 hover:bg-red-100 ms-4 p-1 rounded-md cursor-pointer hidden group-hover:block'
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                <IconX width={24} height={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
