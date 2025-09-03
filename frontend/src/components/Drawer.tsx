import { IconX } from '@tabler/icons-react';
import type { ReactNode } from 'react';

interface DrawerProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Drawer = ({ title, isOpen, onClose, children }: DrawerProps) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/20 transition-opacity duration-300 z-50 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 bottom-0 right-0 w-full md:w-[400px] bg-white z-50 transform transition-transform duration-300 overflow-auto sidebar-scroll ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='p-4 flex justify-between items-center'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <button
            onClick={onClose}
            className='text-black hover:text-red-500 cursor-pointer'
          >
            <IconX width={20} height={20} stroke={1.5} />
          </button>
        </div>

        <div className='px-4 pt-2 pb-4'>{children}</div>
      </div>
    </>
  );
};

export default Drawer;
