import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className='flex h-screen overflow-hidden'>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
