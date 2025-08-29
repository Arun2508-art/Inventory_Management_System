import { ReactNode } from 'react';

interface labelProps {
  htmlFor?: string;
  title?: ReactNode;
  required?: boolean;
}

const Label = ({ htmlFor, title, required }: labelProps) => {
  return (
    <label htmlFor={htmlFor}>
      {title}
      {required && <span className='text-red-700'>*</span>}
    </label>
  );
};

export default Label;
