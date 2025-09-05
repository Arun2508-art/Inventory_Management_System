import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  title?: string;
}

const Container = ({ children, title }: ContainerProps) => {
  return (
    <div className='w-full min-h-[calc(100vh-72px)] bg-blue-50 p-4'>
      <h2 className='font-semibold text-xl mb-4'>{title}</h2>
      {children}
    </div>
  );
};

export default Container;
