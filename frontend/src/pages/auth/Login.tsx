import LoginForm from './LoginForm';

const Login = () => {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='relative hidden bg-muted lg:block'>
        <img
          src='/frambanner.jpg'
          alt='Image'
          className='object-cover dark:brightness-[0.7] h-full w-full'
        />
      </div>
      <div className='flex flex-1 items-center justify-center'>
        <div className='w-full max-w-md p-4'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
