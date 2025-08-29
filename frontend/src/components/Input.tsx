import classNames from 'classnames';
import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  required?: boolean;
};

const Input = ({
  label,
  type,
  name,
  placeholder,
  id,
  className,
  required,
  ...props
}: InputProps) => {
  const inputClass = classNames(
    'ring-1 ring-gray-400 p-2 rounded outline-blue-300',
    className,
    {}
  );
  return (
    <div className='flex flex-col gap-2 flex-1'>
      {label && (
        <label htmlFor={id} className='font-semibold'>
          {label}
          {required && <span className='text-red-700'>*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        className={inputClass}
        autoComplete='off'
        {...props}
      />
    </div>
  );
};

export default Input;
