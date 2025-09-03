import classNames from 'classnames';
import { forwardRef, type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id?: string;
  className?: string;
  containerClassName?: string;
  requiredLabel?: boolean;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      type = 'text',
      id,
      placeholder,
      className,
      containerClassName,
      requiredLabel,
      error,
      ...rest
    },
    ref
  ) => {
    const inputClass = classNames(
      'ring-1 ring-gray-400 p-2 rounded outline-blue-300',
      className,
      {}
    );
    const containerClass = classNames(
      'flex flex-col gap-2 flex-1',
      containerClassName,
      {}
    );
    return (
      <div className={containerClass}>
        {label && (
          <label htmlFor={id} className='font-semibold'>
            {label}
            {requiredLabel && <span className='text-red-700'>*</span>}
          </label>
        )}

        <input
          type={type}
          name={name}
          ref={ref}
          id={id}
          placeholder={placeholder}
          className={inputClass}
          {...rest}
        />
        {error && <div className='text-red-500'>{error}</div>}
      </div>
    );
  }
);

export default Input;
