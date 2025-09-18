import { type ReactNode } from 'react';

interface labelProps {
  htmlFor?: string;
  className?: string;
  title?: ReactNode;
  required?: boolean;
}

const Label = ({ htmlFor, className, title, required }: labelProps) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {title}
      {required && <span className='text-red-700'>*</span>}
    </label>
  );
};

export default Label;
