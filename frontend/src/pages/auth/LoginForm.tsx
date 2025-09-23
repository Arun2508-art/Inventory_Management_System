import { Link } from 'react-router';
import Input from '../../components/Input';

const LoginForm = () => {
  return (
    <div>
      <div className='flex flex-col items-center gap-4 mb-4'>
        <h3 className='font-bold text-2xl text-blue-500'>
          Login to your account
        </h3>
        <div className='font-normal text-sm text-blue-800 hidden md:block'>
          Enter your email below to login to your account
        </div>
      </div>
      <form className='flex flex-col gap-4'>
        <Input
          type='email'
          name='email'
          placeholder='m@example.com'
          id='req_email'
          label='Email'
        />
        <Input
          type='password'
          name='password'
          id='req_password'
          label='Password'
          placeholder='Password'
        />

        <button
          type='submit'
          className='bg-blue-500 text-white rounded py-2 mt-4 cursor-pointer disabled:cursor-default disabled:bg-gray-400'
        >
          {false ? 'Logging in....' : 'Login'}
        </button>
      </form>
      <div className='my-8 text-center relative text-sm hidden lg:block'>
        <div className='border-t border-gray-300'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-blue-500'>
          Or continue with
        </div>
      </div>
      <div className='w-full mt-6 hidden lg:block'>
        <button className='w-full rounded py-2 mt-4 ring-1 ring-gray-400'>
          Login with Google
        </button>
      </div>
      <Link to='/register' className='w-full text-center mt-6 text-sm block'>
        Don&apos;t have an account?
        <span className='text-blue-600 underline cursor-pointer pl-2 hover:font-semibold'>
          Sign Up
        </span>
      </Link>
    </div>
  );
};

export default LoginForm;
